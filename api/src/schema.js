const { gql } = require("apollo-server");

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    pets: [Pet]!
  }

  type Pet {
    id: ID
    createdAt: String!
    name: String!
    type: String!
    img: String
    owner: User!
  }

  input newPetInput {
    name: String!
    type: String!
  }

  input petInput {
    name: String
    type: String
  }

  type Query {
    pets(input: petInput): [Pet]!
    pet(input: petInput): Pet
  }

  type Mutation {
    newPet(input: newPetInput): Pet!
  }
`;

module.exports = typeDefs;
