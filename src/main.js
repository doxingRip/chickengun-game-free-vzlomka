const { app, BrowserWindow, screen } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 900, height: 600, minWidth: 680, minHeight: 480,
    title: 'Windows 12 Setup — totally real (нет)',
    backgroundColor: '#080b14',
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: true }
  });
  win.loadFile(path.join(__dirname, 'index.html'));
}
app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
