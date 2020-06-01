exports.getTanques = async (client) => {
	var tanques = await client.query(`
    SELECT * FROM Tanque ORDER BY idTanque
    `);
	if (tanques.length == 0) {
		return null;
	}
	return tanques;
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
