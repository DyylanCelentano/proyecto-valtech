import './style.css'

// Initialize Lucide icons
lucide.createIcons();

// Get DOM elements
const mainCard = document.getElementById('mainCard');
const dealtCards = document.getElementById('dealtCards');
const questionsPanel = document.getElementById('questionsPanel');
const returnButton = document.getElementById('returnButton');

// Deal cards function
function dealCards() {
  mainCard.classList.add('hidden');
  dealtCards.classList.remove('hidden');
/*   questionsPanel.classList.remove('hidden'); */

  // Agregá clase .show con pequeño delay para animar
  const cards = dealtCards.querySelectorAll('.card-dealt');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('show');
    }, index * 100); // 100ms entre cada carta
  });
}


function returnToDeck() {
  const cards = dealtCards.querySelectorAll('.card-dealt');
  cards.forEach((card) => {
    card.classList.remove('show');
  });

  setTimeout(() => {
    mainCard.classList.remove('hidden');
    dealtCards.classList.add('hidden');
/*     questionsPanel.classList.add('hidden'); */
  }, 400); // Esperamos que se termine de ocultar
}


// Add event listeners
mainCard.addEventListener('click', dealCards);
returnButton.addEventListener('click', returnToDeck);