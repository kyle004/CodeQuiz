let score = 0
let current = 0
let time = 60
let timer
let questions = [
  {
    question: 'How do you create a single line comment in JavaScript?:',
    choices: ['*', '~', '>>', '//'],
    answer: '//'
  },
  {
    question: 'Arrays in JavaScript can be used to store:',
    choices: ['numbers and strings', 'other arrays', 'booleans', 'All of the above'],
    answer: 'All of the above'
  },
  {
    question: 'What are the valid characters for an identifier in JavaScript?:',
    choices: ['Letters & Numbers', 'Underscores', 'Dollar Signs', 'All the above'],
    answer: 'All the above'
  },
  {
    question: 'How do you call a function named "myFunction"?',
    choices: ['myFunction()', 'call myFunction()', 'call.myFunction()', 'call function myFunction'],
    answer: 'myFunction()'
  },
]

const gameOver = () => {
  document.getElementById('question').innerHTML = ''
  document.getElementById('result').textContent = `Score: ${score}`
  document.getElementById('scoreForm').className = ''
}
const loadQuestion = () => {
  document.getElementById('question').innerHTML = ''
  let questionElem = document.createElement('div')
  questionElem.innerHTML = `
          <h3>Question: ${questions[current].question}</h3>
          <ul class="list-group">
            <li 
            class="list-group-item list-group-item-action list-group-item-info choice"
            data-value="${questions[current].choices[0]}">
              A: ${questions[current].choices[0]}
            </li>
            <li 
            class="list-group-item list-group-item-action list-group-item-info choice"
            data-value="${questions[current].choices[1]}">
              B: ${questions[current].choices[1]}
            </li>
            <li 
            class="list-group-item list-group-item-action list-group-item-info choice"
            data-value="${questions[current].choices[2]}">
              C: ${questions[current].choices[2]}
            </li>
            <li
            class="list-group-item list-group-item-action list-group-item-info choice"
            data-value="${questions[current].choices[3]}">
              D: ${questions[current].choices[3]}
            </li>
          </ul>
        `
  document.getElementById('question').append(questionElem)
}
document.getElementById('startQuiz').addEventListener('click', () => {
  document.getElementById('startQuiz').remove()
  timer = setInterval(() => {
    document.getElementById('time').textContent = `Time Left: ${time}`
    time--
    if (time < 0) {
      gameOver()
      clearInterval(timer)
    }
  }, 1000)
  loadQuestion()
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('choice')) {
    if (event.target.dataset.value === questions[current].answer) {
      score++
    }
    current++

    if (current >= questions.length) {
      gameOver()
      clearInterval(timer)
    } else {
      loadQuestion()
    }
  }
})

document.getElementById('submitScore').addEventListener('click', event => {
  event.preventDefault()
  let initials = document.getElementById('initials').value
  let scores = JSON.parse(localStorage.getItem('scores')) || []
  scores.push({ initials, score })
  localStorage.setItem('scores', JSON.stringify(scores))

  scores.sort((a, b) => b.score - a.score)

  let ldrBrdElem = document.createElement('table')
  ldrBrdElem.className = 'table'
  ldrBrdElem.innerHTML = `
      <thead>
        <tr>
          <th scope="col">Initials</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      `
  let ldrBrdBody = document.createElement('tbody')

  for (let i = 0; i < scores.length; i++) {
    ldrBrdBody.innerHTML += `
          <tr>
            <td>${scores[i].initials}</td>
            <td>${scores[i].score}</td>
          </tr>
        `
  }
  document.getElementById('question').innerHTML = ''
  ldrBrdElem.append(ldrBrdBody)
  document.getElementById('question').append(ldrBrdElem)
  document.getElementById('submitScore').className = 'btn btn-primary hidden'
})

document.getElementById('resetBtn').addEventListener('click', event => {
  event.preventDefault()
  localStorage.removeItem('scores')
  // localStorage.setItem('scores', 0)
  let ldrBrdElem = document.createElement('table')
  ldrBrdElem.className = 'table'
  ldrBrdElem.innerHTML = `
      <thead>
        <tr>
          <th scope="col">Initials</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      `
  let ldrBrdBody = document.createElement('tbody')

  for (let i = 0; i < 1; i++) {
    ldrBrdBody.innerHTML += `
          <tr>
            <td></td>
            <td></td>
          </tr>
        `
  }
  document.getElementById('question').innerHTML = ''
  ldrBrdElem.append(ldrBrdBody)
  document.getElementById('question').append(ldrBrdElem)
})
