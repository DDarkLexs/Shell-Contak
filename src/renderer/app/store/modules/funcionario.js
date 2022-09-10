const electron = require("electron");
const ipc = electron.ipcRenderer;
const { getUserData,isUserLoggedIn,setData } = require('../../auth/utils')
const { compra,fornecedor,notaCompra,produto } = new (require('../../@core/forms/produto'))
module.exports = ({
  namespaced: true,
  state: {
    funcionario:{},
    loginLog: []
  },

  getters: {
    logs:({ loginLog }) => {

      return loginLog
    },
    f:(state) => {

      return state.funcionario
    }
  

  },
  mutations: {
    UPDATE_SINGLE_LOGINLOG(state, query){
      
      state.loginLog = query 
    },
    UPDATE_SINGLE_FUNCIONARIO(state, query){
      
      Object.assign(state.funcionario, query) 
    }

  
  },
  actions: {
    async getAll({ dispatch }, id_funcionario){
      try {
        const { id_usuario } = await dispatch('getFuncionarioById', id_funcionario)
          await dispatch('getLoginLogs', id_usuario)
          
        } catch (error) {
          
          reject(error)
        
        }
      },
      async getLoginLogs({state, commit}, id_funcionario){
        return new Promise(async (resolve, reject) => {
          try {
            
            const query = ipc.sendSync('get-loginLogs', id_funcionario)
            commit('UPDATE_SINGLE_LOGINLOG', query)
            
      } catch (error) {
        reject(error)
        console.log(error)   
      }
    })  

  },
    async getFuncionarioById({state, commit}, id_funcionario){
      return new Promise((resolve, reject) => {


        try {
          
          const query = ipc.sendSync('get-usuarioByIdfuncionario', id_funcionario)
          commit('UPDATE_SINGLE_FUNCIONARIO', query)
          resolve(query)
          
        } catch (error) {
          reject(error)  
          console.log(error)   
        }
        
      })
  },


  },
})
