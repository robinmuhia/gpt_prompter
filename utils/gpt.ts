import axios from "axios";
import { prompt } from "./prompt";

export const getAffirmation = (userprompt: string, user: string) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (apiKey) {
    const client = axios.create({
      headers: {
        Authorization: "Bearer " + apiKey,
      },
    });

    const params = {
      prompt: prompt(userprompt, user),
      model: "text-davinci-003",
      max_tokens: 200,
      temperature: 0.7,
    };

    return client
      .post("https://api.openai.com/v1/completions", params)
      .then((res): string =>
        res.data.choices[0].text.toString().replace(/^[ ]+/g, "")
      )
      .catch((err) => {
        console.log(err);
      });
  }
};
