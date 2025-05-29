const ViewToggle = ({ viewType, setViewType }) => {
  return (
    <div className="inline-flex rounded-md border border-gray-300 overflow-hidden">
      <button
        onClick={() => setViewType("grid")}
        className={`px-4 py-2 text-sm sm:text-base font-medium focus:outline-none ${
          viewType === "grid"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        Grid
      </button>
      <button
        onClick={() => setViewType("list")}
        className={`px-4 py-2 text-sm sm:text-base font-medium focus:outline-none ${
          viewType === "list"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        List
      </button>
    </div>
  );
};

export default ViewToggle;

