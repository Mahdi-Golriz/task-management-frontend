import { ReactElement, useState } from "react";
import Button from "./Button";
import { FiPlus } from "react-icons/fi";
import CategoryForm from "./CategoryForm";
import TaskForm from "./TaskForm";
import { useTheme } from "../context/themeContext";
import { FaMoon } from "react-icons/fa6";
import { MdOutlineWbSunny } from "react-icons/md";

const Header: React.FC = (): ReactElement => {
  const [isShowedCategoryForm, setIsShowedCategoryForm] = useState(false);
  const [isShowedTaskForm, setIsShowedTaskForm] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full flex justify-between items-center mb-2 border">
      <h2 className="ml-2 font-extrabold text-black dark:text-gray-300 ">
        Tasks
      </h2>
      <div className="flex">
        <Button
          Icon={theme === "light" ? MdOutlineWbSunny : FaMoon}
          onClick={toggleTheme}
          variant="light"
        />
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
