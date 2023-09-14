import * as readline from "readline";

export function welcomeFlow() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // First step is to determine which type of repo we need eg> Monorepo or single app repo

    const message = 'Welcome to the Octoco template CLI. To get started please select your repository structure by entering the corresponding number:\n' +
        '   [1]: A monorepo (containing both front and backend applications)\n' +
        '   [2]: A single application repository\n' +
        '   Default is 1\n';

    let option = 1;
    let isMonorepo = false;

    rl.question(message, selection => {
        option = parseInt(selection);

        if (option === 1) {
            console.log('Monorepo architecture selected!\n');
            isMonorepo = true;
        } else if (option === 2) {
            console.log('Single repo architecture selected\n');
        } else {
            throw Error('Invalid selection!\n');
        }
        rl.close();
    });

    return isMonorepo;
}