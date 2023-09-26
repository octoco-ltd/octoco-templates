const inquirer = require('inquirer');
const simpleGit = require('simple-git');

const templates = [
  {
    name: 'TS-REACT_APP',
    value: 'https://github.com/octoco-ltd/octoco-templates.git/templates/ts-react-app'
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

inquirer
  .prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Select a template:',
      choices: templates
    }
  ])
  .then(answers => {
    const templateUrl = answers.template;
    const repoName = templateUrl.split('/').pop().replace('.git', '');

    console.log(`Cloning ${templateUrl} into ${repoName}...`);

    simpleGit()
      .clone(templateUrl, repoName)
      .then(() => {
        console.log(`Initializing Git repository in ${repoName}...`);

        simpleGit(repoName)
          .init()
          .then(() => {
            console.log(`Success! Git repository initialized in ${repoName}.`);
          });
      });
  });