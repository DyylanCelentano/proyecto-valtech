<<<<<<< HEAD
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
=======
import './style.css'

// Initialize Lucide icons
lucide.createIcons();

// Get DOM elements
const mainCard       = document.getElementById('mainCard');
const dealtContainer = document.getElementById('dealtContainer');
const dealtCards     = document.getElementById('dealtCards');
const returnButton   = document.getElementById('returnButton');
const subtituloCartas = document.getElementById('subtituloCartas');

const preguntasPorCarta = [
  // Carta 1
  [
    "1. Para empezar, contame quién sos y qué estás haciendo actualmente. ¿Estudiás, trabajás, hacés algún curso?",
    "2. ¿Estás estudiando algo actualmente? ¿Qué te motivó a elegir esa carrera o curso?",
    "3. ¿Tuviste alguna experiencia trabajando o participando en un proyecto, aunque sea informal?",
    "4. Pensando en una situación en la que algo no salió como esperabas… ¿cómo reaccionaste?",
    "5. ¿Qué te gustaría estar haciendo dentro de dos años, tanto en lo laboral como en lo personal?",
    "6. ¿Tuviste algún desafío al trabajar con alguien muy distinto a vos? ¿Cómo lo manejaste?",
    "7. ¿Qué tipo de proyectos o responsabilidades te gustaría asumir en un futuro?"
  ],

  // Carta 2
  [
    "1. Contame un poco sobre vos: ¿cómo te describirías y qué estás haciendo hoy en día?",
    "2. ¿Qué creés que diría un amigo tuyo si le pregunto cómo sos?",
    "3. ¿Qué fue lo último que aprendiste que te entusiasmó? ¿Cómo lo descubriste?",
    "4. ¿Alguna vez trabajaste en equipo? ¿Cómo se organizaban y qué rol tomabas vos?",
    "5. Contame una situación en la que tuviste que resolver un problema sin tener mucha experiencia previa.",
    "6. ¿Hay alguna habilidad o área que te gustaría desarrollar en el corto plazo?",
    "7. ¿Por qué te interesa trabajar con nosotros?"
  ],

  // Carta 3
  [
    "1. Para arrancar, contame cómo te describirías y en qué estás enfocado hoy (estudio, curso, búsqueda laboral, etc.).",
    "2. ¿Cómo te organizás para equilibrar tus estudios con otras responsabilidades?",
    "3. ¿Participaste en algún proyecto personal, grupal o académico que te haya entusiasmado?",
    "4. ¿Te tocó alguna vez adaptarte a un grupo con formas de trabajar distintas a las tuyas?",
    "5. ¿Qué te gustaría que tenga tu primer trabajo ideal?",
    "6. ¿Hubo alguna materia o clase que te haya marcado especialmente? ¿Por qué?",
    "7. Si tuvieras que imaginarte profesionalmente dentro de 5 años, ¿cómo te gustaría estar?"
  ],

  // Carta 4
  [
    "1. Si tuvieras que contarle a alguien nuevo quién sos y qué hacés, ¿qué le dirías?",
    "2. ¿Qué te gusta hacer en tu tiempo libre? ¿Tenés algún hobby o actividad que disfrutes?",
    "3. ¿Hay algún logro, por más chico que sea, del que te sientas orgulloso?",
    "4. Pensá en una situación en la que ayudaste a otra persona. ¿Cómo fue esa experiencia?",
    "5. ¿Te imaginás siguiendo una carrera más técnica, creativa o social? ¿Por qué?",
    "6. ¿Qué otras habilidades además de lo técnico creés que son importantes para trabajar?",
    "7. ¿Qué podrías aportar a una empresa como esta si te sumaras al equipo?"
  ],

  // Carta 5
  [
    "1. Para empezar, contame un poco sobre vos: ¿quién sos, qué te gusta hacer y en qué etapa estás hoy?",
    "2. ¿Qué herramientas tecnológicas o plataformas usás habitualmente para estudiar o aprender?",
    "3. ¿Alguna vez tuviste que aprender algo técnico por tu cuenta? ¿Cómo lo hiciste?",
    "4. Contame una situación en la que tuviste que recibir una crítica o una devolución. ¿Cómo la tomaste?",
    "5. ¿Qué tipo de formación te interesaría sumar en el futuro (cursos, idiomas, talleres, etc.)?",
    "6. ¿Tuviste algún desafío al trabajar con alguien muy distinto a vos? ¿Cómo lo manejaste?",
    "7. ¿Qué tipo de proyectos o responsabilidades te gustaría asumir en un futuro?"
  ],

  // Carta 6
  [
    "1. Contame un poco sobre vos: ¿cómo te describís y qué estás haciendo actualmente?",
    "2. ¿Qué tipo de tareas o temas te resultan más fáciles de aprender?",
    "3. ¿Qué aprendiste de tu primer acercamiento al mundo laboral, voluntariado o práctica?",
    "4. Pensá en una vez que tuviste que ser flexible o cambiar tus planes. ¿Qué hiciste?",
    "5. ¿Qué esperás encontrar en un equipo de trabajo para sentirte cómodo/a?",
    "6. ¿Hay alguna habilidad o área en la que te gustaría mejorar próximamente?",
    "7. Si tuvieras que definir tu trabajo ideal dentro de 3 o 5 años, ¿cómo sería?"
  ],

  // Carta 7
  [
    "1. Si tuvieras que describirte en pocas palabras, ¿qué dirías sobre vos y lo que estás haciendo hoy?",
    "2. ¿Qué importancia le das al trabajo en equipo y qué creés que aportás vos?",
    "3. ¿Qué hiciste la última vez que no sabías cómo avanzar con algo? ¿Cómo buscaste una solución?",
    "4. ¿Qué otras habilidades además de lo técnico creés que son importantes para trabajar?",
    "5. ¿Qué tipo de entorno laboral te gustaría en tu primer trabajo?",
    "6. ¿Hay algo que estés queriendo mejorar últimamente, personal o profesionalmente?",
    "7. ¿Qué sabés sobre esta organización y por qué te interesaría sumarte? "
  ],

  // Carta 8
  [
    "1. ¿Cómo te presentarías si tuvieras que contarle a alguien quién sos y qué hacés hoy?",
    "2. ¿Qué valores o actitudes creés que son importantes para convivir en un equipo?",
    "3. ¿Cuál fue un error que cometiste y que te enseñó algo importante?",
    "4. ¿Tuviste alguna situación difícil en lo personal o académico que pudiste superar? ¿Qué aprendiste?",
    "5. ¿Te imaginás trabajando en una empresa grande, un emprendimiento propio o algo diferente?",
    "6. Si tuvieras que definir un objetivo a cumplir este año, ¿cuál sería?",
    "7. ¿Por qué creés que deberíamos contratarte?"
  ]
];


