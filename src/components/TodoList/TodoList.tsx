import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {addTaskTC, fetchTaskTC} from "../../state/tasks-reducer";
import {Task} from "../Task/Task";
import {
   changeTodolistFilterAC,
   changeTodolistTitleTC,
   FilterValuesType,
   removeTodolistTC
} from "../../state/todolists-reducer";
import {TaskStatuses, TaskType} from "../../api/todolists-api";

export type TodoListPropsType = {
   title: string
   todolistId: string
   filter: FilterValuesType
}

export const TodoList: React.FC<TodoListPropsType> = React.memo((
   {
      title,
      filter,
      todolistId,
   }) => {

   const dispatch = useDispatch();
   const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolistId]);

   useEffect(() => {
      dispatch(fetchTaskTC(todolistId))
      // eslint-disable-next-line
   }, []);


   const filterClickHandler = useCallback((filterValue: FilterValuesType) => {
      switch (filterValue) {
         case "all":
            dispatch(changeTodolistFilterAC(todolistId, 'all'));
            break;
         case "active":
            dispatch(changeTodolistFilterAC(todolistId, 'active'));
            break;
         case "completed":
            dispatch(changeTodolistFilterAC(todolistId, 'completed'));
            break;
      }
   }, [todolistId, dispatch]);

   const activeClassButton = useCallback((filterStatus: FilterValuesType) => {
      return filter === filterStatus ? 'contained' : 'text';
   }, [filter]);

   const removeTodoList = useCallback((todolistId: string) => {
      dispatch(removeTodolistTC(todolistId));
   }, [dispatch]);

   const addTaskForTodoList = useCallback((title: string) => {
      dispatch(addTaskTC(title, todolistId));
   }, [dispatch, todolistId]);

   const changeTodoListTitle = useCallback((newTitle: string) => {
      dispatch(changeTodolistTitleTC(todolistId, newTitle));
   }, [dispatch, todolistId]);

   const getFilteredTasks = useCallback(() => {
      const filteredTasks = tasks
      switch (filter) {
         case "active":
            return filteredTasks.filter(t => t.status === TaskStatuses.New);
         case "completed":
            return filteredTasks.filter(t => t.status === TaskStatuses.Completed);
         default:
            return filteredTasks;
      }
   }, [filter, tasks]);
   const GetTaskForTodoList = getFilteredTasks()

   return (
      <div>
         <h3>
            <EditableSpan titleForSpan={title} onChange={changeTodoListTitle}/>
            <IconButton onClick={() => removeTodoList(todolistId)}>
               <Delete/>
            </IconButton>
         </h3>
         <AddItemForm addItem={addTaskForTodoList}/>
         <ul style={{minHeight: '250px'}}>
            {
               GetTaskForTodoList.map(t => {
                  return <Task
                     todolistId={todolistId}
                     task={t}
                     key={t.id}
                  />
               })
            }
         </ul>
         <div>
            <Button
               variant={activeClassButton("all")}
               onClick={() => filterClickHandler('all')}>All
            </Button>
            <Button
               color={"primary"}
               variant={activeClassButton("active")}
               onClick={() => filterClickHandler('active')}>Active
            </Button>
            <Button
               color={"secondary"}
               variant={activeClassButton("completed")}
               onClick={() => filterClickHandler('completed')}>Completed
            </Button>
         </div>
      </div>
   );
});


