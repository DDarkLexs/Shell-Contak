const electron = require("electron");
const ipc = electron.ipcRenderer;


module.exports = function converter(value){
    const result = (ipc.sendSync('get-localMoeda', value))
    return result
    
}