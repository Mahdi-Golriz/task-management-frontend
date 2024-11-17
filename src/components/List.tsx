import Item from "./Item";
import TableHeader from "./TableHeader";
import { ITask } from "../services/apiTasks";
import { useTasks } from "../context/tasksContext";

const List: React.FC = () => {
  const { tasks } = useTasks();

  return (
    <div className="w-full flex flex-col gap-2">
      <TableHeader />
      {tasks.length === 0 ? (
        <p className="font-bold text-center p-4 dark:text-white">
          Start to add your tasks
        </p>
      ) : (
        tasks.map((task: ITask) => <Item task={task} key={task._id} />)
      )}
    </div>
  );
};

export default List;
