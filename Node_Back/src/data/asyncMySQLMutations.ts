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
		let resp = await common.setValor(client, input, idOriginal, table, mysqlId);
		return quitClient(client, resp);
	},
	async cambiarContrasena(input) {
		let resp = await common.cambiarContrasena(client, input);
		return quitClient(client, resp);
	},
	async login(correo, contrasena) {
		let resp = await common.login(client, correo, contrasena);
		return quitClient(client, resp);
	},
	async refresh(refreshJWT) {
		let resp = await common.refresh(client, refreshJWT);
		return quitClient(client, resp);
	},
	async logout(idUsuario) {
		let resp = await common.logout(client, idUsuario);
		return quitClient(client, resp);
	}
};

export = mysqlMutations;
