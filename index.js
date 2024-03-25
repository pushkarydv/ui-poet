const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function waitForInput() {
    return new Promise((resolve, reject) => {
        rl.question('Prompt : ', (input) => {
            resolve(input);
            rl.close();
        });
    });
}

async function main() {
    const prompt = await waitForInput();
    if(!prompt) {
       console.log('No prompt provided');
       process.exit(1);
    }
    console.log(`User: ${prompt}`);
}

main();
