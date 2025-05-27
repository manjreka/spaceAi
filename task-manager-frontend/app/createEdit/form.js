"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TASK, UPDATE_TASK_STATUS } from "../../graphql/mutations";
import { useRouter } from "next/navigation";
import { GET_TASK_BY_ID, GET_TASKS } from "../../graphql/queries";
import Link from "next/link";

export default function AddTaskForm({ id }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Todo");
  const [dueDate, setDueDate] = useState("");

  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const isEdit = Boolean(id);

  const router = useRouter();

  const { data, loading: loadingQuery } = useQuery(GET_TASK_BY_ID, {
    variables: { id },
    skip: !isEdit, // skip fetching if no ID
  });

  const [addTask, { loading: loadingAdd, error: errorAdd }] =
    useMutation(ADD_TASK);

  const [updateStatus, { loading: loadingUpdate, error: errorUpdate }] =
    useMutation(UPDATE_TASK_STATUS);

  useEffect(() => {
    if (data?.task) {
      const { title, description, status, dueDate } = data.task;
      setTitle(title);
      setDescription(description);
      setStatus(status);
      setDueDate(dueDate?.slice(0, 10));
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = { title: "", description: "", dueDate: "" };
    let isValid = true;

    if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters long.";
      isValid = false;
    }

    if (description.trim().length < 10) {
      newErrors.description =
        "Description must be at least 10 characters long.";
      isValid = false;
    }

    if (!dueDate) {
      newErrors.dueDate = "Due date is required.";
      isValid = false;
    } else if (new Date(dueDate) < new Date(new Date().toDateString())) {
      newErrors.dueDate = "Due date cannot be in the past.";
      isValid = false;
    }

    setFormErrors(newErrors);
    if (!isValid) return;

    try {
      if (isEdit) {
        await updateStatus({ variables: { id, status } });
      } else {
        await addTask({
          variables: {
            input: { title, description, status, dueDate },
          },
          refetchQueries: [{ query: GET_TASKS }],
        });
      }
      router.push("/");
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 space-y-4 mt-5  border rounded-md"
    >
      <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
        {isEdit ? "Edit Task Status" : "Add New Task"}
      </h1>
      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full disabled:cursor-not-allowed disabled:bg-gray-800"
        value={title}
        disabled={isEdit}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      {formErrors.title && (
        <p className="text-red-500 text-sm">*{formErrors.title}</p>
      )}

      <textarea
        placeholder="Description"
        className="border p-2 w-full disabled:cursor-not-allowed disabled:bg-gray-800"
        value={description}
        disabled={isEdit}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      {formErrors.description && (
        <p className="text-red-500 text-sm">*{formErrors.description}</p>
      )}
      <select
        className="bg-gray-200 w-full text-gray-700 border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500  transition"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <input
        type="date"
        className="border p-2 w-full disabled:cursor-not-allowed disabled:bg-gray-800"
        value={dueDate}
        disabled={isEdit}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      {formErrors.dueDate && (
        <p className="text-red-500 text-sm">*{formErrors.dueDate}</p>
      )}
      <button
        type="submit"
        disabled={loadingAdd || loadingUpdate || loadingQuery}
        className="mt-2 sm:mt-0 bg-violet-600 hover:bg-violet-700 text-white font-medium px-5 py-2 rounded transition"
      >
        {loadingAdd || loadingUpdate
          ? "Saving..."
          : isEdit
          ? "Update Status"
          : "Add Task"}
      </button>

      {(errorAdd || errorUpdate) && (
        <p className="text-red-600">
          Error: {(errorAdd || errorUpdate)?.message}
        </p>
      )}

      <div className="pt-2">
        <Link
          href="/"
          className="text-blue-600 hover:underline text-sm inline-block"
        >
          ← Back to task list
        </Link>
      </div>
    </form>
  );
}
