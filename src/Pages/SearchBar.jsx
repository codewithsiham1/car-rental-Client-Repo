const SearchBar = ({ onSearch }) => {
  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <input
        type="text"
        placeholder="Search by model, brand, or location"
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
      />
    </div>
  );
};

export default SearchBar;
