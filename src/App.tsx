import React, {useState} from 'react';
import './App.scss';
import {TodoList} from "./components/TodoList";
import {v1} from 'uuid';

export type TaskType = {
   id: string
   title: string
   isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed';

export function App() {

   const [tasks, setTasks] = useState<Array<TaskType>>([
      {id: v1(), title: 'HTML', isDone: true},
      {id: v1(), title: 'CSS', isDone: true},
      {id: v1(), title: 'React', isDone: false},
      {id: v1(), title: 'Rest API', isDone: true},
      {id: v1(), title: 'GraphQL', isDone: false},
   ])

   const [filter, setFilter] = useState<FilterValuesType>('all');

   const removeTasks = (id: string) => {
      let filteredTasks = tasks.filter(t => t.id !== id);
      setTasks(filteredTasks);

   }
   const addTask = (title: string) => {
      const task = {id: v1(), title: title, isDone: false};
      const newTask = [task, ...tasks];

      setTasks(newTask);

   };

   const getFilteredTasks = () => {
      switch (filter) {
         case "active":
            return tasks.filter(t => !t.isDone);
         case "completed":
            return tasks.filter(t => t.isDone);
         default:
            return tasks;
      }
   };
   const GetTaskForTodoList = getFilteredTasks()

   const changeTodoListFilter = (filterValue: FilterValuesType) => {
      setFilter(filterValue)
   };

   const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
      setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t))
   };

   return (
      <div className="App">
         <TodoList title={'What to learn'}
                   tasks={GetTaskForTodoList}
                   removeTasks={removeTasks}
                   changeTodoListFilter={changeTodoListFilter}
                   addTask={addTask}
                   filter={filter}
                   changeTaskStatus={changeTaskStatus}
         />
      </div>
   );
}
