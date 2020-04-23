var dotenv = require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = require('./schemas/schema').schema;

const resolvers = require('./resolvers/resolver').resolver;

const server = new ApolloServer({
	typeDefs,
	resolvers
});

var app = express();
server.applyMiddleware({ app });

app.listen(4000);
