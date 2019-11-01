const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");
const typeDefs = gql`
  enum ShoeType {
    JORDAN
    NIKE
    ADDIDAS
    TIMBERLAND
  }
  type User {
    email: String!
    avatar: String!
    shoes: [Shoe]!
  }

  interface Shoe {
    brand: ShoeType!
    size: Int!
    user: User!
  }

  type Sneaker implements Shoe {
    brand: ShoeType!
    size: Int!
    sport: String!
    user: User!
  }

  type Boot implements Shoe {
    brand: ShoeType!
    size: Int!
    hasGrip: Boolean!
    user: User!
  }

  input shoeInput {
    brand: ShoeType
    size: Int
  }

  input NewShoeInput {
    brand: ShoeType!
    size: Int!
  }

  type Query {
    me: User!
    shoes(input: shoeInput): [Shoe]!
  }

  type Mutation {
    newShoe(input: NewShoeInput!): Shoe!
  }
`;

const user = {
  id: 1,
  email: "faisalkhan5464@gmail.com",
  avatar: "http://yoda.png",
  shoes: []
};

const shoes = [
  {
    user: 1,
    brand: "NIKE",
    size: 12,
    sport: "basketball"
  },
  {
    user: 1,
    brand: "TIMBERLAND",
    size: 14,
    hasGrip: true
  }
];

const resolvers = {
  Query: {
    shoes(_, { input }, ctx) {
      return shoes;
    },
    me() {
      return user;
    }
  },

  Mutation: {
    newShoe(_, { input }) {
      return input;
    }
  },

  User: {
    shoes() {
      return shoes;
    }
  },
  Shoe: {
    __resolveType(shoe) {
      if (shoe.sport) return "Sneaker";
      return "Boot";
    }
  },
  Sneaker: {
    user(shoe) {
      return user;
    }
  },
  Boot: {
    user(shoe) {
      return user;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen(4000).then(() => console.log("on port 4000"));
