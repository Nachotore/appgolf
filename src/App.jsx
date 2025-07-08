import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Booking from './pages/Booking'
import Tournaments from './pages/Tournaments'
import Social from './pages/Social'
import Statistics from './pages/Statistics'
import Challenges from './pages/Challenges'
import BottomNavigation from './components/BottomNavigation'

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carga inicial
    const savedUser = localStorage.getItem('golfUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('golfUser', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('golfUser')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-golf-beige flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-golf-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-golf-dark">Cargando Golf App...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleLogin} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <div className="min-h-screen bg-golf-beige pb-20">
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/profile" element={<Profile user={user} onUpdateUser={setUser} />} />
        <Route path="/booking" element={<Booking user={user} />} />
        <Route path="/tournaments" element={<Tournaments user={user} />} />
        <Route path="/social" element={<Social user={user} />} />
        <Route path="/statistics" element={<Statistics user={user} />} />
        <Route path="/challenges" element={<Challenges user={user} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomNavigation user={user} onLogout={handleLogout} />
    </div>
  )
}

export default App 