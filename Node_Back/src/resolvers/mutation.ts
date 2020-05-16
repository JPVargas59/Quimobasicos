import { IResolvers } from 'graphql-tools';
import mysqlMutations = require('../data/asyncMySQLMutations');

const mutation: IResolvers = {
	Mutation: {
		setTanque(__: void, { tanqueInput, idTanqueOriginal }): any {
			return mysqlMutations.setValor(
				tanqueInput,
				[idTanqueOriginal],
				'Tanque',
				['idTanque']
			);
		},
		createTanque(__: void, { tanqueInput }): any {
			return mysqlMutations.createValor(tanqueInput, 'Tanque', [
				'idTanque'
			]);
		},
		deleteTanque(__: void, { idTanqueInput }): any {
			return mysqlMutations.deleteTanque(idTanqueInput);
		},
		setLugar(__: void, { lugarInput, idLugarOriginal }): any {
			return mysqlMutations.setValor(
				lugarInput,
				[idLugarOriginal],
				'Lugar',
				['idLugar']
			);
		},
		createLugar(__: void, { lugarInput }): any {
			return mysqlMutations.createValor(lugarInput, 'Lugar', ['idLugar']);
		},
		setContenido(__: void, { contenidoInput, idContenidoOriginal }): any {
			return mysqlMutations.setValor(
				contenidoInput,
				[idContenidoOriginal],
				'Contenido',
				['idContenido']
			);
		},
		createContenido(__: void, { contenidoInput }): any {
			return mysqlMutations.createValor(contenidoInput, 'Contenido', [
				'idContenido'
			]);
		},
		setDueno(__: void, { duenoInput, idDuenoOriginal }): any {
			return mysqlMutations.setValor(
				duenoInput,
				[idDuenoOriginal],
				'Dueno',
				['idDueno']
			);
		},
		createDueno(__: void, { duenoInput }): any {
			return mysqlMutations.createValor(duenoInput, 'Dueno', ['idDueno']);
		},
		setMantenimiento(
			__: void,
			{ mantenimientoInput, idMantenimientoOriginal }
		): any {
			return mysqlMutations.setValor(
				mantenimientoInput,
				idMantenimientoOriginal,
				'Mantenimiento',
				['idTanque', 'fechaMantenimiento']
			);
		},
		createMantenimiento(__: void, { mantenimientoInput }): any {
			return mysqlMutations.createValor(
				mantenimientoInput,
				'Mantenimiento',
				['idTanque', 'fechaMantenimiento']
			);
		}
	}
};
export default mutation;
