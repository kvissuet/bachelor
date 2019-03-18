import mongoose from 'mongoose';
const { GraphQLServer } = require('graphql-yoga')
// 1
const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
  link(id: ID!): Link
}
type Mutation {
  post(url: String!, description: String!): Link!
  updateLink(id: ID!, url: String, description: String): Link
  deleteLink(id: ID!): Int!
}
type Link {
  id: ID!
  description: String!
  url: String!
}
`
//
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
},
{
  id: 'link-1',
  url: 'link-1',
  description: 'Fullstack tutorial for GraphQL'
}]
let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // 2
    feed: () => links,
    link: (parent,args) => {
      const {id} = args
      return links.filter(link => link.id === id)[0]
    }
  },
  //
  Mutation: {
  // 2
    post: (parent, args) => {
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (parent, args) => {
      const {id, url, description} = args
      const link = links.filter(link => link.id === id)[0]
      if (url){
        link['url'] = url
      }
      if (description){
        link['description'] = description
      }
      return link
    },
    deleteLink: (parents, args) => {
      const before = links.length
      links = links.filter(link => link.id !== args.id)
      return (before - links.length)
    }
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  }
}
// 3
const db = require('./config/keys').mongodb;
console.log(db)
mongoose
  .connect(db)
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.log(err));
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
