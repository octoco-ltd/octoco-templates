#!/usr/bin/env node

const inquirer = require('inquirer');
const simpleGit = require('simple-git');

const templates = [
  {
    name: 'TS-REACT-APP',
    value: 'https://github.com/octoco-ltd/octoco-templates.git'
  },
  //   {
  //     name: 'Template 2',
  //     value: 'https://github.com/user/template2.git'
  //   },
  //   {
  //     name: 'Template 3',
  //     value: 'https://github.com/user/template3.git'
  //   }
];

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Project name:',
    validate: function (value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter your project name.';
      }
    }
  },
  {
    type: 'list',
    name: 'template',
    message: 'Project template:',
    choices: templates,
    default: templates[0]
  }
];

inquirer.prompt(questions)
  .then(answers => {
    const templateUrl = answers.template.value;
    const repoName = answers.name;

    console.log(`Cloning ${templateUrl} into ${repoName}...`);

    simpleGit()
      .clone(templateUrl, `./${repoName}`)
      .then(() => {
        console.log(`Initializing Git repository in ${repoName}...`);

        simpleGit(`./${repoName}`)
          .init()
          .then(() => {
            console.log(`Success! Git repository initialized in ${repoName}.`);
          });
      });
  });
