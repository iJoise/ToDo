import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";
import {removeTask, updateTask} from "../../../../store/task-reducer/sagas";


export type TaskPropsType = {
   task: TaskType
   todolistId: string
}

export const Task: React.FC<TaskPropsType> = React.memo((props) => {

   const {task, todolistId} = props;

   const dispatch = useDispatch();

   const removeTaskHandler = useCallback(() => {
      return dispatch(removeTask(task.id, todolistId))
      }, [dispatch, task.id, todolistId]);

   const changeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const newTaskIsDone = e.currentTarget.checked;
      const status = newTaskIsDone ? TaskStatuses.Completed : TaskStatuses.New;
      dispatch(updateTask(task.id, {status}, todolistId));
   }, [dispatch, task.id, todolistId]);

   const changeTaskTitleHandler = useCallback((newTitle: string) => {
      dispatch(updateTask(task.id, {title: newTitle}, todolistId));
   }, [dispatch, task.id, todolistId]);


   return (
      <li >
         <Checkbox
            checked={task.status === TaskStatuses.Completed}
            onChange={changeStatusHandler}
         />
         <EditableSpan titleForSpan={task.title} onChange={changeTaskTitleHandler}/>
         <IconButton onClick={removeTaskHandler}>
            <Delete/>
         </IconButton>
      </li>
   )
});
