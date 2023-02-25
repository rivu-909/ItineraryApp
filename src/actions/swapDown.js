import { moveDown } from "../store/itinerarySlice";
import { store } from "../store/store";

export default function swapDown(taskId, dayId) {
  store.dispatch(moveDown({ taskId, dayId }));
}
