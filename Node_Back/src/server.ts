require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import depthLimit from 'graphql-depth-limit';
import expressPlayGround from 'graphql-playground-middleware-express';
import { createComplexityLimitRule } from 'graphql-validation-complexity';
          
const ComplexityLimitRule = createComplexityLimitRule(1000);

const Port = 5201;
const app = express();
app.use('*', cors());
app.use(compression());

const server = new ApolloServer({
	schema,
	validationRules: [ depthLimit(5), ComplexityLimitRule ],
	introspection: true
});

server.applyMiddleware({ app });

app.route('/').get(
	expressPlayGround({
		endpoint: '/graphql'
	})
);

app.listen(Port, () => {
	console.log(`Servidor listo http://localhost:${Port}`);
});
