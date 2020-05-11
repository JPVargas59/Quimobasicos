import { IResolvers } from 'graphql-tools';
import mysqlMutations = require('../data/asyncMySQLMutations');

const mutation: IResolvers = {
	Mutation: {
		setTanque(__: void, { input, idTanqueOriginal }): any {
			return mysqlMutations.setTanque(input, idTanqueOriginal);
		},
		createTanque(__: void, { input }): any {
			return mysqlMutations.createTanque(input);
		}
	}
};
export default mutation;
