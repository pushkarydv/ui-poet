const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function waitForInput(userViewPrompt) {
    return new Promise((resolve, reject) => {
        rl.question(`${userViewPrompt} : `, (input) => {
            resolve(input);
            rl.close();
        });
    });
}

// get input form the command line while showingn the userViewPrompt (anything like: What is your name?) to user.
const getCommandLineInput = async (userViewPrompt) => {
    const prompt = await waitForInput(userViewPrompt);
    return prompt;
}

// making console outputs colorful
const logger = (text) => {
    console.log(`\x1b[33m${text}\x1b[0m`);
}

module.exports = {
    getCommandLineInput,
    logger
}