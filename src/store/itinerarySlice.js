import { createSlice } from "@reduxjs/toolkit";
import { fetchItinerary } from "../service/fetchItinerary";
import parseResponse from "../utils/parseResponse";
import { fetchPlaceValidity } from "../service/fetchPlaceValidity";
import parsePlaceValidityResponse from "../utils/parsePlaceValidityResponse";
let lastDayId = 10000;
let lastTaskId = 10000;

const initialDayList = [
  {
    taskId: 0,
    text: "Make sure you have all necessary travel documents, such as a passport or visa",
  },
  {
    taskId: 1,
    text: "Research the local customs and culture of the destination",
  },
  {
    taskId: 2,
    text: "Check the weather forecast for your destination and pack accordingly",
  },
  {
    taskId: 3,
    text: "Make copies of important documents, such as your passport and travel itinerary, and store them in a safe place",
  },
  {
    taskId: 4,
    text: "Inform your bank and credit card companies of your travel plans to avoid having your accounts flagged for suspicious activity",
  },
  {
    taskId: 5,
    text: "Pack a basic first aid kit and any necessary medications",
  },
  { taskId: 6, text: "Make sure you have appropriate travel insurance" },
  {
    taskId: 7,
    text: "Bring a travel adapter if necessary to charge your electronics",
  },
  {
    taskId: 8,
    text: "Research transportation options and book any necessary tickets in advance",
  },
  { taskId: 9, text: "Create a budget and plan your expenses for the trip" },
  {
    taskId: 10,
    text: "Inform friends or family of your travel plans and provide them with emergency contact information",
  },
  {
    taskId: 11,
    text: "Pack light and only bring essential items to avoid excess baggage fees and make travel easier",
  },
];

const initialState = {
  isValidPlace: true,
  loading: false,
  dayListsLength: 1,
  dayLists: [
    {
      dayId: 0,
      dayNum: 0,
      listCount: 12,
      taskList: initialDayList,
    },
  ],
  error: null,
};

const itinerarySlice = createSlice({
  name: "itinerary",
  initialState,
  reducers: {
    addDay: (state, action) => {
      console.log("addDayReducer");

      state.dayLists.push({
        dayId: ++lastDayId,
        dayNum: ++state.dayListsLength,
        listCount: [],
        taskList: [],
      });
    },
    removeDay: (state, action) => {
      console.log("removeDayReducer");

      state.dayLists = state.dayLists.filter(
        (dayList) => dayList.dayId !== action.payload
      );
      state.dayListsLength--;
    },

    insertTask: (state, action) => {
      console.log("insertTaskReducer");

      const idx = state.dayLists.findIndex(
        (dayList) => dayList.dayId === action.payload.dayId
      );

      state.dayLists[idx].taskList.push({
        taskId: ++lastTaskId,
        text: action.payload.response,
      });
    },

    removeTask: (state, action) => {
      console.log("removeTaskReducer");

      const idx = state.dayLists.findIndex(
        (dayList) => dayList.dayId === action.payload.dayId
      );

      state.dayLists[idx].taskList = state.dayLists[idx].taskList.filter(
        (task) => task.taskId !== action.payload.taskId
      );
    },

    moveUp: (state, action) => {
      console.log("swapUpReducer");

      const idx = state.dayLists.findIndex(
        (dayList) => dayList.dayId === action.payload.dayId
      );

      const taskIdx = state.dayLists[idx].taskList.findIndex(
        (task) => task.taskId === action.payload.taskId
      );

      const task = state.dayLists[idx].taskList[taskIdx];

      if (idx === 0 && taskIdx === 0) {
        return;
      }

      state.dayLists[idx].taskList = state.dayLists[idx].taskList.filter(
        (task) => task.taskId !== action.payload.taskId
      );

      if (taskIdx === 0) {
        state.dayLists[idx - 1].taskList.push(task);
      } else {
        state.dayLists[idx].taskList.splice(taskIdx - 1, 0, task);
      }
    },

    moveDown: (state, action) => {
      console.log("swapDownReducer");

      const idx = state.dayLists.findIndex(
        (dayList) => dayList.dayId === action.payload.dayId
      );

      const taskIdx = state.dayLists[idx].taskList.findIndex(
        (task) => task.taskId === action.payload.taskId
      );

      const task = state.dayLists[idx].taskList[taskIdx];

      if (
        idx === state.dayListsLength - 1 &&
        taskIdx === state.dayLists[idx].listCount - 1
      ) {
        return;
      }

      state.dayLists[idx].taskList = state.dayLists[idx].taskList.filter(
        (task) => task.taskId !== action.payload.taskId
      );

      if (taskIdx === state.dayLists[idx].listCount - 1) {
        state.dayLists[idx + 1].taskList.splice(0, 0, task);
        state.dayLists[idx].listCount--;
      } else {
        state.dayLists[idx].taskList.splice(taskIdx + 1, 0, task);
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPlaceValidity.pending, (state) => {
      console.log("fetchPlaceValidityReducer");

      state.loading = true;
    });

    builder.addCase(fetchPlaceValidity.fulfilled, (state, action) => {
      console.log("fetchPlaceValidityFulfilledReducer");

      state.loading = false;
      state.isValidPlace = parsePlaceValidityResponse(action.payload);
    });

    builder.addCase(fetchPlaceValidity.rejected, (state, action) => {
      console.log("fetchPlaceValidityErrorReducer");

      state.loading = false;
      state.error = action.error;

      console.log(action.error);
    });

    builder.addCase(fetchItinerary.pending, (state) => {
      console.log("fetchItineraryReducer");

      state.loading = true;
    });

    builder.addCase(fetchItinerary.fulfilled, (state, action) => {
      console.log("fetchItineraryFulfilledReducer");

      state.loading = false;
      state.dayLists = [];
      const dayLists = parseResponse(action.payload);
      dayLists.forEach((dayList) => {
        state.dayLists.push({
          dayId: ++lastDayId,
          dayNum: dayList.dayNum,
          listCount: dayList.listCount,
          taskList: dayList.taskList,
        });
        state.dayListsLength = dayList.listCount;
      });

      console.log("fetchSuccess");
    });

    builder.addCase(fetchItinerary.rejected, (state, action) => {
      console.log("fetchItineraryErrorReducer");

      state.loading = false;
      state.error = action.error;

      console.log(action.error);
    });
  },
});

export default itinerarySlice.reducer;
export const { addDay, removeDay, insertTask, removeTask, moveUp, moveDown } =
  itinerarySlice.actions;
