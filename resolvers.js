const Movie = require('./models/Movie');

const resolvers = {
    Query: {
        getAllMovies: async () => {
            return await Movie.find();
        },
        getMovieById: async (_, { id }) => {
            return await Movie.findById(id);
        },
    },

    Mutation: {
        addMovie: async (_, { name, director_name, production_house, release_date, rating }) => {
            const newMovie = new Movie({
                name,
                director_name,
                production_house,
                release_date,
                rating,
            });
            return await newMovie.save();
        },

        updateMovie: async (_, { id, name, director_name, production_house, release_date, rating }) => {
            const movie = await Movie.findById(id);
            if (!movie) {
                throw new Error('Movie not found');
            }

            if (name) movie.name = name;
            if (director_name) movie.director_name = director_name;
            if (production_house) movie.production_house = production_house;
            if (release_date) movie.release_date = release_date;
            if (rating !== undefined) movie.rating = rating;

            return await movie.save();
        },

        deleteMovie: async (_, { id }) => {
            const movie = await Movie.findByIdAndDelete(id);
            if (!movie) {
                throw new Error('Movie not found');
            }
            return movie;
        },
    },
};

module.exports = resolvers;
