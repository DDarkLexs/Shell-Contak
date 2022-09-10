const { app, BrowserWindow, ipcMain,dialog,ipcRenderer,shell } = require("electron")
const path = require('path');
const url = require('url');
const fs = require('fs')
const PrepareDatabase = require('./src/main/prepareDatabase')
const { normalize } = new PrepareDatabase()
const Connection = require('./src/main/connection.js')
let con = new Connection()
let knex = con.connect()
let sqliteBuilder = con.queryBuilderAllData
const IpcMainRoutes = require('./src/main/routes/index.js')
var mainWindow
const createWin = require('./src/main/process/win/app.js')
const tray = require('./src/main/process/tray')
const { prepareIpcMain } = new IpcMainRoutes()






app.on("ready", async () => {
	
	normalize()
	mainWindow = (await createWin(__dirname))
	prepareIpcMain(knex, sqliteBuilder)
	tray('./build/icon.png',__dirname, mainWindow)
	
});


app.on('will-quit', event => { })

app.on("window-all-closed", () => { app.quit() })

 










// var convert = require('xml-js');
// var options = {compact: true, ignoreComment: true, spaces: 4};
// var result = convert.json2xml(json, options);
// console.log(result);
