require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import depthLimit from 'graphql-depth-limit';
import expressPlayGround from 'graphql-playground-middleware-express';
import { createComplexityLimitRule } from 'graphql-validation-complexity';
import { verify } from 'crypto';
let jwt = require('jsonwebtoken');
let fs = require('fs');
let path = require('path');

let checkToken = (token) => {
	try {
		if (token) {
			let serverkeyPem = fs.readFileSync(
				path.resolve(__dirname + '/../server.key.pem')
			);
			return jwt.verify(token, serverkeyPem, { algorithms: ['RS256'] });
		}
		return null;
	} catch (error) {
		return null;
	}
};

const ComplexityLimitRule = createComplexityLimitRule(2000);

const Port = 5201;
const app = express();
app.use('*', cors());
app.use(compression());

const server = new ApolloServer({
	schema,
	validationRules: [depthLimit(5), ComplexityLimitRule],
	introspection: true,
	context: ({ req }) => {
		const tokenHeader = req.headers.authorization || '';
		const token = checkToken(tokenHeader);
		return {
			token
		};
	}
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
