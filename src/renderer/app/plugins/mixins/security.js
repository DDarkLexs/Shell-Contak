const { getUserData,isUserLoggedIn,setData,clearData } = require('../../auth/utils')
const { mapActions, mapGetters } = Vuex


module.exports = {

    created() {
        
    },
    methods: {
        ...mapActions({
            checkToken:'security/checkUserTokenInDatabase'    
        })
        
    },
    async beforeUpdate(event) {
        try {
            if(this.$route.name != 'entrada'){
                
               let { response, msg } = (await this.checkToken())
                if(!response) throw msg
            }
            
            if((this.isUserLoggedIn()) && (this.$route.name != 'entrada') ){                 
            

            throw `Foi feita uma análise ao seu token da sua sessão,
                e foi feita uma conclusão foi alterado, por favor inicie a sessão novamente`
            }
            
        } catch (error) {
            
            clearData()
            this.$router.push({ name: 'entrada' })
            this.$vs.notification({
                color:this.$vuetify.theme.themes.light.danger,
                title: `O seu token não é válido!`,
                duration:5000,
                text:error.msg 
                // `Foi feita uma análise ao seu token da sua sessão,
                // e foi feita uma conclusão foi alterado, por favor inicie a sessão novamente`
            })
            
        }
       

    },



}