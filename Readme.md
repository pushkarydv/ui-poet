# UI-POET

UI-POET is a command-line tool that generates frontend code (HTML, CSS, and JavaScript) based on a user-provided prompt. It utilizes various AI models to understand the user's requirements, gather inspiration from images, analyze the desired UI, and generate the corresponding code.

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

## Running locally

1. Clone the repository:

    ```bash
    git clone https://github.com/pushkarydv/UI-POET.git

    cd UI-POET

    npm install
    ```

2. Create a `.env` file in the root directory and add the API keys from `.env.sample` file.


3. Run the following command to start the application:

    ```bash
    npm start
    ```

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.