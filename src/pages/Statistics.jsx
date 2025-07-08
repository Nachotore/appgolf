import { useState } from 'react'
import { BarChart3, TrendingUp, Target, Calendar, Award } from 'lucide-react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const statsImg = 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80'

const Statistics = ({ user }) => {
  const [timeRange, setTimeRange] = useState('6months')

  // Datos de ejemplo para las estadísticas
  const sampleRounds = [
    { date: '2024-01-15', score: 76, handicap: 12, course: 'El Cantón Golf Club', notes: 'Con Ignacio Toré y Gonzalo Córdoba' },
    { date: '2024-01-08', score: 82, handicap: 12, course: 'Club de Golf Buenos Aires', notes: 'Viento fuerte, Matías Salse hizo 79' },
    { date: '2024-01-01', score: 75, handicap: 11, course: 'El Cantón Golf Club', notes: 'Mejor score del año, torneo con Ignacio Toré' },
    { date: '2023-12-25', score: 80, handicap: 12, course: 'Olivos Golf Club', notes: 'Ronda familiar, Gonzalo Córdoba hizo 77' },
    { date: '2023-12-18', score: 78, handicap: 12, course: 'El Cantón Golf Club', notes: 'Primera vez en El Cantón' },
    { date: '2023-12-11', score: 81, handicap: 12, course: 'San Andrés Golf Club', notes: 'Con Matías Salse' },
    { date: '2023-12-04', score: 77, handicap: 11, course: 'El Cantón Golf Club', notes: 'Campo en perfectas condiciones' },
    { date: '2023-11-27', score: 83, handicap: 12, course: 'Jockey Club Golf', notes: 'Lluvia ligera' },
    { date: '2023-11-20', score: 76, handicap: 11, course: 'El Cantón Golf Club', notes: 'Con Ignacio Toré' },
    { date: '2023-11-13', score: 80, handicap: 12, course: 'Club de Golf Buenos Aires', notes: 'Gonzalo Córdoba hizo 75' },
    { date: '2023-11-06', score: 84, handicap: 13, course: 'Olivos Golf Club', notes: 'Viento muy fuerte' },
    { date: '2023-10-30', score: 78, handicap: 12, course: 'El Cantón Golf Club', notes: 'Matías Salse hizo 76' }
  ]

  const rounds = user.rounds?.length > 0 ? user.rounds : sampleRounds

  // Calcular estadísticas
  const totalRounds = rounds.length
  const averageScore = totalRounds > 0 ? Math.round(rounds.reduce((sum, round) => sum + round.score, 0) / totalRounds) : 0
  const bestScore = totalRounds > 0 ? Math.min(...rounds.map(round => round.score)) : 0
  const worstScore = totalRounds > 0 ? Math.max(...rounds.map(round => round.score)) : 0
  const currentHandicap = user.handicap

  // Datos para el gráfico de evolución del hándicap
  const handicapData = {
    labels: rounds.slice(-6).map(round => new Date(round.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Hándicap',
        data: rounds.slice(-6).map(round => round.handicap || currentHandicap),
        borderColor: '#4A6741',
        backgroundColor: 'rgba(74, 103, 65, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        reverse: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  const achievements = [
    {
      id: 1,
      title: 'Primera Ronda',
      description: 'Completaste tu primera ronda',
      icon: '🏌️',
      completed: totalRounds > 0,
      progress: totalRounds > 0 ? 100 : 0
    },
    {
      id: 2,
      title: 'Score Sub-80',
      description: 'Logra un score menor a 80',
      icon: '🎯',
      completed: bestScore < 80,
      progress: bestScore < 80 ? 100 : 0
    },
    {
      id: 3,
      title: 'Consistencia',
      description: 'Juega 5 rondas consecutivas',
      icon: '📈',
      completed: totalRounds >= 5,
      progress: Math.min((totalRounds / 5) * 100, 100)
    },
    {
      id: 4,
      title: 'Hándicap Single',
      description: 'Baja tu hándicap a un dígito',
      icon: '🏆',
      completed: currentHandicap < 10,
      progress: currentHandicap < 10 ? 100 : Math.max(0, ((20 - currentHandicap) / 10) * 100)
    }
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Header con imagen */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl mb-4">
        <img src={statsImg} alt="Golf Estadísticas" className="w-full h-40 object-cover object-center opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-green-100/60" />
        <div className="absolute left-6 top-6 flex items-center space-x-4">
          <BarChart3 size={36} className="text-green-700 bg-white/80 rounded-full p-2 shadow" />
          <div>
            <h1 className="text-2xl font-bold text-gradient mb-1 drop-shadow-lg">Estadísticas</h1>
            <p className="text-green-900 font-medium drop-shadow">Analiza tu rendimiento y progreso</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-golf-green mb-1">{averageScore}</div>
          <div className="text-sm text-golf-brown">Score Promedio</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-golf-green mb-1">{totalRounds}</div>
          <div className="text-sm text-golf-brown">Rondas Jugadas</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-golf-green mb-1">{bestScore}</div>
          <div className="text-sm text-golf-brown">Mejor Score</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-golf-green mb-1">{currentHandicap}</div>
          <div className="text-sm text-golf-brown">Hándicap Actual</div>
        </div>
      </div>

      {/* Handicap Evolution Chart */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-golf-dark">Evolución del Hándicap</h2>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1 border border-golf-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-golf-green"
          >
            <option value="6months">Últimos 6 meses</option>
            <option value="3months">Últimos 3 meses</option>
            <option value="1month">Último mes</option>
          </select>
        </div>
        <div className="h-64">
          <Line data={handicapData} options={chartOptions} />
        </div>
      </div>

      {/* Recent Rounds */}
      <div className="card">
        <h2 className="text-xl font-semibold text-golf-dark mb-4">Rondas Recientes</h2>
        <div className="space-y-3">
          {rounds.slice(-5).reverse().map((round, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-golf-light rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-golf-green rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{round.score}</span>
                </div>
                <div>
                  <div className="font-medium text-golf-dark">{round.course || 'Campo'}</div>
                  <div className="text-sm text-golf-brown">
                    {new Date(round.date).toLocaleDateString('es-ES')}
                  </div>
                  {round.notes && (
                    <div className="text-xs text-golf-brown italic">{round.notes}</div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-golf-brown">Hándicap</div>
                <div className="font-semibold text-golf-green">{round.handicap || currentHandicap}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-4">
          <Award size={24} className="text-golf-green" />
          <h2 className="text-xl font-semibold text-golf-dark">Logros</h2>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center space-x-3 p-3 border border-golf-light rounded-lg">
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-golf-dark">{achievement.title}</h3>
                  <span className="text-sm text-golf-brown">{Math.round(achievement.progress)}%</span>
                </div>
                <p className="text-sm text-golf-brown mb-2">{achievement.description}</p>
                <div className="w-full bg-golf-light rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      achievement.completed ? 'bg-golf-green' : 'bg-golf-brown'
                    }`}
                    style={{ width: `${achievement.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="card">
        <h2 className="text-xl font-semibold text-golf-dark mb-4">Resumen de Rendimiento</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-golf-light">
            <span className="text-golf-brown">Rondas este mes:</span>
            <span className="font-medium text-golf-dark">{rounds.filter(r => new Date(r.date).getMonth() === new Date().getMonth()).length}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-golf-light">
            <span className="text-golf-brown">Promedio este mes:</span>
            <span className="font-medium text-golf-dark">
              {(() => {
                const monthRounds = rounds.filter(r => new Date(r.date).getMonth() === new Date().getMonth())
                return monthRounds.length > 0 ? Math.round(monthRounds.reduce((sum, r) => sum + r.score, 0) / monthRounds.length) : 0
              })()}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-golf-brown">Mejora del hándicap:</span>
            <span className="font-medium text-golf-green">
              {(() => {
                const firstHandicap = rounds[0]?.handicap || currentHandicap
                const improvement = firstHandicap - currentHandicap
                return improvement > 0 ? `+${improvement}` : improvement.toString()
              })()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics 