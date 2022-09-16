const { getUserData,isUserLoggedIn } = require('../auth/utils')
let router
const initPath = 'registro'

 
const routes = [
    {  
        path: '*',
        redirect:{ name:initPath },
    },
 
    {  
    name:'home',
    path: `/home`,
    component: require('../views/pages/home'),
    meta: { requiresAuth: true, adminOnly:false },
     beforeEnter: (to, from, next) => {

      
      if(getUserData().role == 'user'){
        next({ name: 'simple-home' })
        
      }else {
        
        next()
      }
      //return false
      },
    },

    {  
    name:'contagem',
    path: `/contagem`,
    component: require('../views/pages/contagem'),
    meta: { requiresAuth: true, adminOnly:false }
    },
    {  
    name:'registro',
    path: `/registro`,
    component: require('../views/pages/registro'),
    meta: { requiresAuth: true, adminOnly:false }
    },

    {  
    name:'simple-home',
    path: `/home/simple`,
    component: require('../views/pages/home/homeSimple'),
    meta: { requiresAuth: true, adminOnly:false }
    },

    {  
    name:'perfil usuario',
    path: `/singular/usuario`,
    component: require('../views/pages/usuario/singular'),
    meta: { requiresAuth: true, adminOnly:false }
    },
 
    {  
      name:'usuário',
      path: `/usuarios`,
      component: require('../views/pages/usuario'),
      meta: { requiresAuth: true, adminOnly:true },
    },

    {  
      name:'editar-usuario',
      path: `/clientes/editar/:id_funcionario`,
      component: require('../views/pages/usuario/editar'),
      meta: { requiresAuth: true, adminOnly:true }
    },

      {
       name:'registro',
       path: `/usuarios/registro`,
       meta: { requiresAuth: true, adminOnly:true },
      component: require('../views/pages/usuario/registro'),
      },
    
      {
        name:'entrada',
        path: `/entrada`,
        component: require('../views/pages/authentication/entrada.js'),
        meta: { requiresAuth: false, adminOnly:false }
      },

]



module.exports = router = new VueRouter({
  scrollBehavior() {
    return { 
      x: 0, 
      y: 0,
      behavior: 'smooth',
     }
  },
  routes,
  mode: 'history',
})


router.beforeEach((to, from, next) => {
  let user = getUserData() || { role : null }
  const needAuth = (to.matched.some(record => record.meta.requiresAuth))
  const adminOnly = (to.matched.some(record => record.meta.adminOnly))

  if(adminOnly){
    
    if(user.role == 'admin' || false){
    
      next()

    } else {

      next({name:from.name})

    }
  
  }
   
  if (needAuth) {

    if (isUserLoggedIn()) {
      
      next({name:'entrada'})
    } else {
      next()
    }

  } else {
    next() // make sure to always call next()!
  }
})


router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})
