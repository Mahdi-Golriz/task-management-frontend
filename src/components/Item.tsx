import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Button from "./Button";
import { deleteTask, ITask } from "../services/apiTasks";
import { useState } from "react";
import { useTasks } from "../context/tasksContext";
import { useCategories } from "../context/categoriesContext";
import { ICategory } from "../services/apiCategories";
import TaskForm from "./TaskForm";

interface ItemProps {
  task: ITask;
}

// Each Item is a row in the table to display a task, it is interactieve
const Item: React.FC<ItemProps> = ({ task }) => {
  const [isShowedDescription, setIsShowedDescription] = useState(false); // description of task is showed by clicking on it as a modal
  const [isShowedEditForm, setIsShowedEditForm] = useState(false); // task can be edited by a modal form (same as creating)
  const { title, category_id, description, dueDate, status, createdAt } = task; // task properties
  const { removeTask } = useTasks(); // task can be deleted

  // we need to get categories from our database to map the category_id of each task to its title
  const categories: ICategory[] = useCategories();
  const category =
    categories.find((cat) => cat._id === category_id)?.title ?? "No Category";

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent description toggle
    if (confirm("Are you sure!?") == true) {
      deleteTask(task._id); // delete task from database
      removeTask(task._id); // delete task from tasks state stored in tasksContext to update the UI
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent description toggle
    setIsShowedEditForm(!isShowedEditForm);
  };

  return (
    <div
      className="w-full flex justify-between bg-gray-300 text-black-400 rounded p-2 box-border text-sm cursor-pointer hover:bg-slate-200 hover:ring-1"
      onClick={() => {
        if (!isShowedEditForm) {
          setIsShowedDescription(!isShowedDescription); // Only toggle description if edit form is not shown
        }
      }}
    >
      <div className="w-3/10">{title}</div>
      <div className="w-3/20">{category}</div>
      <div className="w-3/20">{new Date(createdAt).toLocaleDateString()}</div>
      <div className="w-3/20">{new Date(dueDate).toLocaleDateString()}</div>
      <div className="w-3/20">{status}</div>

      {isShowedDescription && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black z-40">
          <div className="bg-white rounded p-5 w-1/3">
            <h3 className="py-2 font-bold">Description</h3>
            <p className="p-3  border ">
              {description || "There is no detail to show"}
            </p>
            <Button
              variant="dark"
              onClick={() => {
                setIsShowedDescription(!isShowedDescription);
              }}
              className="bg-red-700 mx-auto"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      <div className="w-1/20">
        <Button
          icon={<MdDelete />}
          variant="iconOnly"
          onClick={handleDeleteClick}
          className="text-lg p-0 m-0"
        />
      </div>
      <div className="w-1/20">
        <Button
          icon={<FaEdit />}
          variant="iconOnly"
          onClick={handleEditClick}
          className="text-lg p-0 m-0"
        />
        {isShowedEditForm && (
          <TaskForm
            isShowedTaskForm={isShowedEditForm}
            setIsShowedTaskForm={setIsShowedEditForm}
            editForm={true}
            task={task}
          />
        )}
      </div>
    </div>
  );
};

export default Item;
