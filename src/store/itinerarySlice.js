import { createSlice } from "@reduxjs/toolkit";
import { fetchItinerary } from "../service/fetchItinerary";
import parseResponse from "../utils/parseResponse";
import { fetchPlaceValidity } from "../service/fetchPlaceValidity";
import parsePlaceValidityResponse from "../utils/parsePlaceValidityResponse";
let lastDayId = 0;

const initialState = {
  isValidPlace: true,
  loading: false,
  dayLists: [
    {
      dayId: 0,
      dayNum: 0,
      listLength: 3,
      taskList: [
        "Pack your bags.",
        "Take your tickets, passport and wallet.",
        "Set an alarm.",
      ],
    },
    {
      dayId: 1,
      dayNum: 1,
      listCount: 3,
      taskList: [
        "- Arrive at Zurich and check in to a hotel.",
        "- Take a tour of the city, visiting sites such as the Swiss National Museum, the Grossmunster church and the old town.",
        "- Enjoy the nightlife of Zurich.",
      ],
    },
    {
      dayId: 2,
      dayNum: 2,
      listCount: 3,
      taskList: [
        "- Take a scenic train ride to Interlaken.",
        "- Spend the day exploring the town and the surrounding area, including lakes such as Thunersee and Brienzersee.",
        "- Visit the nearby Jungfraujoch, the highest railway station in Europe.",
      ],
    },
    {
      dayId: 3,
      dayNum: 3,
      listCount: 3,
      taskList: [
        "- Take a boat ride on Lake Geneva to visit the city of Lausanne and explore its historical landmarks.",
        "- Visit the Lavaux Vineyard Terraces, the UNESCO World Heritage Site.",
        "- Enjoy the nightlife of Lausanne.",
      ],
    },
    {
      dayId: 4,
      dayNum: 4,
      listCount: 4,
      taskList: [
        "- Take a train to Lucerne and explore its old city and iconic covered bridges.",
        "- Visit Mount Pilatus, the highest peak in the area.",
        "- Take a boat ride on Lake Lucerne.",
        "- Depart for your next destination.",
      ],
    },
  ],
  error: null,
};

const itinerarySlice = createSlice({
  name: "itinerary",
  initialState,
  reducers: {
    // addDay: (state, action) => {
    //   console.log("add Day action");
    //   state.itinerary.dayLists.push({
    //     dayId: ++lastDayId,
    //     dayNum: action.payLoad.dayNum,
    //     listCount: action.payLoad.listLength,
    //     taskList: action.payload.taskList,
    //   });
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaceValidity.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchPlaceValidity.fulfilled, (state, action) => {
      state.loading = false;
      state.isValidPlace = parsePlaceValidityResponse(action.payload);

      console.log(action.payload);
    });

    builder.addCase(fetchPlaceValidity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;

      console.log(action.error);
    });

    builder.addCase(fetchItinerary.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchItinerary.fulfilled, (state, action) => {
      state.loading = false;

      const dayLists = parseResponse(action.payload);
      dayLists.forEach((dayList) => {
        // console.log(dayList);
        state.dayLists.push({
          dayId: ++lastDayId,
          dayNum: dayList.dayNum,
          listCount: dayList.listLength,
          taskList: dayList.taskList,
        });
      });

      console.log(dayLists);
    });

    builder.addCase(fetchItinerary.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;

      console.log(action.error);
    });
  },
});

export default itinerarySlice.reducer;
export const { addDay } = itinerarySlice.actions;
