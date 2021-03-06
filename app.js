// Assign a variable for some elements
const inputDiv = document.querySelector(".input-div");
const inputText = document.querySelector("#input-text");
const inputButton = document.querySelector("#input-button");
const containerDiv = document.querySelector(".container");

// Assign a variable to keep the user score
let playerScore = 0;

// Variables for the API
// this is from the website called open trivia database
// Here is the website: https://opentdb.com/
const baseURL = "https://opentdb.com/api.php?";
const ampersand = "&";
const amount = "amount=";
const category = "category=20";
const type = "type=multiple";

// An array to hold all the questions objects
const questions = [];

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

            // Cleaning the question to make it more readable by replacing those characters
            // With more descriptive characters
            theQuestion = theQuestion.replaceAll("&#039;", "'").replaceAll("&amp;", "&").replaceAll("&quot;",  '"');

            let theIncorrectAnswers = questionData.incorrect_answers;

            // Looping through the incorrect answers array to replace every weird character from the answers
            // To make it more readable 
            for(let i = 0; i < theIncorrectAnswers.length; i++)
            {
                theIncorrectAnswers[i] = theIncorrectAnswers[i].replaceAll("&#039;", "'").replaceAll("&amp;", "&").replaceAll("&quot;",  '"');
            }

            let theCorrectAnswer = questionData.correct_answer;

            // Cleaning the correct answer to make it more readable by replacing those characters
            // With more descriptive characters
            theCorrectAnswer = theCorrectAnswer.replaceAll("&#039;", "'").replaceAll("&amp;", "&").replaceAll("&quot;",  '"');

            // Creating a label tag for the question with all different answers with a class
            const previewQuestionLabel = document.createElement("label");
            previewQuestionLabel.setAttribute("class", "preview-question-label");
            previewQuestionLabel.innerText = numOfQuestion + ") " + theQuestion + "\n\n" + theIncorrectAnswers +  "," + theCorrectAnswer;
            
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

// Start the Game
const startGame = (e) =>
{
    // Invokes the popup layout function
    popupLayout();

    // Removes the preview div of questions
    e.currentTarget.parentElement.parentElement.remove()

    // Creates a label for the player score
    const playerScoreLabel = document.createElement("label");
    playerScoreLabel.innerText = "Score: " + playerScore + "/" + inputText.value;
    playerScoreLabel.setAttribute("id", "score-label");

    // Add the score label into the main container div
    containerDiv.append(playerScoreLabel);

    // Loop where the magic happens, creates all the questions divs with their elements
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
        
        // ----------Random places for answers----------

        // Adds the correct answer first into the all answers array
        const allAnswers = [theCorrectAnswer];

        // loops through the incorrect answers array and add each incorrect answer into the all answers array
        theIncorrectAnswers.forEach(wrongAnswer => 
        {
            allAnswers.push(wrongAnswer);
        });
        
        // Sorts the array to randomize the answers positions
        allAnswers.sort();

        // ----------Creating buttons for different answers----------

        // First Answer Choice
        const answer1Button = document.createElement("button");
        answer1Button.setAttribute("class", "answers-buttons");
        answer1Button.innerText = allAnswers[2];
        answer1Button.addEventListener("click", checkAnswer);

        // Second Answer Choice
        const answer2Button = document.createElement("button");
        answer2Button.setAttribute("class", "answers-buttons");
        answer2Button.innerText = allAnswers[0];
        answer2Button.addEventListener("click", checkAnswer);

        // Third Answer Choice
        const answer3Button = document.createElement("button");
        answer3Button.setAttribute("class", "answers-buttons");
        answer3Button.innerText = allAnswers[3];
        answer3Button.addEventListener("click", checkAnswer);

        // Fourth Answer Choice
        const answer4Button = document.createElement("button");
        answer4Button.setAttribute("class", "answers-buttons");
        answer4Button.innerText = allAnswers[1];
        answer4Button.addEventListener("click", checkAnswer);

        // Adding all the elements into the question elements div
        questionElementsDiv.append(questionNumLabel);
        questionElementsDiv.append(questionLabel);
        questionElementsDiv.append(answer1Button);
        questionElementsDiv.append(answer2Button);
        questionElementsDiv.append(answer3Button);
        questionElementsDiv.append(answer4Button);

        // Create an array to hold all the buttons
        const allAnswerButtons = [answer1Button, answer2Button, answer3Button, answer4Button];

        // Iterate through the array of all answer buttons and check which button is the correct choice
        for(let answer of allAnswerButtons)
        {
            if (answer.innerText === theCorrectAnswer)
            {
                // Assign the id of right-answer if the button text is the same as the correct answer
                // So we can use it later to check the answer
                answer.setAttribute("id", "right-answer");
            }
        }

        // Adding the question elements div into the question container div
        questionContainerDiv.append(questionElementsDiv);

        // Adding the question container div into the main container div of the page
        containerDiv.append(questionContainerDiv);
    };

};

