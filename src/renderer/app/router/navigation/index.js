
module.exports = [
   
   {
    icon:'mdi-monitor-dashboard',
    label:'Menu Principal',
    to:{ name: 'home' },
    adminOnly:false,
   },


   {
      icon:'mdi-hand-coin',
      label:'Contagem',
      to:{ name: 'contagem' },
      adminOnly:true,
   },

   {
      icon:'mdi-file-chart',
      label:'Registros',
      to:{ name: 'registro' },
      adminOnly:true,
   },
   {
      icon:'mdi-account',
      label:'Lista de Usuário',
      to:{ name: 'usuário' },
      adminOnly:true,
   },
   
  


]