import mysql from 'mysql';
let bcryptjs = require('bcryptjs');
let jwt = require('jsonwebtoken');
let fsPromises = require('fs').promises;
let path = require('path');

async function checkExists(client, table, mysqlId, idQuery) {
	var obj = {
		queryString: `SELECT * FROM ?? WHERE`,
		arr: [table],
		mysqlId: mysqlId,
		id: idQuery
	};
	//console.log('Antes');
	//console.log(obj);
	obj = parseObj(obj);
	//console.log('Despues');
	//console.log(obj);
	var check = await client.query(obj.queryString, obj.arr).catch((error) => {
		console.log(error);
	});
	return check.length == 0 ? false : true;
}
async function getUsuarioByCorreo(client, correo) {
	let user = await client.query('SELECT * FROM Usuario WHERE correo=?', [correo]);
	return user;
}

async function signJWT(user) {
	let serverkey = await fsPromises
		.readFile(path.resolve(__dirname + '/../../server.key'))
		.catch((error) => {
			console.log(error);
			throw new Error('Error interno');
		});
	return jwt.sign({ id: user.idUsuario, puesto: user.puesto, correo: user.correo }, serverkey, {
		expiresIn: '15m',
		algorithm: 'RS256'
	});
}

function parseObj(obj) {
	//console.log(obj);
	//console.log(obj.mysqlId.length);
	for (var i = 0; i < obj.mysqlId.length; i++) {
		if (i == obj.id.length - 1) {
			obj.queryString += ` ?? = ?`;
		} else {
			obj.queryString += ` ?? = ? AND`;
		}
		//console.log(i);
		//console.log(obj.queryString);
		obj.arr.push(obj.mysqlId[i]);
		obj.arr.push(obj.id[i]);
	}
	return obj;
}

async function modifyId(table, input) {
	//console.log(table);
	if (typeof input.id !== 'undefined') {
		switch (table) {
			case 'TanqueEsta':
			case 'Tanque':
				input.idTanque = input.id;
				break;
			case 'Lugar':
				input.idLugar = input.id;
				/*
				El uso de mysql.raw() no es recomendado, porque hace que se ignore por completo la validación de inputs
				y deja abierta la posibilidad de una inyección de SQL. En este caso, ya se validó desde GraphQL que
				los valores de input.coordenadas.x y input.coordenadas.y son FLOATS.
				*/
				if (typeof input.coordenadas !== 'undefined') {
					let coordenadas = mysql.raw(
						`ST_GeomFromText('POINT (${input.coordenadas.x} ${input.coordenadas.y})')`
					);
					input.coordenadas = coordenadas;
				}
				break;
			case 'Contenido':
				input.idContenido = input.id;
				break;
			case 'Dueno':
				input.idDueno = input.id;
				break;
			case 'Mantenimiento':
				if (typeof input.id.idTanque !== 'undefined') {
					input.idTanque = input.id.idTanque;
				}
				if (typeof input.id.fechaMantenimiento !== 'undefined') {
					input.fechaMantenimiento = input.id.fechaMantenimiento;
				}
				break;
			case 'EtiquetaRFID':
				input.idEtiqueta = input.id;
				break;
			case 'OperadoPor':
			case 'HistorialPeso':
				if (typeof input.id.idTanque !== 'undefined') {
					input.idTanque = input.id.idTanque;
				}
				if (typeof input.id.fecha !== 'undefined') {
					input.fecha = input.id.fecha;
				}
				break;
			case 'TanqueHaEstado':
				if (typeof input.id.fecha !== 'undefined') {
					input.fecha = input.id.fecha;
				}
			case 'Usuario':
				input.idUsuario = input.id;
				if (typeof input.contrasena !== 'undefined') {
					let salt = await bcryptjs.genSalt(10);
					input.contrasena = await bcryptjs.hash(input.contrasena, salt);
				}
		}
		delete input.id;
	}
	return input;
}

function validateId(id) {
	//console.log(typeof id);
	if (Array.isArray(id)) {
		return id;
	} else if (typeof id === 'string' || typeof id === 'number') {
		return [id];
	} else {
		return Object.values(id);
	}
}

