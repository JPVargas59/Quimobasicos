import { IResolvers } from 'graphql-tools';
import mysqlMutations = require('../data/asyncMySQLMutations');

const mutation: IResolvers = {
	Mutation: {
		setTanque(__: void, { input, idTanqueOriginal }): any {
			return mysqlMutations.setTanque(input, idTanqueOriginal);
		}
	}
};
export default mutation;
