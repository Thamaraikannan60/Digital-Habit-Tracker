import ProgressBar from '../components/ProgressBar'
import { getCompletionPercent, getMotivationMessage } from '../utils/habitUtils'
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../data/sampleHabits'

// ProgressPage - Detailed progress and statistics
function ProgressPage({ habits, completedIds }) {
  const total     = habits.length
  const completed = completedIds.length
  const pending   = total - completed
  const percent   = getCompletionPercent(completed, total)

  // Per-category stats
  const categoryStats = habits.reduce((acc, habit) => {
    if (!acc[habit.category]) {
      acc[habit.category] = { total: 0, completed: 0 }
    }
    acc[habit.category].total += 1
    if (completedIds.includes(habit.id)) {
      acc[habit.category].completed += 1
    }
    return acc
  }, {})

  return (
    <div className="flex flex-col gap-6 animate-fade-in">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Progress</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          {getMotivationMessage(percent)}
        </p>
      </div>

      {/* Big percentage ring card */}
      <div className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl p-6 text-white">
        <p className="text-sm font-semibold opacity-80 mb-2">Today's Overall Completion</p>
        <div className="flex items-end gap-2">
          <span className="text-5xl font-display font-bold">{percent}%</span>
          <span className="text-sm opacity-70 mb-1">{completed}/{total} habits</span>
        </div>
        <div className="mt-4">
          <ProgressBar percent={percent} showLabel={false} height="h-3" />
        </div>
        <p className="mt-3 text-xs opacity-60">
          {pending === 0 && total > 0 ? '🏆 Perfect day!' : `${pending} habit${pending !== 1 ? 's' : ''} remaining`}
        </p>
      </div>

      {/* Mini stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total',     value: total,     icon: '📋', bg: 'bg-blue-50   dark:bg-blue-900/20',   text: 'text-blue-700   dark:text-blue-400'   },
          { label: 'Done',      value: completed, icon: '✅', bg: 'bg-green-50  dark:bg-green-900/20',  text: 'text-brand-700  dark:text-brand-400'  },
          { label: 'Remaining', value: pending,   icon: '⏳', bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-400' },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4 text-center`}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`text-xl font-display font-bold ${s.text}`}>{s.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Category breakdown */}
      {Object.keys(categoryStats).length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
          <h3 className="text-sm font-display font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">
            Progress by Category
          </h3>
          <div className="flex flex-col gap-4">
            {Object.entries(categoryStats).map(([cat, stats]) => {
              const catPercent = getCompletionPercent(stats.completed, stats.total)
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{CATEGORY_ICONS[cat] || '📌'}</span>
                      <span className={`
                        text-xs font-semibold px-2 py-0.5 rounded-full
                        ${CATEGORY_COLORS[cat] || 'bg-gray-100 text-gray-600'}
                      `}>
                        {cat}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                      {stats.completed}/{stats.total} · {catPercent}%
                    </span>
                  </div>
                  <ProgressBar percent={catPercent} showLabel={false} height="h-2" />
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl p-4 border border-yellow-100 dark:border-yellow-800/30">
        <h3 className="text-sm font-display font-bold text-yellow-800 dark:text-yellow-400 mb-2">
          💡 Habit Tips
        </h3>
        <ul className="text-xs text-yellow-700 dark:text-yellow-500 flex flex-col gap-1.5 font-medium">
          <li>• Consistency beats intensity — small daily actions add up</li>
          <li>• Link new habits to existing ones (habit stacking)</li>
          <li>• Track streaks to stay motivated</li>
          <li>• Celebrate small wins every day 🎉</li>
        </ul>
      </div>
    </div>
  )
}

export default ProgressPage
