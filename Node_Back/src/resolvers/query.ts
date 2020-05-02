import { IResolvers } from 'graphql-tools';
const query: IResolvers = {
	Query: {
		hello(): string {
			return 'HOLA MUNDO';
		}
	}
};
export default query;
