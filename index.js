let questions = {
    english:{
        1: {
            question: "Which one is a plural noun?",
            options: ["Book", "Books", "Booked"],
            answer: "Books",
            explanation: "https://www.grammarly.com/blog/parts-of-speech/plural-nouns/"
            },
        2: {
            question: "Which tense is this sentence in? `She was reading a book.` ",
            options: ["Present simple", "Past continuous", "Future tense"],
            answer: "Past continuous",
            explanation: "https://www.grammarly.com/blog/parts-of-speech/verb-tenses/"
            },  
        3: {
            question: "Which one is an adjective?",
            options: ["Run", "Happy", "Slowly"],
            answer: "Happy",
            explanation: "https://www.grammarly.com/blog/parts-of-speech/adjective/"
            },  

},

    history:{
        1: {
            question: "Which one is a famous South African leader?",
            options: ["Nelson Mandela", "Barack Obama", "Julius Caesar"],
            answer: "Nelson Mandela",
            explanation: "https://en.wikipedia.org/wiki/Nelson_Mandela"
            },
        
        2: {
            question: "What year did apartheid officially end in South Africa?",
            options: ["1948", "1994", "2000"],
            answer: "1994",
            explanation: "https://en.wikipedia.org/wiki/Apartheid"
            },

        3: {
            question: "Which one is the name of a South African freedom movement?",
            options: ["ANC", "FIFA", "NATO"],
            answer: "ANC",
            explanation: "https://en.wikipedia.org/wiki/African_National_Congress"
            }
    },

    science:{
        1: {
            question: "Which one is a gas at room temperature?",
            options: ["Oxygen", "Ice", "Wood"],
            answer: "Oxygen",
            explanation: "https://en.wikipedia.org/wiki/Oxygen#:~:text=Oxygen%20is%20a%20chemical%20element,well%20as%20with%20other%20compounds."
            },
        2: {
            question: "Which part of a plant makes food using sunlight?",
            options: ["Roots", "Leaves", "Stem"],
            answer: "Leaves",
            explanation: "https://en.wikipedia.org/wiki/Photosynthesis"
        },

        3: {
            question: "Which one is a source of energy?",
            options: ["Plastic", "The Sun", "Paper"],
            answer: "The Sun",
            explanation: "https://en.wikipedia.org/wiki/Sun"
            }

    }

}

let currentScreen = "home";
let currentQuestion = 1;
let currentScore = 0;
let currentSubject = "";
let currentSubjectTitle = "";
let questionObj = "";

const subjectBtns = document.querySelectorAll(".page1-btn")
const homeScreen = document.getElementById("homeScreen")
const quizzScreen = document.getElementById("quizzScreen")
const scoreBoardScreen = document.getElementById("ScoreBoardScreen")
const scoreBoardTbl = document.getElementById("scoreTbl")
const finalScore = document.getElementById("finalScore")

const qCount = document.getElementById("qCount")
const subjectHeading = document.getElementById("subjectHeading")
const scoreDisplay = document.getElementById("scoreDisplay")

const currentQuestionP = document.getElementById("currentQuestion")
const r1l = document.getElementById("r1l")
const r1 = document.getElementById("r1")

const r2l = document.getElementById("r2l")
const r2 = document.getElementById("r2")

const r3l = document.getElementById("r3l")
const r3 = document.getElementById("r3")

const answerExplain = document.getElementById("answerExplain")
const explainLink = document.getElementById("explainLink")


const screenSwitchFun = ()=>{
if(currentScreen=="home"){
homeScreen.classList.add("fadeOut")
setTimeout(()=>{
    homeScreen.classList.add("hidden")
    quizzScreen.classList.add("fadeIn")
    quizzScreen.classList.remove("hidden")

}, 2500)

displayQuestion()

}else{
quizzScreen.classList.remove("fadeIn")
quizzScreen.classList.add("fadeOut")
setTimeout(()=>{
quizzScreen.classList.add("hidden")
scoreBoardScreen.classList.add("fadeIn")
scoreBoardScreen.classList.remove("hidden")

}, 2500)
displayScoreBoard()
}


}

const displayQuestion = ()=>{
    if(currentSubject=="English"){
questionObj = questions.english[currentQuestion]
}else if( currentSubject=="History"){
    questionObj = questions.history[currentQuestion]
}else{
    questionObj = questions.science[currentQuestion]
}

qCount.textContent=`${currentQuestion}/3`;
subjectHeading.textContent= currentSubject;
scoreDisplay.textContent= currentScore;

currentQuestionP.textContent = questionObj.question

r1l.textContent= questionObj.options[0]
r1.value=questionObj.options[0]

r2l.textContent= questionObj.options[1]
r2.value=questionObj.options[1]

r3l.textContent= questionObj.options[2]
r3.value=questionObj.options[2]

answerExplain.textContent = ""
explainLink.textContent = ""

}

const radioBtns = document.getElementsByName("answerOption")
radioBtns.forEach((e)=>{
    e.addEventListener("click",()=>{
        radioDiv.classList.add("hidden")
        answerQuestion(e.value)
    })
})

let scoreTbl = []

const answerQuestion=(userAns)=>{
let newAnswer = []
if(userAns==questionObj.answer){
    answerExplain.textContent = `${userAns} is correct`
    newAnswer.push("correct")
    currentScore+=1;
}else{
    answerExplain.textContent = `${userAns} is incorrect`
    newAnswer.push("incorrect")
   
}
explainLink.setAttribute("href", questionObj.explanation)
explainLink.textContent="Explanation"

newAnswer.push(questionObj.question)
newAnswer.push(questionObj.answer)
scoreTbl.push(newAnswer)

}

const expLink = document.getElementById("explainLink")
expLink.addEventListener("click", (e)=>{
e.preventDefault();
window.open(expLink.href)
} )

subjectBtns.forEach((e)=>{
    e.addEventListener("click",()=>{
        currentSubject = e.innerText
        currentSubjectTitle= e.innerText
        screenSwitchFun()
    })
})

const nxtBtn = document.getElementById("nxtQuestion")
const radioDiv = document.getElementById("radioDiv")
nxtBtn.addEventListener("click", ()=>{
    if(currentQuestion<3){
        currentQuestion+=1;
        radioDiv.classList.remove("hidden")
        radioBtns.forEach((e)=>{
            e.checked = false;
        })
        displayQuestion()
    }else{
        currentScreen="quizzScreen"
        screenSwitchFun()
    }
})

const displayScoreBoard = ()=>{
    scoreTbl.forEach((e)=>{
        let newRow = document.createElement("tr")
        let qTd = document.createElement("td")
        let aTd = document.createElement("td")

        if(e[0]=="correct"){
            newRow.classList.add("correct")
        }else{
            newRow.classList.add("incorrect")
        }

        qTd.textContent=e[1]
        aTd.textContent=e[2]
        newRow.appendChild(qTd)
        newRow.appendChild(aTd)

        scoreBoardTbl.appendChild(newRow)
        
    })
    finalScore.textContent = `You scored ${currentScore} out of ${scoreTbl.length}`;
}
