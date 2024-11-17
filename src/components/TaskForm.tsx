import React, { useState } from "react";
import Button from "./Button";
import { ICategory } from "../services/apiCategories";
import { createTask, editTask } from "../services/apiTasks";
import { useCategories } from "../context/categoriesContext";
import { useTasks } from "../context/tasksContext";
import type { ITask } from "../services/apiTasks";

interface ITaskProps {
  isShowedTaskForm: boolean;
  setIsShowedTaskForm: (value: boolean) => void;
  editForm?: boolean;
  task?: ITask;
}

export enum Status {
  Pending = "Pending",
  Planned = "Planned",
  Done = "Done",
}

const TaskForm: React.FC<ITaskProps> = ({
  isShowedTaskForm,
  setIsShowedTaskForm,
  editForm = false,
  task,
}) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [due, setDue] = useState(
    task?.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ""
  );
  const [category, setCategory] = useState(task?.category_id || "");
  const [status, setStatus] = useState<Status>(
    (task?.status as Status) || Status.Planned
  );
  const [createdAt, setCreatedAt] = useState(
    task?.createdAt
      ? new Date(task.createdAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );

  const categories: ICategory[] = useCategories();
  const { addTask, updateTask, fetchTasks } = useTasks();

  const createNewTask: Function = async () => {
    const newTask = {
      title,
      description,
      dueDate: due,
      category_id: category,
    };

    try {
      const createdTask = await createTask(newTask);
      addTask(createdTask);
      alert("new task was added");
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setIsShowedTaskForm(!isShowedTaskForm);
    }
  };

  const editAvailableTask: Function = async () => {
    if (!task) return;

    const edition = {
      _id: task._id,
      title,
      description,
      dueDate: due,
      status,
      createdAt,
      category_id: category,
    };

    try {
      const editedTask = await editTask(edition);
      updateTask(editedTask);
      alert("The task was edited");
    } catch (error) {
      console.error("Failed to eidt task:", error);
    } finally {
      setIsShowedTaskForm(!isShowedTaskForm);
    }
  };

  const handleSubmitTaskForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editForm) {
      await editAvailableTask();
    } else {
      await createNewTask();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-sm">
      <div className="bg-white p-6 rounded-lg w-2/3 max-w-md">
        <form
          className="flex flex-col gap-2 items-start justify-between"
          onSubmit={handleSubmitTaskForm}
        >
          <label htmlFor="title">Title of Task</label>
          <input
            id="title"
            type="text"
            value={title}
            className="w-full border-2 p-2 box-border"
            placeholder="title..."
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="description">Description of Task</label>
          <textarea
            id="description"
            value={description}
            className="w-full leading-4 border-2 p-2 box-border"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description..."
            rows={4}
          />

          <div className="flex">
            <div>
              <label htmlFor="due">Due Date</label>
              <input
                id="due"
                type="date"
                value={due as string}
                className="border-2 p-2 box-border"
                onChange={(e) => setDue(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="createdAt">Created At</label>
              <input
                id="createdAt"
                type="date"
                value={createdAt as string}
                className="border-2 p-2 box-border"
                onChange={(e) => setCreatedAt(e.target.value)}
                disabled={!editForm}
              />
            </div>
          </div>

          <label htmlFor="category">Choose the Category</label>
          <select
            id="category"
            value={category}
            className="w-full border-2 p-2 box-border"
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>

          <label htmlFor="status">Choose the Status</label>
          <select
            id="status"
            value={status}
            className="w-full border-2 p-2 box-border"
            onChange={(e) => setStatus(e.target.value as Status)}
            disabled={!editForm}
          >
            <option value="" disabled>
              Status
            </option>
            <option value={Status.Planned}>{Status.Planned}</option>
            <option value={Status.Pending}>{Status.Pending}</option>
            <option value={Status.Done}>{Status.Done}</option>
          </select>

          <div className="w-full flex items-center justify-between">
            <Button
              variant="dark"
              text={editForm ? "Edit Task" : "Add New Task"}
              type="submit"
            />
            <Button
              variant="dark"
              text="Close"
              onClick={() => {
                setIsShowedTaskForm(!isShowedTaskForm);
              }}
              className="bg-red-700"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
