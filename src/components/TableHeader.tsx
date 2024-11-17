const TableHeader: React.FC = () => {
  return (
    <div className="w-full flex justify-around items-center bg-slate-800 text-white rounded p-2 box-border text-sm dark:bg-gray-700">
      <div className="w-3/10">title</div>
      <div className="w-3/20 ">Categorry</div>
      <div className="w-3/20">Created At</div>
      <div className="w-3/20">Due</div>
      <div className="w-3/20">Status</div>
      <div className="w-1/20">Delete</div>
      <div className="w-1/20">Edit</div>
    </div>
  );
};

export default TableHeader;
