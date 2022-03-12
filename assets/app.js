const buttonStart = document.getElementById('button-start');
const sectionQuestion = document.getElementById("section-questions");
const sectionLanding = document.getElementById("section-landing");
const sectionTimer = document.getElementById("section-timer");
const sectionInitials = document.getElementById("section-initials");
const spanTime = document.getElementById("span-time");
const questionTitle = document.getElementById("question-title");
const spanFinalHighscore = document.getElementById("final-highscore");
const questionChoices = document.getElementById("question-choices");
const questionFeedback = document.getElementById('question-feedback');

let timerId = null;
let timeRemaining = 10;

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
            }else{
                //what if user clicks wrong choice?
                //give feedback to say they're wrong!
                //reduce time remaining by 10sec
                showFeedback('Wrong!');
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




//what if timer expires?
//end game



//end game
function endGame(){

// 1. timer should stop
    clearInterval(timerId);

// 2. show end game screen
    sectionInitials.classList.remove('hide');

    //hide Q's
    sectionQuestion.classList.add('hide');

// 3. show high scores 
// high score could be Q's answered correctly
// or time remaining 
    spanFinalHighscore.textContent = timeRemaining;

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