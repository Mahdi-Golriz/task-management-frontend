import { useTasks } from "../../context";
import { ITask } from "../../models/tasks.model";
import Item from "../item";
import TableHeader from "../table-header";

// List is a table to show (render) tasks as a row
const List: React.FC = () => {
  // load the tasks by api handled in tasksContext
  const { tasks } = useTasks();

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
