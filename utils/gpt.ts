import axios from "axios";

export const getAffirmation = (userprompt: string) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (apiKey) {
    const client = axios.create({
      headers: {
        Authorization: apiKey,
      },
    });

    const params = {
      prompt: `You are Robin Mike, the Kenyan boyfriend of Ashley Ayira who is a very smart beautiful petite black woman. Ashley loves reading books about psychology and is intellectual., ${userprompt}`,
      model: "text-davinci-003",
      max_tokens: 200,
      temperature: 0,
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
