const questions = [
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "What does CPU stand for?",
      correct_answer: "Central Processing Unit",
      incorrect_answers: [
        "Central Process Unit",
        "Computer Personal Unit",
        "Central Processor Unit",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
      correct_answer: "Final",
      incorrect_answers: ["Static", "Private", "Public"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "The logo for Snapchat is a Bell.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "Pointers were not used in the original C programming language; they were added later on in C++.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:"What is the most preferred image format used for logos in the Wikimedia database?",
      correct_answer: ".svg",
      incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "In web design, what does CSS stand for?",
      correct_answer: "Cascading Style Sheet",
      incorrect_answers: [
        "Counter Strike: Source",
        "Corrective Style Sheet",
        "Computer Style Sheet",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:"What is the code name for the mobile operating system Android 7.0?",
      correct_answer: "Nougat",
      incorrect_answers: [
        "Ice Cream Sandwich",
        "Jelly Bean",
        "Marshmallow",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "On Twitter, what is the character limit for a Tweet?",
      correct_answer: "140",
      incorrect_answers: ["120", "160", "100"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "Linux was first created as an alternative to Windows XP.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:"Which programming language shares its name with an island in Indonesia?",
      correct_answer: "Java",
      incorrect_answers: ["Python", "C", "Jakarta"],
    },
];

//VARIABILI GLOBALI PAGINA DUE
var timerInterval; // Variabile per memorizzare l'intervallo del timer
var numeroSlide; // Variabile per contare il numero della domanda corrente
var punteggio;
var numeroDomande;
var arraydomande; // Copia array (che viene svuotata)
var tempoText;

// VARIABILI GLOBALI PAGINA TRE
var punteggioUtente;
var totaleDomande = questions.length;
var boxCorrette;
var boxSbagliate;

window.onload = function () {
    if (window.location.href.endsWith('index_home.html')) {
        ;
    } else if (window.location.href.endsWith('index_domande.html')) {
        numeroSlide = 1; // Variabile per contare il numero della domanda corrente
        punteggio = 0;
        numeroDomande = document.getElementById("numerodomande");
        arraydomande = [...questions]; // Copia array (che viene svuotata)
        tempoText = document.getElementById("tempoText");

        shuffleArray(arraydomande);
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChartTime);
        functionDomande(); // Avvia la prima domanda all'avvio dello script

    } else if (window.location.href.endsWith('index_tre.html')) {
        //IMPORTAZIONE VARIABILE 
        punteggioUtente = localStorage.getItem("punteggioUtente");
        totaleDomande = localStorage.getItem("totaleDomande");
        // DICHIARAZIONE CONTENITORI DOVE ANDARE A SCRIVERE IL PUNTEGGIO
        boxCorrette = document.getElementById("corrette");
        boxSbagliate = document.getElementById("sbagliate");
        stampaRisultati();
        google.charts.load("visualization", "1", {packages: ["corechart"]}); 
        google.charts.setOnLoadCallback(initChartResult);

    } else if (window.location.href.endsWith('index_quattro.html')) {
        let allStelle = document.querySelectorAll(".stelle");

        for (let z = 0; z < allStelle.length; z++) {
            allStelle[z].addEventListener("click", () => {
                for (let b = 0; b < allStelle.length; b++) {
                    if (b <= z) {
                        allStelle[b].classList.add("stellacliccata");
                    } else {
                        allStelle[b].classList.remove("stellacliccata");
                    };
                }
            });
        }
    }
}

/* --------------------------------- JS PAGINA 1 ---------------------------*/
function redirectToSecondPage() {
    var checkbox = document.getElementById("spunta");
    if (checkbox.checked) {
        window.location.assign("index_domande.html");
    } else {
        alert("Devi promettere di rispondere da solo!");
    }
}

/* --------------------------------- JS PAGINA 2 ---------------------------*/
// Funzione per disegnare il grafico del timer
function drawChartTime() {
  clearInterval(timerInterval); // Interrompi il timer corrente
  var data = google.visualization.arrayToDataTable([
    ['Task', 'Seconds'],
    ['Tempo Trascorso', 0],
    ['Tempo Rimanente', 60]
  ]);

  var options = {
    pieHole: 0.8,
    legend: 'none',
    backgroundColor: 'transparent',
    pieSliceText: 'none',
    border: 'none',
    slices: {
      0: { color: 'gray'}, // Colore per il tempo trascorso
      1: { color: '#00FFFF'}  // Colore per il tempo rimanente
    }
  };

  var chart = new google.visualization.PieChart(document.getElementById('tempo'));
  
  function updateChart() {
    var now = new Date().getTime();
    var elapsed = now - start;
    var remainingTime = Math.max(totalTime - elapsed, 0); // Calcoliamo il tempo rimanente
    var elapsedSeconds = Math.ceil(elapsed / 1000); // Convertiamo il tempo trascorso in secondi
    var remainingSeconds = Math.ceil(remainingTime / 1000); // Convertiamo il tempo rimanente in secondi
    data.setValue(0, 1, elapsedSeconds);
    data.setValue(1, 1, remainingSeconds);
    chart.draw(data, options);
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      goToNextQuestion(); // Se il tempo è scaduto, interrompiamo l'aggiornamento del grafico
    }
    tempoText.innerHTML = `Seconds ${remainingSeconds}  remaining`;
  }
  var start = new Date().getTime();
  var totalTime = 60 * 1000; // Tempo totale in millisecondi (60 secondi)
  timerInterval = setInterval(updateChart, 1000); // Intervallo di aggiornamento ogni secondo
}
  
// Funzione per mescolare un array (shuffle)
function shuffleArray(arr) {
  arr.sort(() => Math.random() - 0.5);
  return arr;
}
  
// Funzione per gestire la transizione alla domanda successiva
function goToNextQuestion() {
  clearInterval(timerInterval); // Interrompi il timer corrente
  if (arraydomande.length === 0) {
    // Se non ci sono più domande, reindirizza alla pagina successiva o esegui altre azioni
    window.location.href = "index_tre.html";
    localStorage.setItem("punteggioUtente",punteggio); // Codice per esportare la variabile
  } else {
    numeroSlide++;
    drawChartTime(); // Avvia il timer per la nuova domanda
    functionDomande(); // Carica la prossima domanda
  }
}
  
// Funzione per visualizzare e gestire una nuova domanda
function functionDomande() {
  let boxDomande = document.getElementById("boxdomande");
  let boxRisposte = document.getElementById("boxrisposte");
  boxRisposte.innerHTML = ''; // Reimposta il contenuto delle risposte
  let singolaDomanda = arraydomande.pop();   // Ottieni la prossima domanda
  boxDomande.innerHTML = singolaDomanda.question; // Visualizza la domanda nel box
  numeroDomande.innerHTML = `Domanda n° ${numeroSlide} / <span>${questions.length} </span>`;
  // Mescola tutte le risposte (corretta e sbagliate)
  let tutteRisposte = [singolaDomanda.correct_answer, ...singolaDomanda.incorrect_answers];
  shuffleArray(tutteRisposte);
  // Visualizza le risposte nel box delle risposte
  tutteRisposte.forEach(risposta => {
    let rispostaDIV = document.createElement("div");
    rispostaDIV.textContent = risposta;
    rispostaDIV.classList.add("tastorisposta");
    // Aggiungi l'evento click per gestire la risposta
    rispostaDIV.addEventListener("click", () => {
      clearInterval(timerInterval); // Interrompi il timer corrente
      if (risposta === singolaDomanda.correct_answer) {
        console.log("Risposta corretta!");
        punteggio++;
      } else {
        console.log("Risposta sbagliata!");
      }
      goToNextQuestion(); // Passa alla prossima domanda
    });
    boxRisposte.appendChild(rispostaDIV); // Aggiungi la risposta al box delle risposte
  });
}

/* --------------------------------- JS PAGINA 3 ---------------------------*/

function redirectToFourthPage() {   //FUNZIONE COLLEGATA AL BOTTONE, PASSA ALLA QUARTA PAGINA
  window.location.assign("index_quattro.html");
}

function stampaRisultati() {    //STAMPA TESTO RISULTATI 
  boxCorrette.innerHTML = `<p class="testoCalcolo"> <span>Correct<br> <b>${(punteggioUtente/totaleDomande)*100}% </span></b><br>${punteggioUtente}/${totaleDomande} questions </p>`;

  boxSbagliate.innerHTML = `<p class="testoCalcolo"> <span>Wrong <br> <b>${[(totaleDomande-punteggioUtente)/totaleDomande]*100}%</span></b><br>${totaleDomande-punteggioUtente}/${totaleDomande} questions </p>`;
}



function drawChartResult(chartID, heading) {
  var chart = new google.visualization.PieChart(document.getElementById(chartID));
  var data = google.visualization.arrayToDataTable([
    ['Totale Domande', totaleDomande],
    ['Sbagliate', parseInt(totaleDomande-punteggioUtente)],
    ['Corrette', parseInt(punteggioUtente)]
  ]);
  var options = {   //FORMATTAZIONE GRAFICO PUNTEGGIO
    title: heading,
    titleTextStyle: {
      color: 'white',
      fontSize: 16, 
    },    
    pieHole: 0.7,
    backgroundColor: 'transparent',
    colors: ['#d20094', '#00FFFF'],
    pieSliceText: 'none',
    legend: {
      position: 'none'
    },
    tooltip: {
      text: 'percentage'
    },
    tooltip: {
      textStyle: {
        fontSize: 12,
      }
    }
  };

  chart.draw(data, options);
}

function centerText(chart, idx, X, Y) {   //CENTRAMENTO TESTO
  var cht = document.querySelector(chart);
  var txt = document.querySelectorAll(chart + " text");
  txt[idx].setAttribute('x', X);
  txt[idx].setAttribute('y', Y);
}

function risultato() {
  if(punteggioUtente/totaleDomande >= 0.6)  {   //VERIFICA PUNTEGGIO
    return `You passed the exam.`;
  } else {
    return "You didn't pass the exam."
  }
}
    
function initChartResult() {
  drawChartResult('donutchart1', risultato());
  centerText('#donutchart1', 0, 205, 290);
}

/* --------------------------------- JS PAGINA 4 ---------------------------*/