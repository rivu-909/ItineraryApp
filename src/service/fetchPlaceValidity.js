import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import openAIKey from "../apiKey";

export const fetchPlaceValidity = createAsyncThunk(
  "itinerary/place",
  async (place) => {
    // this is the key that we can get from the openAI's profile section.
    // https://platform.openai.com/ >> Personal >> View API keys
    const apiKey = openAIKey;
    const prompt = `Is ${place} a valid place in yes/no`;
    const model = "text-davinci-003";
    const temperature = 0;
    const maxTokens = 3;

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
