import inquirer from 'inquirer';

export const singleRepoFlow = async function () {
    const answer = await inquirer.prompt([
        {
            name: 'isFrontendApp',
            type: 'list',
            message: 'Which type of application are you building?',
            choices: ['frontend', 'backend']
        }
    ])

    if (answer.isFrontendApp === 'frontend'){
        return true
    } else {
        return false
    }
}

