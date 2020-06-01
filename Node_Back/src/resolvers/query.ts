import { IResolvers } from 'graphql-tools';
import asyncFunctionsMySQLQueries = require('../data/asyncMySQLQueries');
const query: IResolvers = {
	Query: {
		tanques(_: void, __: void, { token }): any {
			if (!token) {
				throw new Error('Acceso no autorizado');
			} else {
				return asyncFunctionsMySQLQueries.getTanques();
			}
		},
		tanque(__: void, { idTanque }, { token }): any {
			if (!token) {
				throw new Error('Acceso no autorizado');
			} else {
				return asyncFunctionsMySQLQueries.getTanque(idTanque);
			}
		},
		lugares(_: void, __: void, { token }): any {
			if (!token) {
				throw new Error('Acceso no autorizado');
			} else {
				return asyncFunctionsMySQLQueries.getLugares();
			}
		},
		lugar(__: void, { idLugar }, { token }): any {
			if (!token) {
				throw new Error('Acceso no autorizado');
			} else {
				return asyncFunctionsMySQLQueries.getLugar(idLugar);
			}
		},
		usuarios(_: void, __: void, { token }): any {
			if (!token) {
				throw new Error('Acceso no autorizado');
			} else {
				return asyncFunctionsMySQLQueries.getUsuarios();
			}
		},
		usuario(__: void, { idUsuario }, { token }): any {
			if (!token) {
				throw new Error('Acceso no autorizado');
			} else {
				return asyncFunctionsMySQLQueries.getUsuario(idUsuario);
			}
		},
		contenidos(_: void, __: void, { token }): any {
			if (!token) {
				throw new Error('Acceso no autorizado');
			} else {
				return asyncFunctionsMySQLQueries.getContenidos();
			}
		},
		contenido(__: void, { idContenido }, { token }): any {
			if (!token) {
				throw new Error('Acceso no autorizado');
			} else {
				return asyncFunctionsMySQLQueries.getContenido(idContenido);
			}
		},
		owners(_: void, __: void, { token }): any {
			if (!token) {
				throw new Error('Acceso no autorizado');
			} else {
				return asyncFunctionsMySQLQueries.getOwners();
			}
		},
		owner(__: void, { idOwner }, { token }): any {
			if (!token) {
				throw new Error('Acceso no autorizado');
			} else {
				return asyncFunctionsMySQLQueries.getOwner(idOwner);
			}
		},
		etiquetas(_: void, __: void, { token }): any {
			if (!token) {
				throw new Error('Acceso no autorizado');
			} else {
				return asyncFunctionsMySQLQueries.getEtiquetas();
			}
		},
		etiqueta(__: void, { idEtiqueta }, { token }): any {
			if (!token) {
				throw new Error('Acceso no autorizado');
			} else {
				return asyncFunctionsMySQLQueries.getEtiqueta(idEtiqueta);
			}
		},
		historialPesoTanques(_: void, __: void, { token }): any {
			if (!token) {
				throw new Error('Acceso no autorizado');
			} else {
				return asyncFunctionsMySQLQueries.getHistorialPesoTanques();
			}
		},
		historialPesoTanque(__: void, { idTanque }, { token }): any {
			if (!token) {
				throw new Error('Acceso no autorizado');
			} else {
				return asyncFunctionsMySQLQueries.getHistorialPesoTanque(idTanque);
			}
		},
		historialMantenimientos(_: void, __: void, { token }): any {
			if (!token) {
				throw new Error('Acceso no autorizado');
			} else {
				return asyncFunctionsMySQLQueries.getHistorialMantenimimientosTanques();
			}
		},
		historialMantenimientoTanque(__: void, { idTanque }, { token }): any {
			if (!token) {
				throw new Error('Acceso no autorizado');
			} else {
				return asyncFunctionsMySQLQueries.getMantenimientoTanque(idTanque);
			}
		},
		operaciones(_: void, __: void, { token }): any {
			if (!token) {
				throw new Error('Acceso no autorizado');
			} else {
				return asyncFunctionsMySQLQueries.getOperacionesTanques();
			}
		},
		operacionesTanque(__: void, { idTanque }, { token }): any {
			if (!token) {
				throw new Error('Acceso no autorizado');
			} else {
				return asyncFunctionsMySQLQueries.getOperacionesTanque(idTanque);
			}
		}
	}
};
export default query;
