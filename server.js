import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});


const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from Hossein Pira',
    })
});

app.post('/', async (req, res) => {
   try {
     const prompt = req.body.prompt;
     const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        temperature: 0.2,
        max_tokens: 2500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
     });
     console.error(response.data.choices[0].text)
     res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5500, () => console.log('AI server started on https://dark-dev.onrender.com'))

