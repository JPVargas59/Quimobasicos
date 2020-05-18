import { IResolvers } from 'graphql-tools';
import asyncFunctions = require('../data/asyncMySQLQueries');
const type: IResolvers = {
	Tanque: {
		haEstado: (parent) => {
			return asyncFunctions.getLugaresHaEstadoTanque(parent.idTanque);
		},
		idEtiqueta: (parent) => {
			return asyncFunctions.getIdEtiqueta(parent.idEtiqueta);
		},
		dueno: (parent) => {
			return asyncFunctions.getInfoDueno(parent.idDueno);
		},
		contenidoTanque: (parent) => {
			return asyncFunctions.getContenidoTanque(parent.idContenido);
		},
		lugar: (parent) => {
			return asyncFunctions.getLugarTanque(parent.idTanque);
		},
		mantenimientos: (parent) => {
			return asyncFunctions.getMantenimientoTanque(parent.idTanque);
		},
		operaciones: (parent) => {
			return asyncFunctions.getOperacionesTanque(parent.idTanque);
		}
	}
};
export default type;
