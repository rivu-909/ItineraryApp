import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPlaceValidity = createAsyncThunk(
  "itinerary/place",
  async (place) => {
    const apiKey = "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";
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
      //   "https://google.co.in",
      "https://api.openai.com/v1/completions",
      data,
      { headers }
    );

    return response.data.choices[0].text;
  }
);