// Checks the answer and disable the buttons after cliclking an answer
const checkAnswer = (e) =>
{
    // Gets all the answer buttons
    const answerButtons = e.currentTarget.parentElement.getElementsByClassName("answers-buttons");

    // Gets the correct answer of each question individually
    const correctAnswer = e.currentTarget.parentElement.querySelector("#right-answer");

    // Gets the score label
    const theScoreTag = document.querySelector("#score-label");

    // Changes the color of the buttons to red if the answers are incorrect
    // And disables all buttons so users cannot click on any answer after they chose one already
    for (button of answerButtons)
    {
        if (button.innerText !== correctAnswer.innerText)
        {
            button.classList.toggle("wrong-answers")
        }

        // Disable the button
        button.setAttribute("disabled", "true");
    }

    // Changes the color of the correct answer to Green so they can know which was the correct answer
    correctAnswer.classList.toggle("correct-answer");

    // If the button that the user clicked is the correct answer then give them a +1 to the score
    // Also tell them if they got the correct answer or not
    if (e.currentTarget.innerText === correctAnswer.innerText)
    {
        playerScore++;
        theScoreTag.innerText = "Score: " + playerScore + "/" + inputText.value;
    }

    // Invokes the game result function
    gameResult();
};

// Display the result of the trivia test and tell user if they won or not
const gameResult = () =>
{
    // Gets all the questions divs containers
    const allQuestionsDiv = document.querySelectorAll(".question-container-div");

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
    };

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
            for(let div of allQuestionsDiv)
            {
                div.remove();
            };

            // Removes the old score label
            document.querySelector("#score-label").remove();

            // Creates the result div
            const resultDiv = document.createElement("div");
            resultDiv.setAttribute("class", "result-div");

            // Creates the first h2 tag for the score
            const firstScoreH2 = document.createElement("h2");
            firstScoreH2.innerText = "Your score was: ";

            // Creates the second h2 tag for the score
            const secondScoreH2 = document.createElement("h2");
            secondScoreH2.innerText = playerScore + "/" + inputText.value;

            // Creates the winner h1 to let user know if they won or not
            const winnerH1 = document.createElement("h1");
            
            // Creates the play again button
            const playAgainButton = document.createElement("button");
            playAgainButton.setAttribute("id", "result-button");
            playAgainButton.innerText = "Click Here To Play Again";
            // playAgainButton.setAttribute("type", "submit");
            playAgainButton.addEventListener("click", playAgain);

            // This is the minimum score that the user needs to have to win
            // It's the half of the total number of questions
            const minimumWinScore = Math.floor(inputText.value / 2);

            // If the user score is at least half of the total number of questions
            // Or greater, than they won, otherwise they lost
            if (playerScore >= minimumWinScore)
            {
                winnerH1.innerText = "YOU WON!";
            }

            else
            {
                winnerH1.innerText = "YOU LOST!";
            }

            // Add elements into the result div
            resultDiv.append(firstScoreH2);
            resultDiv.append(secondScoreH2);
            resultDiv.append(winnerH1);
            resultDiv.append(playAgainButton);

            // Add the result div into the container div
            containerDiv.append(resultDiv);

        }, 20000);
        
    }

};

const playAgain = () =>
{
    // Found this method in MDN by googling refresh page MDN
    // This is the site https://developer.mozilla.org/en-US/docs/Web/API/Location/reload
    // The method functions like the refresh button, it refreshes the page.
    
    // Refreshes the page in order to play again with brand new data
    location.reload()
};

// Assigns an event listener to the input button in order to get the data from the API and display the questions
// For a review before taking the trivia
inputButton.addEventListener("click", previewQuestions);