import { IResolvers } from 'graphql-tools';
import { GraphQLDateTime } from 'graphql-iso-date';
const scalars: IResolvers = {
	Date: GraphQLDateTime
};
export default scalars;
