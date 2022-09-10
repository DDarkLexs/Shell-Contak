const { app, BrowserWindow, ipcMain,dialog,shell } = require("electron")


module.exports = function createWin(dir) {

 return new Promise((resolve,reject) => {
	try {
		
		
		
	let mainWindow = new BrowserWindow({ 
		height: 800,
		width: 1200,
		show: true,
		autoHideMenuBar:true,
		webPreferences:{
			devTools:true,
			nodeIntegration:true,
			enableRemoteModule:true,
			contextIsolation:false,
		}
	}) 
	
	ipcMain.on('setProgressBar',(event, { total }) => {
		for (let i = 0; i <= total; i++) {
			let v = Number(`0.${Math.round((i / total) * 100)}`)
			if(i == total){
				v = 1
			}

				console.log(v)
				mainWindow.setProgressBar( v )
				
				
			}
			
			mainWindow.setProgressBar(1,{mode:'none'})
	})
	
	mainWindow.loadFile(`${dir}/src/renderer/app/index.html`);
	
	mainWindow.webContents.on('did-fail-load',() =>{
		app.exit(0)
	})
	
	mainWindow.once("ready-to-show", () => { 
	//	mainWindow.webContents.openDevTools()
	})
	
	resolve(mainWindow)
		} catch (error) {

			reject(error)
			
		}
	})


}


