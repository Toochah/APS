// Main application script for the PWA

class PWAApplication {
  constructor() {
    this.isOnline = navigator.onLine;
    this.init();
  }

  init() {
    this.updateOnlineStatus();
    this.setupEventListeners();
    this.checkPWASupport();
  }

  setupEventListeners() {
    // Online/offline status listeners
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.updateOnlineStatus();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.updateOnlineStatus();
    });
  }

  updateOnlineStatus() {
    const statusElement = document.getElementById('status');
    if (statusElement) {
      statusElement.textContent = this.isOnline ? 'Online' : 'Offline';
      statusElement.className = this.isOnline ? 'status online' : 'status offline';
    }
  }

  checkPWASupport() {
    // Check if the browser supports PWA features
    const supportsPWA = ('serviceWorker' in navigator) && ('PushManager' in window) && ('Notification' in window);
    
    if (!supportsPWA) {
      console.warn('This browser does not support all PWA features.');
      return false;
    }
    
    return true;
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }

  async requestNotificationPermission() {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications.');
      return;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }
    }
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new PWAApplication();
  
  // Install button functionality
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    const installButton = document.getElementById('install-button');
    if (installButton) {
      installButton.style.display = 'block';
      
      installButton.addEventListener('click', () => {
        deferredPrompt.prompt();
        
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          }
          deferredPrompt = null;
          installButton.style.display = 'none';
        });
      });
    }
  });
  
  // Update available handling
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      window.location.reload();
      refreshing = true;
    }
  });
});

// Export the class for potential module usage
export { PWAApplication };