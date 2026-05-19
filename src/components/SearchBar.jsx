// SearchBar - Input to search habits by title, category, or notes
function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1">
      {/* Search icon */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
        🔍
      </span>
      <input
        type="text"
        placeholder="Search habits..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full pl-10 pr-4 py-2.5 rounded-xl
          bg-white dark:bg-gray-800
          border border-gray-200 dark:border-gray-700
          text-gray-700 dark:text-gray-200
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-brand-400
          transition-all text-sm font-medium
        "
      />
      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar
