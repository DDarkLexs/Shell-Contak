const { app, ipcMain,dialog,shell } = require('electron')
const extenso = require('extenso')

module.exports = (knex,sqliteBuilder) => {


ipcMain.on('get-localMoedaByExtenso', async (event,value) => {
    try {

        const valor = (value==undefined)?0:value

         event.returnValue = (extenso(Number(valor), 
         { mode:'number',
         locale:'pt',
         })).concat(' kwanza(s)')
    
        } catch (error) {

        event.returnValue = 0
        // console.log(error)
        
    }
})



ipcMain.on('get-localMoeda', async (event,value) => {
    try {

         event.returnValue = Number(value).toLocaleString('pt-br',{style:'currency',currency:'AOA'})
         .replace('AOA','').trimStart().concat(' Kz')
         
    } catch (error) {

        event.returnValue = 0
        console.log(error)
        
    }
})

}