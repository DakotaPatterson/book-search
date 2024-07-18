const express = require('express');

// Import the ApolloServer class
const { ApolloServer } = require('apollo-server-expres');
const { expressMiddleware } = require('@apollo/server/express4');

// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const { authMiddleware } = require('./utils/auth');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authMiddleware({ req }), // Apply the auth middleware to the context
});

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Adjust as necessary for your frontend
  credentials: true,
}));

// Create a new instance of an Apollo server with the GraphQL schema
const startServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startServer();

