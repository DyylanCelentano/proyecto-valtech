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
    "1. Para arrancar, contame un poco sobre vos. ¿Quién sos, de dónde venís, qué te gusta hacer?",
    "2. A veces ayuda pensar en cómo te describiría un amigo cercano… ¿Qué creés que diría de vos?",
    "3. ¿Estás estudiando algo actualmente? Puede ser una carrera, un curso o algo más informal también.",
    "4. ¿Qué fue lo último que aprendiste que te haya entusiasmado, y cómo llegaste a eso?",
    "5. Contame un poco sobre tu recorrido laboral. ¿Tuviste alguna experiencia previa trabajando?"
  ],

  // Carta 2
  [
    "1. Y si pensás en tus fortalezas, ¿qué es eso que sentís que hacés bien de manera natural?",
    "2. ¿Qué te motivó a elegir esa carrera o área de estudio en particular?",
    "3. Me interesa también saber cómo te organizas para equilibrar los estudios con otras actividades o responsabilidades.",
    "4. Si ya pasaste por algún trabajo, ¿cómo fue ese paso por ahí?, ¿qué te llevaste de esa etapa?",
    "5. En caso de que estés pensando en cambiar de trabajo, ¿qué te está motivando ese cambio?"
  ],

  // Carta 3
  [
    "1. Para arrancar, contame un poco sobre vos. ¿Quién sos, de dónde venís, qué te gusta hacer?",
    "2. ¿Tenés pensado seguir formándote o especializarte en algo más adelante?",
    "3. Y si mirás para atrás, ¿hubo alguna materia o proyecto que te haya marcado especialmente?",
    "4. ¿Hay algún logro o momento en tu trayectoria que te haga sentir especialmente orgulloso?",
    "5. También me interesa saber si atravesaste alguna situación difícil en el ámbito laboral o personal, y cómo la manejaste."
  ],

  // Carta 4
  [
    "1. A veces ayuda pensar en cómo te describiría un amigo cercano… ¿Qué creés que diría de vos?",
    "2. Y si pensás en tus fortalezas, ¿qué es eso que sentís que hacés bien de manera natural?",
    "3. ¿Estás estudiando algo actualmente? Puede ser una carrera, un curso o algo más informal también.",
    "4. ¿Participaste en algún proyecto, ya sea personal, grupal o académico, que te haya entusiasmado mucho?",
    "5. ¿Contaste con alguna experiencia previa trabajando? ¿Qué aprendiste de ella?"
  ],

  // Carta 5
  [
    "1. Para arrancar, contame un poco sobre vos. ¿Quién sos, de dónde venís, qué te gusta hacer?",
    "2. ¿Qué fue lo último que aprendiste que te haya entusiasmado, y cómo llegaste a eso?",
    "3. Me interesa también saber cómo te organizas para equilibrar los estudios con otras actividades o responsabilidades",
    "4. En caso de que estés pensando en cambiar de trabajo, ¿qué te está motivando ese cambio?",
    "5. ¿Hay algún logro o momento en tu trayectoria que te haga sentir especialmente orgulloso?"
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
    <div class="flex flex-col items-start text-left text-black rounded-2xl bg-white p-4 w-[250px] h-full overflow-y-auto">
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
