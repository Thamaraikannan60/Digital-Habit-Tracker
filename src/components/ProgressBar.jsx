// ProgressBar - Shows a visual fill bar for completion %
function ProgressBar({ percent = 0, showLabel = true, height = 'h-3' }) {
  // Color changes based on progress
  const color =
    percent === 100 ? 'bg-brand-500' :
    percent >= 50   ? 'bg-yellow-400' :
                      'bg-orange-400'

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1 text-sm font-semibold text-gray-600 dark:text-gray-400">
          <span>Progress</span>
          <span>{percent}%</span>
        </div>
      )}
      {/* Track */}
      <div className={`w-full ${height} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
        {/* Fill */}
        <div
          className={`${height} ${color} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
