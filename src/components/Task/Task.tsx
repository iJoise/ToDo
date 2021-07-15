import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {removeTaskTC, updateTaskTC} from "../../state/tasks-reducer";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../api/todolists-api";
import '../../App.scss'

export type TaskPropsType = {
   task: TaskType
   todolistId: string
}

export const Task: React.FC<TaskPropsType> = React.memo((props) => {

   const {task, todolistId} = props;

   const dispatch = useDispatch();

   const removeTask = useCallback(() => {
      return dispatch(removeTaskTC(task.id, todolistId))
      }, [dispatch, task.id, todolistId]);

   const changeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const newTaskIsDone = e.currentTarget.checked;
      const status = newTaskIsDone ? TaskStatuses.Completed : TaskStatuses.New;
      dispatch(updateTaskTC(task.id, {status}, todolistId));
   }, [dispatch, task.id, todolistId]);

   const changeTaskTitleHandler = useCallback((newTitle: string) => {
      dispatch(updateTaskTC(task.id, {title: newTitle}, todolistId));
   }, [dispatch, task.id, todolistId]);

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