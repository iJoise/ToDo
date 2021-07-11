import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../state/tasks-reducer";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../api/todolists-api";

export type TaskPropsType = {
   task: TaskType
   todolistID: string
}

export const Task: React.FC<TaskPropsType> = React.memo((props) => {

   const {task, todolistID} = props;

   const dispatch = useDispatch();

   const removeTask = useCallback(() => dispatch(removeTaskAC(task.id, todolistID)), [dispatch, task.id, todolistID]);
   const changeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const newTaskIsDone = e.currentTarget.checked;
      dispatch(changeTaskStatusAC(task.id, newTaskIsDone ? TaskStatuses.Completed : TaskStatuses.New, todolistID));
   },[dispatch, task.id, todolistID]);
   const changeTaskTitleHandler = useCallback((newTitle: string) => {
      dispatch(changeTaskTitleAC(task.id, newTitle, todolistID));
   }, [dispatch, task.id, todolistID]);

   const taskClasses = task.status === TaskStatuses.Completed ? 'is-done' : '';

   return (
      <li className={taskClasses}>
         <Checkbox
            checked={task.status === TaskStatuses.Completed}
            onChange={changeStatusHandler}
         />
         <EditableSpan titleForSpan={task.title} onChange={changeTaskTitleHandler}/>
         <IconButton onClick={removeTask}>
            <Delete/>
         </IconButton>
      </li>
   )
});