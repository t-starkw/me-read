// Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require("./utils/generateMarkdown");


// Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: "What is your GitHub Username?",
        name: 'username',
        validate: function(answer) {
            if (answer.length < 1) {
                return console.log("Please enter a valid GitHub username.")
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is your e-mail address?",
        name: 'email',
        validate: function(answer) {
            if (answer.length < 1) {
                return console.log("Please provide an e-mail address.")
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is the name of your GitHub repository?",
        name: 'repo',
        validate: function(answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub repository name is required for a badge.")
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is the title of your project?",
        name: 'title',
        validate: function(answer) {
            if (answer.length < 1) {
                return console.log("Please enter a valid project title.")
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Write a description of your project.",
        name: 'description',
        validate: function(answer) {
            if (answer.length < 1) {
                return console.log("Please enter a valid project description")
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Provide installation instructions for the installation section of your README.",
        name: 'install',
    },
    {
        type: 'input',
        message: "Provide instructions and example usages of your project for the usage section of your README.",
        name: 'usage',
    },
    {
        type: 'input',
        message: "Provide guidelines on how other developers can contribute to your project.",
        name: 'contribute',
    },
    {
        type: 'input',
        message: "Provide any tests written for your application and examples of usage.",
        name: 'test',
    },
    {
        type: 'list',
        message: "Choose a license for your project.",
        choices: ['Apache', 'Mozilla', 'MIT', 'GNU', 'Boost', 'ISC'],
        name: 'license',
    },
];

// Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, generateMarkdown(data), err => {
        if (err) {
            return console.log(err);
        }
        console.log("README creation was successful")
    })
}

// Create a function to initialize app
function init() {
    inquirer.prompt(questions)
    .then(function(answers) {
        const fileName = 
            answers.title
            .split('')
            .join('') + '.md';

        writeToFile(fileName, answers);    
    });
}

// Function call to initialize app
init();
