import { useState } from "react";
import Button from "./Button";
import { BiX } from "react-icons/bi";

interface IProps {
  setIsShowedCategoryForm: (value: boolean) => void;
  isShowedCategoryForm: boolean;
}

const CategoryForm: React.FC<IProps> = ({
  setIsShowedCategoryForm,
  isShowedCategoryForm,
}) => {
  const [descriptionTitle, setDescriptionTitle] = useState("");

  const handleSubmit = () => {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-2/3 max-w-md">
        <form className="flex flex-col gap-2 items-center justify-between">
          <label htmlFor="descriptionTitle">Title of Category</label>
          <input
            className="w-full border rounded p-2 box-border"
            id="descriptionTitle"
            type="text"
            value={descriptionTitle}
            onChange={(e) => setDescriptionTitle(e.target.value)}
            placeholder="title..."
          />
          <div className="flex w-full items-center justify-between">
            <Button
              text="Add new category"
              onClick={() => {}}
              variant="dark"
              type="submit"
            />
            <Button
              text="Close"
              onClick={() => setIsShowedCategoryForm(!isShowedCategoryForm)}
              variant="dark"
              className="bg-red-700"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
