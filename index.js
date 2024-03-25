/*
    * UI-POET
    * 🧑‍💻: Pushkar Yadav (https://github.com/pushkarydv)
    * Description: This is base version which is expected to get the prompt from user, search on web, get some inspirations, learn differnt frameworks, and generate code.
    * Date: 2024-02-24
*/

const { getCommandLineInput } = require("./src/utils/commandLine");

async function main() {
    const prompt = await getCommandLineInput('Enter your prompt');
    if(!prompt) {
       console.log('No prompt provided');
       process.exit(1);
    }
    console.log(`User: ${prompt}`);
}

main();
