import { IResolvers } from 'graphql-tools';
import asyncFunctionsMySQLQueries = require('../data/asyncMySQLQueries');
const query: IResolvers = {
	Query: {
		tanques(): any {
			return asyncFunctionsMySQLQueries.getTanques();
		},
		tanque(__: void, { idTanque }): any {
			return asyncFunctionsMySQLQueries.getTanque(idTanque);
		},
		lugares(): any {
			return asyncFunctionsMySQLQueries.getLugares();
		},
		lugar(__: void, { idLugar }): any {
			return asyncFunctionsMySQLQueries.getLugar(idLugar);
		},
		usuarios(): any {
			return asyncFunctionsMySQLQueries.getUsuarios();
		},
		usuario(__: void, { idUsuario }): any {
			return asyncFunctionsMySQLQueries.getUsuario(idUsuario);
		},
		contenidos(): any {
			return asyncFunctionsMySQLQueries.getContenidos();
		},
		contenido(__: void, { idContenido }): any {
			return asyncFunctionsMySQLQueries.getContenido(idContenido);
		},
		owners(): any {
			return asyncFunctionsMySQLQueries.getOwners();
		},
		owner(__: void, { idOwner }): any {
			return asyncFunctionsMySQLQueries.getOwner(idOwner);
		},
		etiquetas(): any {
			return asyncFunctionsMySQLQueries.getEtiquetas();
		},
		etiqueta(__: void, { idEtiqueta }): any {
			return asyncFunctionsMySQLQueries.getEtiqueta(idEtiqueta);
		},
		historialPesoTanques(): any {
			return asyncFunctionsMySQLQueries.getHistorialPesoTanques();
		},
		historialPesoTanque(__: void, { idTanque }): any {
			return asyncFunctionsMySQLQueries.getHistorialPesoTanque(idTanque);
		}
	}
};
export default query;
