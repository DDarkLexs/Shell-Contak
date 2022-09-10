const { getUserData,isUserLoggedIn,setData,clearData } = require('../../auth/utils')
const { mapActions, mapGetters } = Vuex

module.exports = {
    data() {
        return {
            l:true,
        }
    },
    created() {
        
    },
    computed: {
        avatar:function(){
            return this.$root.dirname + '/assets/media/profile/user.png' //$vuetify.theme.dark
        },
        darkMode:function(){
            return this.$vuetify.theme.dark
        },
    }, 
    watch: {
        darkMode(after,before){
          //  const theme = this.$vs.toggleTheme()
            this.$vs.notification({
                // color:this.$vuetify.theme.themes.light.danger,
                title: `${theme}`,
                // text: `Aguarde...`
              })
            if(after){

                // this.$vuetify.theme.dark = true
        
            }


        },


    $route(to,from){
        
        this.openLoading(800)
        
    }
},  
    methods: {
        logout(){
            try {
                clearData()
                this.$router.push({name: 'entrada' })
                this.$vs.notification({
                    color:this.$vuetify.theme.themes.light.primary,
                    title: `Terminaste a sessão!`,
                    text: `Aguarde...`
                  })
                } catch (error) {
                    
                }
                
            },
        isUserLoggedIn,
        navRole(adminOnly){
            if(this.usuario.role === 'admin'){ 
            
                return true
            } else {

                if (!adminOnly) {
                    
                    return true
                } else {
                    
                    return false
                }


            }
             
         },
        openLoading(seg) {
            const loading = this.$vs.loading({
              type: 'points' || 'scale' || 'waves',
              text: 'Carregando...',
              background: '#252526',
              color: '#fff'
            })
            setTimeout(() => {
              loading.close()
            }, seg)
        },

        ...mapActions({
            checkToken:'security/checkUserTokenInDatabase'    
        })
        
    },
    mounted() {
        this.openLoading(2000)
    },

    async beforeUpdate(event) {

     },



}