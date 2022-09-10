const { app, ipcMain,dialog,Notification } = require('electron')
const md5 = require('md5')
const moment = require('moment')
const { authUSer,getTotal,getLogs } = require('../../model/modules/usuario')
   

module.exports = (knex,sqliteBuilder) => {
    ipcMain.on('get-loginLogs', async (event, id_usuario) => {
        try {
        
         
            const logs = (await getLogs(id_usuario))
         
            event.returnValue = logs
      
     
        } catch (error) {

            event.returnValue = []
            console.log(error)
            
        }
  
    })
    
    ipcMain.on('get-usuarioByIdfuncionario', async (event, id_funcionario) => {
        try {
        
            const f = (await knex.raw(`
            select 
                *,
                f.endereco as endereco, 
                f.municipio as municipio, 
                strftime('%Y', 'now') - strftime('%Y',f.nascimento) as idade,
                f.nome as nome from usuario u
                inner JOIN funcionario f on f.id_funcionario = u.id_funcionario
                inner JOIN empresa e on e.id_empresa = f.id_empresa
                WHERE f.id_funcionario = ${id_funcionario};`))[0]
           
            event.returnValue = f
      
     
        } catch (error) {

            event.returnValue = []
            console.log(error)
            
        }
  
    })
        ipcMain.on('try_Authenticate', async (event, credencial) => {
            try {
                
                
                const response = (await authUSer(credencial))


                event.sender.send('auth-response' , { response , msg: 'tudo ok' }) 

            } catch (error) {
                
                event.sender.send('auth-response' , { response: false , msg: error }) 
                
            }

    })


    ipcMain.on('update_user', async (event,{ funcionario, usuario }) => {
        try {

        // console.log(usuario)
        // console.log(funcionario)
        // usuario.senha = md5(usuario.senha)
        // funcionario.datacad = Date.now()
        // delete funcionario.id_funcionario && usuario.id_usuario
        const id_funcionario = (await knex('funcionario')
        .update(funcionario)
        .where('id_funcionario','=',funcionario.id_funcionario))[0]

        const id_usuario = (await knex('usuario')
        .update(usuario)
        .where('id_funcionario','=',funcionario.id_funcionario)
        .andWhere('id_usuario','=',usuario.id_usuario))[0]
        // // usuario.id_funcionario = id_funcionario
        
        return event.returnValue = true
         
     
        } catch (error) {
            event.returnValue = false
            console.log(error)
            
        }
  
    })

    ipcMain.on('getUserTotalByIdFuncionario', async (event,id_funcionario) => {
        try {

            const query = (await getTotal(id_funcionario))
            
        
            event.returnValue = { response: query , msg: 'query enviado' }
            
        } catch (error) {

            event.returnValue = ({ response: false , msg: error })

            console.log(error)
            
        }
  
    })


    ipcMain.on('get_userData', async (event,id_funcionario) => {
        try {
        const funcionario = (await knex('funcionario')
        .select(knex.raw(`*, date(nascimento) as nascimento`))
        .where('id_funcionario','=',id_funcionario))[0]
        const usuario = (await knex('usuario').select("*").where('id_funcionario','=',id_funcionario))[0]
        return event.returnValue = {funcionario, usuario}
    
        } catch (error) {
            event.returnValue = false
            console.log(error)
            
        }
  
    })

    ipcMain.on('get-UserEmpresa', async (event,id_funcionario) => {
        try {
        const empresa = (await sqliteBuilder(`
        SELECT *,
        e.nome as nome
        FROM funcionario f
        INNER JOIN empresa e ON e.id_empresa = f.id_empresa
        WHERE f.id_funcionario = ${id_funcionario};`))[0]
        event.returnValue = empresa 
    
        } catch (error) {
            event.returnValue = false
            console.log(error)
            
        }
  
    })

    ipcMain.on('sendAllUsuario', async (event, {id_empresa,role}) => {
        try {
        
        if(role == "admin"){
            const query = await knex('usuario')
            .select(knex.raw(`
                *,
                strftime('%Y', 'now') - strftime('%Y',f.nascimento) as idade,
                f.nome as nome from usuario u
                inner JOIN funcionario f on f.id_funcionario = u.id_funcionario
                inner JOIN empresa e on e.id_empresa = f.id_empresa
                WHERE f.id_empresa = ${id_empresa};
            `))
            event.returnValue = query
        } else {
            event.returnValue = []

        }
     
        } catch (error) {

            event.returnValue = []
            console.log(error)
            
        }
  
    })
    
    ipcMain.on('insert_NewUser', async (event,{ funcionario, usuario,id_empresa }) => {
        try {
        
        usuario.senha = md5(usuario.senha)
        funcionario.id_empresa = id_empresa
        funcionario.datacad = moment().format()
        const id_funcionario = (await knex('funcionario').insert(funcionario))[0]
        usuario.id_funcionario = id_funcionario
        const id_usuario = (await knex('usuario').insert(usuario))[0]
        
        return event.returnValue = true
         
     
        } catch (error) {
            event.returnValue = false
            console.log(error)
            
        }
  
    })

  

}
