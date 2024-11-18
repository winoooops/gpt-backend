import dotenv from "dotenv";
import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {ContextValue} from "@/types/Apollo";
import {resolvers} from "@/graphql/resolvers/resolvers";
import {CryptoCurrencyApi} from "@/services/apollo/CryptoCurrency-api";
import {typeDefs} from "@/graphql/schemas";
dotenv.config();

const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers: resolvers
});


const { url } = await startStandaloneServer(server, {
  listen: {
    port: 3000
  },
  context: async () => {
    const { cache } = server;
    return {
      dataSources: {
        cryptoCurrencyAPI: new CryptoCurrencyApi({ cache }),
      },
    }
  }
});

console.log(`graphql server running on ${url}`);