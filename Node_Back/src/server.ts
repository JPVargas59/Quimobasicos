const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
import mysql from 'mysql';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import schema from './schema';
import expressPlayGround from 'graphql-playground-middleware-express';
import query from './resolvers/query';

const Port = 5201;
const app = express();
app.use('*', cors());
app.use(compression());

const server = new ApolloServer({
	schema,
	introspection: true
});

server.applyMiddleware({ app });

// var connection = mysql.createConnection({
// 	host: '192.168.64.2',
// 	port: 3306,
// 	user: 'xampp',
// 	password: '',
// 	database: 'quimobasicos'
// });

// connection.connect();

app.get(
	'/',
	expressPlayGround({
		endpoint: '/graphql'
	})
);

const httpServer = createServer(app);
httpServer.listen(
	{
		port: Port
	},
	() => {
		console.log(`Servidor listo http://localhost:${Port}`);
		// connection.query('SELECT * FROM Lugar', (error, results, fields) => {
		// 	if (error) {
		// 		throw error;
		// 	}
		// 	console.log(results);
		// });
	}
);
