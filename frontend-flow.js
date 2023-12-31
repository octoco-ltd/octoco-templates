import inquirer from 'inquirer';

// TODO: add frontend options here as added to CLI
export const frontends = {"REACT": "ts-react-app",}

export const frontendFlow = async function() {
    const questions = [
        {
            name: 'app-name',
            message: 'What should your frontend application be called?',
        },
        {
            type: 'list',
            name: 'fe-app',
            message: 'Which type of FE application do you need?',
            choices: [Object.keys(frontends)[0]]
        }
    ]

    const answers = await inquirer.prompt(questions)
    return [answers['app-name'], frontends[answers['fe-app']]]
}

