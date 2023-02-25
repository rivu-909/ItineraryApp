import { removeTask } from "../store/itinerarySlice";
import { store } from "../store/store";

export default function deleteTask(taskId, dayId) {
  store.dispatch(removeTask({ dayId, taskId }));
}
