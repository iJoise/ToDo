import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableStan} from "./EditableStan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {FilterValuesType, TaskType} from "../AppWithRedux";

type TodoListPropsType = {
   title: string
   todolistID: string
   filter: FilterValuesType
   changeTodoListFilter: (filterValue: FilterValuesType, todolistId: string) => void
   removeTodoList: (todolistId: string) => void
   changeTodoListTitle: (newTitle: string, todolistId: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = (
   {
      title,
      changeTodoListFilter,
      filter,
      todolistID,
      removeTodoList,
      changeTodoListTitle
   }) => {

   const dispatch = useDispatch()
   const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[todolistID])

   const onAllClickHandler = () => {
      changeTodoListFilter('all', todolistID)
   };
   const onActiveClickHandler = () => {
      changeTodoListFilter('active', todolistID)
   };
   const onCompletedClickHandler = () => {
      changeTodoListFilter('completed', todolistID)
   };

   const activeClassButton = (filterStatus: FilterValuesType) => {
      return filter === filterStatus ? 'contained' : 'text'
   };
   const removeTodoListHandler = () => {
      removeTodoList(todolistID);
   };
   const addTaskForTodoList = (title: string) => {
      dispatch(addTaskAC(title, todolistID));
   }
   const onChangeTodoListTitleHandler = (newTitle: string) => {
      changeTodoListTitle(newTitle, todolistID);
   }

   const getFilteredTasks = () => {
      const filteredTasks = tasks

      switch (filter) {
         case "active":
            return filteredTasks.filter(t => !t.isDone);
         case "completed":
            return filteredTasks.filter(t => t.isDone);
         default:
            return filteredTasks;
      }
   };
   const GetTaskForTodoList = getFilteredTasks()
   const tasksJSXElements = GetTaskForTodoList.map(t => {
      const removeTask = () => dispatch(removeTaskAC(t.id, todolistID));
      const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
         const newTaskIsDone = e.currentTarget.checked
         dispatch(changeTaskStatusAC(t.id, newTaskIsDone, todolistID));
      };
      const onChangeTaskTitleHandler = (newTitle: string) => {
         dispatch(changeTaskTitleAC(t.id, newTitle, todolistID));
      };
      const taskClasses = t.isDone ? 'is-done' : '';

      return (
         <li key={t.id} className={taskClasses}>
            <Checkbox
               checked={t.isDone}
               onChange={onChangeStatusHandler}
            />
            <EditableStan titleForSpan={t.title} onChange={onChangeTaskTitleHandler}/>
            <IconButton onClick={removeTask}>
               <Delete/>
            </IconButton>
         </li>
      )
   });

   return (
      <div>
         <h3>
            <EditableStan titleForSpan={title} onChange={onChangeTodoListTitleHandler}/>
            <IconButton onClick={removeTodoListHandler}>
               <Delete/>
            </IconButton>
         </h3>
         <AddItemForm addItem={addTaskForTodoList}/>
         <ul style={ {minHeight: '250px'} }>

            {tasksJSXElements}

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
}



