import React, {useCallback} from "react";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {addTaskAC} from "../../state/tasks-reducer";
import {Task} from "../Task/Task";
import {FilterValuesType} from "../../state/todolists-reducer";
import {TaskStatuses, TaskType} from "../../api/todolists-api";

export type TodoListPropsType = {
   title: string
   todolistID: string
   filter: FilterValuesType
   changeTodoListFilter: (filterValue: FilterValuesType, todolistId: string) => void
   removeTodoList: (todolistId: string) => void
   changeTodoListTitle: (newTitle: string, todolistId: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = React.memo((
   {
      title,
      changeTodoListFilter,
      filter,
      todolistID,
      removeTodoList,
      changeTodoListTitle
   }) => {

   const dispatch = useDispatch();
   const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolistID]);

   const onAllClickHandler = useCallback(() => {
      changeTodoListFilter('all', todolistID)
   }, [todolistID, changeTodoListFilter]);
   const onActiveClickHandler = useCallback(() => {
      changeTodoListFilter('active', todolistID)
   }, [todolistID, changeTodoListFilter]);
   const onCompletedClickHandler = useCallback(() => {
      changeTodoListFilter('completed', todolistID)
   }, [todolistID, changeTodoListFilter]);
   const activeClassButton = useCallback((filterStatus: FilterValuesType) => {
      return filter === filterStatus ? 'contained' : 'text';
   }, [filter]);

   const removeTodoListHandler = useCallback(() => {
      removeTodoList(todolistID);
   }, [todolistID, removeTodoList]);
   const addTaskForTodoList = useCallback((title: string) => {
      dispatch(addTaskAC(title, todolistID));
   }, [todolistID, dispatch]);
   const changeTodoListTitleHandler = useCallback((newTitle: string) => {
      changeTodoListTitle(newTitle, todolistID);
   }, [todolistID, changeTodoListTitle]);

   const getFilteredTasks = useCallback(() => {
      const filteredTasks = tasks

      switch (filter) {
         case "active":
            return filteredTasks.filter(t => t.status = TaskStatuses.New);
         case "completed":
            return filteredTasks.filter(t => t.status = TaskStatuses.Completed);
         default:
            return filteredTasks;
      }
   }, [filter, tasks]);
   const GetTaskForTodoList = getFilteredTasks()


   return (
      <div>
         <h3>
            <EditableSpan titleForSpan={title} onChange={changeTodoListTitleHandler}/>
            <IconButton onClick={removeTodoListHandler}>
               <Delete/>
            </IconButton>
         </h3>
         <AddItemForm addItem={addTaskForTodoList}/>
         <ul style={{minHeight: '250px'}}>
            {
               GetTaskForTodoList.map(t => {
                  return <Task
                     todolistID={todolistID}
                     task={t}
                     key={t.id}
                  />
               })
            }
         </ul>
         <div>
            <Button
               variant={activeClassButton("all")}
               onClick={onAllClickHandler}>All
            </Button>
            <Button
               color={"primary"}
               variant={activeClassButton("active")}
               onClick={onActiveClickHandler}>Active
            </Button>
            <Button
               color={"secondary"}
               variant={activeClassButton("completed")}
               onClick={onCompletedClickHandler}>Completed
            </Button>
         </div>
      </div>
   );
});


