// Assign a variable for some elements
const inputDiv = document.querySelector(".input-div");
const inputText = document.querySelector("#input-text");
const inputButton = document.querySelector("#input-button");
const containerDiv = document.querySelector(".container");
let playerScore = 0;

// Variables for the API
const baseURL = "https://opentdb.com/api.php?";
const ampersand = "&";
const amount = "amount=";
const category = "category=20";
const type = "type=multiple";

// An array to hold all the questions objects
const questions = [];

// Makes a preview window for user to review questions with answers included
const previewQuestions = () =>
{
    // Changing the layout of the page into the pop up layout
    // That means hidding the input div and changing the background color
    popupLayout();

    // Creating a div for the popup review div and assigning an id for later styles
    const previewDiv = document.createElement("div");
    previewDiv.setAttribute("id", "preview-div");

    // Created a div to style all the elements inside the preview div
    const previewElements = document.createElement("div");
    previewElements.setAttribute("class", "preview-elements");

    // Construct the queryURL in order to call the API and get the data
    const queryURL = baseURL + amount + inputText.value + ampersand + category + ampersand + type;

    // Calling the API to get data
    fetch(queryURL)
    .then(response => response.json())
    .then( (data) =>
    {
        // Create a variable to assign json data which includes the questions and answers
        // Results is an array of objects that you get from the response.json()
        const theQuestions = data.results;

        // This is just to show the number of the question that user is currently looking
        // Ex: 1) Blablabla.  2) lorem ipsum.  
        let numOfQuestion = 1;

        // A for loop to iterate the theQuestions array of objects to get each question with its data
        for (let questionData of theQuestions)
        {
            // Declare variables to hold the questions and different answers
            let theQuestion = questionData.question;
            let theIncorrectAnswers = questionData.incorrect_answers;
            let theCorrectAnswer = questionData.correct_answer;

            // Creating a label tag for the question with all different answers with a class
            const previewQuestionLabel = document.createElement("label");
            previewQuestionLabel.setAttribute("class", "preview-question-label");
            previewQuestionLabel.innerText = numOfQuestion + ") " + theQuestion + " " + theIncorrectAnswers +  ", " + theCorrectAnswer;
            
            // Creating another label tag for the answer of the question with a class 
            const previewAnswerLabel = document.createElement("label");
            previewAnswerLabel.setAttribute("class", "preview-answer-label");
            previewAnswerLabel.innerText = theCorrectAnswer;

            // Adding the question and answer elements into the elements preview div
            previewElements.append(previewQuestionLabel);
            previewElements.append(previewAnswerLabel);

            // Create an object from the data to later add it into the questions array of objects
            let questionObj = 
            {
                questionNumber: numOfQuestion,
                question: theQuestion,
                incorrectAnswers: theIncorrectAnswers,
                correctAnswer: theCorrectAnswer
            }

            // Adding the object into the question array of objects
            questions.push(questionObj);

            // Adding 1 each iteration of the loop 
            numOfQuestion++;

        }
        
        // Creating a button for the preview div in order to start the game 
        // and change the color back to white
        const previewButton = document.createElement("button");
        previewButton.setAttribute("id", "preview-button");
        previewButton.innerText = "Ready to Take Trivia";

        // Adding an event listener to the preview button to start the game
        previewButton.addEventListener("click", startGame)

        // Adding the button into the elements preview div
        previewElements.append(previewButton);

        // Added the element divs into the preview div
        previewDiv.append(previewElements);

         // Adding the review div into the container div
        containerDiv.append(previewDiv);

    });
    
};

// Change color of backgound, hide the input div and make it look like a popup window
const popupLayout = () =>
{
    // Checks if the input div has the class dissapear, if it doesn't have it, then apply it to it
    // This makes the input div inacessible when you are reviewing questions and taking the test
    // Just a safety measure so they cannot keep creating new preview Questions divs
    if (!inputDiv.classList.contains("dissapear"))
    {
        inputDiv.classList.toggle("dissapear");
    }
    
    // Changes the background color of the body of the page
    document.body.classList.toggle("popup-color");
};

// Test
// inputButton.parentElement.getElementsByClassName()

const checkAnswer = (e) =>
{
    const answerButtons = e.currentTarget.parentElement.getElementsByClassName("answers-buttons");
    const correctAnswer = answerButtons[2];
    const theScoreTag = document.querySelector("#score-label");

    for (button of answerButtons)
    {
        if (button.innerText !== correctAnswer.innerText)
        {
            button.classList.toggle("wrong-answers")
        }

        button.setAttribute("disabled", "true");
    }

    if (e.currentTarget.innerText === correctAnswer.innerText)
    {
        playerScore++;
    }

    correctAnswer.classList.toggle("correct-answer");
    theScoreTag.innerText = "Score: " + playerScore + "/" + inputText.value;

    gameResult();
    
};

