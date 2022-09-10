const { app, ipcMain,dialog,Notification } = require('electron')
const { queryBuilderAllData , connect } =(new (require('../../../connection')))
const knex = connect()
const md5 = require('md5')
const moment = require('moment')

// const { default:knex } = require('knex')

module.exports = {
    getLogs( id_usuario ){
        return new Promise(async (resolve,reject) => {

            
            try {
      
                const logs = (await knex.raw(`
                select  
                *,
                s.data as data
    
                from sessao_log s
                    INNER JOIN usuario u ON u.id_usuario = s.id_usuario
                    INNER JOIN funcionario f ON f.id_funcionario = u.id_funcionario
                    
                    WHERE f.id_funcionario = ${id_usuario};`))
    
             
                
                if(!logs) throw 'sem logs'
                
                resolve( logs )

            } catch (error) {
                reject(error)
                
            }

        })
    },

    authUSer( credencial ){
        return new Promise(async (resolve,reject) => {

            
            try {
            let { nome, senha } = credencial
            senha = md5(senha)

            let result = knex.select(knex.raw(`
            nome as 
            nome,
            id_usuario,
            role,
            permissao,
            f.id_funcionario,
            id_empresa
            
            `)).from("usuario")
            .innerJoin(knex.raw("funcionario f on f.id_funcionario = usuario.id_funcionario"))
            .where('nome','=',nome)
            .andWhere("senha" ,'=', senha)
            .then(async (result) => {

                
                

            // console.log(result)
            if (Number(result.length) === 0) {
                
                reject('A palavra-passe ou nome do usuário está errado!')
                
            }else if(!result[0].permissao){ 
                
                dialog.showMessageBoxSync(null,{
                    title:'Empedido de iniciar sessão!',
                    detail:'esta conta não tem permissão de iniciar a sessão neste sistema.',
                    message:'Não foi possível iniciar a sessão!',
                    // icon:'custom',
                    type:'error',
                    // buttons:['concordo']
                })
                
                reject('Não tem permissão de ter acesso ao sistema!')
            
            } else {
                try {
                    
                    const session = result[0]
                     console.log(md5(JSON.stringify(session)))
                    const update = await (knex('usuario')
                    .update({ last_session:moment().format() })
                    .where('id_usuario', '=', session.id_usuario))
                    
                    resolve(session)
                    
                } catch (error) {
                    reject(error)
                    
                }
            }
        
        })     
        
            } catch (error) {
                reject(error)
                
            }

        })
    },

    getTotal( id_funcionario ){
        return new Promise(async (resolve,reject) => {

            
            try {
      
                const value = (await knex.raw(`
                SELECT 
                SUM(((v.preco * v.qtd) - v.desconto) * p.iva) as maxAmount,
                SUM(v.qtd) as qtd,
                COUNT(nv.id_venda) totalOmitido,
                max(nv.data) as ultimavenda
                 FROM notaVenda nv
                INNER JOIN venda v on v.id_venda = nv.id_venda
                INNER JOIN produto p on p.id_produto = v.id_produto
                INNER JOIN funcionario f ON f.id_funcionario = nv.id_funcionario 
                WHERE f.id_funcionario =  ${id_funcionario} 
                and strftime('%Y/%m/%d %W', nv.data) = strftime('%Y/%m/%d %W', 'now') 
                GROUP BY f.id_funcionario;
                `))[0]
                
                if(!value) throw 'sem venda total'
                
                resolve( value )

            } catch (error) {
                reject(error)
                
            }

        })
    },





}