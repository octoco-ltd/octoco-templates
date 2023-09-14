const readline = require("readline");

const dirFlow = function() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise( resolve => rl.question('What should your project be called?\n', selection => {
        rl.close();
        resolve(selection)
    }));
}

module.exports = {dirFlow}