import React from "react";
import getItinerary from "../actions/getItinerary";
import Button from "./common/Button";
import "./InputContainer.css";

export default function InputContainer({ itinerary }) {
  const isValidPlace = itinerary.isValidPlace;

  const placeRef = React.useRef(null);
  const numOfDaysRef = React.useRef(null);

  const buttonClickHandler = React.useCallback(() => {
    console.log("FetchButtonClicked");
    getItinerary(
      String(placeRef.current.value),
      String(numOfDaysRef.current.value)
    );
  }, []);

  return (
    <div className="inputContainer">
      <div className="inputFieldContainer">
        <input
          type="text"
          className="inputField"
          ref={placeRef}
          placeholder="Place you would like to visit"
        />
        <input
          type="text"
          className="inputField"
          ref={numOfDaysRef}
          placeholder="Number of days you would be there"
        />
      </div>
      <Button size="extra-large" onClick={buttonClickHandler}>
        Get Itinerary
      </Button>
    </div>
  );
}
