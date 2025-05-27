"use client";
import { useParams } from "next/navigation";
import AddTaskForm from "../form";

export default function EditPage() {
  const { id } = useParams();
  return <AddTaskForm id={id} />;
}
