import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import openAIKey from "../apiKey";

export const fetchItinerary = createAsyncThunk(
  "itinerary/fetchItinerary",
  async ({ place, numOfDays }) => {
    console.log(place);
    console.log(numOfDays);

    // this is the key that we can get from the openAI's profile section.
    // https://platform.openai.com/ >> Personal >> View API keys
    const apiKey = openAIKey;
    const prompt = `Provide an itinerary for ${numOfDays} days ${place} tour`;
    const model = "text-davinci-003";
    const temperature = 0.5;
    const maxTokens = 2000;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    const data = {
      model,
      prompt,
      temperature,
      max_tokens: maxTokens,
    };

    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      data,
      { headers }
    );

    return response.data.choices[0].text;
  }
);
