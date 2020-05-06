
exports.getTanques = async (client) => {
    var tanques = await client.query(`
    SELECT * FROM Tanque
    `)
    if (tanques.length == 0) {
        return null;
    }
    return tanques;
}


exports.getHaEstadoTanque = async (client, parentID) => {
    var lugares = await client.query(`
    SELECT * FROM TanqueHaEstado WHERE idTanque = ?
    `, parentID);
    if (lugares.length == 0) {
        return null;
    }
    return lugares;
}
exports.getIdEtiqueta = async (client, idEtiqueta) => {
    var idEtiqueta = await client.query(`
    SELECT * FROM EtiquetaRFID WHERE idEtiqueta = ?
    `, idEtiqueta);
    if (idEtiqueta.length == 0) {
        return null;
    }
    return idEtiqueta[0];
}

exports.getInfoDueno = async (client, idOwner) => {
    var owner = await client.query(`
    SELECT * FROM Dueno WHERE idDueno = ?
    `, idOwner);
    if (owner.length == 0) {
        return null;
    }
    return owner[0];
}

exports.getContenidoTanque = async (client, idContenido) => {
    var contenido = await client.query(`
    SELECT * FROM Contenido WHERE idContenido = ?
    `, idContenido);
    if (contenido.length == 0) {
        return null;
    }
    return contenido[0];
}

exports.getLugarTanque = async (client, idTanque) => {
    var lugar = await client.query(`
    SELECT * FROM TanqueEsta JOIN Lugar ON TanqueEsta.idLugar = Lugar.idLugar WHERE idTanque = ?
    `, idTanque);
    if (lugar.length == 0) {
        return null;
    }
    return lugar[0];
}

exports.getInfoLugar = async (client, idLugar) => {
    console.log(idLugar);
    var lugar = await client.query(`
    SELECT * FROM Lugar WHERE idLugar = ?
    `,idLugar);
    if (lugar.length == 0) {
        return null;
    }
    return lugar[0];
}
