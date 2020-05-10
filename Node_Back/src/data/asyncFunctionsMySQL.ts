var common = require('../Common/mysql');
import client from './../client';

exports.getTanques = async () => {
	var resp = await common.getTanques(client);
	client.quit();
	return resp;
};
exports.getLugaresHaEstadoTanque = async (id: string) => {
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
};

exports.getIdEtiqueta = async (idEtiqueta: string) => {
	var resp = await common.getIdEtiqueta(client, idEtiqueta);
	client.quit();
	return resp;
};

exports.getInfoDueno = async (idDueno: string) => {
	var resp = await common.getInfoDueno(client, idDueno);
	client.quit();
	return resp;
};
exports.getContenidoTanque = async (idContenido: string) => {
	var resp = await common.getContenidoTanque(client, idContenido);
	client.quit();
	return resp;
};
exports.getLugarTanque = async (idTanque: string) => {
	var resp = await common.getLugarTanque(client, idTanque);
	client.quit();
	return resp;
};

exports.getInfoLugar = async (idLugar: string) => {
	let resp = await common.getInfoLugar(client, idLugar);
	client.quit();
	console.log(JSON.parse(JSON.stringify(resp)));
	return JSON.parse(JSON.stringify(resp));
};

exports.getTanque = async (idTanque: string) => {
	var resp = await common.getTanque(client, idTanque);
	client.quit();
	return resp;
};

exports.getLugares = async () => {
	var resp = await common.getLugares(client);
	client.quit();
	return resp;
};
exports.getLugar = async (idLugar: string) => {
	var resp = await common.getLugar(client, idLugar);
	client.quit();
	return resp;
};

exports.getUsuarios = async () => {
	var resp = await common.getUsuarios(client);
	client.quit();
	return resp;
};

exports.getUsuario = async (idUsuario: string) => {
	var resp = await common.getUsuario(client, idUsuario);
	client.quit();
	return resp;
};
exports.getContenidos = async () => {
	var resp = await common.getContenidos(client);
	client.quit();
	return resp;
};

exports.getContenido = async (idContenido: string) => {
	var resp = await common.getContenido(client, idContenido);
	client.quit();
	return resp;
};

exports.getOwners = async () => {
	var resp = await common.getOwners(client);
	client.quit();
	return resp;
};

exports.getOwner = async (idOwner: string) => {
	var resp = await common.getOwner(client, idOwner);
	client.quit();
	return resp;
};
exports.getEtiquetas = async () => {
	var resp = await common.getEtiquetas(client);
	client.quit();
	return resp;
};
exports.getEtiqueta = async (idEtiqueta: string) => {
	var resp = await common.getEtiqueta(client, idEtiqueta);
	client.quit();
	return resp;
};
exports.getHistorialPesoTanques = async () => {
	var resp = await common.getHistorialPesoTanques(client);
	client.quit();
	return resp;
};

exports.getHistorialPesoTanque = async (idTanque: string) => {
	var resp = await common.getHistorialPesoTanque(client, idTanque);
	client.quit();
	return resp;
};

exports.getHistorialUbicacionTanques = async () => {
	var resp = await common.getHistorialUbicacionTanques(client);
	client.quit();
	return resp;
};
