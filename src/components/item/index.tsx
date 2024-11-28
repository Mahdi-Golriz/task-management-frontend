import Button from "@components/button";
import { useCategories, useTasks } from "@context";
import TaskForm from "@forms/task-form";
import { ICategory } from "@models/categories.model";
import { ITask } from "@models/tasks.model";
import { deleteTaskFromDatabase } from "@services";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface ItemProps {
  task: ITask;
}

// Each Item is a row in the table to display a task, it is interactive
const Item: React.FC<ItemProps> = ({ task }) => {
  // description of task is showed by clicking on it as a modal
  const [isShowedDescription, setIsShowedDescription] = useState(false);

  // task can be edited by a modal form (same as creating)
  const [isShowedEditForm, setIsShowedEditForm] = useState(false);

  const { title, category_id, description, dueDate, status, createdAt } = task;

  const taskContext = useTasks();

  const { categories } = useCategories();

  const categoryTitle =
    categories.find((cat: ICategory) => cat._id === category_id)?.title ??
    "No Category";

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure!?") == true) {
      deleteTaskFromDatabase(task._id);

      taskContext.removeTask(task._id);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsShowedEditForm(!isShowedEditForm);
  };

  const renderDescription = () => (
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
  );

  const itemBody = () => (
    <>
      <div className="w-3/10">{title}</div>
      <div className="w-3/20">{categoryTitle}</div>
      <div className="w-3/20">{new Date(createdAt).toLocaleDateString()}</div>
      <div className="w-3/20">{new Date(dueDate).toLocaleDateString()}</div>
      <div className="w-3/20">{status}</div>
    </>
  );

  return (
    <div
      className="w-full flex justify-between bg-gray-300 text-black-400 rounded p-2 box-border text-sm cursor-pointer hover:bg-slate-200 hover:ring-1"
      onClick={() => {
        if (!isShowedEditForm) {
          // Only toggle description if edit form is not shown
          setIsShowedDescription(!isShowedDescription);
        }
      }}
    >
      {itemBody()}
      {isShowedDescription && renderDescription()}

      <div className="w-1/20 flex justify-start items-center">
        <Button
          iconOnly
          icon={<MdDelete size={16} />}
          variant="onSurface"
          onClick={handleDeleteClick}
        />
      </div>
      <div className="w-1/20 flex justify-start items-center">
        <Button
          iconOnly
          icon={<FaEdit size={16} />}
          variant="onSurface"
          onClick={handleEditClick}
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
