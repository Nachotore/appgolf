import { useState } from 'react'
import { Target, CheckCircle, Circle, Trophy, Star, Calendar } from 'lucide-react'

const Challenges = ({ user }) => {
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: 'Hacer 3 Birdies',
      description: 'Completa una ronda con al menos 3 birdies',
      category: 'Scoring',
      difficulty: 'medium',
      reward: '50 puntos',
      progress: 0,
      target: 3,
      completed: false,
      icon: '🐦'
    },
    {
      id: 2,
      title: 'Jugar en 5 Canchas Distintas',
      description: 'Juega en 5 campos de golf diferentes incluyendo El Cantón',
      category: 'Exploration',
      difficulty: 'easy',
      reward: '100 puntos',
      progress: 3,
      target: 5,
      completed: false,
      icon: '🏌️'
    },
    {
      id: 3,
      title: 'Score Sub-80',
      description: 'Logra un score menor a 80 golpes',
      category: 'Scoring',
      difficulty: 'hard',
      reward: '200 puntos',
      progress: 0,
      target: 1,
      completed: false,
      icon: '🎯'
    },
    {
      id: 4,
      title: '5 Rondas Consecutivas',
      description: 'Juega 5 rondas en 5 días consecutivos',
      category: 'Consistency',
      difficulty: 'medium',
      reward: '150 puntos',
      progress: 3,
      target: 5,
      completed: false,
      icon: '📅'
    },
    {
      id: 5,
      title: 'Hándicap Single',
      description: 'Baja tu hándicap a un dígito (menor a 10)',
      category: 'Improvement',
      difficulty: 'expert',
      reward: '500 puntos',
      progress: Math.max(0, 20 - user.handicap),
      target: 10,
      completed: user.handicap < 10,
      icon: '🏆'
    },
    {
      id: 6,
      title: 'Eagle en Par 5',
      description: 'Haz un eagle en un hoyo par 5',
      category: 'Scoring',
      difficulty: 'expert',
      reward: '300 puntos',
      progress: 0,
      target: 1,
      completed: false,
      icon: '🦅'
    },
    {
      id: 7,
      title: '10 Rondas en un Mes',
      description: 'Completa 10 rondas en un período de 30 días',
      category: 'Volume',
      difficulty: 'medium',
      reward: '250 puntos',
      progress: user.rounds?.length || 0,
      target: 10,
      completed: (user.rounds?.length || 0) >= 10,
      icon: '📊'
    },
    {
      id: 9,
      title: 'El Cantón Master',
      description: 'Juega 5 rondas en El Cantón Golf Club',
      category: 'Exploration',
      difficulty: 'medium',
      reward: '300 puntos',
      progress: (user.rounds || []).filter(r => r.course === 'El Cantón Golf Club').length,
      target: 5,
      completed: (user.rounds || []).filter(r => r.course === 'El Cantón Golf Club').length >= 5,
      icon: '🏆'
    },
    {
      id: 10,
      title: 'Jugar con los Pros',
      description: 'Juega una ronda con Ignacio Toré, Gonzalo Córdoba o Matías Salse',
      category: 'Social',
      difficulty: 'hard',
      reward: '400 puntos',
      progress: 0,
      target: 1,
      completed: false,
      icon: '👥'
    },
    {
      id: 8,
      title: 'Par en Todos los Par 3',
      description: 'Haz par o mejor en todos los par 3 de una ronda',
      category: 'Accuracy',
      difficulty: 'hard',
      reward: '175 puntos',
      progress: 0,
      target: 1,
      completed: false,
      icon: '⛳'
    }
  ])

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-orange-100 text-orange-800'
      case 'expert': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'Fácil'
      case 'medium': return 'Medio'
      case 'hard': return 'Difícil'
      case 'expert': return 'Experto'
      default: return 'Desconocido'
    }
  }

  const completedChallenges = challenges.filter(c => c.completed).length
  const totalChallenges = challenges.length
  const completionRate = Math.round((completedChallenges / totalChallenges) * 100)

  const categories = ['All', 'Scoring', 'Exploration', 'Consistency', 'Improvement', 'Volume', 'Accuracy', 'Social']
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredChallenges = selectedCategory === 'All' 
    ? challenges 
    : challenges.filter(c => c.category === selectedCategory)

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-golf-green to-golf-dark rounded-3xl mb-6 shadow-2xl">
          <Target size={36} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gradient mb-3">Desafíos</h1>
        <p className="text-lg text-golf-brown font-medium">Completa desafíos y mejora tu juego</p>
      </div>

      {/* Progress Overview */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-golf-dark">Progreso General</h2>
          <div className="flex items-center space-x-2">
            <Trophy size={20} className="text-golf-green" />
            <span className="font-semibold text-golf-green">{completedChallenges}/{totalChallenges}</span>
          </div>
        </div>
        <div className="w-full bg-golf-light rounded-full h-3 mb-2">
          <div
            className="bg-golf-green h-3 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
        <p className="text-sm text-golf-brown">{completionRate}% completado</p>
      </div>

      {/* Category Filter */}
      <div className="card">
        <h3 className="text-lg font-semibold text-golf-dark mb-3">Filtrar por Categoría</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-golf-green text-white'
                  : 'bg-golf-light text-golf-dark hover:bg-golf-brown hover:text-white'
              }`}
            >
              {category === 'All' ? 'Todos' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges List */}
      <div className="space-y-4">
        {filteredChallenges.map((challenge) => (
          <div key={challenge.id} className="card">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{challenge.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-golf-dark">{challenge.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                      {getDifficultyText(challenge.difficulty)}
                    </span>
                    {challenge.completed ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : (
                      <Circle size={20} className="text-golf-brown" />
                    )}
                  </div>
                </div>
                
                <p className="text-golf-brown mb-3">{challenge.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Star size={16} className="text-yellow-500" />
                    <span className="text-sm font-medium text-golf-dark">{challenge.reward}</span>
                  </div>
                  <span className="text-sm text-golf-brown">{challenge.category}</span>
                </div>

                {!challenge.completed && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-golf-brown">Progreso</span>
                      <span className="font-medium text-golf-dark">
                        {challenge.progress}/{challenge.target}
                      </span>
                    </div>
                    <div className="w-full bg-golf-light rounded-full h-2">
                      <div
                        className="bg-golf-brown h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((challenge.progress / challenge.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {challenge.completed && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle size={16} />
                    <span className="text-sm font-medium">¡Completado!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="card">
        <h2 className="text-xl font-semibold text-golf-dark mb-4">Estadísticas de Desafíos</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-golf-green mb-1">{completedChallenges}</div>
            <div className="text-sm text-golf-brown">Completados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-golf-green mb-1">{totalChallenges - completedChallenges}</div>
            <div className="text-sm text-golf-brown">Pendientes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-golf-green mb-1">
              {challenges.filter(c => c.difficulty === 'easy').filter(c => c.completed).length}
            </div>
            <div className="text-sm text-golf-brown">Fáciles</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-golf-green mb-1">
              {challenges.filter(c => c.difficulty === 'expert').filter(c => c.completed).length}
            </div>
            <div className="text-sm text-golf-brown">Expertos</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Challenges 