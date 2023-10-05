import inquirer from 'inquirer';

// TODO: add backend options here as added to CLI
export const backends = {
    'TS Express REST API': "express-rest-api",
    'Flutter': "flutter_template",
    'Python AWS Lambda': "python-aws-lambda",
    'TypeScript AWS Lambda': "ts-aws-lambda",
    'TypeScript React': "ts-react-app",
};

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
            choices: ['TS Express REST API', 'Flutter', 'Python AWS Lambda', 'TypeScript AWS Lambda', 'TypeScript React']
        }
    ]

    const answers = await inquirer.prompt(questions)
    return [answers['app-name'], backends[answers['be-app']]]
};