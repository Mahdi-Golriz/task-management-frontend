import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Button from "./Button";

const Item: React.FC = () => {
  return (
    <div className="w-full flex justify-between bg-gray-300 text-black-400 rounded p-2 box-border text-sm">
      <div className="w-3/10">title</div>
      <div className="w-3/20">Categorry</div>
      <div className="w-3/20">Created At</div>
      <div className="w-3/20">Due</div>
      <div className="w-3/20">Status</div>
      <div className="w-1/20">
        <Button
          Icon={MdDelete}
          variant="action"
          onClick={() => {}}
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
