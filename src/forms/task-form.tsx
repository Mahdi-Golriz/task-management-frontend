import React, { useState } from "react";
import Button from "@components/button";

import { createTask, editTask } from "@services/tasks.service";
import { useCategories, useTasks } from "@context";
import { ITask, Status } from "@models/tasks.model";
import { ICategory } from "@models/categories.model";

interface TaskFormProps {
  isShowedTaskForm: boolean;
  setIsShowedTaskForm: (value: boolean) => void;
  editForm?: boolean;
  task?: ITask;
}

// TaskForm is used to create or edit a task
// editForm prop determine the purpose and type of action for the form
const TaskForm: React.FC<TaskFormProps> = ({
  isShowedTaskForm,
  setIsShowedTaskForm,
  // default value
  editForm = false,
  task,
}) => {
  // different initial values for different form  (create task or edit task)
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ""
  );
  const [categoryId, setCategoryId] = useState(task?.category_id || "");
  const [status, setStatus] = useState<Status>(
    (task?.status as Status) || Status.Planned
  );
  const createdAt = task?.createdAt
    ? new Date(task.createdAt).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];

  const { categories } = useCategories();
  const taskContext = useTasks();

  const createNewTask: Function = async () => {
    const newTask = {
      title,
      description,
      dueDate: dueDate,
      category_id: categoryId,
    };

    try {
      // creates the task in database
      const createdTask = await createTask(newTask);

      // add the created task to tasks state stored in tasksContext to update the UI and keep in sync it with database
      taskContext.addTask(createdTask);

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
      dueDate: dueDate,
      status,
      createdAt,
      category_id: categoryId,
    };

    try {
      // edits the task in database
      const editedTask = await editTask(edition);

      // edit the task in tasks state stored in tasksContext to update the UI and keep in sync it with database
      taskContext.updateTask(editedTask);

      alert("The task was edited");
    } catch (error) {
      console.error("Failed to edit task:", error);
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

  const categoryOptions = () =>
    categories.map((cat: ICategory) => (
      <option key={cat._id} value={cat._id}>
        {cat.title}
      </option>
    ));

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

          <label htmlFor="due">Due Date</label>
          <input
            id="due"
            type="date"
            value={dueDate as string}
            className="border-2 p-2 box-border"
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <label htmlFor="category">Choose the Category</label>
          <select
            id="category"
            value={categoryId}
            className="w-full border-2 p-2 box-border"
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categoryOptions()}
          </select>

          <label htmlFor="status">Choose the Status</label>
          <select
            id="status"
            value={status}
            className="w-full border-2 p-2 box-border"
            onChange={(e) => setStatus(e.target.value as Status)}
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
              onClick={() => {
                setIsShowedTaskForm(!isShowedTaskForm);
              }}
            >
              Close
            </Button>
            <Button variant="dark" type="submit" className="bg-green-900">
              {editForm ? "Edit Task" : "Add New Task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