const gameResult = () =>
{
    // Gets all the questions divs containers
    const allQuestionsDiv = document.getElementsByClassName("question-container-div");

    // Gets all the answer buttons
    const allAnswerButtons = document.getElementsByClassName("answers-buttons");

    // This empty array is to hold all the buttons that are disabled
    const disabledButtons = [];

    // Checks if all the buttons are disabled
    // if they are, push it into the disabled buttons array
    for(let button of allAnswerButtons)
    {
        if (button.getAttribute("disabled") === "true")
        {
            disabledButtons.push(button);
        }
    }

    console.log(allAnswerButtons.length)
    console.log(disabledButtons.length)

    // Checks if all the questions have been answered by checking if all the buttons from each question are disabled
    if (allAnswerButtons.length === disabledButtons.length)
    {
        // Tell the users that they have 20 seconds to review the test
        alert("You have 20 seconds to review the test before it gets deleted!");

        // Sets a timeout to run this callback function after 20 seconds
        // This lets the user review the test that they took.
        const theTestReview = setTimeout (() =>
        {
            // Removes all the questions div
            for (let questionDiv of allQuestionsDiv)
            {
                questionDiv.remove();
            }

            // Removes the last question div element that remains
            allQuestionsDiv[0].remove();
        }, 20000);
        
    }

};

// Start the Game
const startGame = (e) =>
{
    popupLayout();

    // let keepPlaying = true;

    // Removes the preview div of questions
    e.currentTarget.parentElement.parentElement.remove()

    // Creates a label for the player score
    const playerScoreLabel = document.createElement("label");
    playerScoreLabel.innerText = "Score: " + playerScore + "/" + inputText.value;
    playerScoreLabel.setAttribute("id", "score-label");

    // Add the score label into the main container div
    containerDiv.append(playerScoreLabel);

    for (let question of questions)
    {
        // Creating a div for the question container
        const questionContainerDiv = document.createElement("div");
        questionContainerDiv.setAttribute("class", "question-container-div");

        // Created a div to style all the elements inside the question container div
        const questionElementsDiv = document.createElement("div");
        questionElementsDiv.setAttribute("class", "question-elements-div");

        // Declare variables to hold the questions and different answers
        let theQuestionNum = question.questionNumber;
        let theQuestion = question.question;
        let theIncorrectAnswers = question.incorrectAnswers;
        let theCorrectAnswer = question.correctAnswer;

        // Creating a label tag for the question number
        const questionNumLabel = document.createElement("label");
        questionNumLabel.setAttribute("class", "question-num-label");
        questionNumLabel.innerText = "#" + theQuestionNum;

        // Creating a label tag for the question with all different answers with a class
        const questionLabel = document.createElement("label");
        questionLabel.setAttribute("class", "question-label");
        questionLabel.innerText = theQuestion;
        
        // Creating buttons for different answers 

        // First Answer Choice
        const answer1Button = document.createElement("button");
        answer1Button.setAttribute("class", "answers-buttons");
        answer1Button.innerText = theIncorrectAnswers[2];
        answer1Button.addEventListener("click", checkAnswer);

        // Second Answer Choice
        const answer2Button = document.createElement("button");
        answer2Button.setAttribute("class", "answers-buttons");
        answer2Button.innerText = theIncorrectAnswers[0];
        answer2Button.addEventListener("click", checkAnswer);

        // Third Answer Choice which is the correct answer
        const correctAnswerButton = document.createElement("button");
        correctAnswerButton.setAttribute("class", "answers-buttons");
        correctAnswerButton.innerText = theCorrectAnswer;
        correctAnswerButton.addEventListener("click", checkAnswer);

        // Fourth Answer Choice
        const answer4Button = document.createElement("button");
        answer4Button.setAttribute("class", "answers-buttons");
        answer4Button.innerText = theIncorrectAnswers[1];
        answer4Button.addEventListener("click", checkAnswer);

        // Adding all the elements into the question elements div
        questionElementsDiv.append(questionNumLabel);
        questionElementsDiv.append(questionLabel);
        questionElementsDiv.append(answer1Button);
        questionElementsDiv.append(answer2Button);
        questionElementsDiv.append(correctAnswerButton);
        questionElementsDiv.append(answer4Button);

        // Adding the question elements div into the question container div
        questionContainerDiv.append(questionElementsDiv);

        // Adding the question container div into the main container div of the page
        containerDiv.append(questionContainerDiv);
        
    }

};

inputButton.addEventListener("click", previewQuestions);