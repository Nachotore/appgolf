import { useState } from 'react'
import { Calendar, Clock, MapPin, CheckCircle, XCircle } from 'lucide-react'

const cantonImg = 'https://www.golfargentina.com/images/canchas/el-canton-golf.jpg'

const Booking = ({ user }) => {
  const [formData, setFormData] = useState({
    club: '',
    date: '',
    time: '',
    players: 1
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const clubs = [
    'El Cantón Golf Club',
    'Club de Golf Buenos Aires',
    'Olivos Golf Club',
    'San Andrés Golf Club',
    'Jockey Club Golf',
    'Lomas Athletic Club',
    'Hurlingham Club'
  ]

  const timeSlots = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simular reserva
    setTimeout(() => {
      const booking = {
        id: Date.now(),
        ...formData,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      }
      
      const updatedUser = {
        ...user,
        bookings: [...(user.bookings || []), booking]
      }
      
      // Actualizar localStorage
      localStorage.setItem('golfUser', JSON.stringify(updatedUser))
      
      setShowSuccess(true)
      setIsLoading(false)
      setFormData({ club: '', date: '', time: '', players: 1 })
      
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1500)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const sampleBookings = [
    {
      id: 1,
      club: 'El Cantón Golf Club',
      date: '2024-01-20',
      time: '09:00',
      players: 2,
      status: 'confirmed',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      club: 'Club de Golf Buenos Aires',
      date: '2024-01-25',
      time: '14:30',
      players: 4,
      status: 'pending',
      createdAt: '2024-01-16T15:45:00Z'
    },
    {
      id: 3,
      club: 'El Cantón Golf Club',
      date: '2024-01-28',
      time: '11:00',
      players: 3,
      status: 'confirmed',
      createdAt: '2024-01-17T09:15:00Z'
    }
  ]

  const bookings = user.bookings?.length > 0 ? user.bookings : sampleBookings

  return (
    <div className="p-6 space-y-8">
      {/* Header con imagen */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl mb-4">
        <img src={cantonImg} alt="El Cantón Golf" className="w-full h-40 object-cover object-center opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-green-100/60" />
        <div className="absolute left-6 top-6 flex items-center space-x-4">
          <Calendar size={36} className="text-green-700 bg-white/80 rounded-full p-2 shadow" />
          <div>
            <h1 className="text-2xl font-bold text-gradient mb-1 drop-shadow-lg">Reservar Cancha</h1>
            <p className="text-green-900 font-medium drop-shadow">Reserva tu horario en el club de golf</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="card bg-green-50 border-green-200">
          <div className="flex items-center space-x-3">
            <CheckCircle size={24} className="text-green-500" />
            <div>
              <h3 className="font-semibold text-green-800">¡Reserva confirmada!</h3>
              <p className="text-green-600">Tu reserva ha sido creada exitosamente.</p>
            </div>
          </div>
        </div>
      )}

      {/* Booking Form */}
      <div className="card">
        <h2 className="text-xl font-semibold text-golf-dark mb-4">Nueva Reserva</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-golf-dark mb-2">
              Club de Golf
            </label>
            <select
              name="club"
              value={formData.club}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Selecciona un club</option>
              {clubs.map((club) => (
                <option key={club} value={club}>{club}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-golf-dark mb-2">
                Fecha
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input-field"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-golf-dark mb-2">
                Horario
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Selecciona horario</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-golf-dark mb-2">
              Número de Jugadores
            </label>
            <select
              name="players"
              value={formData.players}
              onChange={handleChange}
              className="input-field"
            >
              <option value={1}>1 jugador</option>
              <option value={2}>2 jugadores</option>
              <option value={3}>3 jugadores</option>
              <option value={4}>4 jugadores</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Procesando reserva...
              </>
            ) : (
              'Confirmar Reserva'
            )}
          </button>
        </form>
      </div>

      {/* Booking History */}
      <div className="card">
        <h2 className="text-xl font-semibold text-golf-dark mb-4">Mis Reservas</h2>
        
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="border border-golf-light rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <MapPin size={16} className="text-golf-brown" />
                  <span className="font-semibold text-golf-dark">{booking.club}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {booking.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-golf-brown" />
                  <span className="text-golf-dark">
                    {new Date(booking.date).toLocaleDateString('es-ES')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-golf-brown" />
                  <span className="text-golf-dark">{booking.time}</span>
                </div>
              </div>
              
              <div className="mt-2 text-sm text-golf-brown">
                {booking.players} {booking.players === 1 ? 'jugador' : 'jugadores'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Booking 