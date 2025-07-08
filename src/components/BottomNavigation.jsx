import { Link, useLocation } from 'react-router-dom'
import { Home, User, Calendar, Trophy, Users, BarChart3, Target, LogOut } from 'lucide-react'

const BottomNavigation = ({ user, onLogout }) => {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Inicio' },
    { path: '/profile', icon: User, label: 'Perfil' },
    { path: '/booking', icon: Calendar, label: 'Reservar' },
    { path: '/tournaments', icon: Trophy, label: 'Torneos' },
    { path: '/social', icon: Users, label: 'Social' },
    { path: '/statistics', icon: BarChart3, label: 'Stats' },
    { path: '/challenges', icon: Target, label: 'Desafíos' },
  ]

  return (
    <div className="fixed bottom-4 left-4 right-4 glass-effect rounded-3xl shadow-2xl border border-white/30">
      <div className="flex justify-around items-center py-3 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-golf-green to-golf-dark text-white shadow-lg' 
                  : 'text-golf-brown hover:text-golf-green hover:bg-white/30'
              }`}>
                <Icon size={22} />
              </div>
              <span className={`text-xs mt-1 font-semibold transition-all duration-300 ${
                isActive ? 'text-golf-green' : 'text-golf-brown'
              }`}>{item.label}</span>
            </Link>
          )
        })}
        <button
          onClick={onLogout}
          className="nav-item text-red-500 hover:text-red-700"
        >
          <div className="p-2 rounded-xl transition-all duration-300 hover:bg-red-50">
            <LogOut size={22} />
          </div>
          <span className="text-xs mt-1 font-semibold">Salir</span>
        </button>
      </div>
    </div>
  )
}

export default BottomNavigation 