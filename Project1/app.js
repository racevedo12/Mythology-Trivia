// console.log("Hello There");

const inputButton = document.querySelector("#input-button");
const containerDiv = document.querySelector(".container");
const questions = [];

const previewQuestions = () =>
{
    const previewDiv = document.createElement("div");
    previewDiv.setAttribute("id", "preview-div");

    const questionTag = document.createElement("h3");
    questionTag.innerText = "Question Test";

    const answerTag = document.createElement("h3");
    answerTag.innerText = "Answer Test";

    const previewButton = document.createElement("button");
    previewButton.setAttribute("id", "preview-button");
    previewButton.innerText = "Ready to Take Trivia";

    previewButton.addEventListener("click", startGame);

    previewDiv.append(questionTag);
    previewDiv.append(answerTag);
    previewDiv.append(previewButton);

    document.body.classList.toggle("popup-color");
    containerDiv.append(previewDiv);

};

const startGame = () =>
{
    document.body.classList.toggle("popup-color");
};

inputButton.addEventListener("click", previewQuestions);