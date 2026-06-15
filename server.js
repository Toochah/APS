const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const basePath = '.';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.svg': 'application/image/svg+xml'
};

http.createServer(function(request, response) {
  console.log(`Запрошенный адрес: ${request.url}`);

  // Защита от доступа к файлам за пределами базовой директории
  let filePath = path.join(process.cwd(), basePath, request.url);
  
  // Если запрашивается корневой путь, возвращаем главный HTML-файл
  if (request.url === '/' || request.url === '') {
    filePath = path.join(process.cwd(), basePath, 'fire_safety_inspection.html');
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, function(error, content) {
    if (error) {
      if (error.code === 'ENOENT') {
        // Файл не найден
        response.writeHead(404);
        response.end('404 Not Found\n');
        console.log('404: Файл не найден');
      } else {
        // Другая ошибка
        response.writeHead(500);
        response.end('500 Internal Server Error\n');
        console.log('500: Внутренняя ошибка сервера');
      }
    } else {
      // Успешное чтение файла
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
}).listen(port);

console.log(`Сервер запущен на порту ${port}`);
console.log(`Адрес: http://localhost:${port}/fire_safety_inspection.html`);