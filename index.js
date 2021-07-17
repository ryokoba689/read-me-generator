// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require("./utils/generateMarkdown");
// TODO: Create an array of questions for user input
const questions = [
    'What is the title of this application? ', 
    'What does your application do? ', 
    'Steps to install applicaiton: ', 
    'Write a brief description about how to use this application: ', 
    'List the Github username\'s of any contributors(input finish when done adding contributors) : ', 
    'Include tests for this application?: ', 
    'Which licenses are used for this application? ', 
    'Enter your GitHub username: ', 
    'Enter your email address: ', 
    'Contact Information'
    ];
    

// array of licenses
const licenses = ["Apache", "GNU", "MIT", "Mozilla",  "None"];

// TODO: Create a function to write README file
const writeToFile = async (fileName, data) => {
    fs.writeFile(fileName, await generateMarkdown(data, contributors), (err) =>
            err ? console.error(err) : console.log('README.md Created!')
    );
};
// TODO: Create a function to initialize app
const contributors = [];
const init = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: questions[0],
            name: 'title'
        },
        {
            type: 'input',
            message: questions[1],
            name: 'description'
        },
        {
            type: 'input',
            message: questions[2],
            name: 'installation'
        },
        {
            type: 'input',
            message: questions[3],
            name: 'usage'
        },
        {
            type: 'input',
            message: questions[4],
            name: 'contributors',
            validate: async (input) => {
                if (input !== 'finish') {
                   return contributors.push(input);
                }
                return true;
             }
        },
        {
            type: 'input',
            message: questions[5],
            name: 'tests'
        },
        {
            type: 'list',
            message: questions[6],
            choices: licenses,
            name: 'license',
        },
        {
            type: 'input',
            message: questions[7],
            name: 'username'
        },
        {
            type: 'input',
            message: questions[8],
            name: 'email'
        },
        {
            type: 'input',
            message: questions[9],
            name: 'instructions',
        }
    ])
    .then(response => { writeToFile('README.md', response) });
};

// Function call to initialize app
init();
