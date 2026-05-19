// Default sample habits loaded on first visit
export const SAMPLE_HABITS = [
  {
    id: '1',
    title: 'DSA Practice',
    category: 'Study',
    notes: 'Solve at least 2 LeetCode problems daily',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'React Learning',
    category: 'Study',
    notes: 'Watch 1 tutorial or build a small feature',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Exercise',
    category: 'Fitness',
    notes: '30 minutes of workout or yoga',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Reading',
    category: 'Personal',
    notes: 'Read 20 pages of any book',
    createdAt: new Date().toISOString(),
  },
]

// All available categories
export const CATEGORIES = ['Health', 'Study', 'Fitness', 'Personal']

// Category colors for badges
export const CATEGORY_COLORS = {
  Health:   'bg-red-100   text-red-700   dark:bg-red-900/30   dark:text-red-400',
  Study:    'bg-blue-100  text-blue-700  dark:bg-blue-900/30  dark:text-blue-400',
  Fitness:  'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Personal: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
}

// Category emoji icons
export const CATEGORY_ICONS = {
  Health:   '❤️',
  Study:    '📚',
  Fitness:  '💪',
  Personal: '🌟',
}
