import { IResolvers } from 'graphql-tools';
import query from './query';
import scalars from './scalars';

const resolversMap: IResolvers = {
	...query,
	...scalars
};
export default resolversMap;
