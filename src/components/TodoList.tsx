import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableStan} from "./EditableStan";

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
            <input type="checkbox"
                   checked={t.isDone}
                   onChange={onChangeStatusHandler}
            />
            <EditableStan titleForSpan={t.title} onChange={onChangeTaskTitleHandler}/>
            <button onClick={removeTask}>x</button>
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
      return filter === filterStatus ? 'active-filter' : ''
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
         <h3> <EditableStan titleForSpan={title} onChange={onChangeTodoListTitleHandler}/> <button onClick={removeTodoListHandler}>X</button></h3>
         <AddItemForm addItem={addTaskForTodoList}/>
         <ul>
            {tasksJSXElements}
         </ul>
         <div>
            <button
               className={activeClassButton("all")}
               onClick={onAllClickHandler}>All
            </button>
            <button
               className={activeClassButton("active")}
               onClick={onActiveClickHandler}>Active
            </button>
            <button
               className={activeClassButton("completed")}
               onClick={onCompletedClickHandler}>Completed
            </button>
         </div>
      </div>
   );
}



