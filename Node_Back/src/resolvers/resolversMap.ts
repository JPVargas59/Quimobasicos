import { IResolvers } from 'graphql-tools';
import query from './query';
import scalars from './scalars';
import type from './type';
import mutation from './mutation';
const resolversMap: IResolvers = {
	...query,
	...scalars,
	...type,
	...mutation
};
export default resolversMap;
