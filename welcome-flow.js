import inquirer from 'inquirer';

export const welcomeFlow = async function() {
    // First step is to determine which type of repo we need eg> Monorepo or single app repo

    console.info("Welcome to the Octoco template CLI.\n\n")

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

