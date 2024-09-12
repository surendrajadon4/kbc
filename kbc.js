// List of prizes from ₹1,000 up to ₹7 crore
const prizes = [
    "₹1,000", "₹2,000", "₹3,000", "₹5,000", "₹10,000",
    "₹20,000", "₹40,000", "₹80,000", "₹1,60,000", "₹3,20,000",
    "₹6,40,000", "₹12,50,000", "₹25,00,000", "₹50,00,000", "₹7,00,00,000"
];

// List of questions, options, and the correct answers
const questions = [
    {
        question: "Which city known as pink city?",
        options: ["Delhi", "Jaipur", "kolkata", "Bengluru"],
        answer:1
    },
    {
        question: "Gold is ?",
        options: ["Solid", "Liquid", "Gas", "None"],
        answer: 0
    },
    {
        question: "capital of himachal pradesh?",
        options: ["Shimla", "Delhi", "Kolkta", "Bengluru"],
        answer: 0
    },
    {
        question: "what is currency of japan?",
        options: ["Doller","Euro","Taka","Yen"],
        answer:3
    },
    {
        question:"What is the national animal of Australia?",
        options:["Monkey","Kangaroo","beer","Elephant"],
        answer:1
    },
    {
        question:"What is the capital of Russia?",
        options:["Moscow","Dhaka","Bijing","Islamabad"],
        answer:0
    },
    {
        question:"Which operator is used to assign a value to a variable?",
        options:["-","=","*","x"],
        answer:1
    },
    {
        question:"What does CSS stand for?",
        options:["Colorful Style Sheets","Cascading Style Sheet","Creative Style Sheet","Computer Style Sheet"],
        answer:1
    },
    {
        question:"Which HTML tag is used to define an internal style sheet?",
        options:["<style>","<script>","<css>","None Of the Above"],
        answer:0
    },
    {
        question:"Which among the following is not a trophy or cup related to Hockey??",
        options:["Indira Cup","Narang Cup","Bombay Trophy","None of the Above"],
        answer:1
    },
    {
        question:"Which CSS property is used to change the text color of an element?",
        options:["fgcolor","color","text-color","None of the Above"],
        answer:2
    },
    {
        question:""
    }
    // Add more questions here (you can have 15 questions)
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30; 
let timerInterval;


function startGame() {
    document.getElementById('song').play()
    document.getElementById('question-container').style.display = 'block';
    loadQuestion();  
    startTimer();    
    displayPrizes(); 
}


function loadQuestion() {
    const questionEl = document.getElementById('question');
    const optionsEl = document.querySelectorAll('.option-btn');

    
    questionEl.innerHTML = questions[currentQuestionIndex].question;
    optionsEl.forEach((btn, index) => {
        btn.innerHTML = questions[currentQuestionIndex].options[index];
        btn.style.backgroundColor = ''; 
        btn.disabled = false;           
    });

   
    document.getElementById('next-btn').style.display = 'none';
}
function displayOptionWithDelay(){
    const optionsEl = document.querySelectorAll('.option-btn');
    let optionIndex = 0;

    function showNextOption() {
        if (optionIndex < optionsEl.length) {
            optionsEl[optionIndex].style.display = 'block';
            optionIndex++;
            setTimeout(showNextOption, 1000); // Show next option after 1 second
        } else {
            document.getElementById('next-btn').style.display = 'block'; // Show Next Question button when all options are displayed
        }
    }

    showNextOption();
}

function displayPrizes() {
    const prizeListEl = document.getElementById('prize-list');
    prizeListEl.innerHTML = ''; 

   
    prizes.forEach((prize, index) => {
        const li = document.createElement('li');
        li.innerText = prize;

        
        if (index === currentQuestionIndex) {
            li.classList.add('highlight');
        }

        prizeListEl.appendChild(li);
    });
}


function checkAnswer(selectedOptionIndex) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const optionsEl = document.querySelectorAll('.option-btn');

    
    if (selectedOptionIndex === correctAnswer) {
        score++;
        //alert("correctAnswer!!!.");
        document.getElementById('score').innerText =` Score: ${score}`;
        optionsEl[selectedOptionIndex].style.backgroundColor = 'green'; 
        alert(`Correct Answer! You have won: ${prizes[currentQuestionIndex]}`);
    } else {
    
        alert("Wrong Answer! The correct answer was: " + questions[currentQuestionIndex].options[correctAnswer]);
        optionsEl[selectedOptionIndex].style.backgroundColor = 'red';   
        optionsEl[correctAnswer].style.backgroundColor = 'green';
        
        endGame();      
    }

    optionsEl.forEach(btn => btn.disabled = true);

    clearInterval(timerInterval); 
    document.getElementById('next-btn').style.display = 'block'; 
}


function nextQuestion() {
    currentQuestionIndex++;

   
    if (currentQuestionIndex < questions.length) {
        adjustTimer();  
        loadQuestion();
        startTimer();   
        displayPrizes();
    } else {
        endGame(); 
    }
}


function startTimer() {
    adjustTimer(); 
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time Left:${timeLeft}`;

        
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            checkAnswer(-1);
        }
    }, 1000);
}


function adjustTimer() {
    if (currentQuestionIndex < 5) {
        timeLeft = 30; 
    } else if (currentQuestionIndex < 10) {
        timeLeft = 45; 
    } else {
        timeLeft = 60; 
    }
    document.getElementById('timer').innerText = `Time Left: ${timeLeft}`;
}


function endGame() {
    document.getElementById('question-container').innerHTML =` <h2>Game Over! You won: ${prizes[currentQuestionIndex - 1]}</h2>`;
    document.getElementById('next-btn').style.display = 'none';
}

window.onload = startGame;
