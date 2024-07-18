require('dotenv').config(); 
const express = require('express');
const path = require('path');
// Import the ApolloServer class
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');

// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require('./schemas');
const connectDB = require('./config/connection');

const { authMiddleware } = require('./utils/auth');


const PORT = process.env.PORT || 3001;
// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://book-search-uvvq.onrender.com', 'http://localhost:10000'],
  methods: ['GET', 'POST'], // Adjust HTTP methods as needed
  allowedHeaders: ['Content-Type', 'Authorization'], // Adjust allowed headers as needed
}));

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {

  await connectDB(); // Connect to MongoDB before starting Apollo Server
 
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
  
};

startApolloServer();

