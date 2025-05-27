const { gql } = require("apollo-server");

const typeDefs = gql`
  input AddTaskInput {
    title: String!
    description: String
    status: String!
    dueDate: String
  }

  type Task {
    id: ID!
    title: String!
    description: String
    status: String!
    dueDate: String
  }

  type Query {
    tasks: [Task]
    task(id: ID!): Task
    tasksByStatus(status: String!): [Task]
  }

  type Mutation {
    addTask(input: AddTaskInput!): Task
    updateTaskStatus(id: ID!, status: String!): Task
  }
`;

module.exports = typeDefs;
