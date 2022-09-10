const { app, ipcMain,dialog,Notification } = require('electron')
const { queryBuilderAllData , connect } =(new (require('../../../connection')))
const knex = connect()
const md5 = require('md5')
const moment = require('moment')
// const { default:knex } = require('knex')

module.exports = {


    totalVendido( id_produto ){
        return new Promise(async (resolve,reject) => {

            try {
            
            const { vendido } = (await knex.raw(` 
            select *,
            CASE WHEN SUM(v.qtd) IS NULL
            THEN 0
            ELSE SUM(v.qtd)
            END AS vendido
            from  produto p
            left JOIN venda v on p.id_produto = v.id_produto
            WHERE p.id_produto = ${id_produto}
            GROUP by p.id_produto;
            `))[0]

            resolve(vendido)
             } catch (error) {

                console.log(error)
                reject(error)
                
            }

        })
    },
    totalComprado( id_produto ){
        return new Promise(async (resolve,reject) => {

            try {
                const { comprado } = (await knex.raw(` 
                select *,
                CASE WHEN SUM(c.qtd) IS NULL
                THEN 0
                ELSE SUM(c.qtd)
                END AS comprado
                from  produto p
                left JOIN compra c on p.id_produto = c.id_produto
                WHERE p.id_produto = ${id_produto}
                GROUP by p.id_produto;
                `))[0]

          //  if(!result) throw 'não há nenhum query'
            resolve(comprado)
             } catch (error) {

                console.log(error)
                reject(error)
                
            }

        })
    },






}