const { app, ipcMain,dialog,Notification } = require('electron')
const { queryBuilderAllData , connect } =(new (require('../../../connection')))
const knex = connect()
const md5 = require('md5')
const moment = require('moment')
 
// const { default:knex } = require('knex')

module.exports = {

    getCompraTodoByIdEmpresa( id_empresa ){
        return new Promise(async (resolve,reject) => {

            
            try {
                // em desenvolvimento
                
                const query = (await knex.raw(`
                SELECT *,
                p.nome as nome,
                SUM((c.preco) - c.desconto) as investimento,
                SUM(c.qtd) as qtd,
                nc.datacad as registrado 
                from notaCompra nc
                INNER JOIN compra c ON c.id_notaCompra = nc.id_notaCompra
                INNER JOIN produto p ON p.id_produto = c.id_produto
                INNER JOIN funcionario f ON f.id_funcionario = nc.id_funcionario
                WHERE f.id_empresa = ${id_empresa}
                GROUP BY nc.id_notaCompra
                `))

                // console.log(query)
                resolve(query)

             } catch (error) {
                reject(error)
                
            }

        })
    },




}