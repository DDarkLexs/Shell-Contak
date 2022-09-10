const { app, Menu, Tray, ipcMain,contextBridge } = require('electron')
const  createWin  = require('../win/app.js')
const  invoiceWin  = require('../win/invoiceWin')
const prompt = require('electron-prompt');
var win
let tray = null

module.exports =  (icon,dir, win) => { 

app.whenReady().then(() => {

  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Abrir', type: 'normal', click:() => {
        createWin(dir)
    }},

    { visible:false, label: 'Terminar a sessão', type: 'normal' , click: event => {
		
		win.webContents.send('logOut', { response: true });
	
	} },
    // { label: 'Item1', type: 'normal' },
    { visible:false, label: 'ver tipo de fatura', type: 'normal', click:() =>{

        
	prompt({
		title: 'Informe o fatura',
		label: 'Informe o ID do cliente',
		value: 0,
		inputAttrs: {
			type: 'number'
		},
		type: 'input'
	})
	.then((r) => {
		if(r === null) {
			console.log('user cancelled');
		} else {
			invoiceWin(r)
			console.log('result', r);
		}
	})
	.catch(console.error);


    } },

    { label: 'Sair', type: 'normal',click:() => {
        app.exit()
    } },
  ])
  tray.displayBalloon({
		icon:icon,
	 	title:app.getName(),
		 content:'Sistema inicializado!',
		iconType:'custom',
		largeIcon:true,
	})
  
  tray.setToolTip(app.getName())
  tray.setContextMenu(contextMenu)
  //  tray.focus()

})

}