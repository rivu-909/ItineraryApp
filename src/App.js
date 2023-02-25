import { AddBox } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import addNewDay from "./actions/addNewDay";

import "./App.css";
import Button from "./components/common/Button";
import DayView from "./components/DayView";
import InputContainer from "./components/InputContainer";

function App() {
  const itinerary = useSelector((state) => state.itinerary);
  const dayLists = itinerary.dayLists;
  const isLoading = itinerary.loading;

  const addDayHandler = React.useCallback(() => {
    addNewDay();
  }, []);

  return (
    <div className="screen">
      <div className="title">Milan: Decide your Itinerary</div>
      <InputContainer itinerary={itinerary} />
      <div className="dayListContainer">
        {isLoading ? (
          <CircularProgress />
        ) : (
          dayLists.map((dayList, index) => {
            return <DayView key={index} dayList={dayList} index={index} />;
          })
        )}
      </div>
      {isLoading ? null : (
        <Button size="extra-large" onClick={addDayHandler}>
          <AddBox />
        </Button>
      )}
    </div>
  );
}

export default App;
