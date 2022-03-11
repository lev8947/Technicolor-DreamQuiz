const buttonStart = document.getElementById('button-start');
const sectionQuestion = document.getElementById("section-questions");
const sectionLanding = document.getElementById("section-landing");
const sectionTimer = document.getElementById("section-timer");
const spanTime = document.getElementById("span-time");

let timerId = null;
let timeRemaining = 2;

spanTime.textContent = timeRemaining;

//when user clicks start button

buttonStart.addEventListener('click', function(event){

    //show the question section
    sectionQuestion.classList.remove('hide')
    //hide landing page 
    sectionLanding.classList.add('hide');
    //start timer
    startTimer();
})

//timer


function startTimer(){
    //show section-timer
    sectionTimer.classList.remove('hide');
    //update span time for every passing second
        timerId =  setInterval(function(){
        timeRemaining = timeRemaining - 1
        spanTime.textContent = timeRemaining

        //if time remaining < 0
        if(timeRemaining <= 0){

        // end game
            endGame();
        }
    }, 1000);
}


//question

//when click on the choice
//should move onto next question

//what if user clicks correct choice?
//give feedback to say they're correct!

//what if user clicks wrong choice?
//give feedback to say they're wrong!
//reduce time remaining by 10sec

//if the user clicks on the final choice of final question
// end game

//what if timer expires?
//end game


//end game
function endGame(){

// 1. timer should stop
    clearInterval(timerId);

// 2. show end game screen
// 3. show high scores 
// high score could be Q's answered correctly
// or time remaining 
}


//End game screen
// 1. user can type in the input box
// do nothing ***check availability***

// 2. user can hit enter in the input box
// submit high score

// 3. user click on submit button
// submit

//submitting -- add the user initial and highscore - local storage

//after submit, redirect user to highscore page


//Highscore page

// 1. click on play again button
// redirect user to landing page

// 2. click on clear button
// clear the local storage
//clear the dom

// show play again button