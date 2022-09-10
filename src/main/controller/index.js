const { app, ipcMain,dialog } = require('electron')
const md5 = require('md5')
const usuario = require('./modules/usuario')
const setupMoeda = require('./setup/moeda')
const security = require('./modules/security')

let knex
 

module.exports = obj = {
   setup(knexObj,sqliteBuilder){
    
    knex = knexObj

    setupMoeda(knexObj,sqliteBuilder)
    usuario(knexObj,sqliteBuilder)
    security(knexObj)
   



    ipcMain.on('getAppName',(event,val) => {
        try {
          
             event.returnValue = app.getName()

        } catch (error) {
          console.log(error)
            
        }
    })
    
    // ipcMain.on('resultSent', async (event,val) => {
    //     try {
            
    //        // console.log(val)
    //         let result = await sqliteBuilder(`select * from usuario where id = ${val}`)
    //         //   let result = await knex.select("*").from("funcionario")
    //         // .where('id','=',JSON.parse(val))
             
             
    //         //  console.log(result)

    //          event.returnValue = result
             
             
          
    //     } catch (error) {
    //       console.log(error)
            
    //     }
    // })


   },
    
}
