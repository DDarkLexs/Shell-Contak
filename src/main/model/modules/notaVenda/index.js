const { app, ipcMain,dialog,Notification } = require('electron')
const { queryBuilderAllData , connect } =(new (require('../../../connection')))
const knex = connect()
const md5 = require('md5')
const moment = require('moment')
// const { default:knex } = require('knex')

module.exports = {


    getNotasDeVendasByIdEmpresa( { id_empresa , pago , typeDate } ){
        return new Promise(async (resolve,reject) => {

            try {
            let result = (await knex.raw(`
            SELECT 
            SUM(((v.preco * v.qtd) - v.desconto) * p.iva) as total,
            SUM(v.qtd) as qtdTotal,
            count(c.id_cliente) as clienteTotal,
			MIN(nv.data) as primeiraVenda,
			MAX(nv.data) as utlmaVenda,
            strftime('%Y-%m-%d', nv.data) as dataVenda
            FROM empresa e
            INNER JOIN funcionario f ON f.id_empresa = e.id_empresa
            INNER JOIN notaVenda nv ON nv.id_funcionario = f.id_funcionario
            INNER JOIN venda v ON v.id_venda = nv.id_venda
            INNER JOIN produto p ON v.id_produto = p.id_produto
            INNER JOIN cliente c ON c.id_cliente = nv.id_cliente
            WHERE e.id_empresa = ${id_empresa}
            and nv.pago = ${pago}
            GROUP BY strftime('${typeDate}', nv.data);
            `))

            if(!result) throw 'não há nenhum query'
            resolve(result)
             } catch (error) {

                console.log(error)
                reject(error)
                
            }

        })
    },

    exportFileToSaft( { id_empresa , pago , typeDate } ){
        return new Promise(async (resolve,reject) => {

            try {
    

            } catch (error) {

                console.log(error)
                reject(error)
                
            }

        })
    },




}