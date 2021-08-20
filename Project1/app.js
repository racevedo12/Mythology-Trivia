// console.log("Hello There");

const inputButton = document.querySelector("#input-button");
const containerDiv = document.querySelector(".container");
const questions = [];

const previewQuestions = () =>
{
    // Changing the color of the page
    document.body.classList.toggle("popup-color");

    // Creating a div for the popup review div and assigning an id for later styles
    const previewDiv = document.createElement("div");
    previewDiv.setAttribute("id", "preview-div");

    // Creating an h3 tag for the question
    const questionTag = document.createElement("h3");
    questionTag.innerText = "Question Test";

    // Creating another h3 tag for the answer of the question 
    const answerTag = document.createElement("h3");
    answerTag.innerText = "Answer Test";

    // Creating a button for the review div in order to start the game 
    // and change the color back to white
    const previewButton = document.createElement("button");
    previewButton.setAttribute("id", "preview-button");
    previewButton.innerText = "Ready to Take Trivia";

    // Adding an event listener into the button
    previewButton.addEventListener("click", startGame);

    // Adding all the elements into the review div
    previewDiv.append(questionTag);
    previewDiv.append(answerTag);
    previewDiv.append(previewButton);

    // Adding the review div into the container div
    containerDiv.append(previewDiv);

};

const startGame = () =>
{
    document.body.classList.toggle("popup-color");
};

inputButton.addEventListener("click", previewQuestions);