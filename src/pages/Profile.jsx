import { useState } from 'react'
import { Edit, Save, X, Plus, Calendar, MapPin, Target } from 'lucide-react'

const golfBg = 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80' // Golf Argentina
const matiasImg = 'https://media.istockphoto.com/id/1130284342/es/foto/joven-golfista-argentino.jpg?auto=format&fit=facearea&w=400&h=400'

const Profile = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: user.name,
    handicap: user.handicap
  })
  const [showAddRound, setShowAddRound] = useState(false)
  const [newRound, setNewRound] = useState({
    date: '',
    course: '',
    score: '',
    notes: ''
  })

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...editData
    }
    onUpdateUser(updatedUser)
    setIsEditing(false)
  }

  const handleAddRound = () => {
    if (newRound.date && newRound.course && newRound.score) {
      const round = {
        id: Date.now(),
        ...newRound,
        score: parseInt(newRound.score)
      }
      const updatedUser = {
        ...user,
        rounds: [...(user.rounds || []), round]
      }
      onUpdateUser(updatedUser)
      setNewRound({ date: '', course: '', score: '', notes: '' })
      setShowAddRound(false)
    }
  }

  const sampleRounds = [
    { id: 1, date: '2024-01-15', course: 'El Cantón Golf Club', score: 76, notes: 'Jugué con Ignacio Toré y Gonzalo Córdoba. Campo en excelentes condiciones' },
    { id: 2, date: '2024-01-08', course: 'Club de Golf Buenos Aires', score: 82, notes: 'Viento fuerte, dificultó el juego. Matías Salse hizo 79' },
    { id: 3, date: '2024-01-01', course: 'El Cantón Golf Club', score: 75, notes: 'Mejor score del año. Torneo con Ignacio Toré' },
    { id: 4, date: '2023-12-25', course: 'Olivos Golf Club', score: 80, notes: 'Ronda familiar. Gonzalo Córdoba hizo 77' },
    { id: 5, date: '2023-12-18', course: 'El Cantón Golf Club', score: 78, notes: 'Primera vez en El Cantón. Campo espectacular' }
  ]

  const rounds = user.rounds?.length > 0 ? user.rounds : sampleRounds

  return (
    <div className="p-6 space-y-8">
      {/* Header con imagen */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl mb-4">
        <img src={golfBg} alt="Golf Argentina" className="w-full h-40 object-cover object-center opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-green-100/60" />
        <div className="absolute left-6 top-6 flex items-center space-x-4">
          <img src={matiasImg} alt="Matías Salse" className="w-20 h-20 rounded-full border-4 border-yellow-300 shadow-lg" />
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-1 drop-shadow-lg">{user.name}</h1>
            <p className="text-lg text-green-900 font-medium drop-shadow">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-golf-dark">Información Personal</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-golf-green hover:text-golf-dark"
          >
            {isEditing ? <X size={20} /> : <Edit size={20} />}
          </button>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-golf-dark mb-2">Nombre</label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-golf-dark mb-2">Hándicap</label>
              <input
                type="number"
                value={editData.handicap}
                onChange={(e) => setEditData({ ...editData, handicap: parseInt(e.target.value) || 0 })}
                className="input-field"
                min="0"
                max="54"
              />
            </div>
            <button onClick={handleSave} className="btn-primary w-full">
              <Save size={16} className="mr-2" />
              Guardar Cambios
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-golf-light">
              <span className="text-golf-brown">Nombre:</span>
              <span className="font-medium text-golf-dark">{user.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-golf-light">
              <span className="text-golf-brown">Email:</span>
              <span className="font-medium text-golf-dark">{user.email}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-golf-brown">Hándicap:</span>
              <span className="font-bold text-golf-green text-lg">{user.handicap}</span>
            </div>
          </div>
        )}
      </div>

      {/* Rounds History */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-golf-dark">Historial de Rondas</h2>
          <button
            onClick={() => setShowAddRound(!showAddRound)}
            className="btn-secondary flex items-center"
          >
            <Plus size={16} className="mr-2" />
            Agregar Ronda
          </button>
        </div>

        {showAddRound && (
          <div className="mb-6 p-4 bg-golf-light rounded-lg">
            <h3 className="font-semibold text-golf-dark mb-3">Nueva Ronda</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-golf-dark mb-1">Fecha</label>
                <input
                  type="date"
                  value={newRound.date}
                  onChange={(e) => setNewRound({ ...newRound, date: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-golf-dark mb-1">Campo</label>
                <input
                  type="text"
                  value={newRound.course}
                  onChange={(e) => setNewRound({ ...newRound, course: e.target.value })}
                  className="input-field"
                  placeholder="Nombre del campo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-golf-dark mb-1">Score</label>
                <input
                  type="number"
                  value={newRound.score}
                  onChange={(e) => setNewRound({ ...newRound, score: e.target.value })}
                  className="input-field"
                  placeholder="72"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-golf-dark mb-1">Notas</label>
                <input
                  type="text"
                  value={newRound.notes}
                  onChange={(e) => setNewRound({ ...newRound, notes: e.target.value })}
                  className="input-field"
                  placeholder="Comentarios sobre la ronda"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={handleAddRound} className="btn-primary">
                Guardar Ronda
              </button>
              <button
                onClick={() => setShowAddRound(false)}
                className="btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {rounds.map((round) => (
            <div key={round.id} className="border border-golf-light rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-golf-brown" />
                  <span className="text-sm text-golf-brown">
                    {new Date(round.date).toLocaleDateString('es-ES')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target size={16} className="text-golf-green" />
                  <span className="font-bold text-golf-green">{round.score}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <MapPin size={16} className="text-golf-brown" />
                <span className="font-medium text-golf-dark">{round.course}</span>
              </div>
              {round.notes && (
                <p className="text-sm text-golf-brown italic">"{round.notes}"</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile 