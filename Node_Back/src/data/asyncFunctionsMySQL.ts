var common = require('../Common/mysql');
import client from './../client';

exports.getTanques = async () => {
    var resp = await common.getTanques(client);
    client.quit();
    return resp;
}
exports.getLugaresHaEstadoTanque = async (id : string) => {
    var resp = await common.getHaEstadoTanque(client, id);
    let arrayLugares = JSON.parse(JSON.stringify(resp));
    for(let i = 0; i < arrayLugares.length; i++){
        arrayLugares[i]["lugar"] = await common.getInfoLugar(client, arrayLugares[i].idLugar);
    }
    client.quit();
    return arrayLugares;
}

exports.getIdEtiqueta = async(idEtiqueta : string) => {
    var resp = await common.getIdEtiqueta(client, idEtiqueta);
    client.quit();
    return resp;
}

exports.getInfoDueno = async (idDueno : string) => {
    var resp = await common.getInfoDueno(client, idDueno);
    client.quit();
    return resp;
}
exports.getContenidoTanque = async (idContenido : string) => {
    var resp = await common.getContenidoTanque(client, idContenido);
    client.quit();
    return resp; 
}
exports.getLugarTanque = async (idTanque : string) => {
    var resp = await common.getLugarTanque(client, idTanque);
    client.quit();
    return resp; 
}

exports.getInfoLugar = async (idLugar : string) => {
    let resp = await common.getInfoLugar(client, idLugar);
    client.quit();
    console.log(JSON.parse(JSON.stringify(resp)));
    console.log("/n");
    return JSON.parse(JSON.stringify(resp));
}