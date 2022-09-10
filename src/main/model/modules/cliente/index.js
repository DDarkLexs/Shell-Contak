const { queryBuilderAllData , connect } =(new (require('../../../connection')))
const knex = connect()
// const { default: knex } = require('knex')
const { dialog } = require('electron')
let msgDelete = false

module.exports = {


    updateCliente( cliente ){
        return new Promise(async (resolve,reject) => {
            try {
                (await knex('cliente')
                .update(cliente)
                .where('id_cliente','=', cliente.id_cliente ))
                console.log(`cliente - ${cliente.id_cliente} [ATUALIZADO]`)
                
                
                resolve( true )
                
            } catch (error) {

                reject(error)
            
            }

        })
    },

    updateNotaDeVenda( notaVenda ){
        return new Promise(async (resolve,reject) => {
            try {


                (await knex('notaVenda')
                .update(notaVenda)
                .where('id_venda','=',notaVenda.id_venda))
                
                console.log(`notaVenda - ${notaVenda.id_venda} [ATUALIZADO]`)

                resolve( true )
                
            } catch (error) {

                reject(error)
            
            }

        })
    },

    justCliente( id_cliente ){
        return new Promise(async (resolve,reject) => {
            try {
                const value = (await knex('cliente')
                .select('*')
                .where('id_cliente','=',id_cliente))[0]
                // console.log(format)
                // console.log(value)
                if(!value) throw 'não foi possível enviar'
                
                resolve( value )

            } catch (error) {

                reject(error)
            
            }

        })
    },

    justNotaDeVenda( id_venda ){
        return new Promise(async (resolve,reject) => {
            try {
                const value = (await knex('notaVenda')
                .select('*')
                .where('id_venda','=', id_venda))[0]
                // console.log(format)
                // console.log(value)
                value.pago = Boolean(value.pago)
                if(!value) throw 'não foi possível enviar a nota de venda'
                
                resolve( value )

            } catch (error) {

                reject(error)
            
            }

        })
    },

    clienteProfile( id_cliente ){
        return new Promise(async (resolve,reject) => {
            try {
                const value = (await queryBuilderAllData(`
                select *,
                c.nome nome,
                e.nif as nifEmpresa,
                e.nome as nomeEmpresa,
                f.nome as operador,
                v.desconto as desconto,
                nv.datacad as registrado,
                ((p.preco * p.unidade) * p.iva) as precoReal,
                SUM((((p.preco * p.unidade) * v.qtd ) - p.desconto) * p.iva) as total
                from cliente c
                INNER JOIN notaVenda nv ON nv.id_cliente = c.id_cliente
                INNER JOIN funcionario f ON f.id_funcionario = nv.id_funcionario
                INNER JOIN empresa e ON e.id_empresa = f.id_empresa
                INNER JOIN venda v on v.id_venda = nv.id_venda
                INNER JOIN produto p on p.id_produto = v.id_produto
                WHERE c.id_cliente = ${ id_cliente }
                GROUP BY c.id_cliente;
                
                `))[0]
                
                // console.log(format)
                // console.log(value)
                if(!value) throw 'não foi possível enviar'
                
                resolve( value )

            } catch (error) {

                reject(error)
            
            }

        })
    },

    clienteItem( id_cliente ){
        return new Promise(async (resolve,reject) => {
            try {
            
                const value = (await queryBuilderAllData(`
                select *,
                p.nome nome,
                c.nome clienteNome,
                e.nif as nifEmpresa,
                cat.nome as cnome,
                e.nome as nomeEmpresa,
                f.nome as operador,
                v.desconto as desconto,
                nv.datacad as registrado,
                ((p.preco * p.unidade) * p.iva) as precoReal,
                SUM(((p.preco * p.unidade) - p.desconto) * p.iva) as total
                from cliente c
                INNER JOIN notaVenda nv ON nv.id_cliente = c.id_cliente
                INNER JOIN funcionario f ON f.id_funcionario = nv.id_funcionario
                INNER JOIN empresa e ON e.id_empresa = f.id_empresa
                INNER JOIN venda v on v.id_venda = nv.id_venda
                INNER JOIN produto p on p.id_produto = v.id_produto
                INNER JOIN categoria cat ON cat.id_categoria = p.categoria
                WHERE c.id_cliente = ${id_cliente}
				GROUP BY v.id_itemVenda;
               `))

 
                if(!value) throw 'não foi possível enviar'
                resolve( value )

            } catch (error) {

                // console.log(error)
                reject(error)
            
            }

        })
    },

    deleteClienteItem( id_itemVenda ){

        return new Promise(async (resolve,reject) => {
            try {
                if(!msgDelete){
                    
                    dialog.showMessageBox(null,{
                        message:`Deseja apagar a este item?`,
                        detail: `isto afetará os detalhe  da venda!`,
                        title:`Aviso`,
                        type:'warning',
                        buttons:['yes','no']    
                    }).then(async ({checkboxChecked , response}) =>{
                    try {
                        
                        msgDelete = checkboxChecked

                        if(!response){
        
                            (await knex('venda')
                            .delete('*')
                            .where('id_itemVenda','=', id_itemVenda))
                            
        
                            resolve(true)
                        } else {
                            
                            reject('cancelado') 
        
                        }
        
                    } catch (error) {
                        reject(error)
                        // console.log(error)    
                    }
                    })
    
                } else {
                    
                    (await knex('venda')
                    .delete('*')
                    .where('id_itemVenda','=', id_itemVenda))
                    resolve(true) 
    
                }
                
            
            } catch (error) {
                
                
                reject(error)
            
            }

        })
    },




}