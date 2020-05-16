var common = require('../Common/mysqlMutations');
import client from '../client';

function quitClient(client, resp) {
	client.quit();
	return resp;
}

let mysqlMutations = {
	async createValor(input, table, mysqlId) {
		var resp = await common.createValor(client, input, table, mysqlId);
		return quitClient(client, resp);
	},
	async deleteTanque(idTanqueInput) {
		var resp = await common.deleteTanque(client, idTanqueInput);
		return quitClient(client, resp);
	},
	async setValor(input, idOriginal, table, mysqlId) {
		let resp = await common.setValor(
			client,
			input,
			idOriginal,
			table,
			mysqlId
		);
		return quitClient(client, resp);
	}
};

export = mysqlMutations;
