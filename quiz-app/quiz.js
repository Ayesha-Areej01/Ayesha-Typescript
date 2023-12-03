import * as readline from 'readline';
import chalk from 'chalk';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const questions = [
    {
        questionText: 'What is the capital of France?',
        choices: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctChoice: 2,
    },
    {
        questionText: 'Which planet is known as the "Red Planet"?',
        choices: ['Earth', 'Mars', 'Venus', 'Jupiter'],
        correctChoice: 1,
    },
    {
        questionText: 'What is the largest mammal on Earth?',
        choices: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        correctChoice: 1,
    },
    {
        questionText: 'Who wrote "Matilda"?',
        choices: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Roald Dahl'],
        correctChoice: 1,
    },
];
let userScore = 0;
let currentQuestionIndex = 0;
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    console.log(chalk.bold.yellow(question.questionText));
    for (let i = 0; i < question.choices.length; i++) {
        console.log(`${i + 1}. ${question.choices[i]}`);
    }
}
function checkAnswer(userChoice) {
    const correctChoice = questions[currentQuestionIndex].correctChoice;
    if (userChoice === correctChoice) {
        console.log(chalk.bgGreen('Correct!'));
        userScore++;
    }
    else {
        console.log(chalk.red(`Incorrect! The correct answer is ${correctChoice + 1}: ${questions[currentQuestionIndex].choices[correctChoice]}`));
    }
    currentQuestionIndex++;
}
function displayResults() {
    console.log(chalk.bold.blue(`Your score: ${userScore} / ${questions.length}`));
    chalk.magentaBright('Quiz Completed!');
    rl.question('Do you want to start again? (yes/no): ', (answer) => {
        if (answer.toLowerCase() === 'yes') {
            resetQuiz();
            askQuestion();
        }
        else {
            rl.close();
        }
    });
}
function resetQuiz() {
    userScore = 0;
    currentQuestionIndex = 0;
}
function askQuestion() {
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        rl.question('Enter your choice (1, 2, 3, 4): ', (userInput) => {
            const userChoice = parseInt(userInput, 10);
            if (isNaN(userChoice) || userChoice < 1 || userChoice > 4) {
                console.log(chalk.red('Invalid input. Please enter a number between 1 and 4.\n'));
                askQuestion();
            }
            else {
                checkAnswer(userChoice - 1);
                askQuestion();
            }
        });
    }
    else {
        displayResults();
    }
}
askQuestion();
