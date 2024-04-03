# Ayira's Affirmations

Welcome to Ayira's Affirmations, a 'Words of Affirmation' web application designed to provide positive affirmations using the OpenAI API. This README will guide you through setting up the application locally.

## Front-end Infrastructure

Ayira's Affirmations is built using TypeScript, Tailwind CSS, and Next.js. The application leverages Express.js for serverless functionality, enabling integration with Next-auth for authentication and connection with the OpenAI API. Data is stored in MongoDB, and the template and user interface were forked from @javascript mastery. Additionally, the application utilizes a Pinecone database to store vectors from a TXT file for querying information.

## Environment Variables

To run Ayira's Affirmations locally or deploy it, you need to set up the following environment variables:

```bash
GOOGLE_ID=
GOOGLE_CLIENT_SECRET=
MONGODB_URI=
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
