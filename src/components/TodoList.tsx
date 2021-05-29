import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableStan} from "./EditableStan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodoListPropsType = {
   title: string
   todolistID: string
   tasks: Array<TaskType>
   filter: FilterValuesType
   addTask: (title: string, todolistId: string) => void
   removeTasks: (id: string, todolistId: string) => void
   changeTodoListFilter: (filterValue: FilterValuesType, todolistId: string) => void
   changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
   removeTodoList: (todolistId: string) => void
   changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
   changeTodoListTitle: (newTitle: string, todolistId: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = (
   {
      title,
      tasks,
      removeTasks,
      changeTodoListFilter,
      addTask,
      filter,
      changeTaskStatus,
      todolistID,
      removeTodoList,
      changeTaskTitle,
      changeTodoListTitle
   }) => {

   const tasksJSXElements = tasks.map(t => {
      const removeTask = () => removeTasks(t.id, todolistID)
      const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
         const newTaskIsDone = e.currentTarget.checked
         changeTaskStatus(t.id, newTaskIsDone, todolistID)
      };
      const onChangeTaskTitleHandler = (newTitle: string) => {
         changeTaskTitle(t.id, newTitle, todolistID)

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
      addTask(title, todolistID)
   }
   const onChangeTodoListTitleHandler = (newTitle: string) => {
      changeTodoListTitle(newTitle, todolistID);
   }

   return (
      <div>
         <h3><EditableStan titleForSpan={title} onChange={onChangeTodoListTitleHandler}/>
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



