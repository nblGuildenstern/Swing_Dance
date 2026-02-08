import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useContext, useEffect, useState } from 'react'

const FavoritesContext = createContext()

const STORAGE_KEY = 'FAVORITE_MOVES'

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])
  const [loaded, setLoaded] = useState(false)

  // ✅ Load saved favorites on app start
  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY)
        if (saved) setFavorites(JSON.parse(saved))
      } catch (e) {
        console.log('Failed to load favorites', e)
      } finally {
        setLoaded(true)
      }
    }

    load()
  }, [])

  // Save whenever favorites change
  useEffect(() => {
    if (!loaded) return

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites, loaded])

  const toggleFavorite = (moveName) => {
    setFavorites(prev =>
      prev.includes(moveName)
        ? prev.filter(m => m !== moveName)
        : [...prev, moveName]
    )
  }

  const isFavorite = (moveName) => favorites.includes(moveName)

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
