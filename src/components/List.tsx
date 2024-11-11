import Item from "./Item";
import TableHeader from "./TableHeader";

const List: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <TableHeader />
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
};

export default List;
