const electron = require("electron");
const ipc = electron.ipcRenderer;
const estadoCivil = require('../../../assets/data/estadoCivil.json')
const { mapActions,mapGetters } = Vuex

module.exports = {
    template:`
        <template>
                <div class="m-auto d-flex justify-center">
                <v-card rounded="lg" max-width="850" width="850">
                    <v-row no-gutters>
                        <v-col cols="12" sm="12">
                            <v-img :src="__dirname+'/assets/media/img/img43.jpg'" class="white--text"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)" height="100px">
                                <v-app-bar
                                flat
                                color="rgba(0, 0, 0, 0)"
                              >
                              <v-btn
                                color="white"
                                :to="{name:'usuário'}"
                                icon
                              >
                                <v-icon>mdi-arrow-left</v-icon>
                              </v-btn>
                                <v-toolbar-title class="text-h6 white--text pl-0">
                                  {{ funcionario.nome }}
                                </v-toolbar-title>
                                <v-spacer></v-spacer>
                              <v-btn
                               @click="salvar(funcionario,usuario)"
                                color="white"
                                icon
                              >
                                <v-icon>mdi-content-save</v-icon>
                              </v-btn>
                    
                              </v-app-bar>
                    
        
                            </v-img>
                        </v-col>
        
                    <v-col cols="12" sm="12">
            
            <form @submit.prevent="salvar(funcionario,usuario)" >
                    <v-stepper max-width="850" non-linear width="850" align-center v-model="modulo">
                    <v-stepper-header>
                    <v-stepper-step :complete="modulo > 1" step="1">
                        Dados pessoais
                    </v-stepper-step>

                    <v-divider></v-divider>
                    
                    <v-stepper-step :complete="modulo > 2" step="2">
                        2º Dados pessoais
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3">
                        Função para usuário
                    </v-stepper-step>

                </v-stepper-header>
        
                        <v-stepper-items>
                            <v-stepper-content step="1">
                                <v-card color="transparent" flat>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-text-field 
                                                v-model.text="funcionario.nome"
                                                :disabled="l"
                                                :loading="l"
                                                outlined
                                                dense
                                                label="Nome" prepend-icon="mdi-account" required></v-text-field>
                                            </v-col>

                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                 v-model.text="usuario.senha"
                                                    disabled
                                                    :loading="l"
                                                    outlined 
                                                    dense 
                                                    type="password" 
                                                    label="Palavra-passe" 
                                                    prepend-icon="mdi-lock"
                                                    required
                                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                    :type="show1 ? 'text' : 'password'"
                                                    hint="pelo menos maior igual a 6 caracteres"
                                                    counter
                                                    @click:append="show1 = !show1"
                                                    
                                                    >
                                                </v-text-field>
                                            </v-col>
        
                                            <v-col cols="12" md="6">
                                                <v-select
                                                 v-model.text="funcionario.sexo"
                                                :items="sexo"
                                                :disabled="l"
                                                :loading="l"
                                                menu-props="auto"
                                                prepend-icon="mdi-gender-male-female"
                                                label="Sexo"
                                                item-text="label"
                                                item-value="value"
                                                dense
                                                outlined
                                                ></v-select>
                                            </v-col>
        
                                            <v-col cols="12" md="6">
                                                <v-menu 
                                                :disabled="l"
                                                :loading="l"
                                                ref="menu" v-model="menu" :close-on-content-click="false"
                                                    transition="scale-transition" offset-y min-width="auto">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field outlined dense v-model="funcionario.nascimento" label="Data de Nascimento"
                                                             
                                                        prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on">
                                                        </v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="funcionario.nascimento" locale="pt-BR"
                                                        :active-picker.sync="activePicker"
                                                        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                                        @change="funcionario.nascimento"></v-date-picker>
                                                </v-menu>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                :disabled="l"
                                                :loading="l"
                                                v-model.text="funcionario.telefone"
                                                outlined dense label="Nº de telefone" 
                                                type="tel" 
                                                prepend-icon="mdi-cellphone"
                                                required></v-text-field>
                                            </v-col>
                                                       <v-col cols="12" md="6">
                                    <v-text-field
                                    outlined
                                    dense label="Nº do B.I" type="text"
                                    v-model="BI"
                                    :disabled="l" :loading="l"
                                    prepend-icon="mdi-card-account-details"
                                    append-outer-icon="mdi-account-search"
                                    @click:append-outer="pequisarUsuarioBI"
                                    >
                                    </v-text-field>
                                    </v-col>
                                        </v-row>
                                    </v-card-text>
                                    <v-card-actions>
                                <v-btn 
                                :disabled="l"
                                :loading="l"
                                depressed color="primary" @click="modulo = 2">
                                    Avançar
                                </v-btn>
                                <v-spacer></v-spacer>
                                 
                                    </v-card-actions>
                                </v-card>
        
                                

                            </v-stepper-content>

                            <v-stepper-content step="2">
                        <v-card color="transparent" flat>
                            <v-card-text>
                                <v-row>
                                <v-col cols="12" md="6">
                                  <v-select v-model.text="funcionario.estadoCivil"
                                        :items="estadoCivil" :disabled="l" :loading="l" menu-props="auto"
                                        prepend-icon="mdi-ring" label="Estado civil" item-text="label"
                                        item-value="value" dense outlined></v-select>
                                </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field v-model.text="funcionario.natural"
                                            :disabled="l" :loading="l" outlined dense label="Natural de"
                                            prepend-icon="mdi-home-account" required></v-text-field>
                                    </v-col>


                                    <v-col cols="12" md="6">
                                        <v-text-field 
                                        v-model.text="funcionario.provincia_origem"
                                            :disabled="l" :loading="l"
                                            menu-props="auto"
                                            prepend-icon="mdi-map"
                                            hint="Informe a provincia que nasceu"
                                            label="Provincia de"
                                            item-text="label"
                                            item-value="value"
                                            dense outlined></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field :disabled="l" :loading="l"
                                            v-model.text="funcionario.municipio" outlined
                                            dense 
                                            label="municipio"
                                            type="tel"
                                            hint="Informe o município que vive"
                                            prepend-icon="mdi-map-marker"
                                            
                                            ></v-text-field>
                                        </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                outlined
                                                dense 
                                                label="Residência"
                                                type="text"
                                                prepend-icon="mdi-map-marker"
                                                v-model="funcionario.residencia"
                                                :disabled="l" :loading="l"
                                                >
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                outlined
                                                dense 
                                                label="Endereço"
                                                type="text"
                                                prepend-icon="mdi-map-marker"
                                                v-model="funcionario.endereco"
                                                :disabled="l" :loading="l">
                                                </v-text-field>
                                            </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn :disabled="l" :loading="l" depressed color="primary" @click="modulo = 3">
                                    Avançar
                                </v-btn>
                                    <v-btn :disabled="l" :loading="l" @click="modulo = 1" depressed>
                                    Voltar
                                </v-btn>

                                <v-spacer></v-spacer>

                                    <v-btn @click="$refs.form.reset()"
                                    disabled="l" :loading="l"
                                    dark depressed color="danger" >
                                    <v-icon>mdi-broom</v-icon>
                                </v-btn>

                            
                            </v-card-actions>
                        </v-card>



                    </v-stepper-content>
        
                            <v-stepper-content step="3">
                                <v-card color="transparent" flat>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                            <v-select
                                             menu-props="auto"
                                             v-model="usuario.role"
                                                :disabled="l"
                                                :loading="l"
                                                :items="funcoes"
                                                label="Função"
                                                item-text="label"
                                                item-value="value"
                                                dense
                                                outlined
                                                required
                                                ></v-select>
                                            </v-col>
        
                                            <v-col cols="12" md="6">
                                             <v-select
                                                menu-props="auto"
                                                :disabled="l"
                                                :loading="l"
                                                v-model="usuario.permissao"
                                                :items="contaAtivo"
                                                label="Conta Ativo"
                                                item-text="label"
                                                item-value="value"
                                                dense
                                                outlined
                                                required
                                                ></v-select>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                    <v-card-actions>
                                <v-btn 
                                :disabled="l"
                                :loading="l"
                                
                                @click="modulo = 2" depressed>
                                Voltar
                                </v-btn>
                                <v-spacer></v-spacer>   
                                    
                            </v-card-actions>

                                </v-card>
                            </v-stepper-content>
                        </v-stepper-items>
                    </v-stepper>
                    </v-col>
                    </v-row>
                </v-card>
        
            </form>

                </div>
        </template>
        
        `,
        data() {
            const {funcionario, usuario} = ipc.sendSync('get_userData', this.$route.params.id_funcionario)
            usuario.permissao = Boolean(usuario.permissao)
            return {
                funcionario, 
                usuario,
                show1:false,
                l:false,
                modulo: 1,
                activePicker: null,
                date: null,
                menu: false,
                BI:'',
                estadoCivil,
                sexo: [
                    {label:'masculino',value:'masculino' },
                    {label:'feminino',value:'feminino' }
                    
                 ],
                funcoes: [
                    {label:'Adminstrador',value:'admin' },
                    {label:'usuário normal',value:'user' }
                    
                 ],
                 contaAtivo:[
                    {label:'Sim',value:true },
                    {label:'Não',value:false }
                ],
                
            }
        },
        beforeCreate() {
        },
        methods: {
            ...mapActions({
                getBI:'usuario/getid'


            }),

            async pequisarUsuarioBI(event){
                try {
                    
                    
                    (await this.getBI(this.BI))
                    
                } catch (error) {

                    this.$vs.notification({
                        color:this.$vuetify.theme.themes.light.danger,
                        title: 'Houve um erro!',
                        text: error
                    })
                    
                }
            },

            salvar(funcionario,usuario){
                try {
                
                const id_empresa = this.usuario.id_empresa 
                const result = ipc.sendSync('update_user', {funcionario,usuario})

                if(!result) throw 'Não foi possível alterar, houve erro!'
                  this.$vs.notification({
                        color:this.$vuetify.theme.themes.light.success,
                        title: `Usuário atualizado com sucesso!`,
                        text: `Verifique na tabela de usuários ${funcionario.nome}`
                    })
                    
                } catch (error) {
                    this.$vs.notification({
                        color:this.$vuetify.theme.themes.light.error,
                        title: 'Houve um erro!',
                        text: error
                      })
                    
                }
                

            },
            save (date) {
                this.$refs.menu.save(date)
            },
        },

        watch: {
            menu (val) {
                val && setTimeout(() => (this.activePicker = 'YEAR'))
              },

        },
        computed: {
    
            
        },

        created() {


         
            
        },



}