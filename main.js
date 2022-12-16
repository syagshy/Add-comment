"use strict";

class Comment {
    constructor(question, correctAns, wrongAns) {
        this.question = question
        this.correctAns = correctAns
        this.wrongAns = wrongAns
    }
}

class CommentsDB {
    constructor() {
        this.questionBlock = []
    }
    addQuestionBlock(qBlock) {
        if(qBlock.question && qBlock.correctAns && qBlock.wrongAns){
            this.questionBlock.push(qBlock)
        }
    }
}
const createQuestionBlock = (props) => {
    const questionDiv = document.createElement("div")
    const mainQuestion = document.createElement("h4")
    const correctAnswer = document.createElement("p")
    const wrongAnswer = document.createElement("p")
    const hr = document.createElement("hr")
    if (props.question && props.correctAns && props.wrongAns) {
        mainQuestion.textContent = props.question;
        correctAnswer.textContent = "Correct answer: " + props.correctAns;
        wrongAnswer.textContent = "Wrong answer: " + props.wrongAns;
        questionDiv.append(mainQuestion, correctAnswer, wrongAnswer, hr)
        return questionDiv;
    }
}
const commentDB = new CommentsDB()
class View {
    constructor(question, correctAns, wrongAns, btn, questionsContainer) {
        this.question = document.querySelector(question);
        this.correctAns = document.querySelector(correctAns);
        this.wrongAns = document.querySelector(wrongAns);

        this.btn = document.querySelector(btn)
        this.questionsContainer = document.querySelector(questionsContainer)

        this.btn.addEventListener("click", e => {
            e.preventDefault();
            this.questionsContainer.textContent = ""
            commentDB.addQuestionBlock(new Comment(this.question.value, this.correctAns.value, this.wrongAns.value))
            commentDB.questionBlock.forEach(elem => {
                if (createQuestionBlock(elem)) {
                    this.questionsContainer.append(createQuestionBlock(elem))
                }
            });
            this.question.value = ""
            this.correctAns.value = ""
            this.wrongAns.value = ""
        })
    }
}
const view = new View("#question", "#correctAns", "#wrongAns", "#addQuestion", ".questions")


