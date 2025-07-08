# Golf App - Tu Comunidad de Golf

Una aplicación web moderna para golfistas con estética cálida y funcionalidades completas.

## 🏌️ Características

- **Autenticación**: Login y registro de usuarios
- **Perfil Personal**: Gestión de información y hándicap
- **Reserva de Canchas**: Sistema de reservas simulado
- **Torneos**: Lista de torneos e inscripciones
- **Red Social**: Feed con posteos y interacciones
- **Estadísticas**: Análisis de rendimiento con gráficos
- **Desafíos**: Sistema de logros y metas
- **Navegación Mobile**: Diseño optimizado para móviles

## 🎨 Diseño

- Paleta de colores cálida (beige, verde sobrio, marrón madera)
- Interfaz moderna y limpia
- Diseño responsivo mobile-first
- Iconografía consistente

## 🚀 Tecnologías

- **React 18** - Framework principal
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Estilos y diseño
- **React Router** - Navegación
- **Chart.js** - Gráficos de estadísticas
- **Lucide React** - Iconos
- **LocalStorage** - Persistencia de datos

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd golf-app
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

4. **Construir para producción**
```bash
npm run build
```

## 🌐 Deploy en Netlify

### Opción 1: Deploy desde GitHub

1. Sube tu código a GitHub
2. Ve a [Netlify](https://netlify.com)
3. Haz clic en "New site from Git"
4. Selecciona tu repositorio
5. Configura el build:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Haz clic en "Deploy site"

### Opción 2: Deploy manual

1. Construye el proyecto:
```bash
npm run build
```

2. Arrastra la carpeta `dist` a Netlify

### Configuración adicional

Agrega un archivo `_redirects` en la carpeta `public` para SPA routing:

```
/*    /index.html   200
```

## 📱 Funcionalidades Principales

### Autenticación
- Login con email y contraseña
- Registro de nuevos usuarios
- Persistencia de sesión

### Perfil de Usuario
- Edición de información personal
- Gestión de hándicap
- Historial de rondas jugadas
- Agregar nuevas rondas

### Reserva de Canchas
- Selección de club de golf
- Fecha y horario
- Número de jugadores
- Historial de reservas

### Torneos
- Lista de torneos disponibles
- Información detallada (formato, premios, etc.)
- Sistema de inscripción
- Estado de inscripciones

### Red Social
- Feed de posteos
- Crear nuevos posteos
- Sistema de likes
- Interacciones entre usuarios

### Estadísticas
- Score promedio
- Rondas jugadas
- Gráfico de evolución del hándicap
- Logros y metas
- Resumen de rendimiento

### Desafíos
- Lista de desafíos por categoría
- Sistema de progreso
- Diferentes niveles de dificultad
- Recompensas por completar

## 🎯 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   └── BottomNavigation.jsx
├── pages/              # Páginas principales
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Home.jsx
│   ├── Profile.jsx
│   ├── Booking.jsx
│   ├── Tournaments.jsx
│   ├── Social.jsx
│   ├── Statistics.jsx
│   └── Challenges.jsx
├── utils/              # Utilidades y helpers
├── assets/             # Imágenes y recursos
├── App.jsx             # Componente principal
├── main.jsx            # Punto de entrada
└── index.css           # Estilos globales
```

## 🎨 Paleta de Colores

- **Golf Beige**: `#F5F1E8` - Fondo principal
- **Golf Green**: `#4A6741` - Color primario
- **Golf Brown**: `#8B7355` - Color secundario
- **Golf Dark**: `#2C3E50` - Texto principal
- **Golf Light**: `#E8E0D0` - Elementos claros
- **Golf Accent**: `#A67C52` - Acentos

## 📱 Responsive Design

La aplicación está optimizada para:
- **Mobile**: Navegación inferior tipo app
- **Tablet**: Diseño adaptativo
- **Desktop**: Experiencia completa

## 🔧 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construcción para producción
- `npm run preview` - Vista previa de producción
- `npm run lint` - Linting del código

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

**¡Disfruta tu Golf App! 🏌️⛳** 