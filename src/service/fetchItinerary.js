import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// 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

// export default async function fetch() {
//   const apiKey = "sk-rqqLvu5R5wHsogtBQNyVpkT3BlbkFJ9AAYZQn1byqkVj0Wah";
//   const prompt = "Please provide a itinerary for goa india visit";
//   const model = "text-davinci-003";
//   const temperature = 0.5;
//   const maxTokens = 1000;

//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${apiKey}`,
//   };

//   const data = {
//     model,
//     prompt,
//     temperature,
//     max_tokens: maxTokens,
//   };

//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/completions",
//       data,
//       { headers }
//     );
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

export const fetchItinerary = createAsyncThunk(
  "itinerary/fetchItinerary",
  async ({ place, numOfDays }) => {
    console.log(place);
    console.log(numOfDays);
    const apiKey = "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";
    const prompt = `Provide an itinerary for ${numOfDays} days ${place} tour`;
    const model = "text-davinci-003";
    const temperature = 0.7;
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

    console.log(prompt);

    const response = await axios.post(
      // "https://google.co.in",
      "https://api.openai.com/v1/completions",
      data,
      { headers }
    );

    return response.data.choices[0].text;
  }
);
