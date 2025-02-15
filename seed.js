const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/Movie');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB...');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Read JSON file
const movies = JSON.parse(fs.readFileSync('./Sample_Movies_Records.json', 'utf-8'));

// Insert data
const seedDB = async () => {
    try {
        await Movie.deleteMany(); // Clear existing data
        await Movie.insertMany(movies);
        console.log('Movies successfully seeded!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Seeding error:', error);
    }
};

// Run seeding
seedDB();
