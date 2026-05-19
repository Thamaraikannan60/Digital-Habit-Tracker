import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import HabitModal from './components/HabitModal'
import Dashboard from './pages/Dashboard'
import HabitsPage from './pages/HabitsPage'
import ProgressPage from './pages/ProgressPage'
import useLocalStorage from './hooks/useLocalStorage'
import { SAMPLE_HABITS } from './data/sampleHabits'
import { getTodayKey, getCompletionPercent } from './utils/habitUtils'

function App() {
  // ─── Persisted state (all in localStorage) ───────────────────────────
  const [habits, setHabits]         = useLocalStorage('habitflow_habits', SAMPLE_HABITS)
  const [completions, setCompletions] = useLocalStorage('habitflow_completions', {})
  const [darkMode, setDarkMode]     = useLocalStorage('habitflow_dark', false)

  // ─── UI state ─────────────────────────────────────────────────────────
  const [activeTab, setActiveTab]   = useState('dashboard')
  const [sidebarOpen, setSidebar]   = useState(false)
  const [modalOpen, setModalOpen]   = useState(false)
  const [habitToEdit, setHabitToEdit] = useState(null)

  // Apply dark mode class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // ─── Today's completed habit IDs ──────────────────────────────────────
  const todayKey = getTodayKey()
  const todayCompleted = completions[todayKey] || []

  // ─── Habit CRUD handlers ──────────────────────────────────────────────
  function handleSaveHabit(habit) {
    setHabits((prev) => {
      const exists = prev.find((h) => h.id === habit.id)
      if (exists) {
        return prev.map((h) => (h.id === habit.id ? habit : h))
      }
      return [...prev, habit]
    })
  }

  function handleDeleteHabit(id) {
    setHabits((prev) => prev.filter((h) => h.id !== id))
    // Also remove from completions
    setCompletions((prev) => {
      const updated = { ...prev }
      Object.keys(updated).forEach((day) => {
        updated[day] = updated[day].filter((cid) => cid !== id)
      })
      return updated
    })
  }

  function handleToggleHabit(id) {
    setCompletions((prev) => {
      const dayList = prev[todayKey] || []
      const isCompleted = dayList.includes(id)
      return {
        ...prev,
        [todayKey]: isCompleted
          ? dayList.filter((cid) => cid !== id)
          : [...dayList, id],
      }
    })
  }

  // ─── Modal helpers ────────────────────────────────────────────────────
  function openAddModal() {
    setHabitToEdit(null)
    setModalOpen(true)
  }

  function openEditModal(habit) {
    setHabitToEdit(habit)
    setModalOpen(true)
  }

  // ─── Completion % for sidebar ─────────────────────────────────────────
  const completionPercent = getCompletionPercent(todayCompleted.length, habits.length)

  // ─── Render active page ───────────────────────────────────────────────
  function renderPage() {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard habits={habits} completedIds={todayCompleted} />
      case 'habits':
        return (
          <HabitsPage
            habits={habits}
            completedIds={todayCompleted}
            onToggle={handleToggleHabit}
            onEdit={openEditModal}
            onDelete={handleDeleteHabit}
            onAdd={openAddModal}
          />
        )
      case 'progress':
        return <ProgressPage habits={habits} completedIds={todayCompleted} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200 font-sans">
      <div className="flex h-screen overflow-hidden">

        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          completionPercent={completionPercent}
          isOpen={sidebarOpen}
          onClose={() => setSidebar(false)}
        />

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar
            darkMode={darkMode}
            onToggleDark={() => setDarkMode((d) => !d)}
            onOpenSidebar={() => setSidebar(true)}
            onAddHabit={openAddModal}
          />

          {/* Page area */}
          <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {renderPage()}
            </div>
          </main>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <HabitModal
        isOpen={modalOpen}
        habitToEdit={habitToEdit}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveHabit}
      />
    </div>
  )
}

export default App
