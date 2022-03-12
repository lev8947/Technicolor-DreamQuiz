const buttonStart = document.getElementById('button-start');
const sectionQuestion = document.getElementById("section-questions");
const sectionLanding = document.getElementById("section-landing");
const sectionTimer = document.getElementById("section-timer");
const sectionInitials = document.getElementById("section-initials");
const sectionHighscore = document.getElementById('section-highscore');

const spanTime = document.getElementById("span-time");
const questionTitle = document.getElementById("question-title");
const spanFinalHighscore = document.getElementById("final-highscore");
const questionChoices = document.getElementById("question-choices");
const questionFeedback = document.getElementById('question-feedback');
const formHighscore = document.getElementById('form-highscore');
const inputInitials = document.getElementById('input-initials');

const listHighscore = document.getElementById('list-highscore');

const buttonPlayAgain = document.getElementById('button-play-again');
const buttonClearHighscore = document.getElementById('button-clear-highscore');


let timerId = null;
let timeRemaining = 60;

let currentQuestionIndex = 0;

spanTime.textContent = timeRemaining;

//when user clicks start button

buttonStart.addEventListener('click', function(event){

    //show the question section
    sectionQuestion.classList.remove('hide')
    //hide landing page 
    sectionLanding.classList.add('hide');
    //start timer
    startTimer();

    showQuestion(0);

})

function showFeedback(message, timeout = 1000){

    //remove hide class on Q feedback element for x secs
    questionFeedback.textContent = message;
    questionFeedback.classList.remove('hide')
    
    setTimeout(function(){
        questionFeedback.classList.add("hide");
    }, timeout)
}

//timer


function startTimer(){
    //show section-timer
    sectionTimer.classList.remove('hide');
    //update span time for every passing second
        timerId =  setInterval(function(){
        timeRemaining = timeRemaining - 1
        spanTime.textContent = timeRemaining

        //if time remaining < 0
        
        //what if timer expires?
        //end game
        if(timeRemaining <= 0){

        // end game
            endGame();
        }
    }, 1000);
}





function showQuestion(index){
    const question = questions[index];

    questionTitle.textContent = question.title;

    //loop through choices
    //generate li for each choice
    questionChoices.textContent = "";

    for (let ii = 0; ii < question.choices.length; ii++) {
        const choices = question.choices[ii];

        const li = document.createElement('li');

        const button = document.createElement('button');
        button.textContent = choices.title;
        button.setAttribute('data-answer', choices.isAns);

        //when click on the correct choice
        //should move onto next question
        
        button.addEventListener('click', function(event){
           
        //what if user clicks correct choice?
        
        const isCorrectChoice = event.target.getAttribute('data-answer') === 'true';
            console.log(typeof isCorrectChoice);
            if(isCorrectChoice){
            //give feedback to say they're correct!
                showFeedback('Correct!');
                document.body.style.backgroundColor = "green";
            }else{
                //what if user clicks wrong choice?
                //give feedback to say they're wrong!
                //reduce time remaining by 10sec
                showFeedback('Wrong!');
                document.body.style.backgroundColor = "red";
                timeRemaining = timeRemaining - 10;
            }

        
       
       

        //if the user clicks on the final choice of final question
        // end game

            if(index + 1 >= questions.length){
                //reched final Q
                return endGame()
            }
            showQuestion(index + 1);

        });

        li.appendChild(button);

        questionChoices.appendChild(li);
    }

}

//end game
function endGame(){

// 1. timer should stop
    clearInterval(timerId);

// 2. show end game screen
    sectionInitials.classList.remove('hide');

    //hide Q's
    sectionQuestion.classList.add('hide');

    sectionTimer.classList.add('hide');

// 3. show high scores 
// high score could be Q's answered correctly
// or time remaining 
    spanFinalHighscore.textContent = timeRemaining;

}


//End game screen
// 1. user can type in the input box
// do nothing ***check availability***


formHighscore.addEventListener('submit', function(event){

    event.preventDefault();
// 2. user can hit enter in the input box
// submit high score

// 3. user click on submit button
// submit

//submitting -- add the user initial and highscore - local storage
const userInput = inputInitials.value;

const highscore = {
    name: userInput,
    highscore: timeRemaining,

}

const existingHighscores = getHighscoresFromLocalStorage();
//add in new highscore
existingHighscores.push(highscore)
//save it to local
localStorage.setItem('highscores', JSON.stringify(existingHighscores));


//after submit, redirect user to highscore page
showHighscorePage();

});

/**
 * 
 * @returns {Array}
 */
function getHighscoresFromLocalStorage(){
    return JSON.parse(localStorage.getItem('highscores') || '[]' )
}

function showHighscorePage(){
    //hide endgame page
    sectionInitials.classList.add('hide');

    //show the highscore section
    sectionHighscore.classList.remove('hide');
    renderHighscoreList();
}

function renderHighscoreList(){
    //Highscore page

    //get all existing HS from local storage
    const highscores = getHighscoresFromLocalStorage();

    highscores.sort(function(a, b){

        if(b.highscore > a.highscore){
            return 1
        }else{
            return -1;
        }
    })


    listHighscore.textContent = "";

    //create a li on each item
    for (let index = 0; index < highscores.length; index++) {
        const highscore = highscores[index];
        //chuck it in the list
        const li = document.createElement('li');
        
        li.textContent = highscore.name + ' -- ' + highscore.highscore

        listHighscore.appendChild(li);
    }
    

}





// 1. click on play again button
buttonPlayAgain.addEventListener('click', function(event){
    // redirect user to landing page
    window.location.reload();

    })

// 2. click on clear button
buttonClearHighscore.addEventListener('click', function(event){
    // clear the local storage
    localStorage.setItem('highscores', "[]");
    //clear the dom
    listHighscore.textContent = ""

    })




    // show play again button





