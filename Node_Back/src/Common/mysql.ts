import { type } from 'os';

async function asyncForEach(array, cb) {
	for (let i = 0; i < array.length; i++) {
		await cb(array[i], i, array);
	}
}

exports.getTanques = async (client, idEtiqueta) => {
	let queryString = 'SELECT * FROM Tanque ';
	switch (typeof idEtiqueta) {
		case 'number':
			queryString += 'WHERE idEtiqueta = ?';
			break;
		case 'object':
			if (idEtiqueta == null) {
				queryString += 'WHERE idEtiqueta IS ?';
			}
			break;
	}
	//console.log(typeof idEtiqueta);
	//console.log(idEtiqueta);
	queryString += ' ORDER BY idTanque';
	//console.log(queryString);
	var tanques = await client.query(queryString, [idEtiqueta]);
	//console.log(tanques);
	if (tanques.length == 0) {
		return null;
	}
	return tanques;
};

exports.getTanque = async (client, idTanque) => {
	var tanque = await client.query(
		`
    SELECT * FROM Tanque WHERE idTanque = ? ORDER BY idTanque
    `,
		idTanque
	);
	if (tanque.length == 0) {
		return null;
	}
	return tanque[0];
};

exports.getHaEstadoTanque = async (client, parentID) => {
	var lugares = await client.query(
		`
    SELECT * FROM TanqueHaEstado WHERE idTanque = ? ORDER BY idTanque
    `,
		parentID
	);
	if (lugares.length == 0) {
		return null;
	}
	return lugares;
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
    SELECT * FROM TanqueEsta JOIN Lugar ON TanqueEsta.idLugar = Lugar.idLugar WHERE idTanque = ? ORDER BY TanqueEsta.idTanque
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

exports.getUsuarios = async (client, puestoUsuario) => {
	let stringQuery =
		'SELECT fName as nombre, lName as apellidos, idUsuario, correo, idSupervisor, puesto FROM Usuario';
	let arrayQuery = [];
	if (puestoUsuario) {
		stringQuery += ' WHERE puesto=?';
		arrayQuery += puestoUsuario;
	}
	var usuarios = await client.query(stringQuery, arrayQuery);
	if (usuarios.length == 0) {
		return null;
	}
	return usuarios;
};

exports.getUsuario = async (client, idUsuario) => {
	var usuario = await client.query(
		`
    SELECT fName as nombre, lName as apellidos, idUsuario, correo , idSupervisor, puesto FROM Usuario
    WHERE idUsuario = ?`,
		idUsuario
	);
	if (usuario.length == 0) {
		return null;
	}
	return usuario[0];
};

exports.getContenidos = async (client) => {
	var contenidos = await client.query(`
    SELECT * FROM Contenido
	`);
	if (contenidos.length == 0) {
		return null;
	}
	await asyncForEach(contenidos, async (contenido) => {
		let numTanques = await client.query(
			'SELECT COUNT(idContenido) as numTanques FROM Tanque WHERE idContenido = ?',
			contenido.idContenido
		);
		contenido.numTanques = numTanques[0].numTanques;
	});
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
	await asyncForEach(contenido, async (contenido) => {
		let numTanques = await client.query(
			'SELECT COUNT(idContenido) as numTanques FROM Tanque WHERE idContenido = ?',
			contenido.idContenido
		);
		contenido.numTanques = numTanques[0].numTanques;
	});
	return contenido[0];
};

exports.getOwners = async (client) => {
	var owners = await client.query(`
    SELECT *  FROM Dueno
	`);
	if (owners.length == 0) {
		return null;
	}
	await asyncForEach(owners, async (owner) => {
		let numTanques = await client.query(
			'SELECT COUNT(idDueno) as numTanques FROM Tanque WHERE idDueno = ?',
			owner.idDueno
		);
		owner.numTanques = numTanques[0].numTanques;
	});
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
	await asyncForEach(owner, async (owner) => {
		let numTanques = await client.query(
			'SELECT COUNT(idDueno) as numTanques FROM Tanque WHERE idDueno = ?',
			owner.idDueno
		);
		owner.numTanques = numTanques[0].numTanques;
	});
	return owner[0];
};

exports.getEtiquetas = async (client) => {
	var etiquetas = await client.query(`
    SELECT *  FROM EtiquetaRFID
	`);
	if (etiquetas.length == 0) {
		return null;
	}
	await asyncForEach(etiquetas, async (etiqueta) => {
		let idTanque = await client.query(
			'SELECT idTanque FROM Tanque WHERE idEtiqueta = ?',
			etiqueta.idEtiqueta
		);
		if (idTanque.length == 0) {
			etiqueta.idTanque = null;
		} else {
			etiqueta.idTanque = idTanque[0].idTanque;
		}
	});
	return etiquetas;
};

exports.getEtiqueta = async (client, idEtiqueta) => {
	var etiqueta = await client.query(`SELECT * FROM EtiquetaRFID WHERE idEtiqueta = ?`, [
		idEtiqueta
	]);
	if (etiqueta.length == 0) {
		return null;
	}
	await asyncForEach(etiqueta, async (etiqueta) => {
		let idTanque = await client.query(
			'SELECT idTanque FROM Tanque WHERE idEtiqueta = ?',
			etiqueta.idEtiqueta
		);
		if (idTanque.length == 0) {
			etiqueta.idTanque = null;
		} else {
			etiqueta.idTanque = idTanque[0].idTanque;
		}
	});
	return etiqueta[0];
};

exports.getIdEtiqueta = async (client, idEtiqueta) => {
	var etiqueta = await client.query(`SELECT * FROM EtiquetaRFID WHERE idEtiqueta = ?`, [
		idEtiqueta
	]);
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
	return historialPeso;
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

exports.getOperacionesDelTanque = async (client, idTanque) => {
	var operaciones = await client.query(
		`
    SELECT idUsuario as operador, fecha, idTanque as tanque FROM OperadoPor WHERE idTanque = ?
    `,
		idTanque
	);
	if (operaciones.length == 0) {
		return null;
	}
	return operaciones;
};

exports.getMantenimientoTanque = async (client, idTanque) => {
	var mantenimientos = await client.query(
		`
    SELECT idTanque, fechaMantenimiento, observaciones FROM Mantenimiento WHERE idTanque = ? ORDER BY idTanque
    `,
		idTanque
	);
	if (mantenimientos.length == 0) {
		return null;
	}

	return mantenimientos;
};
exports.getHistorialMantenimimientosTanques = async (client) => {
	var mantenimientos = await client.query(`
    SELECT idTanque, fechaMantenimiento, observaciones FROM Mantenimiento ORDER BY idTanque
    `);
	if (mantenimientos.length == 0) {
		return null;
	}
	return mantenimientos;
};
exports.getOperacionesTanque = async (client, idTanque) => {
	var operaciones = await client.query(
		`
    SELECT idTanque, idUsuario, fecha FROM OperadoPor WHERE idTanque = ? ORDER BY idTanque
	`,
		idTanque
	);

	if (operaciones.length == 0) {
		return null;
	}
	return operaciones;
};
exports.getOperacionesTanques = async (client) => {
	var operaciones = await client.query(`
    SELECT idTanque, idUsuario, fecha FROM OperadoPor
	`);

	if (operaciones.length == 0) {
		return null;
	}
	return operaciones;
};
exports.getTanquesEnLugar = async (client, idLugar) => {
	var tanques = await client.query(
		`
	SELECT * FROM Tanque JOIN TanqueEsta ON Tanque.idTanque = TanqueEsta.idTanque WHERE idLugar = ? ORDER BY Tanque.idTanque
	`,
		idLugar
	);
	if (tanques.length == 0) {
		return null;
	}
	return tanques;
};
exports.getTanquesConContenido = async (client, idContenido) => {
	var tanques = await client.query(
		`
	SELECT * FROM Tanque WHERE idContenido = ? ORDER BY idTanque
	`,
		idContenido
	);
	if (tanques.length == 0) {
		return null;
	}
	return tanques;
};
exports.getHaEstadoEnFechas = async (client, desde, hasta) => {
	let desdeString = desde.toISOString();
	desdeString = desdeString.substring(0, desdeString.length - 14);
	let hastaString = hasta.toISOString();
	hastaString = hastaString.substring(0, hastaString.length - 14);
	var ubicaciones = await client.query(
		`
    SELECT * FROM TanqueHaEstado WHERE fecha BETWEEN "${desdeString}" AND "${hastaString}";
	`
	);
	if (ubicaciones.length == 0) {
		return null;
	}
	return ubicaciones;
};

exports.getValor = async (client, tabla, columnaId, idValor) => {
	let queryString = `SELECT * FROM ??`;
	let arrayQuery = [tabla];
	if (typeof idValor !== 'undefined') {
		queryString += ' WHERE ?? = ?';
		arrayQuery.push(columnaId, idValor);
	}
	let ans = await client.query(queryString, arrayQuery).catch((error) => {
		console.log(error);
		throw new Error(error.sqlMessage);
	});
	if (ans.length == 0) {
		return null;
	}
	return ans;
};
