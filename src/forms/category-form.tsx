import { useState } from "react";
import Button from "@components/button";
import { createCategory, getCategories } from "@services/categories.service";
import { useCategories } from "@context";

interface ICategoryFormProps {
  setIsShowCategoryForm: (visible: boolean) => void;
  isShowCategoryForm: boolean;
}

// A modal component to add new categories by a form
const CategoryForm: React.FC<ICategoryFormProps> = ({
  isShowCategoryForm: isShowedCategoryForm,
  setIsShowCategoryForm: setIsShowedCategoryForm,
}) => {
  const [categoryTitle, setCategoryTitle] = useState("");
  const { addCategory } = useCategories();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // title is received by the form
    const newCategory = { title: categoryTitle };

    try {
      const newCategoryInDatabase = await createCategory(newCategory);

      addCategory(newCategoryInDatabase);

      alert("new category was added");
    } catch (error) {
      console.error("Failed to create category:", error);

      alert("Category couldn't added");
    } finally {
      // to close the modal after adding or receiving error
      setIsShowedCategoryForm(!isShowedCategoryForm);
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
            <Button
              onClick={(e) => {
                e.preventDefault();
                setIsShowedCategoryForm(!isShowedCategoryForm);
              }}
              variant="dark"
            >
              Close
            </Button>
            <Button variant="dark" type="submit" className="bg-green-900">
              Add new category
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
