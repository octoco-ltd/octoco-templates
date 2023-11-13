import inquirer from 'inquirer';
import path from 'path';
import { addReactPage } from './ts-react-app-add-pages.js';
import { configReactAuth } from './ts-react-app-config-auth.js';

// TODO: add frontend options here as added to CLI
// Auth0, KeyCloak
export const authOptions = ['Firebase', 'Cognito']

export const reactFlow = async function() {
    const questions = [
        {
            type: 'list',
            name: 'react-auth',
            message: 'What authentication provider is this project going to use?',
            choices: authOptions
        },
        {
            name: 'react-pages',
            message: 'Add a comma separated list of pages to add (Home page is already included) - Leave empty to skip',
        },
    ]

    const answers = await inquirer.prompt(questions)
    const authProvider = answers['react-auth']
    configReactAuth(authProvider)
    if(answers['react-pages']){
        console.log('==========================================')
        console.log(`Creating Pages`)
        console.log('==========================================')
        const pages = answers['react-pages'].split(',')
        pages.forEach(page => {
            addReactPage('test/src/pages/Home', path.join('test/src/pages', page), page)
        });
        console.log('Done!')
        console.log('---')
    }

}

