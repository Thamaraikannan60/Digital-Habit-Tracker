import { useState, useEffect } from 'react'
import { CATEGORIES } from '../data/sampleHabits'
import { generateId } from '../utils/habitUtils'

// HabitModal - Modal dialog to add or edit a habit
function HabitModal({ isOpen, habitToEdit, onClose, onSave }) {
  const [title, setTitle]       = useState('')
  const [category, setCategory] = useState('Study')
  const [notes, setNotes]       = useState('')
  const [error, setError]       = useState('')

  // When editing, pre-fill the form
  useEffect(() => {
    if (habitToEdit) {
      setTitle(habitToEdit.title)
      setCategory(habitToEdit.category)
      setNotes(habitToEdit.notes || '')
    } else {
      setTitle('')
      setCategory('Study')
      setNotes('')
    }
    setError('')
  }, [habitToEdit, isOpen])

  // Handle save
  function handleSave() {
    if (!title.trim()) {
      setError('Habit title is required.')
      return
    }
    const habit = {
      id: habitToEdit ? habitToEdit.id : generateId(),
      title: title.trim(),
      category,
      notes: notes.trim(),
      createdAt: habitToEdit ? habitToEdit.createdAt : new Date().toISOString(),
    }
    onSave(habit)
    onClose()
  }

  // Close on backdrop click
  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 animate-fade-in"
      onClick={handleBackdrop}
    >
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 animate-scale-in">

        {/* Modal header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-display font-bold text-gray-800 dark:text-white">
            {habitToEdit ? '✏️ Edit Habit' : '✨ Add New Habit'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal body */}
        <div className="px-6 py-5 flex flex-col gap-4">

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Habit Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setError('') }}
              placeholder="e.g. Morning Walk"
              maxLength={60}
              className="
                w-full px-4 py-2.5 rounded-xl
                bg-gray-50 dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                text-gray-800 dark:text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-brand-400
                text-sm font-medium transition-all
              "
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="
                w-full px-4 py-2.5 rounded-xl
                bg-gray-50 dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                text-gray-800 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-brand-400
                text-sm font-medium transition-all cursor-pointer
              "
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Notes <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any details or reminders..."
              rows={3}
              maxLength={200}
              className="
                w-full px-4 py-2.5 rounded-xl resize-none
                bg-gray-50 dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                text-gray-800 dark:text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-brand-400
                text-sm font-medium transition-all
              "
            />
            <p className="text-right text-xs text-gray-400 mt-0.5">{notes.length}/200</p>
          </div>
        </div>

        {/* Modal footer */}
        <div className="flex justify-end gap-3 px-6 pb-5">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-brand-500 hover:bg-brand-600 transition-colors shadow-sm"
          >
            {habitToEdit ? 'Save Changes' : 'Add Habit'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default HabitModal
