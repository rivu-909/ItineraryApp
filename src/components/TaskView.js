import { ArrowDownward, ArrowUpward, Delete } from "@mui/icons-material";
import React from "react";
import deleteTask from "../actions/deleteTask";
import swapDown from "../actions/swapDown";
import swapUp from "../actions/swapUp";
import Button from "./common/Button";
import "./TaskView.css";

export default function TaskView({ task, dayId }) {
  const deleteTaskHandler = React.useCallback(() => {
    deleteTask(task.taskId, dayId);
  }, [task.taskId, dayId]);

  const moveUpHandler = React.useCallback(() => {
    swapUp(task.taskId, dayId);
  }, [task.taskId, dayId]);

  const moveDownHandler = React.useCallback(() => {
    swapDown(task.taskId, dayId);
  }, [task.taskId, dayId]);

  return (
    <div className="taskContainer">
      <div className="text">{task.text}</div>
      <div className="buttonsContainer">
        <Button size="small" onClick={moveUpHandler}>
          <ArrowUpward />
        </Button>
        <Button size="small" onClick={moveDownHandler}>
          <ArrowDownward />
        </Button>
        <Button size="small" onClick={deleteTaskHandler}>
          <Delete />
        </Button>
      </div>
    </div>
  );
}
