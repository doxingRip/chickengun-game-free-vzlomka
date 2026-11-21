const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');

let prankWindow;
ipcMain.on('prank-exit', () => {
  if (prankWindow && !prankWindow.isDestroyed()) prankWindow.close();
});

function createWindow() {
  const area = screen.getPrimaryDisplay().bounds;
  prankWindow = new BrowserWindow({
    x: area.x, y: area.y, width: area.width, height: area.height,
    frame: false, transparent: true, backgroundColor: '#00000000',
    resizable: false, movable: false, minimizable: true, maximizable: false,
    alwaysOnTop: true, skipTaskbar: false, hasShadow: false,
    autoHideMenuBar: true, title: 'ChickenGun Prank',
    webPreferences: { contextIsolation: false, nodeIntegration: true, sandbox: false }
  });
  // Keep standard Windows close controls available; Delete is an additional exit shortcut.
  prankWindow.loadFile(path.join(__dirname, 'index.html'));
  prankWindow.setAlwaysOnTop(true, 'screen-saver');
  prankWindow.on('closed', () => { prankWindow = null; });
}

app.whenReady().then(createWindow);
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
app.on('window-all-closed', () => app.quit());
