const quizData = [
    {
      question: 'What is the purpose of a function in a programming language?',
      options: ['To store data', 'To organize and reuse code', 'To perform calculations', 'To display output'],
      answer: 'To organize and reuse code',
    },
    {
      question: 'Which of the following is NOT a valid data type in Python?',
      options: ['int', 'float', 'string', 'boolean'],
      answer: 'boolean',
    },
    {
      question: 'What does the acronym OOP stand for?',
      options: ['Object Oriented Programming', 'Only One Program', 'Open On Purpose', 'Out Of Place'],
      answer: 'Object Oriented Programming',
    },
    {
      question: 'In Java,what keyword is used to declare a class?',
      options: ['class', 'define', 'function', 'object'],
      answer: 'class',
    },
    {
      question: 'What is the purpose of the main function in C++?',
      options: [
        'To declare variables',
        'To define a class',
        'To execute the code',
        'To handle user input',
      ],
      answer: 'To execute the code',
    },
    {
      question: 'Which of the following is a common data structure?',
      options: ['Stack', 'Queue', 'Linked List', 'All of the above'],
      answer: 'All of the above',
    },
    {
      question: 'What does the term "polymorphism" mean in the context of Object-Oriented Programming?',
      options: [
        'The ability of an object to change its type.',
        'The ability of a class to inherit from multi classes.',
        'The ability of an object to have multiple forms or behaviors.',
        'The ability of an object to be created dynamically.',
      ],
      answer: 'The ability of an object to have multiple forms or behaviors.',
    },
    {
      question: 'What is the purpose of the for loop?',
      options: ['To repeat a block of code a certain number of times.', 'To check if a condition is true or false', 'To define a new variable', 'To display output'],
      answer: 'To repeat a block of code a certain number of times.',
    },
    {
      question: 'What is the purpose of the if statement?',
      options: [
        'To define a function.',
        'To check if a condition is true or false',
        'To create a loop',
        'To declare a variable',
      ],
      answer: 'To check if a condition is true or false',
    },
    {
      question: 'What is the purpose of a constructor in a class?',
      options: ['To destroy an object.', 'To initialize the state of an object.', 'To access data members of a class.', 'To handle errors'],
      answer: 'To initialize the state of an object.',
    },
  ];
  
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();