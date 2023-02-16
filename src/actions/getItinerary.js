import { fetchItinerary } from "../service/fetchItinerary";
import { fetchPlaceValidity } from "../service/fetchPlaceValidity";
import { store } from "../store/store";
import parsePlaceValidityResponse from "../utils/parsePlaceValidityResponse";

export default function getItinerary(place, numOfDays) {
  store
    .dispatch(fetchPlaceValidity(place))
    .unwrap()
    .then((response) => {
      console.log(response);
      console.log(numOfDays);
      const isValidPlace = parsePlaceValidityResponse(response);
      if (isValidPlace) {
        store.dispatch(fetchItinerary({ place, numOfDays }));
      }
    });
}
