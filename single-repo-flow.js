import * as readline from "readline";

export function singleRepoFlow() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // First step is to determine which type of repo we need eg> Monorepo or single app repo

    const message = 'You have sleected a single application repostory style:\n' +
        '   [1]: Do you require a frontend app?\n' +
        '   [2]: Do you require a backend app?\n' +
        '   Default is 1\n';

    let option = 1;
    let isFrontend = true;

    rl.question(message, selection => {
        option = parseInt(selection);

        if (option === 1) {
            isFrontend = true;
        } else if (option === 2) {
            isFrontend = false
        } else {
            throw Error('Invalid selection!\n');
        }
        rl.close();
    });

    return isFrontend;
}