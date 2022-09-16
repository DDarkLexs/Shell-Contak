
const  vuetify = ({
    rtl: false,
    lang: {
        current: 'pt',
        // locales: { en },
    },
    theme: {
        options: {
           

        },
        dark: JSON.parse(localStorage.getItem('darkMode')) || false,
        themes: {
            light: {
                primary:'#157a1a',
                secondary:'#6e33ff',
                danger:'#cc3e44'
            },
            dark: {
                primary: '#157a1a',
                secondary:'#6e33ff',
                danger:'#cc3e44'
            },
        },
    },
})


module.exports = new Vuetify(vuetify)