// Función para repartir las cartas
function repartirCartas() {
  mainCard.classList.add('hidden');
  dealtContainer.classList.remove('hidden');
  subtituloCartas.textContent = 'Elige una carta para empezar la entrevista';

  const cards = dealtCards.querySelectorAll('.card-dealt');
  cards.forEach((card, index) => {
    const front = card.querySelector('.card-front');
    const back  = card.querySelector('.card-back');
    front.classList.remove('hidden');
    back.classList.add('hidden');
    back.innerHTML = '';
    card.classList.remove('show');

    card.onclick = () => vueltaCarta(card, index);
  });

  cards.forEach((card, i) => {
    setTimeout(() => card.classList.add('show'), i * 100);
  });
}

// Función para volver al mazo
function volverAlMazo() {
  const cards = dealtCards.querySelectorAll('.card-dealt');
  cards.forEach(card => {
    card.classList.remove('show');
    const front = card.querySelector('.card-front');
    const back  = card.querySelector('.card-back');
    front.classList.remove('hidden');
    back.classList.add('hidden');
    back.innerHTML = '';
    card.onclick = null;
  });

  setTimeout(() => {
    mainCard.classList.remove('hidden');
    dealtContainer.classList.add('hidden');
  }, 620);

  subtituloCartas.textContent = 'Hacé click para repartir 5 cartas';
}

function vueltaCarta(card, indice) {
  const front = card.querySelector('.card-front');
  const back  = card.querySelector('.card-back');
  const preguntas = preguntasPorCarta[indice] || [];

  front.classList.add('hidden');
  back.classList.remove('hidden');

  back.innerHTML = `
    <div class="flex flex-col items-start text-left text-black rounded-2xl bg-white p-4 w-[250px] overflow-y-auto">
      ${preguntas
        .map(q => `<p class="text-sm mb-2 px-1 w-full break-words">${q}</p>`)
        .join('')}
    </div>
  `;

  card.classList.remove('mx-8');
}

// Event listeners
mainCard.addEventListener('click', repartirCartas);
returnButton.addEventListener('click', volverAlMazo);
>>>>>>> eef59bf91f83b3f710e9ad579835e65955c09cd5
