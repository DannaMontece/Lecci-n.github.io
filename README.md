# 🎮 Atari Pong - Juego Clásico

Un remake del legendario juego **Pong** de Atari, implementado completamente con HTML5, CSS3 y JavaScript vanilla. Este proyecto recrea la experiencia nostálgica del primer videojuego comercialmente exitoso de la historia.

![Pong Game Screenshot](Pong%20Game%20Screenshot.png)

## 🚀 Demo en Vivo

```
Abre index.html en tu navegador favorito para jugar inmediatamente
```

## ✨ Características

### 🎯 Jugabilidad
- **Modo de juego clásico**: Jugador vs CPU
- **Sistema de puntuación**: Primer jugador en llegar a 5 puntos gana
- **IA inteligente**: CPU con comportamiento realista y balanceado
- **Física realista**: Rebotes y colisiones auténticas
- **Aumento de dificultad**: La pelota acelera gradualmente durante el juego

### 🎨 Diseño Visual
- **Estética retro auténtica**: Colores verde neón sobre fondo negro
- **Efectos visuales**: Brillos, sombras y animaciones suaves
- **Diseño responsive**: Se adapta a diferentes tamaños de pantalla
- **Interfaz intuitiva**: Menús claros y fáciles de navegar

### 🎮 Controles
- **W**: Mover paleta hacia arriba
- **S**: Mover paleta hacia abajo  
- **ESPACIO**: Pausar/Reanudar juego
- **Botones en pantalla**: Para iniciar y reiniciar

### 🔧 Características Técnicas
- **100% Frontend**: Sin dependencias de servidor
- **Vanilla JavaScript**: Sin frameworks externos
- **Canvas HTML5**: Renderizado suave y eficiente
- **Detección de colisiones**: Algoritmos precisos
- **Estados de juego**: Menú, jugando, pausado, fin de juego

## 📁 Estructura del Proyecto

```
atari-pong-game/
│
├── index.html          # Estructura principal del juego
├── styles.css          # Estilos y diseño visual
├── script.js           # Lógica del juego y controles
└── README.md           # Documentación del proyecto
```

## 🛠️ Instalación y Uso

### Opción 1: Descarga Directa
1. Descarga o clona este repositorio
2. Abre `index.html` en tu navegador
3. ¡Comienza a jugar!

### Opción 2: Clonar desde GitHub
```bash
git clone https://github.com/tu-usuario/atari-pong-game.git
cd atari-pong-game
# Abre index.html en tu navegador
```

### Opción 3: Servidor Local (Opcional)
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (si tienes http-server instalado)
npx http-server

# Luego visita http://localhost:8000
```

## 🎮 Cómo Jugar

1. **Iniciar**: Haz clic en "INICIAR JUEGO" en el menú principal
2. **Controlar tu paleta**: Usa las teclas **W** (arriba) y **S** (abajo)
3. **Objetivo**: Evita que la pelota pase tu paleta y trata de que pase la del oponente
4. **Ganar**: El primer jugador en anotar 5 puntos gana la partida
5. **Pausar**: Presiona **ESPACIO** en cualquier momento para pausar

### 💡 Consejos de Juego
- La pelota cambia de dirección según dónde golpee tu paleta
- La velocidad aumenta gradualmente, ¡mantente alerta!
- Trata de golpear la pelota con los extremos de tu paleta para ángulos más pronunciados

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura y Canvas para el área de juego
- **CSS3**: Estilos, animaciones y diseño responsive
- **JavaScript ES6+**: Lógica del juego, física y controles
- **Canvas API**: Renderizado de gráficos en tiempo real
- **RequestAnimationFrame**: Loop de juego suave y optimizado

## 📊 Características del Código

### Arquitectura del Juego
```javascript
// Objetos principales
const player = { x, y, width, height, speed }
const cpu = { x, y, width, height, speed }
const ball = { x, y, width, height, dx, dy, speed }

// Estados del juego
gameState: 'menu' | 'playing' | 'paused' | 'gameOver'
```

### Funciones Principales
- `gameLoop()`: Loop principal del juego
- `updatePlayer()`: Manejo de controles del jugador
- `updateCPU()`: IA del oponente
- `updateBall()`: Física y colisiones de la pelota
- `render()`: Dibujado de todos los elementos

## 🎯 Roadmap y Mejoras Futuras

### 🔄 Próximas Características
- [ ] **Efectos de sonido**: Implementar audio con Web Audio API
- [ ] **Modo multijugador local**: Dos jugadores humanos
- [ ] **Niveles de dificultad**: Diferentes velocidades de CPU
- [ ] **Power-ups**: Elementos especiales que cambien la jugabilidad
- [ ] **High scores**: Sistema de puntuaciones usando localStorage
- [ ] **Temas visuales**: Diferentes esquemas de colores
- [ ] **Modo torneo**: Múltiples rondas y estadísticas

### 🐛 Mejoras Técnicas
- [ ] **Optimización de rendimiento**: Mejor manejo de memoria
- [ ] **Controles táctiles**: Soporte para dispositivos móviles
- [ ] **Configuraciones**: Menú de opciones personalizable
- [ ] **Análisis de jugabilidad**: Estadísticas detalladas

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar el juego:

1. **Fork** el repositorio
2. **Crea** una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. **Commit** tus cambios (`git commit -am 'Añadir nueva característica'`)
4. **Push** a la rama (`git push origin feature/nueva-caracteristica`)
5. **Abre** un Pull Request

### 📋 Guías de Contribución
- Mantén el código limpio y comentado
- Sigue las convenciones de nomenclatura existentes
- Prueba tu código en múltiples navegadores
- Actualiza la documentación si es necesario

## 📜 Historia del Proyecto

Este proyecto fue desarrollado como parte de un ejercicio académico para implementar un juego clásico de Atari usando tecnologías web modernas. El objetivo era recrear la experiencia nostálgica del Pong original mientras se aplican las mejores prácticas de desarrollo frontend.

### 🏗️ Proceso de Desarrollo
El proyecto se desarrolló de manera incremental con commits que muestran el progreso:

1. **Estructura básica**: HTML y configuración inicial
2. **Diseño visual**: CSS y estética retro
3. **Canvas y renderizado**: Configuración del área de juego
4. **Controles del jugador**: Implementación de movimiento
5. **Física de la pelota**: Movimiento y rebotes
6. **IA del CPU**: Comportamiento del oponente
7. **Sistema de puntuación**: Lógica de juego completa
8. **Menús y estados**: Interfaz de usuario completa
9. **Pulido final**: Efectos visuales y optimizaciones

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Atari Inc.** por crear el Pong original en 1972
- **Allan Alcorn** por el diseño del juego original
- **Nolan Bushnell** por la visión de los videojuegos
- La comunidad de desarrolladores web por las herramientas y recursos

## 📞 Soporte

Si encuentras algún problema o tienes preguntas:

1. **Revisa** los issues existentes en GitHub
2. **Crea** un nuevo issue si no encuentras solución
3. **Incluye** detalles sobre tu navegador y sistema operativo
4. **Proporciona** pasos para reproducir el problema

---

⭐ **¡Si te gusta este proyecto, dale una estrella en GitHub!** ⭐

```
🎮 ¡Disfruta jugando Pong y revive la nostalgia de los videojuegos clásicos! 🎮
```
```




