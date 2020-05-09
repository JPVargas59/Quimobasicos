import { IResolvers } from 'graphql-tools';
const query: IResolvers = {
	Query: {
		tanques(): [any] {
			return require('../data/asyncFunctionsMySQL').getTanques();
		},
		tanque(__: void, { idTanque }): any {
			return require('../data/asyncFunctionsMySQL').getTanque(idTanque);
		},
		lugares(): [any] {
			return require('../data/asyncFunctionsMySQL').getLugares();
		},
		lugar(__: void, { idLugar }): any {
			return require('../data/asyncFunctionsMySQL').getLugar(idLugar);
		},
		usuarios(): [any] {
			return require('../data/asyncFunctionsMySQL').getUsuarios();
		},
		usuario(__: void, { idUsuario }): any {
			return require('../data/asyncFunctionsMySQL').getUsuario(idUsuario);
		},
		contenidos(): [any] {
			return require('../data/asyncFunctionsMySQL').getContenidos();
		},
		contenido(__: void, { idContenido }): any {
			return require('../data/asyncFunctionsMySQL').getContenido(
				idContenido
			);
		},
		owners(): [any] {
			return require('../data/asyncFunctionsMySQL').getOwners();
		},
		owner(__: void, { idOwner }): any {
			return require('../data/asyncFunctionsMySQL').getOwner(idOwner);
		},
		etiquetas(): [any] {
			return require('../data/asyncFunctionsMySQL').getEtiquetas();
		},
		etiqueta(__: void, { idEtiqueta }): any {
			return require('../data/asyncFunctionsMySQL').getEtiqueta(
				idEtiqueta
			);
		},
		historialPesoTanques(): [any] {
			return require('../data/asyncFunctionsMySQL').getHistorialPesoTanques();
		},
		historialPesoTanque(__: void, { idTanque }): any {
			return require('../data/asyncFunctionsMySQL').getHistorialPesoTanque(
				idTanque
			);
		}
	}
};
export default query;
