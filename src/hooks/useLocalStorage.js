import { useState, useEffect } from 'react'

/**
 * useLocalStorage - Just like useState, but syncs with localStorage.
 * @param {string} key - The localStorage key to store the value under.
 * @param {any} initialValue - Default value if nothing is found in localStorage.
 */
function useLocalStorage(key, initialValue) {
  // Read from localStorage first, otherwise use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn('useLocalStorage read error:', error)
      return initialValue
    }
  })

  // Whenever storedValue changes, save it to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.warn('useLocalStorage write error:', error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage
