import React from "react";
import TaskDetailsClient from "./TaskDetailsClient";

export default function TaskDetailsPage({ params }) {
  const { id } = React.use(params);
  return <TaskDetailsClient id={id} />;
}
