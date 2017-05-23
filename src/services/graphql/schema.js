const typeDefinitions = `

type Category {
  id: String!
  description: String
}

type Office {
  id: String!
  name: String!
  currency: String!
  users: [User]
}

type User {
  id: String!
  firstName: String
  lastName: String
  username: String!
  office: Office
  transactions: [Transaction]
}

type Transaction {
  id: String!
  date: String
  currency: String
  amount: Int
  office: Office
  comment: String
  user: User
}

type AuthPayload {
  token: String # JSON Web Token
  data: User
}

input transactionInput {
  title: String!
  content: String!
  summary: String
  categoryId: String
}

# the schema allows the following queries:
type RootQuery {
  viewer: User
  user(username: String!): User
  users: [User]
  transactions(categoryId: String!): [Transaction]
  transaction(id: String!) : Transaction
}

# this schema allows the following mutations:
type RootMutation {
  signUp (
    username: String!
    password: String!
    firstName: String
    lastName: String
  ): User

  logIn (
    username: String!
    password: String!
  ): AuthPayload

  createTransaction (
    transaction: transactionInput
  ): Transaction

  removeTransaction (
    id: String! # id of post to remove
  ): Transaction

}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: RootQuery
  mutation: RootMutation
}
`

module.exports = [typeDefinitions]
