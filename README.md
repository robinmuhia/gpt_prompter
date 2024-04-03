# Ayira's Affirmations

Welcome to Ayira's Affirmations, a 'Words of Affirmation' web application designed to provide positive affirmations using the OpenAI API. This README will guide you through setting up the application locally.

## Front-end Infrastructure

Ayira's Affirmations is built using:

- TypeScript
- Tailwind CSS
- Next.js

The application leverages:

- Express.js for serverless functionality
- Next-auth for authentication
- MongoDB for data storage
- Pinecone database for storing vectors from a TXT file

The template and user interface were forked from [javascript mastert](https://github.com/adrianhajdin/project_next_14_ai_prompt_sharing).

You can watch along to get the appropriate envs to use for google and url.

You are a software engineer so do research to get pinecone and OpenAi envs

## Environment Variables

To run Ayira's Affirmations locally or deploy it, you need to set up the following environment variables:

```bash
NEXT_PUBLIC_GOOGLE_ID=
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_MONGODB_URI=
NEXTAUTH_URL=
NEXTAUTH_URL_INTERNAL=
NEXTAUTH_SECRET=
NEXT_PUBLIC_OPENAI_API_KEY=
NEXT_PUBLIC_PINECONE_API_KEY=
NEXT_PUBLIC_PINECONE_ENVIRONMENT=
```

## Cloning the Repository

To clone the repository and set up Ayira's Affirmations locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/robinmuhia/gpt_prompter/
    ```

2. Navigate to the project directory

3. Install dependencies:

    ```bash
    npm install
    ```

## Starting the Next.js Server

Once you have cloned the repository and installed the dependencies, you can start the Next.js server using the following command:

```bash
npm run dev
```
