import { ContextValue, QueryResolver } from "@/types/Apollo";
import {GraphQLScalarType} from "graphql/type";

const JSONObjectScalar = new GraphQLScalarType({
  name: 'JSONObject',
  description: 'Arbitrary JSON object',
  serialize: (value) => value,
  parseValue: (value) => value,
  parseLiteral: (ast) => ast,
});

export const resolvers: { Query: QueryResolver, JSONObject: GraphQLScalarType } = {
  JSONObject: JSONObjectScalar,
  Query: {
    latestQuote: async (_: never, { id }: { id: string }, { dataSources }: ContextValue) => {
      return dataSources.cryptoCurrencyAPI.getLatestQuote({ id });
    }
  }
};