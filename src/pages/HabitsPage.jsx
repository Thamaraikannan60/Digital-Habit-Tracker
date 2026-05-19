import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import FilterSection from '../components/FilterSection'
import HabitList from '../components/HabitList'
import { filterHabits } from '../utils/habitUtils'

// HabitsPage - Full list with search, filter, and toggle
function HabitsPage({ habits, completedIds, onToggle, onEdit, onDelete, onAdd }) {
  const [search, setSearch]             = useState('')
  const [activeCategory, setCategory]   = useState('All')
  const [activeStatus, setStatus]       = useState('All')

  // Apply all filters
  const filteredHabits = filterHabits(habits, {
    search,
    category: activeCategory,
    status: activeStatus,
    completedIds,
  })

  return (
    <div className="flex flex-col gap-5 animate-fade-in">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">My Habits</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {habits.length} habit{habits.length !== 1 ? 's' : ''} tracked
          </p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors shadow-sm"
        >
          + Add
        </button>
      </div>

      {/* Search + Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col gap-3">
        <SearchBar value={search} onChange={setSearch} />
        <FilterSection
          activeCategory={activeCategory}
          activeStatus={activeStatus}
          onCategoryChange={setCategory}
          onStatusChange={setStatus}
        />
      </div>

      {/* Result count */}
      <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
        Showing {filteredHabits.length} of {habits.length} habits
      </p>

      {/* Habits */}
      <HabitList
        habits={filteredHabits}
        completedIds={completedIds}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  )
}

export default HabitsPage
