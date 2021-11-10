const { app, BrowserWindow,ipcMain } = require('electron')
const path = require('path')
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || 'localhost';
const ipcHandler = require(path.join(__dirname, 'ipcMain.js'))

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
        preload: path.join(__dirname, 'preload.js')
        }
    })
    // win.removeMenu()
    win.loadURL(`http://${HOST}:${DEFAULT_PORT}`)
}
app.whenReady().then(() => {
    createWindow()
})
app.on('window-all-closed', function () {
if (process.platform !== 'darwin') app.quit()
})

