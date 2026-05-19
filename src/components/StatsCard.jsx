// StatsCard - Individual stat display card on dashboard
function StatsCard({ title, value, icon, color, subtitle }) {
  return (
    <div className={`
      relative overflow-hidden rounded-2xl p-5 
      bg-white dark:bg-gray-800 
      border border-gray-100 dark:border-gray-700
      shadow-sm hover:shadow-md 
      transition-all duration-200 hover:-translate-y-0.5
      animate-fade-in
    `}>
      {/* Background decorative circle */}
      <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-10 ${color}`} />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {title}
          </p>
          <p className="mt-1 text-3xl font-display font-bold text-gray-800 dark:text-white">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{subtitle}</p>
          )}
        </div>
        <div className={`text-3xl p-2 rounded-xl ${color} bg-opacity-20`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatsCard
