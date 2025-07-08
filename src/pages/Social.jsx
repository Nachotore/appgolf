import { useState } from 'react'
import { Users, Heart, MessageCircle, Share, Image, Send } from 'lucide-react'

const Social = ({ user }) => {
  const [newPost, setNewPost] = useState('')
  const [showNewPost, setShowNewPost] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const matiasImg = 'https://www.golfargentina.com/images/jugadores/matias-salse.jpg' // Imagen ficticia, reemplazar por real si existe
  const cantonGolfImg = 'https://www.golfargentina.com/images/canchas/el-canton-golf.jpg'

  const samplePosts = [
    {
      id: 1,
      user: {
        name: 'Ignacio Toré',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        handicap: 6
      },
      content: '¡Increíble ronda en El Cantón hoy! Hice 68 golpes, mi mejor score del año. El campo está en perfectas condiciones. ¡Recomendado!',
      image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=300&fit=crop',
      likes: 42,
      comments: 12,
      timestamp: '2024-01-15T14:30:00Z',
      isLiked: false
    },
    {
      id: 2,
      user: {
        name: 'Gonzalo Córdoba',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        handicap: 9
      },
      content: 'Acabo de comprar un nuevo driver TaylorMade Stealth. ¿Alguien más lo ha probado? Primera impresión: muy estable en el swing.',
      likes: 18,
      comments: 8,
      timestamp: '2024-01-15T12:15:00Z',
      isLiked: true
    },
    {
      id: 3,
      user: {
        name: 'Matías Salse',
        photo: matiasImg,
        handicap: 12
      },
      content: 'Primera vez jugando en El Cantón. ¡Qué campo espectacular! Los greens están perfectos y el diseño es desafiante. Volveré pronto.',
      image: cantonGolfImg,
      likes: 35,
      comments: 9,
      timestamp: '2024-01-15T10:45:00Z',
      isLiked: false
    },
    {
      id: 4,
      user: {
        name: 'Ignacio Toré',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        handicap: 6
      },
      content: 'Torneo de fin de semana en El Cantón. ¿Quién se anima? Será un buen desafío con este viento.',
      likes: 28,
      comments: 15,
      timestamp: '2024-01-14T16:20:00Z',
      isLiked: false
    }
  ]

  const [posts, setPosts] = useState(samplePosts)

  const handleCreatePost = () => {
    if (newPost.trim()) {
      setIsLoading(true)
      
      setTimeout(() => {
        const post = {
          id: Date.now(),
          user: {
            name: user.name,
            photo: user.photo,
            handicap: user.handicap
          },
          content: newPost,
          likes: 0,
          comments: 0,
          timestamp: new Date().toISOString(),
          isLiked: false
        }
        
        setPosts([post, ...posts])
        setNewPost('')
        setShowNewPost(false)
        setIsLoading(false)
      }, 1000)
    }
  }

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        }
      }
      return post
    }))
  }

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const postTime = new Date(timestamp)
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Hace unos minutos'
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`
    return postTime.toLocaleDateString('es-ES')
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-golf-green to-golf-dark rounded-3xl mb-6 shadow-2xl">
          <Users size={36} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gradient mb-3">Red Social</h1>
        <p className="text-lg text-golf-brown font-medium">Conecta con otros golfistas</p>
      </div>

      {/* Create Post */}
      <div className="card">
        <div className="flex items-start space-x-3">
          <img
            src={user.photo}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <button
              onClick={() => setShowNewPost(true)}
              className="w-full text-left p-3 border border-golf-light rounded-lg text-golf-brown hover:bg-golf-light transition-colors duration-200"
            >
              ¿Qué tal fue tu ronda hoy?
            </button>
          </div>
        </div>

        {showNewPost && (
          <div className="mt-4 space-y-4">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Comparte tu experiencia en el campo..."
              className="w-full p-3 border border-golf-light rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-golf-green focus:border-transparent"
              rows="4"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-golf-brown hover:text-golf-dark">
                  <Image size={20} />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowNewPost(false)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={isLoading || !newPost.trim()}
                  className="btn-primary flex items-center"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Publicando...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Publicar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="card">
            {/* Post Header */}
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={post.user.photo}
                alt={post.user.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-golf-dark">{post.user.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-golf-brown">
                  <span>Hándicap {post.user.handicap}</span>
                  <span>•</span>
                  <span>{formatTimeAgo(post.timestamp)}</span>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-golf-dark mb-4 leading-relaxed">{post.content}</p>

            {/* Post Image */}
            {post.image && (
              <img
                src={post.image}
                alt="Post"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-golf-light">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-2 transition-colors duration-200 ${
                    post.isLiked ? 'text-red-500' : 'text-golf-brown hover:text-red-500'
                  }`}
                >
                  <Heart size={20} className={post.isLiked ? 'fill-current' : ''} />
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-golf-brown hover:text-golf-dark transition-colors duration-200">
                  <MessageCircle size={20} />
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-golf-brown hover:text-golf-dark transition-colors duration-200">
                  <Share size={20} />
                  <span className="text-sm font-medium">Compartir</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Social 