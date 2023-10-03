const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What does HTML stands for?',
    answers: [
      { text: 'HyperText markup language', correct: true },
      { text: 'Hypertext markin language', correct: false },
      { text: 'Hypertext mixup langauge', correct: false },
      { text: 'Hyper transfer markup language', correct: false },
    ]
  },
  {
    question: 'What does CSS stands for?',
    answers: [
      { text: 'Cascading style sheet', correct: true },
      { text: 'Contrast style sheet', correct: false },
      { text: 'Cascading simple sheet', correct: false },
      { text: 'Contrast simple sheet', correct: false }
    ]
  },
  {
    question: 'Which language runs in a web browser??',
    answers: [
      { text: 'C', correct: false },
      { text: 'Javascript', correct: true },
      { text: 'C++', correct: false },
      { text: 'Java', correct: false },
    ]
  },
  {
    question: 'In which year Javascript was launched??',
    answers: [
      { text: '1994', correct: false },
      { text: '1995', correct: true },
      { text: '1995', correct: false },
      { text: '1995', correct: false },
    ]
  }
]