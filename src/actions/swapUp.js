import { moveUp } from "../store/itinerarySlice";
import { store } from "../store/store";

export default function swapUp(taskId, dayId) {
  store.dispatch(moveUp({ taskId, dayId }));
}
