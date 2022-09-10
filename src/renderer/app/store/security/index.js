const { ipcRenderer } = require("electron");
const { getUserData,isUserLoggedIn,setData,getUserToken } = require('../../auth/utils')

module.exports = ({
  namespaced: true,
  state: {
    example:0

  },

  getters: {

    
    example:({ example }) => {
      return example
    }
     

  },
  mutations: {
    example (state, value){
      
    },
 

  },
actions: {

 


  checkUserTokenInDatabase({ commit,state,getters }){
    return new Promise((resolve,reject) => {
      try {
       const { id_usuario } = getUserData() || null

        ipcRenderer.send('getUserTK', id_usuario)
      
        ipcRenderer.on('sendSecurityAuth', (event, {response , msg, hash }) =>{
          
          // console.log(hash)
          // console.log(getUserToken())
          if(!response) reject({ msg, response })

         if(!(hash == getUserToken())) reject({ msg:'O hash não é igual', response:false })
 

            resolve({ response, msg:'ok' })

          })

      } catch (error) {

        reject({ response:false, msg:error }) 
      }
    })
   }

  },
})
