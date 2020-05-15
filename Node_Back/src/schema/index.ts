import 'graphql-import-node';
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './../resolvers/resolversMap';
import typeDefs from './schema.graphql';
import { createRateLimitDirective } from 'graphql-rate-limit'
const rateLimitDirective = createRateLimitDirective({
    identifyContext: (context) => {
        return context.id
    },
})

const schema: GraphQLSchema = makeExecutableSchema({
	
	typeDefs,
	resolvers,
    schemaDirectives: {
        rateLimit: rateLimitDirective,
    },
});
export default schema;
