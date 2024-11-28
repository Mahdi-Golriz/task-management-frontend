import { ReactElement, useState } from "react";

import { FiPlus } from "react-icons/fi";
import { FaMoon } from "react-icons/fa6";
import { MdOutlineWbSunny } from "react-icons/md";
import { useTheme } from "@context";
import Button from "@components/button";
import { CategoryForm } from "@forms";
import TaskForm from "@forms/task-form";

// In Header component we handle displaying new Task and new Category modals and theme changing
const Header: React.FC = (): ReactElement => {
  const [isShowedCategoryForm, setIsShowedCategoryForm] = useState(false);
  const [isShowedTaskForm, setIsShowedTaskForm] = useState(false);

  // using theme context and tailwind conditional classes to change the theme between dark and light
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full flex justify-between items-center mb-2 border">
      <h2 className="ml-2 font-extrabold text-black dark:text-gray-300 ">
        Tasks
      </h2>
      <div className="flex">
        <Button
          iconOnly
          icon={theme === "light" ? <MdOutlineWbSunny /> : <FaMoon />}
          onClick={toggleTheme}
          variant="dark"
        />
        <Button
          icon={<FiPlus />}
          onClick={() => setIsShowedCategoryForm(!isShowedCategoryForm)}
          variant="light"
        >
          New Category
        </Button>
        {isShowedCategoryForm && (
          // CategoryForm is a modal to get the data for new category
          <CategoryForm
            setIsShowCategoryForm={setIsShowedCategoryForm}
            isShowCategoryForm={isShowedCategoryForm}
          />
        )}
        <Button
          icon={<FiPlus />}
          onClick={() => setIsShowedTaskForm(!isShowedTaskForm)}
          variant="light"
        >
          New Task
        </Button>
        {isShowedTaskForm && (
          // TaskForm is a modal to get the data for creating new task
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
