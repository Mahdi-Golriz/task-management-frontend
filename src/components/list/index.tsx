import { useTasks } from "@context";
import { ITask } from "@models/tasks.model";
import Item from "@components/item";
import TableHeader from "@components/table-header";
import { ReactNode } from "react";

// List is a table to show (render) tasks as a row
const List = () => {
  // load the tasks by api handled in tasksContext
  const { tasks } = useTasks();

  const renderNotFound = () => {
    <p className="font-bold text-center p-4 dark:text-white">
      There is No Task!
    </p>;
  };

  const renderTasks = () =>
    tasks.map((task: ITask) => <Item task={task} key={task._id} />);

  const Container: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="w-full flex flex-col gap-2">
      <TableHeader />
      {children}
    </div>
  );

  if (tasks.length === 0) {
    return (
      <Container>
        <p className="font-bold text-center p-4 dark:text-white">
          There is No Task!
        </p>
      </Container>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2">
      {tasks.map((task: ITask) => (
        <Item task={task} key={task._id} />
      ))}
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-2">
      <TableHeader />
      {tasks.length === 0 ? renderNotFound() : renderTasks()}
    </div>
  );
};

export default List;
