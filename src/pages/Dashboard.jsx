import StatsCard from '../components/StatsCard'
import ProgressBar from '../components/ProgressBar'
import { getCompletionPercent, getMotivationMessage } from '../utils/habitUtils'
import { CATEGORY_ICONS } from '../data/sampleHabits'

// Dashboard - Overview stats and quick summary
function Dashboard({ habits, completedIds }) {
  const total     = habits.length
  const completed = completedIds.length
  const pending   = total - completed
  const percent   = getCompletionPercent(completed, total)

  // Category breakdown
  const categoryCount = habits.reduce((acc, h) => {
    acc[h.category] = (acc[h.category] || 0) + 1
    return acc
  }, {})

  return (
    <div className="flex flex-col gap-6 animate-fade-in">

      {/* Page title */}
      <div>
        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Dashboard</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          {getMotivationMessage(percent)}
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Habits"
          value={total}
          icon="📋"
          color="bg-blue-100"
          subtitle="All tracked habits"
        />
        <StatsCard
          title="Completed"
          value={completed}
          icon="✅"
          color="bg-green-100"
          subtitle="Done today"
        />
        <StatsCard
          title="Pending"
          value={pending}
          icon="⏳"
          color="bg-orange-100"
          subtitle="Still remaining"
        />
        <StatsCard
          title="Progress"
          value={`${percent}%`}
          icon="🎯"
          color="bg-purple-100"
          subtitle="Daily completion"
        />
      </div>

      {/* Progress section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
        <h3 className="text-sm font-display font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">
          Today's Progress
        </h3>
        <ProgressBar percent={percent} height="h-4" />
        <div className="flex justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
          <span>{completed} of {total} habits completed</span>
          <span className="font-semibold text-brand-600 dark:text-brand-400">
            {total === 0 ? 'Add habits to start!' : percent === 100 ? '🎉 All done!' : `${pending} remaining`}
          </span>
        </div>
      </div>

      {/* Category breakdown */}
      {Object.keys(categoryCount).length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
          <h3 className="text-sm font-display font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">
            By Category
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(categoryCount).map(([cat, count]) => (
              <div
                key={cat}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700"
              >
                <span className="text-2xl mb-1">{CATEGORY_ICONS[cat] || '📌'}</span>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{cat}</span>
                <span className="text-lg font-display font-bold text-gray-800 dark:text-white">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {total === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-5xl mb-3">🌱</div>
          <h3 className="text-lg font-display font-bold text-gray-700 dark:text-gray-300">
            No habits yet!
          </h3>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Click "Add Habit" to start building your routine.
          </p>
        </div>
      )}
    </div>
  )
}

export default Dashboard
