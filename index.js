/*
    * UI-POET
    * 🧑‍💻: Pushkar Yadav (https://github.com/pushkarydv)
    * Description: This is base version which is expected to get the prompt from user, search on web, get some inspirations, learn differnt frameworks, and generate code.
    * Date: 2024-02-24
*/


require('dotenv').config();

const Groq = require("groq-sdk");
const OpenAI = require("openai");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const { makeFile } = require('./src/utils/filesystem');
const { filterText } = require("./src/services/filterText");
const { getCommandLineInput, logger } = require("./src/utils/commandLine");
const { getInspirationalImages } = require("./src/services/getInspirations");
const { fileToGenerativePart } = require("./src/services/fileToGenerativePart");
const { UI_OBSERVER_PROMPT, CODE_GENERATOR_PROMPT } = require("./src/services/prompts");

async function main() {

    logger(`
    UI-POET
    Developed by Pushkar Yadav (https://github.com/pushkarydv)
    `);

    console.log(`This is base version which is expected to get the prompt from user, search on web, get some inspirations, learn differnt frameworks, and generate code.`);

    const task = await getCommandLineInput('\nEnter your prompt');
    if (!task) {
        console.log('No prompt provided');
        process.exit(1);
    }

    logger(`Getting Some Inspiration images`);
    const inspirationImages = await getInspirationalImages(task);

    logger(`Got ${inspirationImages.length} images for inspiration`);
    console.log('here are they: ', inspirationImages);

    logger(`Creting Buffers for model`);
    const imageParts = await Promise.all(inspirationImages.map(async (image) => {
        return await fileToGenerativePart(image);
    }));


    logger(`Vision Model Initiated`);
    const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const visionModel = gemini.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = UI_OBSERVER_PROMPT(task);

    logger(`Waiting for model response`);
    const result = await visionModel.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    logger(`Filtering UI Analysis`);
    const ANALYSIS_MESSAGE = filterText(text, 'ANALYSIS_MESSAGE');

    logger(`Analyzed, Starting to generate code`);
    const codeUserPrompt = CODE_GENERATOR_PROMPT(task, ANALYSIS_MESSAGE);
    // const groqCloud = new Groq({ apiKey: process.env.GROQ_API_KEY });
    // const completion = await groqCloud.chat.completions.create({
    //     messages: [
    //         {
    //             role: 'user',
    //             content: codeUserPrompt,
    //         },
    //     ],
    //     model: 'mixtral-8x7b-32768',
    // });

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: codeUserPrompt }],
        model: 'gpt-4-turbo-preview',
    });

    const generatedCode = await completion.choices[0]?.message?.content || '';

    if (!generatedCode) {
        logger(`Failed to generate code`);
        process.exit(1);
    }
    console.log(generatedCode);
    logger(`Filtering Code`);
    const _html = filterText(generatedCode, 'HTML-LAYER');
    const _css = filterText(generatedCode, 'CSS-LAYER');
    const _js = filterText(generatedCode, 'JS-LAYER');

    makeFile('./output/index.html', _html);
    makeFile('./output/style.css', _css);
    makeFile('./output/script.js', _js);

    logger(`Thanks for using UI-POET, your code has been generated and saved in output folder. \n\nHappy Coding!`);

}

main();