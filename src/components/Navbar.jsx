// Navbar - Top bar with title, dark mode toggle, and mobile menu button
function Navbar({ darkMode, onToggleDark, onOpenSidebar, onAddHabit }) {
  // Current date display
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  })

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700">

      {/* Left: hamburger (mobile) + date */}
      <div className="flex items-center gap-3">
        {/* Hamburger for mobile */}
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Open menu"
        >
          <div className="flex flex-col gap-1">
            <span className="block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 rounded" />
            <span className="block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 rounded" />
            <span className="block w-3 h-0.5 bg-gray-600 dark:bg-gray-300 rounded" />
          </div>
        </button>

        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">{today}</p>
          <h2 className="text-sm font-display font-bold text-gray-800 dark:text-white sm:hidden">
            HabitFlow
          </h2>
        </div>
      </div>

      {/* Right: Add button + Dark mode toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={onAddHabit}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors shadow-sm"
        >
          <span className="text-base">+</span>
          <span className="hidden sm:inline">Add Habit</span>
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={onToggleDark}
          className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-lg"
          title="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}

export default Navbar
