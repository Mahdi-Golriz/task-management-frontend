const Form: React.FC = () => {
  return (
    <div className="w-full flex justify-between border mb-2">
      <input
        type="text"
        placeholder="Quick Search"
        className="p-2 m-1 box-border border rounded-lg text-xs font-semibold"
      />
      <div className="flex">
        <select className="p-2 m-1 box-border border rounded-lg text-xs font-semibold">
          <option>Category</option>
        </select>
        <select className="flex items-center justify-center gap-1 p-2 m-1 box-border border rounded-lg text-xs font-semibold">
          <option>Status</option>
        </select>
      </div>
    </div>
  );
};

export default Form;
