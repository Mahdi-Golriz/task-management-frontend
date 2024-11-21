import { useState } from "react";
import Button from "./Button";
import { createCategory, getCategories } from "../services/apiCategories";

interface CategoryFormProps {
  setIsShowedCategoryForm: (value: boolean) => void;
  isShowedCategoryForm: boolean;
}

// A modal component to add new categories by a form
const CategoryForm: React.FC<CategoryFormProps> = ({
  isShowedCategoryForm,
  setIsShowedCategoryForm,
}) => {
  const [categoryTitle, setCategoryTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCategory = { title: categoryTitle }; // title is recieved by the form

    try {
      await createCategory(newCategory);
      alert("new category was added");
    } catch (error) {
      console.error("Failed to create category:", error);
      alert("Category couldn't added");
    } finally {
      setIsShowedCategoryForm(!isShowedCategoryForm); // to close the modal after adding or recieving error
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-2/3 max-w-md">
        <form
          className="flex flex-col gap-2 items-center justify-between"
          onSubmit={handleSubmit}
        >
          <label htmlFor="descriptionTitle">Title of Category</label>
          <input
            className="w-full border rounded p-2 box-border"
            id="descriptionTitle"
            type="text"
            value={categoryTitle}
            onChange={(e) => setCategoryTitle(e.target.value)}
            placeholder="title..."
            required
          />
          <div className="flex w-full items-center justify-between">
            <Button variant="dark" type="submit">
              Add new category
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setIsShowedCategoryForm(!isShowedCategoryForm);
              }}
              variant="dark"
              className="bg-red-700"
            >
              Close
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
