const SortToggle = ({ onSortChange }) => {
  return (
    <select
      onChange={(e) => onSortChange(e.target.value)}
      className="select select-bordered"
    >
      <option value="newest">Date Added (Newest)</option>
      <option value="oldest">Date Added (Oldest)</option>
      <option value="price_low">Price (Lowest)</option>
      <option value="price_high">Price (Highest)</option>
    </select>
  );
};

export default SortToggle;
