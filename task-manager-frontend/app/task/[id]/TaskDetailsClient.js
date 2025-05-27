"use client";

import { useEffect, useState } from "react";
import client from "../../../lib/apolloClient";
import { GET_TASK_BY_ID } from "../../../graphql/queries";
import Link from "next/link";
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaClipboardList,
} from "react-icons/fa";

const statusStyles = {
  todo: {
    icon: <FaClipboardList className="text-yellow-500" />,
    text: "To Do",
    badge: "bg-yellow-100 text-yellow-800",
  },
  "in progress": {
    icon: <FaHourglassHalf className="text-blue-500" />,
    text: "In Progress",
    badge: "bg-blue-100 text-blue-800",
  },
  done: {
    icon: <FaCheckCircle className="text-green-500" />,
    text: "Done",
    badge: "bg-green-100 text-green-800",
  },
};

export default function TaskDetailsClient({ id }) {
  const [task, setTask] = useState(null);

  useEffect(() => {
    client
      .query({
        query: GET_TASK_BY_ID,
        variables: { id },
        fetchPolicy: "no-cache",
      })
      .then(({ data }) => setTask(data.task));
  }, [id]);

  if (!task) return <p className="p-6 text-center text-gray-600">Loading...</p>;

  const { icon, text, badge } = statusStyles[task.status.toLowerCase()] || {
    icon: null,
    text: task.status,
    badge: "bg-gray-100 text-gray-800",
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-2xl font-bold text-violet-700">{task.title}</h1>

          <div
            className={`inline-flex items-center gap-2 mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-medium ${badge}`}
          >
            {icon}
            {text}
          </div>
        </div>

        <div className="text-gray-700 space-y-2">
          <div>
            <strong className="text-gray-900">Description:</strong>
            <p className="mt-1">{task.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4">
            <p>
              <strong className="text-gray-900">Due Date:</strong>{" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </p>

            <Link href={`/createEdit/${id}`}>
              <button className="mt-2 sm:mt-0 bg-violet-600 hover:bg-violet-700 text-white font-medium px-5 py-2 rounded transition">
                ✏️ Edit Task
              </button>
            </Link>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="text-blue-600 hover:underline text-sm inline-block"
          >
            ← Back to task list
          </Link>
        </div>
      </div>
    </main>
  );
}
