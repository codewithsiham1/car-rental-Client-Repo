const SortToggle = ({ onSortChange }) => {
  return (
    <div className="w-full max-w-xs mx-auto px-4">
      <select
        onChange={(e) => onSortChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
      >
        <option value="newest">Date Added (Newest)</option>
        <option value="oldest">Date Added (Oldest)</option>
        <option value="price_low">Price (Lowest)</option>
        <option value="price_high">Price (Highest)</option>
      </select>
    </div>
  );
};

export default SortToggle;

