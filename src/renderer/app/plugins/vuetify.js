
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
                primary:'#0733eb',
                secondary:'#00a3ff',
                danger:'#cc3e44'
            },
            dark: {
                primary: '#0733eb',
                secondary:'#00a3ff',
                danger:'#cc3e44'
            },
        },
    },
})


module.exports = new Vuetify(vuetify)
