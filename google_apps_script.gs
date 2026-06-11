function doPost(e) {
  try {
    // Получаем данные из запроса
    const jsonString = e.postData.getDataAsString();
    const data = JSON.parse(jsonString);
    
    // Подключаемся к таблице Google Sheets
    // ЗАМЕНИТЕ ID ТАБЛИЦЫ НА ВАШ РЕАЛЬНЫЙ ID
    const sheetId = "YOUR_SHEET_ID_HERE"; 
    const ss = SpreadsheetApp.openById(sheetId);
    const sheet = ss.getSheets()[0]; // Используем первый лист
    
    // Если это обновление статуса
    if (data.type === 'update_status') {
      const lastColumn = sheet.getLastColumn();
      
      // Находим строку с указанным ID
      const idColumn = sheet.getRange("A:A").getValues();
      let rowIdx = -1;
      for (let i = 0; i < idColumn.length; i++) {
        if (idColumn[i][0] == data.defectId) {
          rowIdx = i + 1;
          break;
        }
      }
      
      if (rowIdx > 0) {
        // Обновляем статус (столбец J)
        sheet.getRange(rowIdx, 10).setValue(data.newStatus);
        
        // Если есть комментарий, добавляем его (столбец K)
        if (data.comment) {
          sheet.getRange(rowIdx, 11).setValue(data.comment);
        }
        
        // Добавляем дату изменения статуса (столбец L)
        sheet.getRange(rowIdx, 12).setValue(new Date());
      }
      
      return ContentService.createTextOutput(JSON.stringify({result: "success"})).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Добавляем новую запись в таблицу
    const now = new Date();
    const rowData = [
      generateId(),                              // ID (A)
      Utilities.formatDate(now, Session.getTimeZone(), "dd.MM.yyyy"), // Дата (B)
      Utilities.formatDate(now, Session.getTimeZone(), "HH:mm"),      // Время (C)
      data.inspector || "",                      // Инспектор (D)
      data.system || "",                         // Система (E)
      data.defectType || "",                     // Тип дефекта (F)
      data.priority || "",                       // Приоритет (G)
      data.description || "",                    // Описание (H)
      "",                                        // Фото (I) - ссылка будет добавлена позже
      "Новый",                                  // Статус (J)
      data.recommendations || "",                // Рекомендации (K)
      "",                                        // Дата исправления (L)
      ""                                         // Примечания (M)
    ];
    
    sheet.appendRow(rowData);
    
    // Если есть фото, сохраняем его
    if (data.photo) {
      const lastRow = sheet.getLastRow();
      savePhoto(data.photo, sheet, lastRow);
    }
    
    return ContentService.createTextOutput(JSON.stringify({result: "success"})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("Ошибка при обработке данных:", error.toString());
    return ContentService.createTextOutput(JSON.stringify({result: "error", error: error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  // Для тестирования в браузере
  const html = HtmlService.createHtmlOutput("<h1>API для осмотра пожарной безопасности готово к работе!</h1>");
  html.setTitle("Fire Safety API");
  return html;
}

// Генерация уникального ID
function generateId() {
  const timestamp = Math.floor(Date.now() / 1000).toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `FS_${timestamp}${random}`.toUpperCase();
}

// Сохранение фото в Google Drive и добавление ссылки в таблицу
function savePhoto(base64Image, sheet, rowNum) {
  try {
    // Убираем префикс из строки base64
    const base64Data = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
    
    // Декодируем данные
    const imageBlob = Utilities.base64Decode(base64Data);
    imageBlob.setName(`photo_${generateId()}.jpg`);
    
    // Создаем папку для хранения фото, если не существует
    let folder = getOrCreateFolder();
    
    // Загружаем фото в папку
    const file = folder.createFile(imageBlob);
    
    // Делаем файл общедоступным
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // Получаем URL доступа к файлу
    const imageUrl = `https://drive.google.com/uc?id=${file.getId()}`;
    
    // Записываем URL в ячейку фото (столбец I)
    sheet.getRange(rowNum, 9).setValue(imageUrl);
  } catch (error) {
    console.error("Ошибка при сохранении фото:", error.toString());
  }
}

// Получение или создание папки для фото
function getOrCreateFolder() {
  let folder;
  
  // Пытаемся найти папку по названию
  const folders = DriveApp.getFoldersByName("FireSafetyPhotos");
  if (folders.hasNext()) {
    folder = folders.next();
  } else {
    // Создаем новую папку
    folder = DriveApp.createFolder("FireSafetyPhotos");
    folder.setDescription("Фотографии осмотра систем пожарной безопасности");
  }
  
  return folder;
}