const { buildSchema } = require('graphql')

module.exports = buildSchema(`
type Booking{
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}
type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
}
type User {
    _id: ID!
    email: String!
    password: String!
    createdEvents: [Event!]
}
input EventInput{
    title: String!
    description: String!
    price: Float!
    date: String!
}


type RootQuery {
    events: [Event!]!
    user(_id: ID!): User!
    bookings: Booking!
}
type RootMutation{
    createEvent( a:EventInput): Event
    createUser(email: String! password: String!): User
    bookEvent(eventId: ID!): Event
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`)