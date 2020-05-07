require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import expressPlayGround from 'graphql-playground-middleware-express';

const Port = 5201;
const app = express();
app.use('*', cors());
app.use(compression());

const server = new ApolloServer({
	schema,
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
