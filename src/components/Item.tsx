import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Button from "./Button";
import { deleteTask, ITask } from "../services/apiTasks";
import { useState } from "react";
import { useTasks } from "../context/tasksContext";
import { useCategories } from "../context/categoriesContext";
import { ICategory } from "../services/apiCategories";

interface ItemProps {
  task: ITask;
}

const Item: React.FC<ItemProps> = ({ task }) => {
  const [isShowedDescription, setIsShowedDescription] = useState(false);
  const { title, category_id, description, dueDate, status, createdAt } = task;
  const { removeTask } = useTasks();
  const categories: ICategory[] = useCategories();
  const category = categories.find((cat) => cat._id === category_id)?.title;
  console.log(category);

  return (
    <div
      className="w-full flex justify-between bg-gray-300 text-black-400 rounded p-2 box-border text-sm cursor-pointer hover:bg-slate-200 hover:ring-1"
      onClick={() => {
        setIsShowedDescription(!isShowedDescription);
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
            <p className="p-3  border ">{description}</p>
            <Button
              text="Close"
              variant="dark"
              onClick={() => {
                setIsShowedDescription(!isShowedDescription);
              }}
              className="bg-red-700 mx-auto"
            ></Button>
          </div>
        </div>
      )}

      <div className="w-1/20">
        <Button
          Icon={MdDelete}
          variant="action"
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task._id);
            removeTask(task._id);
          }}
          className="text-lg p-0 m-0"
        />
      </div>
      <div className="w-1/20">
        <Button
          Icon={FaEdit}
          variant="action"
          onClick={() => {}}
          className="text-lg p-0 m-0"
        />
      </div>
    </div>
  );
};

export default Item;
