import { CATEGORIES } from '../data/sampleHabits'

const STATUS_OPTIONS = ['All', 'Completed', 'Pending']
const ALL_CATEGORIES = ['All', ...CATEGORIES]

// FilterSection - Category + Status filter pill buttons
function FilterSection({ activeCategory, activeStatus, onCategoryChange, onStatusChange }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 self-center uppercase tracking-wider mr-1">
          Category:
        </span>
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`
              px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-150
              ${activeCategory === cat
                ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400'
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 self-center uppercase tracking-wider mr-1">
          Status:
        </span>
        {STATUS_OPTIONS.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={`
              px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-150
              ${activeStatus === status
                ? status === 'Completed'
                  ? 'bg-brand-500 text-white border-brand-500'
                  : status === 'Pending'
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-gray-700 text-white border-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:border-gray-200'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-brand-400'
              }
            `}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterSection
