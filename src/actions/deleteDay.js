import { removeDay } from "../store/itinerarySlice";
import { store } from "../store/store";

export default function deleteDay(dayId) {
  store.dispatch(removeDay(dayId));
}
