import { Link } from 'react-router-dom'
import { User, Calendar, Trophy, Users, BarChart3, Target, Flag } from 'lucide-react'

const cantonImg = 'https://www.golfargentina.com/images/canchas/el-canton-golf.jpg'
const matiasImg = 'https://www.golfargentina.com/images/jugadores/matias-salse.jpg' // Imagen ficticia, reemplazar por real si existe

const Home = ({ user }) => {
  const menuItems = [
    {
      title: 'Mi Perfil',
      description: 'Gestiona tu información personal y hándicap',
      icon: User,
      path: '/profile',
      color: 'bg-green-400'
    },
    {
      title: 'Reservar Cancha',
      description: 'Reserva tu horario en el club de golf',
      icon: Calendar,
      path: '/booking',
      color: 'bg-yellow-300'
    },
    {
      title: 'Torneos',
      description: 'Participa en torneos y competiciones',
      icon: Trophy,
      path: '/tournaments',
      color: 'bg-cyan-400'
    },
    {
      title: 'Red Social',
      description: 'Conecta con otros golfistas',
      icon: Users,
      path: '/social',
      color: 'bg-green-300'
    },
    {
      title: 'Estadísticas',
      description: 'Analiza tu rendimiento y progreso',
      icon: BarChart3,
      path: '/statistics',
      color: 'bg-yellow-400'
    },
    {
      title: 'Desafíos',
      description: 'Completa desafíos y mejora tu juego',
      icon: Target,
      path: '/challenges',
      color: 'bg-cyan-300'
    }
  ]

  const stats = [
    { label: 'Rondas jugadas', value: user.rounds?.length || 0 },
    { label: 'Hándicap actual', value: user.handicap },
    { label: 'Reservas activas', value: user.bookings?.length || 0 },
    { label: 'Torneos inscritos', value: user.tournaments?.length || 0 }
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Header con imagen */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl mb-4">
        <img src={cantonImg} alt="El Cantón Golf" className="w-full h-48 object-cover object-center opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-green-100/60" />
        <div className="absolute left-6 top-6 flex items-center space-x-4">
          <img src={matiasImg} alt="Matías Salse" className="w-20 h-20 rounded-full border-4 border-yellow-300 shadow-lg" />
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-1 drop-shadow-lg">¡Hola, Matías Salse!</h1>
            <p className="text-lg text-green-900 font-medium drop-shadow">¿Qué te gustaría hacer hoy?</p>
          </div>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="card-hover text-center group">
            <div className="text-3xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
            <div className="text-sm text-green-900 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
      {/* Menu Grid */}
      <div className="grid grid-cols-1 gap-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <Link
              key={index}
              to={item.path}
              className="card-hover group"
            >
              <div className="flex items-center space-x-6">
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  <Icon size={28} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-900 mb-2 group-hover:text-gradient transition-all duration-300">{item.title}</h3>
                  <p className="text-green-800 leading-relaxed">{item.description}</p>
                </div>
                <div className="text-green-700 group-hover:text-green-900 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-xl font-bold text-green-900 mb-6 text-center">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/booking"
            className="btn-secondary text-center py-4 text-lg"
          >
            Reservar Cancha
          </Link>
          <Link
            to="/social"
            className="btn-primary text-center py-4 text-lg"
          >
            Ver Feed
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home 