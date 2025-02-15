const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');

// Import schema and resolvers
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Load environment variables
dotenv.config();

// MongoDB Atlas connection string
const mongodb_atlas_url = process.env.MONGODB_URL;

// MongoDB connection
const connectDB = async () => {
    try {
        mongoose.connect(mongodb_atlas_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Success Mongodb connection');
    } catch (error) {
        console.log('Error Mongodb connection:', error.message);
    }
};

// Initialize Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Define Express app
const app = express();
app.use(express.json());
app.use('*', cors());

// Apply Apollo Server as middleware to Express app
server.applyMiddleware({ app });

// Start Express server
app.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
    connectDB();
});