let mysqlMutations = {
	async createValor(client, input, table, mysqlId) {
		if (await checkExists(client, table, mysqlId, validateId(input.id))) {
			return `El ID de ${table} ya existe`;
		} else {
			let resp: String = `Instancia de ${table} creada`;
			input = await modifyId(table, input);
			await client.query(`INSERT INTO ?? SET ?`, [table, input]).catch((error) => {
				console.log(error);
				resp = error.sqlMessage;
			});
			return resp;
		}
	},
	async deleteTanque(client, idTanqueInput) {
		if (await checkExists(client, 'Tanque', ['idTanque'] as any, idTanqueInput)) {
			let resp: String = 'Tanque eliminado';
			await client
				.query('DELETE FROM Tanque WHERE idTanque=?', idTanqueInput)
				.catch((error) => {
					console.log(error);
					if (error.errno == 1451) {
						resp = 'El tanque no puede ser eliminado';
					} else {
						resp = error.sqlMessage;
					}
				});
			return resp;
		} else {
			return 'El ID del tanque no existe';
		}
	},
	async setValor(client, input, idOriginal, table, mysqlId) {
		idOriginal = validateId(idOriginal);
		if (await checkExists(client, table, mysqlId, idOriginal)) {
			//console.log(input);
			input = await modifyId(table, input);
			//console.log(input);
			let resp = `El valor de ${table} ha sido actualizado`;
			var obj = {
				queryString: `UPDATE ?? SET ? WHERE`,
				arr: [table, input],
				mysqlId: mysqlId,
				id: idOriginal
			};
			obj = parseObj(obj);
			//console.log(obj);
			await client.query(obj.queryString, obj.arr).catch((error) => {
				console.log(error);
				resp = error.sqlMessage;
			});
			return resp;
		} else {
			return `El ID de ${table} no existe`;
		}
	},
	async cambiarContrasena(client, input) {
		let user = await getUsuarioByCorreo(client, input.correo);
		if (user.length == 0) {
			return `El usuario con el correo ${input.correo} no existe`;
		} else {
			user = user[0];
			let check = await bcryptjs.compare(input.contraAnterior, user.contrasena);
			if (!check) {
				return 'Contraseña equivocada';
			} else {
				let salt = await bcryptjs.genSalt(10);
				input.nuevaContra = await bcryptjs.hash(input.nuevaContra, salt);
				let resp = '';
				await client
					.query('UPDATE Usuario SET contrasena=? WHERE correo=?', [
						input.nuevaContra,
						input.correo
					])
					.catch((error) => {
						console.log(error);
						resp = error.sqlMessage;
					})
					.then(() => {
						resp = 'Contraseña actualizada exitosamente';
					});
				return resp;
			}
		}
	},
	async login(client, correo, contrasena) {
		let user = await getUsuarioByCorreo(client, correo);
		if (user.length == 0) {
			throw new Error(`El usuario con el correo ${correo} no existe`);
		} else {
			user = user[0];
			let check = await bcryptjs.compare(contrasena, user.contrasena);
			if (!check) {
				throw new Error('Contraseña equivocada');
			} else {
				let serverkey = await fsPromises
					.readFile(path.resolve(__dirname + '/../../server.key'))
					.catch((error) => {
						console.log(error);
						throw new Error('Error interno');
					});
				const refreshJWT = jwt.sign({ correo: user.correo }, serverkey, {
					expiresIn: '1d',
					algorithm: 'RS256'
				});
				await client.query('UPDATE JWT SET jwt=? WHERE idUsuario=?', [
					refreshJWT,
					user.idUsuario
				]);
				const jwt_fechaExpiracion = new Date();
				jwt_fechaExpiracion.setDate(jwt_fechaExpiracion.getDate() + 1);
				const jwt_token = signJWT(user);
				let resp = {
					refreshJWT: refreshJWT,
					jwt_fechaExpiracion: jwt_fechaExpiracion,
					jwt_token: jwt_token
				};
				return resp;
			}
		}
	},
	async refresh(client, refreshJWT) {
		let serverkeyPem = await fsPromises
			.readFile(path.resolve(__dirname + '/../../server.key.pem'))
			.catch((error) => {
				console.log(error);
				throw new Error('Error interno');
			});
		let verification = jwt.verify(refreshJWT, serverkeyPem, {
			algorithms: ['RS256']
		});
		let checkDB = await client.query('SELECT * FROM JWT WHERE jwt=?', [refreshJWT]);
		if (checkDB.length == 0) {
			return 'Token expirado';
		} else {
			let user = await getUsuarioByCorreo(client, verification.correo);
			user = user[0];
			let jwt_token = signJWT(user);
			return jwt_token;
		}
	}
};
export = mysqlMutations;
