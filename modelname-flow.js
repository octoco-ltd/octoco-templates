import inquirer from 'inquirer';

export const modelNameFlow = async function () {
    const questions = [
        {
            name: 'model-name',
            message: 'What should your backend model be called?',
            default: 'Example'
        }
    ]

    const answers = await inquirer.prompt(questions)
    console.log(answers)
    return answers['model-name']
};