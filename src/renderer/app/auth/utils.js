const md5 = require("md5")

const nome = 'userData'
const token = 'userToken'

module.exports = userDataFunction = {
  
  isUserLoggedIn(){
    // localStorage.getItem(token)
    if(checkUserToken()){
      return false
    } else {
      return true

    }

    },
    getUserData() { 
      return JSON.parse(localStorage.getItem(nome)) || null
    },
    setData(item){
      localStorage.setItem(token, md5(JSON.stringify(item)))
      localStorage.setItem(nome,JSON.stringify(item))
    },

    clearData() { 
      localStorage.clear(token)
      return localStorage.clear(nome)
    },

    getUserToken(){
      return localStorage.getItem(token)
      
    }


}


function checkUserToken(){
  let $token0 = md5(localStorage.getItem(nome) || {})
  let $token1 = localStorage.getItem(token) || 'noUserData'
 
  // console.log($token0)
  // console.log($token1)

  // console.warn($token0 == $token1)

  return $token0 == $token1
  
}

  

//   /**
//    * This function is used for demo purpose route navigation
//    * In real app you won't need this function because your app will navigate to same route for each users regardless of ability
//    * Please note role field is just for showing purpose it's not used by anything in frontend
//    * We are checking role just for ease
//    * NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
//    * @param {String} userRole Role of user
//    */
// module.exports = getHomeRouteForLoggedInUser = userRole => {
//     if (userRole === 'admin') return '/'
//     if (userRole === 'client') return { name: 'access-control' }
//     return { name: 'auth-login' }
//   }
  