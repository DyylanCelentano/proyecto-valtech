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
  questionsPanel.classList.remove('hidden');
}

// Return to deck function
function returnToDeck() {
  mainCard.classList.remove('hidden');
  dealtCards.classList.add('hidden');
  questionsPanel.classList.add('hidden');
}

// Add event listeners
mainCard.addEventListener('click', dealCards);
returnButton.addEventListener('click', returnToDeck);