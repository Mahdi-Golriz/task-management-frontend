import Item from "./Item";
import TableHeader from "./TableHeader";
import { ITask } from "../services/apiTasks";
import { useTasks } from "../context/tasksContext";

// List is a table to show (render) tasks as a row
const List: React.FC = () => {
  const { tasks } = useTasks(); // load the taks by api handled in tasksContext

  return (
    <div className="w-full flex flex-col gap-2">
      <TableHeader />
      {tasks.length === 0 ? (
        <p className="font-bold text-center p-4 dark:text-white">
          There is No Task!
        </p>
      ) : (
        tasks.map((task: ITask) => <Item task={task} key={task._id} />)
      )}
    </div>
  );
};

export default List;
