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
      question:
        "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
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
      question:
        "Pointers were not used in the original C programming language; they were added later on in C++.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the most preferred image format used for logos in the Wikimedia database?",
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
      question:
        "What is the code name for the mobile operating system Android 7.0?",
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
      question:
        "Which programming language shares its name with an island in Indonesia?",
      correct_answer: "Java",
      incorrect_answers: ["Python", "C", "Jakarta"],
    },
  ];
  
  let punteggio = 0;
  let numeroDomande = document.getElementById("numerodomande");
  let numeroSlide = 1;
  let arraydomande = [...questions];
  let secondi = 60; 
  console.log(arraydomande) // andato!
  
    // VARIABILI CON LA FUNZIONE PER IL TIMER 
    let divOrario = document.querySelector('#tempo');

    function timer() {
    secondi -= 1;
    divOrario.innerHTML = `Tempo ${secondi} rimanente` 
    };
    setInterval(timer, 200);
  

    function shuffleArray(arr) {
    arr.sort(() => Math.random() - 0.5);
    return arr;
    }

    function functiondomande() {
    
      shuffleArray(arraydomande) // richiamo della funzione shuffle per randomizzare le domande
        // timer() ------- richiamo la  funzione per il tempo
        let boxDomande = document.getElementById("boxdomande");
        let boxRisposte = document.getElementById("boxrisposte");
        

            // inserire le domande nell tag H1
            let singoladomanda = arraydomande.pop();
            boxDomande.innerHTML = singoladomanda.question;
            
            numeroDomande.innerHTML = `Domanda n° ${numeroSlide} <span> / ${questions.length}</span>`;
            

        // array delle risposte   
            let tutteRisposte = [];
        // inserire domande giuste e sbagliate in un array
            tutteRisposte.push(singoladomanda.correct_answer);

        // inserire le risposte sbagliate    
            for(x = 0; x < singoladomanda.incorrect_answers.length; x++ ){
                tutteRisposte.push(singoladomanda.incorrect_answers[x]);
            }; shuffleArray(tutteRisposte) 
            // inserire tutte le risposte dentro i div
                for(y = 0 ; y < tutteRisposte.length ; y++) { 
                    let rispostaDIV = document.createElement("div");
                    rispostaDIV.innerHTML = tutteRisposte[y];
                    rispostaDIV.classList.add("tastorisposta");
                    // EXTRA: aggiungere cambio lista quando si clicca il div

                    while(secondi > 0) {
                    rispostaDIV.addEventListener("click", function() {
                      secondi--;
                       // Click della risposta giusta o sbagliata
                        if (singoladomanda.correct_answer === rispostaDIV.innerHTML){
                            console.log("bravissimooooo");
                            punteggio += 1;
                            console.log(punteggio);
                            
                        } else {
                            console.log("sei stupido");
                        };
                        secondi = 60;
                        // refresh delle domande 
                        if (arraydomande.length === 0 ) {
                            window.location.href = "fourth-page.html";
                        }   else {
                            boxRisposte.innerHTML = "";
                            numeroSlide += 1;
                            functiondomande();
                        };       
                   });
                      boxRisposte.appendChild(rispostaDIV);
                      setInterval(secondi-1, 1000);
                  }; 
                };
              };
        //inserire la risposta giusta
        
 


functiondomande();
  