var common = require('../Common/mysqlMutations');
import client from '../client';

let mysqlMutations = {
	async setTanque(tanqueInput, idTanqueOriginal) {
		var resp = await common.setTanque(
			client,
			tanqueInput,
			idTanqueOriginal
		);
		client.quit();
		return resp;
	},
	async createTanque(tanqueInput) {
		var resp = await common.createTanque(client, tanqueInput);
		client.quit();
		return resp;
	}
};

export = mysqlMutations;
