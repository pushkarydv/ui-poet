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

const getCommandLineInput = async (userViewPrompt) => {
    const prompt = await waitForInput(userViewPrompt);
    return prompt;
}

module.exports = {
    getCommandLineInput
}