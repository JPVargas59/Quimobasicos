import { IResolvers } from 'graphql-tools';
const mutation: IResolvers = {
	Mutation: {
		setTanque(__: void, { input, idTanqueOriginal }): any {
			return require('../data/asyncFunctionsMySQL').setTanque(
				input,
				idTanqueOriginal
			);
		}
	}
};
export default mutation;
