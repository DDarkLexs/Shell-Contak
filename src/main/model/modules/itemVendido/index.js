const { app, ipcMain,dialog,Notification } = require('electron')
const { queryBuilderAllData , connect } =(new (require('../../../connection')))
const knex = connect()
const md5 = require('md5')
const moment = require('moment')
// const { default:knex } = require('knex')

module.exports = {


    assignCompraToItemVendidoByIdProduto(id_produto){
        return new Promise(async (resolve,reject) => {

            try {
            let result = (await knex.raw(`
            SELECT
            SUM((c.preco) - c.desconto) as compra,
            nc.datacad as registrado 
            from notaCompra nc
            INNER JOIN compra c ON c.id_notaCompra = nc.id_notaCompra
            INNER JOIN produto p ON p.id_produto = c.id_produto
            INNER JOIN funcionario f ON f.id_funcionario = nc.id_funcionario
            WHERE p.id_produto = ${id_produto}
            GROUP BY p.id_produto;`))[0]
     
            if(!result) throw 'não há nenhum query'

            resolve(result)

             } catch (error) {

                console.log(error)
                reject(error)
                
            }

        })
    },
    getAllItemVendido(id_empresa){
        return new Promise(async (resolve,reject) => {

            try {
            let result = (await knex.raw(`
            SELECT 
                p.id_produto,
                p.nome as nome,
                SUM(((v.preco * v.qtd) - v.desconto) * p.iva) as total,
                SUM(v.qtd) as qtd,
                COUNT(nv.id_venda) totalOmitido,
                max(nv.data) as ultimavenda
            FROM notaVenda nv
                INNER JOIN venda v on v.id_venda = nv.id_venda
                INNER JOIN produto p on p.id_produto = v.id_produto
                INNER JOIN funcionario f ON f.id_funcionario = nv.id_funcionario 
            WHERE f.id_empresa = ${id_empresa}
            GROUP BY p.id_produto;`))

            if(!result) throw 'não há nenhum query'

            resolve(result)

             } catch (error) {

                console.log(error)
                reject(error)
                
            }

        })
    },




}