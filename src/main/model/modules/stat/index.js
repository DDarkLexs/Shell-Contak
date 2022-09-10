const { connect } =(new (require('../../../connection')))

const knex = connect()

module.exports = {

    totalBycategoria(id_empresa){
        return new Promise(async (resolve,reject) => {
            try {
                const value = (await knex.raw(`
                SELECT 	
                p.id_produto,
                c.nome,
                    SUM((((p.preco * p.unidade) * v.qtd) - (v.desconto)) * p.iva) as totalVendido
                FROM notaVenda nv
                INNER JOIN venda v ON v.id_venda = nv.id_venda
                INNER JOIN produto p ON p.id_produto = v.id_produto
                INNER JOIN categoria c ON c.id_categoria = p.categoria
                INNER JOIN funcionario f ON f.id_funcionario = nv.id_funcionario
                WHERE f.id_empresa = ${id_empresa}
                AND nv.pago = true
                GROUP BY c.id_categoria;`))

                if(!value) throw 'não foi possível enviar'
                
                resolve( value )

            } catch (error) {

                reject(error)
            
            }

        })
    },


    totalByWeekDayByEmpresaId(id_empresa){
        return new Promise(async (resolve,reject) => {
            try {
                const value = (await knex.raw(`
                select 
            -- sum((v.preco * v.qtd) - v.desconto) as total,
	        -- SUM(((v.preco * v.qtd) - v.desconto) * p.iva) as total,
            CASE WHEN SUM(((v.preco * v.qtd) - v.desconto) * p.iva) IS NULL
			THEN 0
			ELSE SUM(((v.preco * v.qtd) - v.desconto) * p.iva)
			END AS total,
            strftime('%Y/%m/%d', nv.data) as vencimento
            from cliente c
            INNER JOIN notaVenda nv ON nv.id_cliente = c.id_cliente
			LEFT JOIN funcionario f ON f.id_funcionario = nv.id_funcionario
			LEFT JOIN empresa e ON e.id_empresa = f.id_empresa
            LEFT JOIN venda v on v.id_venda = nv.id_venda
            LEFT JOIN produto p on p.id_produto = v.id_produto
			WHERE e.id_empresa = ${id_empresa} AND 
            strftime('%Y/%m %W', nv.data) = strftime('%Y/%m %W', 'now')
            AND nv.pago = true
			GROUP BY strftime('%Y/%m/%d', nv.data);`))
                
                // console.log(format)
                // console.log(value)
                if(!value) throw 'não foi possível enviar'
                
                resolve( value )

            } catch (error) {

                reject(error)
            
            }

        })
    },



    qtdVendidoNowQuery(format, id_empresa){
        return new Promise(async (resolve,reject) => {
            try {
                const value = (await knex.raw(`
                SELECT 	
                c.id_cliente,
                c.nome,
                SUM(v.qtd) as value
                FROM notaVenda nv
                LEFT JOIN funcionario f ON f.id_funcionario = nv.id_funcionario
               INNER JOIN venda v ON v.id_venda = nv.id_venda
               INNER JOIN cliente c ON nv.id_cliente = c.id_cliente
                WHERE f.id_empresa = ${id_empresa} 
                AND nv.pago = true
                AND strftime('${format}', nv.data) = strftime('${format}', 'now')
                GROUP BY c.id_cliente AND strftime('${format}', nv.data);`))[0]
                
                // console.log(format)
                // console.log(value)
                if(!value) throw 'não foi possível enviar'
                
                resolve( value )

            } catch (error) {

                reject(error)
            
            }

        })
    },

    investimentoNowQuery(format, id_empresa){
        return new Promise(async (resolve,reject) => {
            try {
            
                const value = (await knex.raw(`
                SELECT  
                p.id_produto as id_produto,
                p.nome as nome,
                SUM(c.preco) as value,
                SUM((((p.preco * p.unidade) * c.qtd) - (c.desconto)) * p.iva) as ganhoTotalPrevisto
                    FROM notaCompra nc
                    INNER JOIN compra c ON c.id_notaCompra = nc.id_notaCompra
                    INNER JOIN produto p ON p.id_produto = c.id_produto
                    INNER JOIN funcionario f ON f.id_funcionario = nc.id_funcionario
                    WHERE f.id_empresa = ${id_empresa}
                    AND nc.pago = true
					AND strftime('${format}', nc.vencimento) = strftime('${format}' , 'now')                
                    GROUP BY f.id_empresa AND strftime('${format}', nc.vencimento);
                `))[0]

 
                if(!value) throw 'não foi possível enviar'
                resolve( value )

            } catch (error) {

                // console.log(error)
                reject(error)
            
            }

        })
    },
    vendaTotalNowQuery(format, id_empresa){
        return new Promise(async (resolve,reject) => {
            try {

             
                const value = (await knex.raw(`
                
                SELECT
            'Entrada da semana' as label,
            SUM(v.qtd) as qtd_Vendido_Semana,
            SUM((((p.preco * p.unidade) * v.qtd) - (v.desconto)) * p.iva) as value
            FROM notaVenda nv
            INNER JOIN venda v ON v.id_venda = nv.id_venda
            INNER JOIN produto p ON p.id_produto = v.id_produto
            INNER JOIN funcionario f ON f.id_funcionario = nv.id_funcionario
            WHERE f.id_empresa = ${id_empresa} 
            AND nv.pago = true
            AND strftime('${format}', nv.data) = strftime('${format}', 'now')
            GROUP BY f.id_empresa AND strftime('${format}', nv.data);
                `))[0]
                if(!value) throw 'não foi possível enviar'
                resolve( value )

            } catch (error) {

                reject(error)
            
            }

        })
    },
    clienteTotalNowQuery(format, id_empresa){
        return new Promise(async (resolve,reject) => {
            try {
            
               const value = (await knex.raw(`
               SELECT 	
               c.id_cliente,
               c.nome,
               count(c.id_cliente) as value
               FROM notaVenda nv
               LEFT JOIN funcionario f ON f.id_funcionario = nv.id_funcionario
               INNER JOIN cliente c ON nv.id_cliente = c.id_cliente
               WHERE f.id_empresa = ${id_empresa}
               AND nv.pago = true
               AND strftime('${format}', nv.data) = strftime('${format}' , 'now')                
               GROUP BY c.id_cliente AND strftime('${format}', nv.data);
               
               `))[0]
               if(!value) throw 'não foi possível enviar'
                resolve( value )
            } catch (error) {

                reject(error)
            
            }

        })
    }




}