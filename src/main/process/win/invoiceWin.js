const { app, BrowserWindow, ipcMain,dialog,ipcRenderer,shell } = require("electron")
const path = require('path');





module.exports = function createWin(id_cliente) {
	mainWindow = new BrowserWindow({ 
		height: 550,
		width: 230,
		show: true,
		autoHideMenuBar:true,
		webPreferences:{
			devTools:true,
			nodeIntegration:true,
			enableRemoteModule:true,
			contextIsolation:false,
		}
	})


	mainWindow.loadFile(path.join(app.getAppPath() + '/src/renderer/invoice/index.html'));
	
	mainWindow.webContents.on('did-fail-load',() =>{
		mainWindow.close()
	})
	
	mainWindow.once("ready-to-show", () => {
		mainWindow.webContents.send('get-ClientData', id_cliente);
		// mainWindow.webContents.openDevTools()
	})
	
}
