async function checkTankExists(client, idTanque) {
	var checkTanque = await client.query(
		'SELECT * FROM Tanque WHERE idTanque=?',
		idTanque
	);
	if (checkTanque.length == 0) {
		return false;
	} else {
		return true;
	}
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
	}
};
export = mysqlMutations;
