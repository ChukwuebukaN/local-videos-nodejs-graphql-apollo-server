import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./db.js";

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
	// Grouped and Single Queries
	Query: {
		games() {
			return db.games;
		},
		game(parent, argument) {
			return db.games.find((game) => game.id === argument.id);
		},
		reviews() {
			return db.reviews;
		},
		review(parent, argument) {
			return db.reviews.find((review) => review.id === argument.id);
		},
		authors() {
			return db.authors;
		},
		author(parent, argument) {
			return db.authors.find((author) => author.id === argument.id);
		},
	},
	// Relational and Nested Queries
	Game: {
		review(parent) {
			return db.reviews.filter((review) => review.game_id === parent.id);
		},
	},
	Author: {
		review(parent) {
			return db.reviews.filter((review) => review.author_id === parent.id);
		},
	},
	Review: {
		author(parent) {
			return db.authors.find((author) => author.id === parent.author_id);
		},
		game(parent) {
			return db.games.find((game) => game.id === parent.game_id);
		},
	},
	// Mutations (Create, Update, Delete)
	Mutation: {
		addGame(parent, argument) {
			let game = {
				...argument.game,
				id: Math.floor(Math.random() * 10000).toString(),
			};
			db.games.push(game);

			return game;
		},
		editGame(parent, argument) {
			db.games = db.games.map((game) => {
				if (game.id === argument.id) {
					return { ...game, ...argument.edits };
				}

				return game;
			});

			return db.games.find((game) => game.id === argument.id);
		},
		deleteGame(parent, argument) {
			db.games = db.games.filter((game) => game.id !== argument.id);
			return db.games;
		},
	},
};

// Server Setup
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
