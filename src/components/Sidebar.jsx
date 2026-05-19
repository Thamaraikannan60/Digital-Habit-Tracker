// Sidebar - Left navigation panel (desktop only, collapsible on mobile)
function Sidebar({ activeTab, onTabChange, completionPercent, isOpen, onClose }) {
  const navItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'habits',    icon: '📋', label: 'My Habits' },
    { id: 'progress',  icon: '📊', label: 'Progress' },
  ]

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside className={`
        fixed top-0 left-0 h-full z-30 w-60 flex flex-col
        bg-white dark:bg-gray-900
        border-r border-gray-100 dark:border-gray-700
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>

        {/* Logo */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✅</span>
            <div>
              <h1 className="font-display font-bold text-gray-900 dark:text-white leading-tight">
                HabitFlow
              </h1>
              <p className="text-xs text-gray-400">Daily Habit Tracker</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onTabChange(item.id); onClose() }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold
                transition-all duration-150 text-left
                ${activeTab === item.id
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-white'
                }
              `}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Progress summary at bottom */}
        <div className="px-4 pb-6">
          <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 p-4 text-white">
            <p className="text-xs font-semibold opacity-80 mb-1">Today's Progress</p>
            <p className="text-2xl font-display font-bold">{completionPercent}%</p>
            <div className="mt-2 h-1.5 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-700"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <p className="text-xs mt-2 opacity-70">Keep it up! 🌿</p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
