"use client";

import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      status
      dueDate
    }
  }
`;

export const GET_TASK_BY_ID = gql`
  query GetTaskById($id: ID!) {
    task(id: $id) {
      id
      title
      description
      status
      dueDate
    }
  }
`;

export const GET_TASKS_BY_STATUS = gql`
  query GetTasksByStatus($status: String!) {
    tasksByStatus(status: $status) {
      id
      title
      status
      dueDate
    }
  }
`;
