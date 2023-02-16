import React from "react";
import { useSelector } from "react-redux";
import getItinerary from "./actions/getItinerary";

import "./App.css";

function App() {
  const itinerary = useSelector((state) => state.itinerary);

  const dayLists = itinerary.dayLists;
  const isLoading = itinerary.loading;
  const isValidPlace = itinerary.isValidPlace;

  const placeRef = React.useRef(null);
  const numOfDaysRef = React.useRef(null);

  const buttonClickHandler = React.useCallback(() => {
    console.log("button clicked");
    // getItinerary(
    //   String(placeRef.current.value),
    //   String(numOfDaysRef.current.value)
    // );
  }, []);

  return (
    <div className="screen">
      <h1>Itinerary</h1>
      <div className="inputContainer">
        <input type="text" ref={placeRef} />
        <input type="text" ref={numOfDaysRef} />
      </div>
      <div className="buttonContainer">
        <button name="button" onClick={buttonClickHandler}>
          Get Itinerary
        </button>
      </div>
      <div>{!isValidPlace ? "It is not a valid place" : null}</div>

      <div>
        {isLoading ? "Loading" : "Loaded"}
        {dayLists.map((dayList, index) => {
          return (
            <div key={index}>
              <h2>day {dayList.dayNum}</h2>
              {dayList.taskList.map((task, index) => (
                <div key={index}>{task}</div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
