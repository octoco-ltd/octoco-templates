import * as readline from "readline";

const backends = {1: "EXPRESS", 2: "APOLLO", 3: ".NET", 4: "PYTHON"}

export function backendFlow() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const message = 'Which type of Backend application do you need?:\n' +
        '   [1]: TS Express REST API\n' +
        '   [2]: TS Apollo GraphQL API\n' +
        '   [3]: .NET REST API\n' +
        '   [4]: Python REST API\n';

    let option = 1;

    rl.question(message, selection => {
        option = parseInt(selection);

        if (option === 1) {
            console.log('TS Express REST API selected!\n');
        } else if (option === 2) {
            console.log('TS Apollo GraphQL selected\n');
        } else if (option === 3) {
            console.log('.NET REST API\n');
        } else if (option === 4) {
            console.log('Python REST API\n');
        } else {
            throw Error('Invalid selection!\n');
        }
        rl.close();
    });

    return backends[option]
}