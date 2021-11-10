const { contextBridge,ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer)

window.addEventListener('DOMContentLoaded', () => {
    console.log('hello')
})