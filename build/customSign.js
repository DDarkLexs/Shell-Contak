
module.exports = async function(configuration) {
    return {
        
        win: {
            icon: "build/icon.ico",
            target: {
                icon: "build/index.ico",
                target: [
                    {
                        target: "nsis",
                        arch: [ "x64", "ia32" ]
                    }
                ]
            },
            asarUnpack: [
                "src/database/database.db"
            ]
        }
    }
}
