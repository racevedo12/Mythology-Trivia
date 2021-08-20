// Assign a variable for some elements
const inputDiv = document.querySelector(".input-div");
const inputButton = document.querySelector("#input-button");
const containerDiv = document.querySelector(".container");

// Variables for the API
const baseURL = "https://opentdb.com/api.php?amount=";
const ampersand = "&";
const numQuestion = 0;
const category = 20;
const type = "multiple";

// const questions = [];

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

    // Creating an h3 tag for the question
    const questionTag = document.createElement("h3");
    questionTag.innerText = "Question Test";

    // Creating another h3 tag for the answer of the question 
    const answerTag = document.createElement("h3");
    answerTag.innerText = "Answer Test";

    // Creating a button for the preview div in order to start the game 
    // and change the color back to white
    const previewButton = document.createElement("button");
    previewButton.setAttribute("id", "preview-button");
    previewButton.innerText = "Ready to Take Trivia";

    // Adding an event listener into the button
    previewButton.addEventListener("click", startGame);

    // Adding all the elements into the elements preview div
    previewElements.append(questionTag);
    previewElements.append(answerTag);
    previewElements.append(previewButton);

    // Added the element divs into the preview div
    previewDiv.append(previewElements);

    // Adding the review div into the container div
    containerDiv.append(previewDiv);

};

// Change color of backgound, hide the input div and make it look like a popup window
const popupLayout = () =>
{
    inputDiv.classList.toggle("dissapear");
    document.body.classList.toggle("popup-color");
};

// Start the Game
const startGame = () =>
{
    popupLayout();
};

inputButton.addEventListener("click", previewQuestions);