const electron = require("electron");
const ipc = electron.ipcRenderer;
const { getUserData,isUserLoggedIn,setData } = require('../../auth/utils')
var form = require('../../@core/forms/usuario');
const { default: axios } = require("axios");
const { $usuario,funcionario } = new form()
const moment = require('moment')

module.exports = ({
  namespaced: true,
  state: {
    usuario:getUserData() || null,
    entrada:{  
      nome:"",
      senha:"",
    },
    empresa:{},
    $usuario,
    funcionario,
    loading:false,
    status:{
      maxAmount:0,

    }
  },

  getters: {
    loadingState:({ loading }) => {
      return loading
    },
    loja:( state ) => {
   
      return state.empresa || null
    },
    userSatus:({ status }) => {
      return status
    },
    entradaData:( state ) => {
      return state.entrada || null
    },
    usuarioAPI:( state ) => {
      return state.usuario || null
    }
  },
  mutations: {
    UODATE_USER_BALANCE(state, data){
      
      Object.assign(state.status, data)
    },

    UPDATE_FORM_DATA(state, { 
      LAST_NAME, 
      FIRST_NAME , 
      GENDER_NAME,
      BIRTH_DATE,
      MARITAL_STATUS_NAME,
      BIRTH_MUNICIPALITY_NAME,
      BIRTH_PROVINCE_NAME,
      RESIDENCE_MUNICIPALITY_NAME,
      RESIDENCE_NEIGHBOR,
      RESIDENCE_ADDRESS
    }){
      
      Object.assign(state.funcionario, {
          nome: String(FIRST_NAME +' '+ LAST_NAME).toLowerCase(),
          sexo:String(GENDER_NAME).toLowerCase(),
          nascimento:moment(BIRTH_DATE).format().split('T')[0],
          estadoCivil:MARITAL_STATUS_NAME,
          natural:String(BIRTH_MUNICIPALITY_NAME).toLowerCase(),
          provincia_origem:String(BIRTH_PROVINCE_NAME).toLowerCase(),
          municipio:String(RESIDENCE_MUNICIPALITY_NAME).toLowerCase(),
          residencia:String(RESIDENCE_NEIGHBOR).toLowerCase(),
          endereco:String(RESIDENCE_ADDRESS).toLowerCase()

        })

    },
    COMMIT_LOADING_STATE(state, response){

      state.loading = response
    },
    updateUsuario(state, payload){
        state.usuario = payload
    },
    updateEmpresa(state, query){

      state.empresa = query
      console.log(state.empresa)
    },
    updateRegister(state, payload){
      state.$usuario = new form().$usuario
      state.funcionario = new form().funcionario
    },
   },
  actions: {
    async getid({state, commit, dispatch}, identidade){
      return new Promise(async (resolve,reject) =>{
        try {
        commit('COMMIT_LOADING_STATE', true)
        const query = (await axios
          .get('https://api.gov.ao/consultarBI/v2',
          {params:{ bi:identidade } })).data[0]
          
          if(!query || query == 'M') throw 'não foi possível receber dos dados do BI'
          console.log(query)

          commit('UPDATE_FORM_DATA', query)

          commit('COMMIT_LOADING_STATE', false)

          resolve(query)
        } catch (error) {
          
          commit('COMMIT_LOADING_STATE', false)
          reject(error)
          
        }



      })

    },
    
    async authenticate({state, commit, dispatch}, credencial){
      commit('COMMIT_LOADING_STATE', true)

      return new Promise(async (resolve,reject) => {
        try {
           
          (ipc.send('try_Authenticate', credencial))

          ipc.on('auth-response', async (event ,{ response , msg }) => {

            setTimeout(async () => {
              try {

                if(!response) throw msg

  
                dispatch('setToken', response)
                resolve(response)
                
                commit('COMMIT_LOADING_STATE', false)
              } catch (error) {
                setTimeout(() => {
                  
                  
                  commit('COMMIT_LOADING_STATE', false)
                  reject(error)
                  
                }, 100);
              } 
            }, 500);
          })


        } catch (error) {
          
          commit('COMMIT_LOADING_STATE', false)
          reject(error)
          
        }
      })

    },
    async resetRegisterPropreties({state, commit}){
      try {
       
        commit('updateRegister')
          
           
      } catch (error) {
          console.log(error)   
      }

  },
    async setToken({state, commit}, data){
        try {
            
            setData(data)
            commit('updateUsuario', data)
            
        } catch (error) {
            console.log(error)   
        }

    },

    async getUsuarioEmpresa({state, commit}){
        try {
          
            const query = ipc.sendSync('get-UserEmpresa', state.usuario.id_funcionario)
            commit('updateEmpresa', query)

        } catch (error) {

            console.log(error)   
        }

    },

    async getUserTotal({state, commit}){
        try {
          const { id_funcionario } = getUserData()
          console.log(id_funcionario)
         const { response,msg } = (ipc.sendSync('getUserTotalByIdFuncionario', id_funcionario))
          
         if(!response) throw msg

         commit('UODATE_USER_BALANCE', response)
          

      
        } catch (error) {

            console.log(error)   
        }

    }


  },
})
