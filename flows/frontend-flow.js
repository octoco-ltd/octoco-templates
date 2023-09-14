import * as readline from "readline";

const frontends = {1: "REACT", 2: "BLAZOR", 3: "REACT-NATIVE", 4: "FLUTTER"}

export function frontendFlow() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const message = 'Which type of Frontend application do you need?:\n' +
        '   [1]: React Web App\n' +
        '   [2]: Blazor Backoffice\n' +
        '   [3]: React Native Mobile App\n' +
        '   [4]: Flutter Mobile App\n';

    let option = 1;

    rl.question(message, selection => {
        option = parseInt(selection);

        if (option === 1) {
            console.log('React Web App selected!\n');
        } else if (option === 2) {
            console.log('Blazor Backoffice selected\n');
        } else if (option === 3) {
            console.log('React Native Mobile App selected\n');
        } else if (option === 4) {
            console.log('Flutter Mobile App selected\n');
        } else {
            throw Error('Invalid selection!\n');
        }
        rl.close();
    });

    return frontends[option]
}