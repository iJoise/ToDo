import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "../App";

type TodoListPropsType = {
   title: string
   tasks: Array<TaskType>
   removeTasks: (id: string, todolistId: string) => void
   changeTodoListFilter: (filterValue: FilterValuesType, todolistId: string) => void
   addTask: (title: string, todolistId: string) => void
   filter: FilterValuesType
   changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
   id: string
   removeTodoList: (todolistId: string) => void
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
      id,
      removeTodoList
   }) => {

   const tasksJSXElements = tasks.map(t => {
      const removeTask = () => removeTasks(t.id, id)
      const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
         const newTaskIsDone = e.currentTarget.checked
         changeTaskStatus(t.id, newTaskIsDone, id)
      };
      const taskClasses = t.isDone ? 'is-done' : '';

      return (
         <li key={t.id} className={taskClasses}>
            <input type="checkbox"
                   checked={t.isDone}
                   onChange={onChangeHandler}
            />
            <span>{t.title}</span>
            <button onClick={removeTask}>x</button>
         </li>
      )
   })

   const [newTaskTitle, setNewTaskTitle] = useState('');
   const [error, setError] = useState<string | null>(null);

   const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(event.currentTarget.value);
   };
   const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      setError(null);
      if (event.key === 'Enter') {
         addNewTask();
      }
   };
   const addNewTask = () => {
      const trimmedNewTaskTitle = newTaskTitle.trim();
      if (trimmedNewTaskTitle) {
         addTask(trimmedNewTaskTitle, id)
      } else {
         setError('Title is required')
      }
      setNewTaskTitle('');
   };
   const onAllClickHandler = () => {
      changeTodoListFilter('all', id)
   };
   const onActiveClickHandler = () => {
      changeTodoListFilter('active', id)
   };
   const onCompletedClickHandler = () => {
      changeTodoListFilter('completed', id)
   };
   const activeClassButton = (filterStatus: FilterValuesType) => {
      return filter === filterStatus ? 'active-filter' : ''
   };
   const removeTodoListHandler = () => {
      removeTodoList(id);
   }

   return (
      <div>
         <h3>{title} <button onClick={removeTodoListHandler}>X</button></h3>
         <div>
            <input
               className={error ? 'error' : ''}
               value={newTaskTitle}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
            />
            <button onClick={addNewTask}>+</button>
            {error && <div className='error-message'>{error}</div>}
         </div>
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
