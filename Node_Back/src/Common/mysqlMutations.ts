import client from '../client';
async function checkExists(client, table, id, idQuery) {
	var check = await client.query(
		`SELECT * FROM ${table} WHERE ${id}=?`,
		idQuery
	);
	return check.length == 0 ? false : true;
}

let mysqlMutations = {
	async createTanque(client, tanqueInput) {
		if (
			await checkExists(
				client,
				'Tanque',
				'idTanque',
				tanqueInput.idTanque
			)
		) {
			return 'ID del Tanque ya existe';
		} else {
			let resp: String = 'Tanque creado';
			await client
				.query('INSERT INTO Tanque SET ?', tanqueInput)
				.catch((error) => {
					console.log(error);
					resp = error.sqlMessage;
				});
			return resp;
		}
	},
	async deleteTanque(client, idTanqueInput) {
		if (await checkExists(client, 'Tanque', 'idTanque', idTanqueInput)) {
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
		if (await checkExists(client, table, mysqlId, idOriginal)) {
			let resp = `El valor de ${table} ha sido actualizado`;
			await client
				.query(`UPDATE ${table} SET ? WHERE ${mysqlId}=?`, [
					input,
					idOriginal
				])
				.catch((error) => {
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
