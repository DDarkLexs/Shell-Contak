const { getUserData,isUserLoggedIn } = require('../../../auth/utils')
const { mapGetters,mapActions } = Vuex
const moeda = require('../../../@core/moeda')
const { ipcRenderer , app} = require('electron')
const extenso = require('extenso')
module.exports = {

  template:`
<template>
        <v-card outlined class="rounded-lg">
        <v-card-title primary-title>
            Venda da semana
        </v-card-title>
        <v-card-subtitle class="text-h5">
           <!--  {{ totalArr }}  --><!-- ({{totalArrExtenso}}) -->
        </v-card-subtitle>


        <v-card-text>
        <div id="chart"></div>
        </v-card-text>

        </v-card>
</template>
      
       `,
      data: () => ({
        chart:null,
      }),

      methods: {
        getArrSum(arr){
            var total = 0;
            for (const i in arr) {
              total += arr[i]
            
            }
            return total
          
        },
        moeda,
        ...mapActions({
            getTotal:'stat/getTotalDataFromThisWeekByEmpresaId',
        })

      },
      watch: {
        dark(mode){
                this.chart.updateOptions({
                    theme: {
                        mode: mode ? 'dark':'light' 
                    },
                    tooltip: {
                        theme: mode ? 'dark':'light'
                    }
                })
        }
        
      },
      computed: {
        totalArrExtenso:function(){
          return  (ipcRenderer.sendSync('get-localMoedaByExtenso',
          Number(this.getArrSum(this.query.map((v) => { return v.total })))))
        },
        totalArr:function(){
          return moeda(this.getArrSum(this.query.map((v) => { return v.total })))
        },
    
        dark:function(){
            return this.$root.darkMode
        },
        ...mapGetters({
            query:'stat/TOTAL_WEEKDAY_GAIN',
            query_invest:'stat/TOTAL_INVEST_WEEK_ARRAY',

        }),
    
      },
      created() {
          this.getTotal()
        
      },
      mounted() {
        
        var options = {
            series: [
              { name: "Total", data: this.query.map((v) => { return v.total }) },
            //  { name: "Investimento", data: this.query_invest.map((v) => { return v.investimento }) }
         
        ],
          defaultLocale: 'pt-br',
          colors : [this.$vuetify.theme.themes.light.primary, this.$vuetify.theme.themes.light.secondary],
          theme: {
            mode:  this.dark ?'dark':'light', 
            },
            brush: {
              enabled: false,
              target: undefined,
              autoScaleYaxis: false
            },
          tooltip: {
            x: {
              show: false
            },
            y: {
              formatter: function(value, series) {
              // const extenso = ipcRenderer.sendSync('get-localMoedaByExtenso', value)
                return `${moeda(value)}`
              }
            }
        }, 

            chart: {
            toolbar: {
                show: false
            },
            type: 'area',
            height: 250,
            background: 'transparent'
          },
          dataLabels: {
            enabled: true,
            formatter: function(value, series) {
                return `${moeda(value)}`
            }
          },
          // title: {
          //   text: `${moeda(this.getArrSum(this.query.map((v) => { return v.total })))}`,
          //   align: 'left'
          // },
          
          stroke: {
            curve: 'straight',
            lineCap: 'round'
          },
          labels: this.query.map((v) => { 
            return new Date(v.vencimento)
            .toLocaleDateString('pt',{ weekday:'short' }) 
        
        }),

          xaxis: {
            // type: 'datetime',
          },
          yaxis: {
            opposite: true,
            labels: {
                show: false,
                align: 'right',
                formatter: function(value, series) {
                    return `${moeda(value)}`
                  }
            },
          },
          legend: {
            horizontalAlign: 'left'
          }
          };
  
           this.chart = new ApexCharts(document.getElementById("chart"), options);
          this.chart.render();

       },


}