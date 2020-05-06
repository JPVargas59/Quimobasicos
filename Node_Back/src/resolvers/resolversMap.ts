import { IResolvers } from 'graphql-tools';
import query from './query';
import scalars from './scalars';
import type from './type';
const resolversMap: IResolvers = {
	...query,
	...scalars,
	...type
};
export default resolversMap;
