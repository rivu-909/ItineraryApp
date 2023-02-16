import { configureStore } from "@reduxjs/toolkit";
import itinerarySlice from "./itinerarySlice";

export const store = configureStore({
  reducer: {
    itinerary: itinerarySlice,
  },
});
