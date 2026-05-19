import { CATEGORY_COLORS, CATEGORY_ICONS } from '../data/sampleHabits'

// HabitCard - Single habit row with toggle, edit, delete
function HabitCard({ habit, isCompleted, onToggle, onEdit, onDelete }) {
  return (
    <div className={`
      group relative rounded-2xl p-4 border transition-all duration-200
      animate-slide-up
      ${isCompleted
        ? 'bg-brand-50 dark:bg-brand-900/10 border-brand-200 dark:border-brand-800/40'
        : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-700'
      }
      hover:shadow-md hover:-translate-y-0.5
    `}>
      <div className="flex items-start gap-3">

        {/* Checkbox toggle */}
        <button
          onClick={() => onToggle(habit.id)}
          className={`
            flex-shrink-0 mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center
            transition-all duration-200
            ${isCompleted
              ? 'bg-brand-500 border-brand-500 text-white'
              : 'border-gray-300 dark:border-gray-600 hover:border-brand-400'
            }
          `}
          title={isCompleted ? 'Mark as pending' : 'Mark as completed'}
        >
          {isCompleted && <span className="text-xs font-bold">✓</span>}
        </button>

        {/* Habit info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`
              font-bold text-gray-800 dark:text-white text-sm leading-tight
              ${isCompleted ? 'line-through text-gray-400 dark:text-gray-500' : ''}
            `}>
              {habit.title}
            </h3>

            {/* Completed badge */}
            {isCompleted && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
                ✅ Done
              </span>
            )}
          </div>

          {/* Category badge */}
          <span className={`
            inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-semibold
            ${CATEGORY_COLORS[habit.category] || 'bg-gray-100 text-gray-600'}
          `}>
            <span>{CATEGORY_ICONS[habit.category]}</span>
            {habit.category}
          </span>

          {/* Notes */}
          {habit.notes && (
            <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {habit.notes}
            </p>
          )}
        </div>

        {/* Action buttons - visible on hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
          <button
            onClick={() => onEdit(habit)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            title="Edit habit"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            title="Delete habit"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  )
}

export default HabitCard
