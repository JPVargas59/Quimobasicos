async function checkTankExists(client, idTanque) {
	var checkTanque = await client.query(
		'SELECT * FROM Tanque WHERE idTanque=?',
		idTanque
	);
	return checkTanque.length == 0 ? false : true;
}

let mysqlMutations = {
	async setTanque(client, tanqueInput, idTanqueOriginal) {
		if ((await checkTankExists(client, idTanqueOriginal)) == false) {
			return 'Tanque no encontrado';
		} else {
			await client
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
	},
	async createTanque(client, tanqueInput) {
		if ((await checkTankExists(client, tanqueInput.idTanque)) == false) {
			await client
				.query('INSERT INTO Tanque SET ?', tanqueInput)
				.catch((error) => {
					console.log(error);
					return error.sqlMessage;
				});
			return 'Tanque creado';
		} else {
			return 'ID del Tanque ya existe';
		}
	},
	async deleteTanque(client, idTanqueInput) {
		if ((await checkTankExists(client, idTanqueInput)) == false) {
			return 'El tanque no existe';
		} else {
			await client
				.query('DELETE FROM Tanque WHERE idTanque=?', idTanqueInput)
				.catch((error) => {
					console.log(error);
					return error.sqlMessage;
				});
			return 'Tanque eliminado';
		}
	}
};
export = mysqlMutations;
