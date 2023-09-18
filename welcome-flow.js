import inquirer from 'inquirer';

export const welcomeFlow = async function() {
    // First step is to determine which type of repo we need eg> Monorepo or single app repo

    const message = 'Welcome to the Octoco template CLI. To get started please select your repository structure by entering the corresponding number:\n' +
        '   [1]: A monorepo (containing both front and backend applications)\n' +
        '   [2]: A single application repository\n' +
        'Default is 1: ';

    let isMonorepo = false;

    const answers = await inquirer.prompt([{
        name: 'isMonorepo',
        message: 'Do you require a monorepo architecture (y/n)?',
        default: 'y'
    }])

    if (answers.isMonorepo === 'y'){
        isMonorepo = true
    }

    return isMonorepo
}

