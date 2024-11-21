import { ReactElement, useState } from "react";
// import Button from "./button.tsx";
import Button from "./Button";
import { FiPlus } from "react-icons/fi";
import CategoryForm from "./CategoryFoem";
import TaskForm from "./TaskForm";
import { useTheme } from "../context/themeContext";
import { FaMoon } from "react-icons/fa6";
import { MdOutlineWbSunny } from "react-icons/md";

// In Header component we hande displaying new Task and new Category modals and theme changing
const Header: React.FC = (): ReactElement => {
  const [isShowedCategoryForm, setIsShowedCategoryForm] = useState(false);
  const [isShowedTaskForm, setIsShowedTaskForm] = useState(false);

  // using theme context and tailwind conditional classses to change the theme between dark and light
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full flex justify-between items-center mb-2 border">
      <h2 className="ml-2 font-extrabold text-black dark:text-gray-300 ">
        Tasks
      </h2>
      <div className="flex">
        <Button
          icon={theme === "light" ? <MdOutlineWbSunny /> : <FaMoon />}
          onClick={toggleTheme}
          variant="light"
        />
        <Button
          icon={<FiPlus />}
          onClick={() => setIsShowedCategoryForm(!isShowedCategoryForm)}
          variant="light"
        >
          New Category
        </Button>
        {isShowedCategoryForm && (
          // Categoryform is a modal to get the data for new category
          <CategoryForm
            setIsShowedCategoryForm={setIsShowedCategoryForm}
            isShowedCategoryForm={isShowedCategoryForm}
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
