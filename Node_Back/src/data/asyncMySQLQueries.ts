var common = require('../Common/mysql');
import client from '../client';

let mysqlMutations = {
	async getTanques() {
		var resp = await common.getTanques(client);
		client.quit();
		return resp;
	},
	async getLugaresHaEstadoTanque(id: string) {
		var resp = await common.getHaEstadoTanque(client, id);
		let arrayLugares = JSON.parse(JSON.stringify(resp));
		for (let i = 0; i < arrayLugares.length; i++) {
			arrayLugares[i]['lugar'] = await common.getInfoLugar(
				client,
				arrayLugares[i].idLugar
			);
		}
		client.quit();
		return arrayLugares;
	},
	async getIdEtiqueta(idEtiqueta: string) {
		var resp = await common.getIdEtiqueta(client, idEtiqueta);
		client.quit();
		return resp;
	},
	async getInfoDueno(idDueno: string) {
		var resp = await common.getInfoDueno(client, idDueno);
		client.quit();
		return resp;
	},
	async getContenidoTanque(idContenido: string) {
		var resp = await common.getContenidoTanque(client, idContenido);
		client.quit();
		return resp;
	},
	async getLugarTanque(idTanque: string) {
		var resp = await common.getLugarTanque(client, idTanque);
		client.quit();
		return resp;
	},
	async getInfoLugar(idLugar: string) {
		let resp = await common.getInfoLugar(client, idLugar);
		client.quit();
		console.log(JSON.parse(JSON.stringify(resp)));
		return JSON.parse(JSON.stringify(resp));
	},
	async getTanque(idTanque: string) {
		var resp = await common.getTanque(client, idTanque);
		client.quit();
		return resp;
	},
	async getLugares() {
		var resp = await common.getLugares(client);
		client.quit();
		return resp;
	},
	async getLugar(idLugar: string) {
		var resp = await common.getLugar(client, idLugar);
		client.quit();
		return resp;
	},
	async getUsuarios() {
		var resp = await common.getUsuarios(client);
		client.quit();
		return resp;
	},
	async getUsuario(idUsuario: string) {
		var resp = await common.getUsuario(client, idUsuario);
		client.quit();
		return resp;
	},
	async getContenidos() {
		var resp = await common.getContenidos(client);
		client.quit();
		return resp;
	},
	async getContenido(idContenido: string) {
		var resp = await common.getContenido(client, idContenido);
		client.quit();
		return resp;
	},
	async getOwners() {
		var resp = await common.getOwners(client);
		client.quit();
		return resp;
	},
	async getOwner(idOwner: string) {
		var resp = await common.getOwner(client, idOwner);
		client.quit();
		return resp;
	},
	async getEtiquetas() {
		var resp = await common.getEtiquetas(client);
		client.quit();
		return resp;
	},
	async getEtiqueta(idEtiqueta: string) {
		var resp = await common.getEtiqueta(client, idEtiqueta);
		client.quit();
		return resp;
	},
	async getHistorialPesoTanques() {
		var resp = await common.getHistorialPesoTanques(client);
		client.quit();
		return resp;
	},
	async getHistorialPesoTanque(idTanque: string) {
		var resp = await common.getHistorialPesoTanque(client, idTanque);
		client.quit();
		return resp;
	},
	async getHistorialUbicacionTanques() {
		var resp = await common.getHistorialUbicacionTanques(client);
		client.quit();
		return resp;
	}
};
export = mysqlMutations;