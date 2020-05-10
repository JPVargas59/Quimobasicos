import client from '../client';
import query from '../resolvers/query';
import type from '../resolvers/type';
exports.getTanques = async (client) => {
	var tanques = await client.query(`
    SELECT * FROM Tanque
    `);
	if (tanques.length == 0) {
		return null;
	}
	return tanques;
};

exports.getHaEstadoTanque = async (client, parentID) => {
	var lugares = await client.query(
		`
    SELECT * FROM TanqueHaEstado WHERE idTanque = ?
    `,
		parentID
	);
	if (lugares.length == 0) {
		return null;
	}
	return lugares;
};
exports.getIdEtiqueta = async (client, idEtiqueta) => {
	var idEtiqueta = await client.query(
		`
    SELECT * FROM EtiquetaRFID WHERE idEtiqueta = ?
    `,
		idEtiqueta
	);
	if (idEtiqueta.length == 0) {
		return null;
	}
	return idEtiqueta[0];
};

exports.getInfoDueno = async (client, idOwner) => {
	var owner = await client.query(
		`
    SELECT * FROM Dueno WHERE idDueno = ?
    `,
		idOwner
	);
	if (owner.length == 0) {
		return null;
	}
	return owner[0];
};

exports.getContenidoTanque = async (client, idContenido) => {
	var contenido = await client.query(
		`
    SELECT * FROM Contenido WHERE idContenido = ?
    `,
		idContenido
	);
	if (contenido.length == 0) {
		return null;
	}
	return contenido[0];
};

exports.getLugarTanque = async (client, idTanque) => {
	var lugar = await client.query(
		`
    SELECT * FROM TanqueEsta JOIN Lugar ON TanqueEsta.idLugar = Lugar.idLugar WHERE idTanque = ?
    `,
		idTanque
	);
	if (lugar.length == 0) {
		return null;
	}
	return lugar[0];
};

exports.getInfoLugar = async (client, idLugar) => {
	var lugar = await client.query(
		`
    SELECT * FROM Lugar WHERE idLugar = ?
    `,
		idLugar
	);
	if (lugar.length == 0) {
		return null;
	}
	return lugar[0];
};

exports.getTanque = async (client, idTanque) => {
	var tanque = await client.query(
		`
    SELECT * FROM Tanque WHERE idTanque = ?
    `,
		idTanque
	);
	if (tanque.length == 0) {
		return null;
	}
	return tanque[0];
};

exports.getLugares = async (client) => {
	var lugares = await client.query(`
    SELECT * FROM Lugar
    `);
	if (lugares.length == 0) {
		return null;
	}
	return lugares;
};

exports.getLugar = async (client, idLugar) => {
	var lugar = await client.query(
		`
    SELECT * FROM Lugar WHERE idLugar = ?
    `,
		idLugar
	);
	if (lugar.length == 0) {
		return null;
	}
	return lugar[0];
};

exports.getUsuarios = async (client) => {
	var usuarios = await client.query(`
    SELECT fName as nombre, lName as apellidos, idUsuario, genero, correo  FROM Usuario
    `);
	if (usuarios.length == 0) {
		return null;
	}
	return usuarios;
};

exports.getUsuario = async (client, idUsuario) => {
	var usuario = await client.query(
		`
    SELECT fName as nombre, lName as apellidos, idUsuario, genero, correo  FROM Usuario
    WHERE idUsario = ?`,
		idUsuario
	);
	if (usuario.length == 0) {
		return null;
	}
	return usuario[0];
};

exports.getContenidos = async (client) => {
	var contenidos = await client.query(`
    SELECT *  FROM Contenido
    `);
	if (contenidos.length == 0) {
		return null;
	}
	return contenidos;
};

exports.getContenido = async (client, idContenido) => {
	var contenido = await client.query(
		`
    SELECT * FROM Contenido
    WHERE idContenido = ?`,
		idContenido
	);
	if (contenido.length == 0) {
		return null;
	}
	return contenido[0];
};

exports.getOwners = async (client) => {
	var owners = await client.query(`
    SELECT *  FROM Dueno
    `);
	if (owners.length == 0) {
		return null;
	}
	return owners;
};

exports.getOwner = async (client, idOwner) => {
	var owner = await client.query(
		`
    SELECT * FROM Dueno
    WHERE idDueno = ?`,
		idOwner
	);
	if (owner.length == 0) {
		return null;
	}
	return owner[0];
};

exports.getEtiquetas = async (client) => {
	var etiquetas = await client.query(`
    SELECT *  FROM EtiquetaRFID
    `);
	if (etiquetas.length == 0) {
		return null;
	}
	return etiquetas;
};

exports.getEtiqueta = async (client, idEtiqueta) => {
	var etiqueta = await client.query(
		`
    SELECT * FROM EtiquetaRFID
    WHERE idEtiqueta = ?`,
		idEtiqueta
	);
	if (etiqueta.length == 0) {
		return null;
	}
	return etiqueta[0];
};

exports.getHistorialPesoTanques = async (client) => {
	var historialPesos = await client.query(`
    SELECT *  FROM HistorialPeso
    `);
	if (historialPesos.length == 0) {
		return null;
	}
	return historialPesos;
};
exports.getHistorialPesoTanque = async (client, idTanque) => {
	var historialPeso = await client.query(
		`
    SELECT * FROM HistorialPeso
    WHERE idTanque = ?`,
		idTanque
	);
	if (historialPeso.length == 0) {
		return null;
	}
	return historialPeso[0];
};

exports.getHistorialUbicacionTanques = async (client) => {
	var historialUbicaciones = await client.query(`
    SELECT *  FROM TanqueHaEstado
    `);
	if (historialUbicaciones.length == 0) {
		return null;
	}
	return historialUbicaciones;
};

exports.setTanque = async (client, tanqueInput, idTanqueOriginal) => {
	var checkTanque = await client.query(
		'SELECT * FROM Tanque WHERE idTanque=?',
		idTanqueOriginal
	);
	if (checkTanque.length == 0) {
		return 'Tanque no encontrado';
	} else {
		var updateTanque = await client
			.query('UPDATE Tanque SET ? WHERE idTanque=?', [
				tanqueInput,
				idTanqueOriginal
			])
			.catch((error) => {
				console.log(error);
				return error.sqlMessage;
			});
		return 'Tanque actualizado';
	}
};
