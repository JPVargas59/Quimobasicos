import { IResolvers } from 'graphql-tools';
import { GraphQLDateTime } from 'graphql-iso-date';
const query: IResolvers = {
	Query: {
		hello(): string {
			return 'HOLA MUNDO';
		}
	},
	Date: GraphQLDateTime
};
export default query;
