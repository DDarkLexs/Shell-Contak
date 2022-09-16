const { app, ipcMain,dialog } = require('electron')
const md5 = require('md5')
const moment = require('moment')



module.exports = (knex) => {

    ipcMain.on('post-contagem', async (event, contagem) => {

        try {

            const id_moeda = (await knex('moeda').insert(contagem))[0]
                console.log(id_moeda)
 
            event.returnValue = ({  query:id_moeda, response: true , msg:'ok' })
            
       
         } catch (error) {

            console.log(error)

            event.returnValue = ({ response: false , msg:error })
        }
    })



}
