export const typeDefs = `
  type CMCResponse {
    data: JSONObject!
    status: Status!
  }

  type Status {
    timestamp: String!
    error_code: Int!
    error_message: String!
    elapsed: Int!
    credit_count: Int!
  }
  
  scalar JSONObject

  type Query {
    latestQuote(id: String!): CMCResponse
  }
`;