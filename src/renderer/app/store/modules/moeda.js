const electron = require("electron");
const ipc = electron.ipcRenderer;
const { getUserData,isUserLoggedIn,setData } = require('../../auth/utils')
const { coins } = new (require('../../assets/data/forms'))

module.exports = ({
  namespaced: true,
  state: {
    coins
  },

  getters: {
    multiplicado:({ coins }) => {

      const array = Object.getOwnPropertyNames(coins)
      var sum = 0
      var multiplicado = 0
      // console.log(Object.values(coins))
      for (const i in Object.values(coins)) {
        const constante = Number(array[i].slice(1))
        const value = Object.values(coins)[i]

        multiplicado += (Number(value) * constante) 
     
        
      }
     
      
      return multiplicado
    },
    sumAll:({ coins }) => {

      const array = Object.getOwnPropertyNames(coins)
      var sum = 0
      var multiplicado = 0
      // console.log(Object.values(coins))
      for (const i in Object.values(coins)) {
        const constante = Number(array[i].slice(1))
        const value = Object.values(coins)[i]

      
        sum += Number(value)
        
      }
      
      return sum 
    },

    properties:({ coins }) => {

      
      return (Object.getOwnPropertyNames(coins))
      .slice(0,10)
    }

    
  },
  mutations: {
    COMMIT_COINS(state){
      const v = new (require('../../assets/data/forms'))


      
      Object.assign(state.coins, v.coins)

    }

  },
actions: {
  cleanForms({ commit }){
      try {
        
        commit('COMMIT_COINS')

      } catch (error) {
        

      }

  }

},
})



