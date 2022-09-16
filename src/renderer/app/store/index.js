const electron = require("electron");
const ipc = electron.ipcRenderer;
const productName = ipc.sendSync("getAppName")
const usuario = require('./modules/usuario')
const funcionario = require('./modules/funcionario')
const listaUsuario = require('./modules/listaUsuario')
const moeda = require('./modules/moeda')
const security = require('./security')



module.exports = new Vuex.Store({

    state:{
        nome:productName,
    },
    getters:{
        productName:(state) => {
            return state.nome
        }
    },
    mutations:{
  
    },
    actions:{

    },
    modules:{
        security,
        usuario,
        funcionario,
        listaUsuario,
        moeda
 
    }



 
})
  
