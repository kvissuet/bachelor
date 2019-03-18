export default `
    type Query {
        contestant(_id: ID!): Contestant!
    }
    type Mutation {
        createContestant(input: Contestant!): Contestant!
    }

    type Contestant {
        _id: ID!
        name: String!
        age: Number!
        occupation: String!
        photoUrl: String
    }

`