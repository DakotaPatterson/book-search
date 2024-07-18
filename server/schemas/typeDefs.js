const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth{
    token: ID!
    user: User
  }

  type Query{
    getSingleUser(id: ID, username: String): User
    users: [User]
    user(id: ID!): User
  }

  type Mutation{
    login(email: String, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookInput!): User
    removeBook(bookId: ID!): User
  }

  input BookInput{
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
`;

module.exports = typeDefs;
