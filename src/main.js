import './style.css'

// Initialize Lucide icons
lucide.createIcons();

// Get DOM elements
const mainCard = document.getElementById('mainCard');
const dealtCards = document.getElementById('dealtCards');
const returnButton = document.getElementById('returnButton');

// Función para repartir las cartas
function repartirCartas() {
  mainCard.classList.add('hidden');
  dealtCards.classList.remove('hidden');

  // Asegurarse de que todas las cartas estén en su estado inicial
  const cards = dealtCards.querySelectorAll('.card-dealt');
  cards.forEach((card) => {
    const cardFront = card.querySelector('.card-front');
    const cardBack = card.querySelector('.card-back');

    cardFront.classList.remove('hidden'); // Mostrar el frente
    cardBack.classList.add('hidden'); // Ocultar el reverso
    cardBack.innerHTML = ''; // Limpiar el contenido dinámico de la carta trasera
  });

  // Agregar eventos de clic a las cartas
  clickCarta();

  // Animar las cartas
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('show')
    }, index * 100); // 100ms entre cada carta
  });
}

/* Funcion para que se vuelva al mazo */
function volverAlMazo() {
  const cards = dealtCards.querySelectorAll('.card-dealt')
  cards.forEach((card) => {
    const cardFront = card.querySelector('.card-front')
    const cardBack = card.querySelector('.card-back')

    // Restaurar el estado inicial de la carta
    cardFront.classList.remove('hidden') 
    cardBack.classList.add('hidden') 
    cardBack.innerHTML = ''; // Limpiar el contenido dinámico del reverso
  });

  setTimeout(() => {
    mainCard.classList.remove('hidden'); // Mostrar el mazo principal
    dealtCards.classList.add('hidden'); // Ocultar las cartas repartidas
  }, 10); // // delay
}

// Función para dar vuelta una carta
function vueltaCarta(card) {
  const cardFront = card.querySelector('.card-front');
  const cardBack = card.querySelector('.card-back');

  // Ocultar el frente y mostrar el reverso
  cardFront.classList.add('hidden');
  cardBack.classList.remove('hidden');

  // Agregar contenido dinámico al reverso
  cardBack.innerHTML = `
    <div class="flex flex-col items-center justify-center text-white rounded-2xl bg-gray-800">
      <p class="text-center px-4 mb-4">- pregunta 1</p>
      <p class="text-center px-4 mb-4">- pregunta 2</p>
      <p class="text-center px-4 mb-4">- pregunta 3</p>
      <p class="text-center px-4 mb-4">- pregunta 4</p>
      <p class="text-center px-4 mb-4">- pregunta 5</p>
      <button id="volver-mazo" class="bg-blue-500 text-white px-4 py-3 my-1 rounded-lg">Volver al mazo</button>
    </div>
  `

  // Agregar evento al botón "Volver al mazo"
  const botonVolverAlMazo = cardBack.querySelector('#volver-mazo');
  botonVolverAlMazo.addEventListener('click', () => {
    volverAlMazo();
  })
}

/* Funcion agregarle evento de click a CADA carta */
function clickCarta() {
  const cards = dealtCards.querySelectorAll('.card-dealt')

  cards.forEach( (card) => {
    card.addEventListener('click', () => {
      vueltaCarta(card) /* Llama a la funcion para que de vuelta ESA carta */
    })
  })
}

// Add event listeners
mainCard.addEventListener('click', repartirCartas)
returnButton.addEventListener('click', volverAlMazo)