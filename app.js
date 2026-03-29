(() => {
  try {
    const answers = [
      'It is certain',
      'Without a doubt',
      'You may rely on it',
      'Yes definitely',
      'It is decidedly so',
      'As I see it, yes',
      'Most likely',
      'Outlook good',
      'Yes',
      'Signs point to yes',
      'Reply hazy, try again',
      'Ask again later',
      'Better not tell you now',
      'Cannot predict now',
      'Concentrate and ask again',
      'Do not count on it',
      'My reply is no',
      'My sources say no',
      'Outlook not so good',
      'Very doubtful'
    ]

    const askBtn = document.getElementById('askBtn')
    const ballButton = document.getElementById('ballButton')
    const magicBall = document.getElementById('magicBall')
    const answerText = document.getElementById('answerText')
    const statusText = document.getElementById('statusText')
    const questionInput = document.getElementById('questionInput')
    const answerBubble = document.getElementById('answerBubble')
    const bubbleText = document.getElementById('bubbleText')

    let isShaking = false
    let lastAnswer = ''

    function pickAnswer() {
      if (answers.length === 1) return answers[0]
      let next = answers[Math.floor(Math.random() * answers.length)]
      while (next === lastAnswer) {
        next = answers[Math.floor(Math.random() * answers.length)]
      }
      lastAnswer = next
      return next
    }

    function updatePromptState() {
      const hasQuestion = questionInput.value.trim().length > 0
      statusText.textContent = hasQuestion ? 'Tap the ball to reveal your answer' : 'Waiting for a question'
    }

    function revealAnswer() {
      if (isShaking) return

      try {
        isShaking = true
        const question = questionInput.value.trim()
        const selectedAnswer = pickAnswer()

        answerBubble.classList.remove('reveal')
        answerBubble.classList.add('hidden')
        void answerBubble.offsetWidth

        magicBall.classList.remove('shaking')
        void magicBall.offsetWidth
        magicBall.classList.add('shaking')

        answerText.textContent = 'Shaking the spirits...'
        statusText.textContent = question ? `Question received: “${question}”` : 'No question entered — fate answers anyway'

        window.setTimeout(() => {
          try {
            bubbleText.textContent = selectedAnswer
            answerBubble.classList.remove('hidden')
            answerBubble.classList.add('reveal')
            answerText.textContent = selectedAnswer
            statusText.textContent = 'Tap again for another answer'
          } catch (error) {
            console.error('Reveal timeout error:', error.message, error.stack)
          }
        }, 420)

        window.setTimeout(() => {
          try {
            magicBall.classList.remove('shaking')
            isShaking = false
          } catch (error) {
            console.error('Shake cleanup error:', error.message, error.stack)
          }
        }, 700)
      } catch (error) {
        console.error('Reveal answer error:', error.message, error.stack)
        answerText.textContent = 'The ball is cloudy right now'
        statusText.textContent = 'Please try again'
        isShaking = false
      }
    }

    askBtn.addEventListener('click', () => {
      try {
        revealAnswer()
      } catch (error) {
        console.error('Ask button error:', error.message, error.stack)
      }
    })

    ballButton.addEventListener('click', () => {
      try {
        revealAnswer()
      } catch (error) {
        console.error('Ball tap error:', error.message, error.stack)
      }
    })

    questionInput.addEventListener('input', () => {
      try {
        updatePromptState()
      } catch (error) {
        console.error('Input error:', error.message, error.stack)
      }
    })

    questionInput.addEventListener('keydown', (event) => {
      try {
        if (event.key === 'Enter') {
          event.preventDefault()
          revealAnswer()
        }
      } catch (error) {
        console.error('Keydown error:', error.message, error.stack)
      }
    })

    updatePromptState()
  } catch (error) {
    console.error('Init error:', error.message, error.stack)
    const body = document.body
    if (body) {
      const errorBanner = document.createElement('div')
      errorBanner.textContent = 'Something went wrong while loading the Magic 8 Ball.'
      errorBanner.style.position = 'fixed'
      errorBanner.style.top = '16px'
      errorBanner.style.left = '16px'
      errorBanner.style.right = '16px'
      errorBanner.style.padding = '14px 16px'
      errorBanner.style.borderRadius = '14px'
      errorBanner.style.background = '#7f1d1d'
      errorBanner.style.color = 'white'
      errorBanner.style.fontFamily = 'Inter, sans-serif'
      errorBanner.style.zIndex = '9999'
      body.appendChild(errorBanner)
    }
  }
})()
