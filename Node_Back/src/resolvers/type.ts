import { async } from '@angular/core/testing';
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
	},
	Lugar : {
		tanques: (parent) =>{
			return asyncFunctions.getTanquesEnLugar(parent.idLugar);
		}
	},
	Contenido : {
		tanques: (parent) =>{
			return asyncFunctions.getTanquesConContenido(parent.idContenido);
		}
	},
	Operador : {
		supervisor: (parent) => {
			return asyncFunctions.getSupervisor(parent.idSupervisor);
		}
	},
	Operacion : {
		tanque : (parent) => {
			return asyncFunctions.getTanque(parent.idTanque);
		},
		operador : (parent) => {
			return asyncFunctions.getUsuario(parent.idUsuario);
		}
	},
	Mantenimiento : {
		tanque : (parent) => {
			return asyncFunctions.getTanque(parent.idTanque);
		}
	},
	HistorialTanque : {
		lugar : (parent) => {
			let a = asyncFunctions.getLugar(parent.idLugar);
			return asyncFunctions.getLugar(parent.idLugar);
		}
	}
};
export default type;
