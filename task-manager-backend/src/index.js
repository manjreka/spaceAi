const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphQL/schema");
const resolvers = require("./graphQL/resolver");
const { connectDB } = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();

async function startServer() {
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await server.listen({ port: process.env.PORT || 4000 });
  console.log(`🚀 Server ready at ${url}`);
}

startServer();
