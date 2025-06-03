// Datos de mentores y preguntas
const mentors = [
  "Carlos Rodríguez",
  "Ana Martínez",
  "Javier López",
  "María González",
  "Diego Fernández",
  "Laura Sánchez",
];

const questions = [
  "¿Cuál es el mayor desafío técnico que has enfrentado en tu carrera?",
  "¿Qué habilidades consideras esenciales para un desarrollador en 2025?",
  "¿Cómo te mantienes actualizado con las nuevas tecnologías?",
  "¿Qué consejo le darías a alguien que está comenzando en el mundo tech?",
  "¿Cuál es tu stack tecnológico favorito y por qué?",
  "¿Cómo manejas situaciones de presión en proyectos con plazos ajustados?",
];

// Estado del juego
let gameState = {
  rounds: 0,
  selectedMentor: null,
  selectedQuestion: null,
  gameStarted: false,
};

// Elementos DOM
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const roundCounter = document.getElementById('round-counter');
const mentorsContainer = document.getElementById('mentors-container');
const questionsContainer = document.getElementById('questions-container');
const matchDisplay = document.getElementById('match-display');
const selectedMentorElement = document.getElementById('selected-mentor');
const selectedQuestionElement = document.getElementById('selected-question');

// Inicializar el juego
function initGame() {
  startButton.addEventListener('click', startGame);
  restartButton.addEventListener('click', startGame);
}

// Iniciar o reiniciar el juego
function startGame() {
  gameState = {
    rounds: 0,
    selectedMentor: null,
    selectedQuestion: null,
    gameStarted: true,
  };
  
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  matchDisplay.classList.add('hidden');
  roundCounter.textContent = '0';
  
  // Limpiar y crear nuevas cartas
  mentorsContainer.innerHTML = '';
  questionsContainer.innerHTML = '';
  
  // Barajar mentores y preguntas
  const shuffledMentors = [...mentors].sort(() => Math.random() - 0.5);
  const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
  
  // Crear cartas de mentores
  shuffledMentors.forEach((mentor, index) => {
    const card = createCard('mentor', mentor, index);
    mentorsContainer.appendChild(card);
  });
  
  // Crear cartas de preguntas
  shuffledQuestions.forEach((question, index) => {
    const card = createCard('question', question, index);
    questionsContainer.appendChild(card);
  });
}

// Crear una carta
function createCard(type, content, index) {
  const card = document.createElement('div');
  card.className = 'card w-full h-32';
  card.dataset.type = type;
  card.dataset.content = content;
  card.dataset.index = index;
  
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <div class="text-black text-xl font-bold">${type === 'mentor' ? 'Mentor' : 'Pregunta'}</div>
      </div>
      <div class="card-back">
        <p class="text-black text-sm text-center">${content}</p>
      </div>
    </div>
  `;
  
  card.addEventListener('click', () => handleCardClick(card));
  
  return card;
}

// Manejar el clic en una carta
function handleCardClick(card) {
  const type = card.dataset.type;
  const content = card.dataset.content;
  
  // Verificar si la carta ya está seleccionada o si ya hay una selección del mismo tipo
  if (
    card.classList.contains('flipped') || 
    (type === 'mentor' && gameState.selectedMentor) || 
    (type === 'question' && gameState.selectedQuestion) ||
    (gameState.selectedMentor && gameState.selectedQuestion)
  ) {
    return;
  }
  
  // Voltear la carta
  card.classList.add('flipped');
  
  // Actualizar el estado del juego
  if (type === 'mentor') {
    gameState.selectedMentor = content;
  } else {
    gameState.selectedQuestion = content;
  }
  
  // Verificar si hay un match (una carta de mentor y una de pregunta seleccionadas)
  checkForMatch();
}

// Verificar si hay un match
function checkForMatch() {
  if (gameState.selectedMentor && gameState.selectedQuestion) {
    // Mostrar el match
    selectedMentorElement.textContent = gameState.selectedMentor;
    selectedQuestionElement.textContent = gameState.selectedQuestion;
    matchDisplay.classList.remove('hidden');
    
    // Deshabilitar todas las cartas temporalmente
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
      card.classList.add('disabled');
    });
    
    // Incrementar el contador de rondas y reiniciar la selección después de un tiempo
    setTimeout(() => {
      gameState.rounds++;
      roundCounter.textContent = gameState.rounds;
      
      // Reiniciar la selección
      gameState.selectedMentor = null;
      gameState.selectedQuestion = null;
      matchDisplay.classList.add('hidden');
      
      // Voltear las cartas de nuevo
      const flippedCards = document.querySelectorAll('.card.flipped');
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
      });
      
      // Habilitar las cartas de nuevo
      allCards.forEach(card => {
        card.classList.remove('disabled');
      });
    }, 3000);
  }
}

// Inicializar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', initGame);
