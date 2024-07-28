export const typeDefs = `#graphql
	type Game {
		id: ID!,
		title: String!,
		price: Int,
		platform: [String!]!
		review: [Review!]
	}
	type Review {
		id: ID!,
		rating: Int!,
		content: String!
		game: Game!
		author: Author!
	}
	type Author {
		id: ID!,
		name: String!,
		verified:  Boolean!
		review: [Review!]
	}
	type Query {
		games: [Game]
		game(id: ID!): Game
		reviews: [Review]
		review(id: ID!): Review
		authors: [Author]
		author(id: ID!): Author
	}
	type Mutation {
		addGame(game: AddGameInput!): Game
		editGame(id: ID!, edits: EditGameInput!): Game
		deleteGame(id: ID!): [Game]
	}
	input AddGameInput {
		title: String!,
		platform: [String!]!
	}
		input EditGameInput {
		title: String,
		platform: [String!]
	}
`;
