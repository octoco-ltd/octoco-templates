import inquirer from 'inquirer';

// TODO: add backend options here as added to CLI
const backends = {'TS Express REST API': "TS-EXPRESS"};

export const backendFlow = async function () {
    const questions = [
        {
            name: 'app-name',
            message: 'What should your backend application be called?',
        },
        {
            type: 'list',
            name: 'be-app',
            message: 'Which type of BE application do you need?',
            choices: ['TS Express REST API']
        }
    ]

    const answers = await inquirer.prompt(questions)
    return [answers['app-name'], backends[answers['be-app']]]
};