// Assign a variable for some elements
const inputDiv = document.querySelector(".input-div");
const inputText = document.querySelector("#input-text");
const inputButton = document.querySelector("#input-button");
const containerDiv = document.querySelector(".container");

// Variables for the API
const baseURL = "https://opentdb.com/api.php?";
const ampersand = "&";
const amount = "amount=";
const category = "category=20";
const type = "type=multiple";

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
        const theQuestions = data.results;

        // This is just to show the number of the question that user is currently looking
        // Ex: 1) Blablabla.  2) lorem ipsum.  
        let numOfQuestion = 1;

        // A for loop to iterate the theQuestions array of objects to get each question with its data
        for (let questionData of theQuestions)
        {
            // Declare variables to hold the questions and different answers
            let question = questionData.question;
            let incorrectAnswers = questionData.incorrect_answers;
            let correctAnswer = questionData.correct_answer;

            // Creating a label tag for the question with all different answers with a class
            const questionTag = document.createElement("label");
            questionTag.setAttribute("class", "question-label");
            questionTag.innerText = numOfQuestion + ") " + question + " " + incorrectAnswers +  ", " + correctAnswer;

            // Creating another label tag for the answer of the question with a class 
            const answerTag = document.createElement("label");
            answerTag.setAttribute("class", "answer-label");
            answerTag.innerText = questionData.correct_answer;

            // Adding the question and answer elements into the elements preview div
            previewElements.append(questionTag);
            previewElements.append(answerTag);
            numOfQuestion++;

        }
        
        // Creating a button for the preview div in order to start the game 
        // and change the color back to white
        const previewButton = document.createElement("button");
        previewButton.setAttribute("id", "preview-button");
        previewButton.innerText = "Ready to Take Trivia";

        // Adding an event listener into the button
        previewButton.addEventListener("click", startGame);

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
    
    document.body.classList.toggle("popup-color");
};

// Start the Game
const startGame = () =>
{
    popupLayout();
};

inputButton.addEventListener("click", previewQuestions);