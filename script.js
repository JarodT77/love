const lifeContainer = document.getElementById('lifeContainer');
let lives = 6;

function setupLives() {
  lifeContainer.innerHTML = '';
  for (let i = 0; i < lives; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    lifeContainer.appendChild(heart);
  }
}

function loseLife() {
  if (lives > 0) {
    lives--;
    const hearts = document.querySelectorAll('.heart');
    if (hearts[lives]) {
      hearts[lives].classList.add('lost'); // Rend le dernier cœur perdu
    }
    if (lives === 0) {
  setTimeout(() => {
    showLoseAlert();
  }, 100);
}

  }
}

const word = "MOI AUSSI JE PEUX TE VOIR PENSER A MOI"; // Le mot à deviner
let guessedLetters = []; // Lettres déjà devinées

function setupWord() {
  const wordContainer = document.getElementById('wordContainer');
  wordContainer.innerHTML = ''; // Vide le conteneur

  word.split('').forEach(letter => {
    const letterSpan = document.createElement('span');
    letterSpan.classList.add('letter');

    if (letter === ' ') {
      letterSpan.textContent = ' '; // Affiche un espace vide pour les espaces dans la phrase
      letterSpan.classList.add('space'); // Classe spéciale pour styliser les espaces si nécessaire
    } else {
      letterSpan.textContent = guessedLetters.includes(letter) ? letter : '_'; // Affiche la lettre si elle a été devinée, sinon '_'
    }

    wordContainer.appendChild(letterSpan);
  });
}

function checkLetter(letter) {
  if (word.includes(letter)) {
    guessedLetters.push(letter);
    setupWord(); // Met à jour l'affichage du mot

    const lettersOnly = word.replace(/ /g, ''); // Supprime les espaces de la vérification
    if (lettersOnly.split('').every(l => guessedLetters.includes(l))) {
      setTimeout(() => {
        showCustomAlert('Bravo ! Tu as deviné le mot secret! ' + word );
  }, 100);
    }
  } else {
    loseLife(); // Si la lettre est incorrecte, on perd une vie
  }
}


function setupLetters() {
  const letterContainer = document.getElementById("lettersContainer");

  for (let i = 65; i <= 90; i++) { // Code ASCII de 'A' (65) à 'Z' (90)
    const letter = String.fromCharCode(i);
    const letterDiv = document.createElement("div");
    letterDiv.classList.add("letter");
    letterDiv.textContent = letter;

    // Ajoute l'événement de clic pour vérifier la lettre
    letterDiv.addEventListener('click', () => {
      checkLetter(letter);
      letterDiv.classList.add('disabled'); // Empêche de cliquer plusieurs fois sur la même lettre
    });

    letterContainer.appendChild(letterDiv);
  }
}

function showCustomAlert(message) {
  const alertBox = document.getElementById('customAlert');
  const alertMessage = document.getElementById('alertMessage');
  const closeBtn = document.getElementById('closeAlert');

  alertMessage.textContent = message; // Affiche le message personnalisé
  alertBox.classList.remove('hidden'); // Montre la modale

  closeBtn.addEventListener('click', () => {
    alertBox.classList.add('hidden'); // Cache la modale quand on clique sur OK
  });
}

function showLoseAlert() {
  const alertBoxLose = document.getElementById('customAlertLose');
  const closeBtnLose = document.getElementById('closeAlertLose');

  alertBoxLose.classList.remove('hidden'); // Affiche la modale

  closeBtnLose.addEventListener('click', () => {
    alertBoxLose.classList.add('hidden'); // Cache la modale
    location.reload(); // Recharge la page pour recommencer
  });
}



// Initialisation du jeu
setupWord();
setupLetters();
setupLives();
