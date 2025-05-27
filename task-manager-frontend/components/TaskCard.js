import Link from "next/link";
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaClipboardList,
} from "react-icons/fa";

import { IoMdInformationCircle } from "react-icons/io";

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

const statusIconColors = {
  todo: "text-red-500 hover:text-red-600",
  "in progress": "text-yellow-500 hover:text-yellow-600",
  done: "text-green-500 hover:text-green-600",
};

export default function TaskCard({ task }) {
  const { icon, text, badge } = statusStyles[task.status.toLowerCase()] || {
    icon: null,
    text: task.status,
    badge: "bg-gray-100 text-gray-800",
  };

  return (
    <Link href={`/task/${task.id}`}>
      <div className="border p-4 rounded shadow hover:shadow-lg transition bg-white w-full h-[200px] flex flex-col justify-between">
        <div>
          <div className="flex justify-between">
            <h2 className="text-xl font-bold hover:underline text-violet-700 truncate">
              {task.title}
            </h2>
            <IoMdInformationCircle
              className={`${
                statusIconColors[task.status.toLowerCase()] ||
                "text-gray-400 hover:text-gray-500"
              } transition duration-200`}
              size={25}
            />
          </div>

          <div
            className={`inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-sm font-medium ${badge}`}
          >
            {icon}
            {text}
          </div>
        </div>

        <p className="text-md text-gray-800">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}
