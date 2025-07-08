import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Flag, Eye, EyeOff } from 'lucide-react'

const golfBg = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' // Golf Argentina
const matiasImg = 'https://www.golfargentina.com/images/jugadores/matias-salse.jpg' // Imagen ficticia, reemplazar por real si existe

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Usuario por defecto: Matías Salse
    setTimeout(() => {
      const userData = {
        id: 1,
        name: 'Matías Salse',
        email: formData.email,
        handicap: 8,
        photo: matiasImg,
        rounds: [],
        bookings: [],
        tournaments: [],
        posts: [],
        challenges: []
      }
      onLogin(userData)
      setIsLoading(false)
    }, 1000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fondo golf */}
      <img src={golfBg} alt="Golf Argentina" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-green-100/60" />
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-yellow-400 rounded-3xl mb-6 shadow-2xl">
            <Flag size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-3">Golf App</h1>
          <p className="text-lg text-green-900 font-medium">Tu comunidad de golf</p>
        </div>
        <div className="card">
          <h2 className="text-2xl font-bold text-green-900 mb-8 text-center">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-900 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="tu@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-900 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-700 hover:text-green-900"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Iniciando...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-green-900">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="text-green-700 hover:text-green-900 font-medium">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login 