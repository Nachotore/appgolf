import { useState } from 'react'
import { Trophy, Calendar, MapPin, Users, CheckCircle, XCircle } from 'lucide-react'

const torneoImg = 'https://www.golfargentina.com/images/canchas/olivos-golf-club.jpg'

const Tournaments = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const tournaments = [
    {
      id: 1,
      name: 'Torneo El Cantón Classic',
      date: '2024-02-15',
      club: 'El Cantón Golf Club',
      format: 'Stroke Play',
      players: 72,
      maxPlayers: 80,
      entryFee: '$6000',
      prize: '$120,000',
      description: 'Torneo anual en El Cantón. Campo en perfectas condiciones. Ignacio Toré será el favorito.',
      status: 'open'
    },
    {
      id: 2,
      name: 'Copa Amateur El Cantón',
      date: '2024-02-28',
      club: 'El Cantón Golf Club',
      format: 'Match Play',
      players: 28,
      maxPlayers: 32,
      entryFee: '$3500',
      prize: 'Trofeo + Premios',
      description: 'Torneo amateur en El Cantón para jugadores con hándicap 15 o menor. Gonzalo Córdoba confirmado.',
      status: 'open'
    },
    {
      id: 3,
      name: 'Championship Pro-Am',
      date: '2024-03-10',
      club: 'San Andrés Golf Club',
      format: 'Pro-Am',
      players: 48,
      maxPlayers: 60,
      entryFee: '$8000',
      prize: '$150,000',
      description: 'Torneo profesional-amateur con jugadores del tour.',
      status: 'full'
    },
    {
      id: 4,
      name: 'Torneo de Verano',
      date: '2024-03-25',
      club: 'Club de Golf Buenos Aires',
      format: 'Stableford',
      players: 40,
      maxPlayers: 50,
      entryFee: '$4000',
      prize: '$75,000',
      description: 'Torneo con sistema Stableford para todos los niveles. Matías Salse participará.',
      status: 'open'
    },
    {
      id: 5,
      name: 'El Cantón Invitational',
      date: '2024-04-05',
      club: 'El Cantón Golf Club',
      format: 'Invitational',
      players: 24,
      maxPlayers: 24,
      entryFee: '$7500',
      prize: '$90,000',
      description: 'Torneo exclusivo por invitación en El Cantón. Solo jugadores con hándicap 10 o menor.',
      status: 'open'
    }
  ]

  const handleRegister = (tournamentId) => {
    setIsLoading(true)
    
    setTimeout(() => {
      const tournament = tournaments.find(t => t.id === tournamentId)
      const updatedUser = {
        ...user,
        tournaments: [...(user.tournaments || []), {
          id: tournamentId,
          name: tournament.name,
          date: tournament.date,
          club: tournament.club,
          registeredAt: new Date().toISOString()
        }]
      }
      
      localStorage.setItem('golfUser', JSON.stringify(updatedUser))
      
      setShowSuccess(true)
      setIsLoading(false)
      
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1000)
  }

  const isRegistered = (tournamentId) => {
    return user.tournaments?.some(t => t.id === tournamentId)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800'
      case 'full': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'open': return 'Inscripciones Abiertas'
      case 'full': return 'Completo'
      default: return 'Cerrado'
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header con imagen */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl mb-4">
        <img src={torneoImg} alt="Torneo Golf" className="w-full h-40 object-cover object-center opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-green-100/60" />
        <div className="absolute left-6 top-6 flex items-center space-x-4">
          <Trophy size={36} className="text-yellow-500 bg-white/80 rounded-full p-2 shadow" />
          <div>
            <h1 className="text-2xl font-bold text-gradient mb-1 drop-shadow-lg">Torneos</h1>
            <p className="text-green-900 font-medium drop-shadow">Participa en competiciones y mejora tu juego</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="card bg-green-50 border-green-200">
          <div className="flex items-center space-x-3">
            <CheckCircle size={24} className="text-green-500" />
            <div>
              <h3 className="font-semibold text-green-800">¡Inscripción exitosa!</h3>
              <p className="text-green-600">Te has registrado al torneo correctamente.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tournaments List */}
      <div className="space-y-4">
        {tournaments.map((tournament) => (
          <div key={tournament.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-golf-dark mb-2">{tournament.name}</h3>
                <p className="text-golf-brown mb-3">{tournament.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-golf-brown" />
                    <span className="text-golf-dark">
                      {new Date(tournament.date).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-golf-brown" />
                    <span className="text-golf-dark">{tournament.club}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy size={16} className="text-golf-brown" />
                    <span className="text-golf-dark">{tournament.format}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users size={16} className="text-golf-brown" />
                    <span className="text-golf-dark">
                      {tournament.players}/{tournament.maxPlayers} jugadores
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center space-x-4 text-sm">
                  <span className="text-golf-brown">Inscripción: <span className="font-semibold text-golf-dark">{tournament.entryFee}</span></span>
                  <span className="text-golf-brown">Premio: <span className="font-semibold text-golf-green">{tournament.prize}</span></span>
                </div>
              </div>

              <div className="ml-4 flex flex-col items-end space-y-2">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tournament.status)}`}>
                  {getStatusText(tournament.status)}
                </div>
                
                {isRegistered(tournament.id) ? (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle size={16} />
                    <span className="text-sm font-medium">Inscrito</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleRegister(tournament.id)}
                    disabled={isLoading || tournament.status === 'full'}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      tournament.status === 'full'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-golf-green text-white hover:bg-golf-dark'
                    }`}
                  >
                    {isLoading ? 'Procesando...' : 'Inscribirse'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* My Tournaments */}
      {user.tournaments && user.tournaments.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold text-golf-dark mb-4">Mis Torneos</h2>
          <div className="space-y-3">
            {user.tournaments.map((tournament) => (
              <div key={tournament.id} className="flex items-center justify-between p-3 bg-golf-light rounded-lg">
                <div>
                  <h4 className="font-semibold text-golf-dark">{tournament.name}</h4>
                  <p className="text-sm text-golf-brown">
                    {new Date(tournament.date).toLocaleDateString('es-ES')} - {tournament.club}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle size={16} />
                  <span className="text-sm font-medium">Confirmado</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Tournaments 