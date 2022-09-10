const { getUserData,isUserLoggedIn } = require('../../../auth/utils')
const { mapGetters,mapActions } = Vuex
const moeda = require('../../../@core/moeda')
const { ipcRenderer , app} = require('electron')

module.exports = {

    template: `
  <template>

        <v-card class="rounded-lg" outlined>

            <v-card-title primary-title>
                Balanço total de categória
            </v-card-title>

            <div id="categoriaWeek" > </div>

        </v-card>

  </template>
        
         `,
    data: () => ({
        chart: null
    }),

    methods: {
        moeda,
        ...mapActions({
            add: 'usuario/getUsuarioEmpresa',
            getStatProfit: 'stat/getTotalProfitFromThisWeekByEmpresaId',
        })

    },
    computed: {
        ...mapGetters({
            loja: 'usuario/loja',
            arr: 'stat/TOTAL_CATEGORIA_WEEK_ARRAY',
        }),

        dark: function () {
            return this.$root.darkMode
        },

    },
    watch: {
        dark(mode) {
            
            this.chart.updateOptions({
                theme: {
                    mode: mode ? 'dark' : 'light'
                },
                tooltip: {
                    theme: mode ? 'dark' : 'light'
                }
            })

            
        }
    },


    components: {

    },
    created() {

    },
    mounted() {
        var options = {
            chart: {
                type: 'donut',
                toolbar: {
                    show: false
                },
                height: 300,
                background: 'transparent'
            },
            series: this.arr.map((v) => { return v.totalVendido }) ,

            defaultLocale: 'pt-br',
            // colors: [ this.$vuetify.theme.themes.light.primary ],
            theme: {
                palette: 'palette1', // upto palette10
                mode: this.dark ? 'dark' : 'light',
            },

            tooltip: {
                x: {
                    show: false
                },
                y: {
                    formatter: function (value, series) {
                        // const extenso = ipcRenderer.sendSync('get-localMoedaByExtenso', value)
                        return `${moeda(value)}`
                    }
                }
            },

            stroke: {
                curve: 'straight',
                lineCap: 'round'
            },
            labels: this.arr.map((v) => { return v.nome }),

            legend: {
                horizontalAlign: 'left'
            }
        }

        this.chart = new ApexCharts(document.querySelector("#categoriaWeek"), options);

        this.chart.render();

        this.add()

    },


}