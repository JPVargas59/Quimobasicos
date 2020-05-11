import { IResolvers } from 'graphql-tools';
import mysqlMutations = require('../data/asyncMySQLMutations');

const mutation: IResolvers = {
	Mutation: {
		setTanque(__: void, { tanqueInput, idTanqueOriginal }): any {
			return mysqlMutations.setTanque(tanqueInput, idTanqueOriginal);
		},
		createTanque(__: void, { tanqueInput }): any {
			return mysqlMutations.createTanque(tanqueInput);
		},
		deleteTanque(__: void, { idTanqueInput }): any {
			return mysqlMutations.deleteTanque(idTanqueInput);
		},
		setLugar(__: void, { lugarInput, idLugarOriginal }): any {
			return mysqlMutations.setLugar(lugarInput, idLugarOriginal);
		}
	}
};
export default mutation;
