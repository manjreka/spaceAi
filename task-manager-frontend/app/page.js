"use client";

import { useQuery } from "@apollo/client";
import { GET_TASKS, GET_TASKS_BY_STATUS } from "../graphql/queries";
import TaskCard from "@/components/TaskCard";
import Link from "next/link";
import { FaFilter } from "react-icons/fa6";

import { useState } from "react";

export default function Home() {
  const [statusFilter, setStatusFilter] = useState("All");

  const { loading, error, data, refetch } = useQuery(
    statusFilter === "All" ? GET_TASKS : GET_TASKS_BY_STATUS,
    {
      variables: statusFilter === "All" ? {} : { status: statusFilter },
      fetchPolicy: "network-only",
    }
  );

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const tasks =
    statusFilter === "All" ? data?.tasks || [] : data?.tasksByStatus || [];

  return (
    <main className=" max-w-3xl mx-auto">
      <div className="flex justify-between items-center p-5  bg-gradient-to-r from-gray-00/80 via-slate-900/80 to-gray-1000/80 backdrop-blur-xl border-b border-gray-700/50">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
            Task Manager
          </h1>
          <p className="text-gray-400 mt-1">
            Organize and track your tasks efficiently
          </p>
        </div>
        <Link href="/createEdit">
          <button className="bg-gradient-to-r p-3 rounded-2xl from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-medium shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-violet-500/40">
            ➕ Add Task
          </button>
        </Link>
      </div>

      <div className="flex justify-between items-center p-5 border-2 m-5 rounded-2xl bg-gradient-to-r from-gray-1000/80 via-slate-800/80 to-gray-0/80">
        <div className="flex items-center space-x-3">
          <FaFilter size={25} />
          <p className="text-2xl">Filter</p>
        </div>
        <select
          className="bg-gray-200 text-gray-700 border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500  transition"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskCard task={task} />
          </li>
        ))}
      </ul>
    </main>
  );
}
