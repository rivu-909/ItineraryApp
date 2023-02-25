import { addDay } from "../store/itinerarySlice";
import { store } from "../store/store";

export default function addNewDay() {
  store.dispatch(addDay());
}
