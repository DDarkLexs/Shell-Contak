const electron = require("electron");
const ipc = electron.ipcRenderer;
const { getUserData,isUserLoggedIn,setData } = require('../auth/utils')

module.exports = `
<v-app>   
<v-app-bar  flat  background-color="transparent" color="transparent" app>
  <v-toolbar outlined dense rounded="lg">
    <v-app-bar-nav-icon  @click.stop="drawer = !drawer">
    </v-app-bar-nav-icon>


    <v-toolbar-title class="text-h5" style="font-family:forte !important;"> 
     
    </v-toolbar-title>
    
    <v-spacer></v-spacer>



    <vs-tooltip bottom transparent shadow >
      <vs-checkbox v-model.boolean="$vuetify.theme.dark" 
      indeterminate
      :line-through="true"
      dark class="mr-2">
        <template #icon>
          <v-icon>mdi-moon-waning-crescent</v-icon>
        </template>
      </vs-checkbox>
 

      <template #tooltip>
        {{$vuetify.theme.dark? 'Modo escuro' : 'Modo claro' }}
      </template>
    </vs-tooltip>
 
    <v-menu 
     :close-on-click="true"
    transition="scroll-y-reverse-transition" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <!-- <v-btn 
         
        icon>
        <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
 -->
        <vs-avatar
            :badge-color="!isUserLoggedIn()? $vuetify.theme.themes.light.success : $vuetify.theme.themes.light.danger"
            :color="$vuetify.theme.themes.light.primary"
            :disabled="isUserLoggedIn()"
            badge
            size="35"
            v-if="!isUserLoggedIn()"
            circle
            :float="true"
            v-bind="attrs"
            v-on="on">
          <template #text> 
            {{ usuario.nome[0].toUpperCase() }}
          </template>
        </vs-avatar>

        <vs-avatar
        :badge-color="$vuetify.theme.themes.light.danger"
        :color="$vuetify.theme.themes.light.primary"
        :disabled="isUserLoggedIn()"
        badge
        v-else
        size="35"
        circle>
          <template #text>
 
          </template>
        </vs-avatar>
      </template>
      <v-card width="250">
      <v-img  
      height="100"
      
      class="white--text align-end"
       gradient="to bottom, rgba(0,0,0,.0), rgba(0,0,0,.9)"
      :src="$root.dirname + '/assets/media/img/img43.jpg'"
      >

         <v-list-item>

           <v-list-item-avatar >
           <vs-avatar size="100" badge badge-color="success">
              <img :src="avatar" alt="">
              </vs-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="white--text text-h6">
             {{isUserLoggedIn()? 'Faça a entrada': usuario.nome }}
            
            </v-list-item-title>

            <v-list-item-subtitle class="grey--text" >
           {{isUserLoggedIn()? 'A sua entrada é necessária': role }}
            </v-list-item-subtitle>
          </v-list-item-content>
          
        </v-list-item>   

      </v-img>

      <v-list  dense rounded>
        <v-list-item-group class="pa-1" color="primary">
          <v-list-item link v-for="({ icon, label, to, disabled, name }, i) in menuUsuario" 
          :disabled="disabled" :key="i" :to="{ name , params: { id_funcionario:getIdF() } }">
            <v-list-item-icon>
              <v-icon> {{ icon }} </v-icon>
            </v-list-item-icon>
            <v-list-item-title> {{ label }} </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-card-actions>
        <v-btn block tile color="primary" dark depressed @click="logout" v-if="!isUserLoggedIn()">
          Terminar sessão
          <v-icon right>mdi-power</v-icon>
        </v-btn>
      </v-card-actions>
      </v-card>
    </v-menu>
 
  </v-toolbar>

</v-app-bar>
<v-navigation-drawer :src="$root.dirname + '/assets/media/banner/banner-1.jpg'"  dark v-model="drawer" relative app>

<v-list-item two-line>
<v-list-item-avatar>
<v-img :src=" __dirname + '/assets/media/logo/background.png'"></v-img>
</v-list-item-avatar>

<v-list-item-content>
<v-list-item-title> {{isUserLoggedIn()? 'Faça a entrada':  productName  }} </v-list-item-title>
<v-list-item-subtitle> {{isUserLoggedIn()? '' : 'Sessão iniciada' }} </v-list-item-subtitle>
</v-list-item-content>
</v-list-item>
</v-list>
 <v-divider></v-divider>
<!-- <v-list-item>
  <v-switch
    inset
    v-model="$vuetify.theme.dark"
    flat
    :label="$vuetify.theme.dark? 'Modo escuro':'Modo claro'"></v-switch>
  </v-list-item>

<v-divider></v-divider>
 -->
<v-list  dense nav v-if="!isUserLoggedIn()">
  <v-list-item v-for="({ to, label, icon,adminOnly}, i) in navigation" :key="i"
  no-action v-show="navRole(adminOnly)" :to="to">
    <v-list-item-icon>
      <v-icon>{{ icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-title> {{ label }} </v-list-item-title>
  </v-list-item>
</v-list>

</v-navigation-drawer>


 
<!-- Sizes your content based upon application components -->
<v-img :src="$root.dirname + '/assets/media/img/img100.jpg'">
  <v-main>

    <v-container fluid>    
        <!-- If using vue-router -->
        <transition name="fade" mode="out-in">
          <router-view>
          </router-view>
        </transition>

    </v-container>
  </v-main>
  <v-footer app dark padless>
      <v-card class="flex" flat tile>
        <v-card-text class="py-1 white--text text-center">
          {{ new Date().getFullYear() }} — <strong> DDarkCoder </strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-img>


</v-app>

`