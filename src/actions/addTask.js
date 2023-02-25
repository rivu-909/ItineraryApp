import { store } from "../store/store";
import { insertTask } from "../store/itinerarySlice";

export default function addTask(dayId) {
  const response = prompt(
    "Please enter your desired plan.",
    "e.g. destination you would like to visit"
  );
  if (response != null) {
    store.dispatch(insertTask({ dayId, response }));
  }
}
