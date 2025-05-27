// const { ApolloError, UserInputError } = require("apollo-server");

// const TaskModel = require("../models/TaskModel");

// const resolvers = {
//   Query: {
//     tasks: () => TaskModel.findAll(),
//     task: (_, { id }) => TaskModel.findById(id),
//     tasksByStatus: (_, { status }) => TaskModel.findByStatus(status),
//   },
//   Mutation: {
//     addTask: (_, { input }) =>
//       TaskModel.create({
//         title: input.title,
//         description: input.description,
//         status: input.status,
//         dueDate: input.dueDate,
//       }),
//     updateTaskStatus: (_, { id, status }) => TaskModel.updateStatus(id, status),
//   },
//   Task: {
//     id: (task) => task._id?.toString() || task.id,
//   },
// };

// module.exports = resolvers;

const { ApolloError, UserInputError } = require("apollo-server");
const TaskModel = require("../models/TaskModel");

const resolvers = {
  Query: {
    tasks: async () => {
      try {
        return await TaskModel.findAll();
      } catch (err) {
        throw new ApolloError("Failed to fetch tasks", "TASK_FETCH_FAILED", {
          originalError: err,
        });
      }
    },
    task: async (_, { id }) => {
      try {
        const task = await TaskModel.findById(id);
        if (!task) {
          throw new UserInputError("Task not found", { invalidArgs: id });
        }
        return task;
      } catch (err) {
        throw new ApolloError("Failed to fetch task", "TASK_FETCH_FAILED", {
          originalError: err,
        });
      }
    },
    tasksByStatus: async (_, { status }) => {
      try {
        return await TaskModel.findByStatus(status);
      } catch (err) {
        throw new ApolloError(
          "Failed to fetch tasks by status",
          "STATUS_FETCH_FAILED",
          { originalError: err }
        );
      }
    },
  },

  Mutation: {
    addTask: async (_, { input }) => {
      const { title, description, status, dueDate } = input;
      if (!title || !description || !status || !dueDate) {
        throw new UserInputError("All fields are required", { input });
      }

      try {
        return await TaskModel.create({ title, description, status, dueDate });
      } catch (err) {
        throw new ApolloError("Failed to create task", "TASK_CREATE_FAILED", {
          originalError: err,
        });
      }
    },

    updateTaskStatus: async (_, { id, status }) => {
      if (!id || !status) {
        throw new UserInputError("ID and Status are required", { id, status });
      }

      try {
        const updated = await TaskModel.updateStatus(id, status);
        if (!updated) {
          throw new ApolloError(
            "Task not found or failed to update",
            "TASK_UPDATE_FAILED"
          );
        }
        return updated;
      } catch (err) {
        throw new ApolloError("Failed to update task", "TASK_UPDATE_FAILED", {
          originalError: err,
        });
      }
    },
  },

  Task: {
    id: (task) => task._id?.toString() || task.id,
  },
};

module.exports = resolvers;
