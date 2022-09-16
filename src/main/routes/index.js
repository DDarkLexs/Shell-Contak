const { app, ipcMain } = require('electron')
const { setup } = require('../controller/index')
const contagem = require('../controller/modules/contagem')
const md5 = require('md5')



module.exports = class IpcMainRoutes {

    prepareIpcMain(knex,sqliteBuilder) {
        setup(knex, sqliteBuilder)
        contagem(knex)

    }


}