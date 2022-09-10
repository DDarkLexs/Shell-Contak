const Connection = require('./connection')
let con = new Connection()
let knex = con.connect()
let sqliteBuilder = con.queryBuilderAllData
const { app } = require('electron')
const md5 = require('md5')


async function createUsuarioAdmin(id_empresa){
    //normalização
    try {
        
        const id_funcionario = (await knex("funcionario").insert({
            // id_funcionario:null,
            nome:"admin",
            sexo:"masculino",
            nascimento:new Date().toISOString(),
            telefone:"0000000000",
            datacad:new Date().toISOString(),
            id_empresa:id_empresa,
        }))[0]

        const id_usuario = (await knex("usuario").insert({
            // id_usuario:null,
            senha:md5('admin'),
            role:'admin',
            permissao:true,
            id_funcionario:id_funcionario,
    }))[0]

} catch (error) {
    
    console.log(error)
    app.exit(1)
}

}

async function createEmpresa(){

return new Promise(async (resolve,reject) => {
    try {
        
        const id_empresa = (await knex("empresa").insert({
            // id_empresa: null,
            nome: "Sem Nome",
            nif: "00000"
        }))[0]


        resolve(id_empresa)
    } catch (error) {
        console.log(error)
        reject(error)
        app.exit(1)
    }
})
}


module.exports = class prepareDatabase {


    

    normalize(){
        new Promise(async (resolve,reject) =>{
    
    
            try {
                
                const val = (await knex('empresa').count())[0]['count(*)']
                
                if(val <= 0){
                    const id_empresa = await createEmpresa()
                    await createUsuarioAdmin(id_empresa)
                    console.log("Novo usuario do sistema")
                }else{
                    console.log('Seja bem-vindo')
                }
            resolve(true)
            } catch (error) {

                console.log(error)	
                reject(error)
            }
            
        })
        }
        
    
}