var common = require('../Common/mysqlMutations');
import client from '../client';

function quitClient(client, resp) {
	client.quit();
	return resp;
}

let mysqlMutations = {
	async setTanque(tanqueInput, idTanqueOriginal) {
		var resp = await common.setTanque(
			client,
			tanqueInput,
			idTanqueOriginal
		);
		return quitClient(client, resp);
	},
	async createTanque(tanqueInput) {
		var resp = await common.createTanque(client, tanqueInput);
		return quitClient(client, resp);
	},
	async deleteTanque(idTanqueInput) {
		var resp = await common.deleteTanque(client, idTanqueInput);
		return quitClient(client, resp);
	},
	async setLugar(lugarInput, idLugarOriginal) {
		var resp = await common.setLugar(client, lugarInput, idLugarOriginal);
		return quitClient(client, resp);
	}
};

export = mysqlMutations;
