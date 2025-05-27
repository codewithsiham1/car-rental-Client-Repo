const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by model, brand, or location"
      onChange={(e) => onSearch(e.target.value)}
      className="input input-bordered w-full md:w-80"
    />
  );
};

export default SearchBar;
