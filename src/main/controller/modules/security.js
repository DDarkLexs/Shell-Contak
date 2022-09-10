const { app, ipcMain,dialog } = require('electron')
const md5 = require('md5')
const moment = require('moment')



module.exports = (knex) => {

    ipcMain.on('getUserTK', async (event, id_usuario) => {

        try { 
           

            const usuario = (await knex.select(
            knex.raw(`
            nome as 
            nome,
            id_usuario,
            role,
            permissao,
            f.id_funcionario,
            id_empresa
            
            `)).from("usuario")
            .innerJoin(knex.raw("funcionario f on f.id_funcionario = usuario.id_funcionario"))
            .where('id_usuario', '=', id_usuario))[0]


            event.sender.send('sendSecurityAuth', 
            { hash: md5(JSON.stringify(usuario)) , response: usuario , msg:'ok' }) 
            
       
         } catch (error) {

            console.log(error)

           event.sender.send('sendSecurityAuth', ({ response: false , msg:error }))
        }
    })



}
