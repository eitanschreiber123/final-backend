import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./typeDefs.js";
import { createHash } from 'crypto';

const hash = string => createHash('sha256').update(string).digest('hex');

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.applyMiddleware({ app });

  await mongoose.connect("mongodb://my_user:my_pwd@18.118.82.1:25017/dyner", {
    useNewUrlParser: true
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
