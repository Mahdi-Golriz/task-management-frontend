import { ReactElement, useState } from "react";
import Button from "./Button";
import { FiPlus } from "react-icons/fi";
import CategoryForm from "./CategoryForm";
import TaskForm from "./TaskForm";

const Header: React.FC = (): ReactElement => {
  const [isShowedCategoryForm, setIsShowedCategoryForm] = useState(false);
  const [isShowedTaskForm, setIsShowedTaskForm] = useState(false);

  return (
    <div className="w-full flex justify-between items-center mb-2 border">
      <h2 className="ml-2 font-extrabold">Tasks</h2>
      <div className="flex">
        <Button
          text="New Category"
          Icon={FiPlus}
          onClick={() => setIsShowedCategoryForm(!isShowedCategoryForm)}
          variant="light"
        />
        {isShowedCategoryForm && (
          <CategoryForm
            setIsShowedCategoryForm={setIsShowedCategoryForm}
            isShowedCategoryForm={isShowedCategoryForm}
          />
        )}
        <Button
          text="New Task"
          Icon={FiPlus}
          onClick={() => setIsShowedTaskForm(!isShowedTaskForm)}
          variant="light"
        />
        {isShowedTaskForm && (
          <TaskForm
            isShowedTaskForm={isShowedTaskForm}
            setIsShowedTaskForm={setIsShowedTaskForm}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
