import { IResolvers } from 'graphql-tools';
import mysqlMutations = require('../data/asyncMySQLMutations');

const mutation: IResolvers = {
	Mutation: {
		setTanque(__: void, { tanqueInput, idTanqueOriginal }): any {
			return mysqlMutations.setValor(
				tanqueInput,
				idTanqueOriginal,
				'Tanque',
				'idTanque'
			);
		},
		createTanque(__: void, { tanqueInput }): any {
			return mysqlMutations.createTanque(tanqueInput);
		},
		deleteTanque(__: void, { idTanqueInput }): any {
			return mysqlMutations.deleteTanque(idTanqueInput);
		},
		setLugar(__: void, { lugarInput, idLugarOriginal }): any {
			return mysqlMutations.setValor(
				lugarInput,
				idLugarOriginal,
				'Lugar',
				'idLugar'
			);
		}
	}
};
export default mutation;
