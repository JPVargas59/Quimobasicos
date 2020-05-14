import mysql from 'mysql';
async function checkExists(
	client,
	table,
	mysqlId = [String],
	idQuery = [String]
) {
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

function parseObj(obj) {
	//console.log(obj.mysqlId.length);
	for (var i = 0; i < obj.mysqlId.length; i++) {
		if (i == obj.id.length - 1) {
			obj.queryString += `?? = ?`;
		} else {
			obj.queryString += `?? = ? AND`;
		}
		//console.log(i);
		//console.log(obj.queryString);
		obj.arr.push(obj.mysqlId[i]);
		obj.arr.push(obj.id[i]);
	}
	return obj;
}

function modifyId(table, input) {
	if (typeof input.id !== 'undefined') {
		switch (table) {
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
				let coordenadas = mysql.raw(
					`ST_GeomFromText('POINT (${input.coordenadas.x} ${input.coordenadas.y})')`
				);
				input.coordenadas = coordenadas;
				break;
			case 'Contenido':
				input.idContenido = input.id;
				break;
			case 'Dueno':
				input.idDueno = input.id;
				break;
			case 'Mantenimiento':
				input.idTanque = input.id.idTanque;
				input.fechaMantenimiento = input.id.fechaMantenimiento;
		}
		delete input.id;
	}
	return input;
}

let mysqlMutations = {
	async createValor(client, input, table, mysqlId) {
		if (
			await checkExists(client, table, mysqlId, Object.values(input.id))
		) {
			return `El ID de {table} ya existe`;
		} else {
			let resp: String = `Instancia de ${table} creada`;
			input = modifyId(table, input);
			await client
				.query(`INSERT INTO ?? SET ?`, [table, input])
				.catch((error) => {
					console.log(error);
					resp = error.sqlMessage;
				});
			return resp;
		}
	},
	async deleteTanque(client, idTanqueInput) {
		if (
			await checkExists(
				client,
				'Tanque',
				['idTanque'] as any,
				idTanqueInput
			)
		) {
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
		if (
			await checkExists(client, table, mysqlId, Object.values(idOriginal))
		) {
			input = modifyId(table, input);
			let resp = `El valor de ${table} ha sido actualizado`;
			var obj = {
				queryString: `UPDATE ?? SET ? WHERE`,
				arr: [table, input],
				mysqlId: mysqlId,
				id: idOriginal
			};
			obj = parseObj(obj);
			await client.query(obj.queryString, obj.arr).catch((error) => {
				console.log(error);
				resp = error.sqlMessage;
			});
			return resp;
		} else {
			return `El ID de ${table} no existe`;
		}
	}
};
export = mysqlMutations;
