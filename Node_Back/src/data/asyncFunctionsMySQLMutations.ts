var common = require('../Common/mysql');
import client from './../client';

let mysqlMutations = {
	async setTanque(tanqueInput, idTanqueOriginal) {
		var resp = await common.setTanque(
			client,
			tanqueInput,
			idTanqueOriginal
		);
		client.quit();
		return resp;
	}
};

export = mysqlMutations;
