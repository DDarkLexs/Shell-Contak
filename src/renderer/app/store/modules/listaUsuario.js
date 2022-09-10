const electron = require("electron");
const ipc = electron.ipcRenderer;
const { getUserData,isUserLoggedIn,setData } = require('../../auth/utils')

module.exports = ({
  namespaced: true,
  state: {
      lista:[]

  },

  getters: {
    queryData:({ lista }) => {
        return lista
    }

  },
  mutations: {
    updateList(state, payload){
        state.lista = payload
    },
},
actions: {
    getusersByIdEmpresa({ state,getters,commit }, usuario){
        const query = ipc.sendSync('sendAllUsuario', usuario)
        commit('updateList', query)
    },
  },
})
