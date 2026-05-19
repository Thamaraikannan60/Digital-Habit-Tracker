import HabitCard from './HabitCard'

// HabitList - Renders list of filtered habits or empty state
function HabitList({ habits, completedIds, onToggle, onEdit, onDelete }) {
  // Empty state
  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <div className="text-6xl mb-4">🌱</div>
        <h3 className="text-lg font-display font-bold text-gray-700 dark:text-gray-300">
          No habits found
        </h3>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 max-w-xs">
          Try adjusting your filters or add a new habit to start tracking!
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          isCompleted={completedIds.includes(habit.id)}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default HabitList
