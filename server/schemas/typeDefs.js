const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
  }

  type Book {
    bookId: string
    authos: [string]
    description: string
    title: string
    image: string
    link: string
  }

  type Auth{
    token: ID!
    user: User
  }

  type Query{
    me: User
  }

  type Mutation{
    login(email: String, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookInput!): User
    removeBook(bookId: String!): User
  }

  input BookUnput{
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
`;

module.exports = typeDefs;
