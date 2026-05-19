/**
 * habitUtils.js - Helper functions for habit logic
 */

// Generate a unique ID for new habits
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

// Get today's date as a string key e.g. "2025-01-15"
export function getTodayKey() {
  return new Date().toISOString().split('T')[0]
}

// Calculate completion percentage
export function getCompletionPercent(completed, total) {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

// Filter habits based on search, category, and status
export function filterHabits(habits, { search, category, status, completedIds }) {
  return habits.filter((habit) => {
    // Search filter
    const matchesSearch =
      search === '' ||
      habit.title.toLowerCase().includes(search.toLowerCase()) ||
      habit.category.toLowerCase().includes(search.toLowerCase()) ||
      (habit.notes && habit.notes.toLowerCase().includes(search.toLowerCase()))

    // Category filter
    const matchesCategory = category === 'All' || habit.category === category

    // Status filter
    const isCompleted = completedIds.includes(habit.id)
    const matchesStatus =
      status === 'All' ||
      (status === 'Completed' && isCompleted) ||
      (status === 'Pending' && !isCompleted)

    return matchesSearch && matchesCategory && matchesStatus
  })
}

// Get motivational message based on completion %
export function getMotivationMessage(percent) {
  if (percent === 0)  return "Let's get started! 🚀"
  if (percent < 25)  return 'Good start! Keep going 💪'
  if (percent < 50)  return "You're building momentum! 🔥"
  if (percent < 75)  return "Halfway there, don't stop! ⚡"
  if (percent < 100) return 'Almost done, push through! 🎯'
  return 'All habits done! Amazing! 🏆'
}
