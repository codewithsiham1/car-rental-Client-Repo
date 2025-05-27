const ViewToggle = ({ viewType, setViewType }) => {
  return (
    <div className="btn-group">
      <button
        onClick={() => setViewType("grid")}
        className={`btn ${viewType === "grid" && "btn-active"}`}
      >
        Grid
      </button>
      <button
        onClick={() => setViewType("list")}
        className={`btn ${viewType === "list" && "btn-active"}`}
      >
        List
      </button>
    </div>
  );
};

export default ViewToggle;
