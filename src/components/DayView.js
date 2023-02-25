import TaskView from "./TaskView";
import "./DayView.css";
import Button from "./common/Button";
import { Add, Delete } from "@mui/icons-material";
import React from "react";
import deleteDay from "../actions/deleteDay";
import addTask from "../actions/addTask";

export default function DayView({ dayList, index }) {
  const deleteDayHandler = React.useCallback(() => {
    deleteDay(dayList.dayId);
  }, [dayList.dayId]);

  const addTaskHandler = React.useCallback(() => {
    addTask(dayList.dayId);
  }, [dayList.dayId]);

  return (
    <div className="dayViewContainer">
      <div className="headerContainer">
        <div className="dayLabel">Day {index + 1}</div>
        <div className="buttonContainer">
          <Button size="medium" onClick={addTaskHandler}>
            <Add />
          </Button>
        </div>
      </div>
      <div className="tasksContainer">
        {dayList.taskList.map((task, index) => (
          <TaskView key={index} task={task} dayId={dayList.dayId} />
        ))}
      </div>
      <Button size="large" onClick={deleteDayHandler}>
        <Delete fontSize="medium" />
      </Button>
    </div>
  );
}
