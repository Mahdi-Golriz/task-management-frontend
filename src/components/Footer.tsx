import { useTasks } from "../context/tasksContext";
import { ITask } from "../services/apiTasks";

const Footer: React.FC = () => {
  const { tasks } = useTasks();

  const totalNumTasks = tasks.length;
  const doneTasks = tasks.filter(
    (task: ITask) => task.status === "Done"
  ).length;

  const pendingTasks = tasks.filter(
    (task: ITask) => task.status === "Pending"
  ).length;

  const plannedTasks = tasks.filter(
    (task: ITask) => task.status === "Planned"
  ).length;

  const donePercentage = Math.round((doneTasks / totalNumTasks) * 100);
  const pendingPercentage = Math.round((pendingTasks / totalNumTasks) * 100);
  const plannedPercentage = Math.round((plannedTasks / totalNumTasks) * 100);

  if (!totalNumTasks) {
    return (
      <p className="w-full justify-around flex mt-auto border p-2 box-border text-xs dark:text-white">
        Start adding your tasks
      </p>
    );
  }

  return (
    <div className="w-full justify-around flex mt-auto border p-2 box-border text-xs dark:text-white">
      <p>Total number of tasks: {totalNumTasks}</p>
      <p>
        {donePercentage === 100
          ? "Congrats! You have done all your tasks."
          : `You have done ${donePercentage} percent of your tasks. ${pendingPercentage} percent of your tasks are pending and also ${plannedPercentage} percent of your tasks were planned to be done!`}
      </p>
    </div>
  );
};

export default Footer;
