import { useState } from "react";
import Button from "./Button";
import { BiX } from "react-icons/bi";

interface ITaskProps {
  isShowedTaskForm: boolean;
  setIsShowedTaskForm: (value: boolean) => void;
}

const TaskForm: React.FC<ITaskProps> = ({
  isShowedTaskForm,
  setIsShowedTaskForm,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due, setDue] = useState("");
  const category = "";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-sm">
      <div className="bg-white p-6 rounded-lg w-2/3 max-w-md">
        <form className="flex flex-col gap-2 items-start justify-between">
          <label htmlFor="title">Title of Task</label>
          <input
            id="title"
            type="text"
            value={title}
            className="w-full border-2 p-2 box-border"
            placeholder="title..."
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="description">Description of Task</label>
          <textarea
            id="description"
            value={description}
            className="w-full leading-4 border-2 p-2 box-border"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description..."
            rows={4}
          />

          <label htmlFor="due">Due Date</label>
          <input
            id="due"
            type="date"
            value={due}
            className="border-2 p-2 box-border"
            onChange={(e) => setDue(e.target.value)}
          />

          <label htmlFor="category">Choose the Category</label>
          <select
            id="category"
            value={category}
            className="w-full border-2 p-2 box-border"
          >
            <option>work</option>
            <option>personal</option>
            <option>urgent</option>
          </select>

          <div className="w-full flex items-center justify-between">
            <Button
              variant="dark"
              text="Add new Task"
              onClick={() => {}}
              type="submit"
            />
            <Button
              variant="dark"
              text="Close"
              onClick={() => {
                setIsShowedTaskForm(!isShowedTaskForm);
              }}
              className="bg-red-700"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
