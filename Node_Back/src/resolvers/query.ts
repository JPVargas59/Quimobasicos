import { IResolvers } from 'graphql-tools';
const query: IResolvers = {
	Query: {
		myTanques(): [any] {
			return require("../data/asyncFunctionsMySQL").getTanques();
		}
	}
};
export default query;
