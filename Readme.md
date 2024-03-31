# UI-POET

UI-POET is a command-line tool that generates frontend code (HTML, CSS, and JavaScript) based on a user-provided prompt. It utilizes various AI models to understand the user's requirements, gather inspiration from images, analyze the desired UI, and generate the corresponding code without a single touch to any code file by the user.

## Features

- Generate frontend code (HTML, CSS, and JavaScript) based on a user-provided prompt
- Fetch inspirational images related to the prompt
- Analyze the desired UI using a vision model
- Generate code using language models (e.g., Anthropic's Claude, OpenAI's GPT-4)
- Save the generated code in an `output` folder

## Prerequisites

Before running UI-POET, make sure you have the following prerequisites installed:

- Node.js
- npm (Node Package Manager)

## Demo Video

https://github.com/pushkarydv/ui-poet/assets/96358784/2fc05fb7-5652-4851-b347-b718a403a037

## Some basic tests

As this is just the base version of UI-POET, it's designed to generate complete code. However, it has also been tested with simple 5-6 word prompts to effortlessly generate stunning UI designs without any manual intervention.

1. Generate a chatbot that looks like apple's
    ![Screenshot 2024-03-31 182941](https://github.com/pushkarydv/ui-poet/assets/96358784/e5c573b1-3bda-4c15-bc46-9721bc684af4)
    
2. a spotify style music player
    ![Screenshot 2024-03-31 183340](https://github.com/pushkarydv/ui-poet/assets/96358784/372c423b-6ab0-4118-beee-11c0a7c8de21)

## Running locally

1. Clone the repository:

    ```bash
    git clone https://github.com/pushkarydv/UI-POET.git
    cd UI-POET
    npm install
    ```

2. Create a `.env` file in the root directory and add the API keys from `.env.sample` file.

3. As of now the model selected is Claude(As it was also trained on XML data, so it's easier to get structured output from it and extract through regx), you can change the model in `src/index.js` file. (a few are commented out you can uncomment them to use them)

4. Run the following command to start the application:

    ```bash
    npm start
    ```

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
