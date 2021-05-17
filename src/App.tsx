import React, {useState} from 'react';
import './App.scss';
import {TodoList} from "./components/TodoList";
import {v1} from 'uuid';

export type TaskType = {
   id: string
   title: string
   isDone: boolean
};
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListItemType = {
   id: string
   title: string
   filter: FilterValuesType
};

export function App() {

   const todolistId1 = v1();
   const todolistId2 = v1();

   const [todoListItem, setTodoListItem] = useState<Array<TodoListItemType>>([
      {id: todolistId1, title: 'What to learn', filter: 'all'},
      {id: todolistId2, title: 'What to buy', filter: 'all'},
   ]);

   const [tasksObj, setTasksObj] = useState({
      [todolistId1]: [
         {id: v1(), title: 'HTML', isDone: true},
         {id: v1(), title: 'CSS', isDone: true},
         {id: v1(), title: 'React', isDone: false},
         {id: v1(), title: 'Rest API', isDone: true},
         {id: v1(), title: 'GraphQL', isDone: false},
      ],
      [todolistId2]: [
         {id: v1(), title: 'Gin', isDone: true},
         {id: v1(), title: 'Whisky', isDone: true},
         {id: v1(), title: 'Hennessy', isDone: false},
         {id: v1(), title: 'Angostura', isDone: true},
         {id: v1(), title: 'Jagermeister', isDone: false},
      ]
   });
   const removeTodoList = (todolistId: string) => {
      /**
       * Удаление тудушки. Удаляем из массива todoListItem тудушек,
       * так же удаляем и объекта tasksObj
       */
      const newTodoListItem = todoListItem.filter(tl => tl.id !== todolistId);
      setTodoListItem(newTodoListItem);

      delete tasksObj[todolistId];
      setTasksObj({...tasksObj});
   }

   const addTask = (title: string, todolistId: string) => {
      /**
       * Добавление новой таски. т.к изменили способо хранения данных изменился алгоритм
       * добавления/удаления тасок, а так же фильтрация и смена статуса
       * Вытаскиваем из объекта нужный массив tasksObj[todolistId],
       * делаем изменения в этом массиве, в данном случае мы создали новую таску и
       * помещаем в массив новую таску + старые таски.
       * В setState помещаем новый объект (при помощи spread создаём прям копию) tasksObj
       * уже с проделанными изменениями
       *
       * Так же для всех последующих операций. Ддостаём массив из объекта, делаем изменения,
       * изменённый массив уже кладём обратно в объект и "пушим" копию обратно в setState.
       */
      const task = {id: v1(), title: title, isDone: false};
      const tasks = tasksObj[todolistId];
      tasksObj[todolistId] = [task, ...tasks];

      setTasksObj({...tasksObj});
   };

   const removeTasks = (id: string, todolistId: string) => {
      const tasks = tasksObj[todolistId];
      tasksObj[todolistId] = tasks.filter(t => t.id !== id);

      setTasksObj({...tasksObj});
   }

   const changeTodoListFilter = (filterValue: FilterValuesType, todolistId: string) => {
      /**
       * Делаем фильтрацию all active completed
       */
      const taskFilter = todoListItem.find(t => t.id === todolistId)
      if (taskFilter) {
         taskFilter.filter = filterValue;
         setTodoListItem([...todoListItem]);
      }
   };

   const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todolistId: string) => {
      /**
       * Меняем статус таски сделана/не сделана
       */
      const taskStatus = tasksObj[todolistId];
      tasksObj[todolistId] = taskStatus.map(t => {
         return t.id === taskId ? {...t, isDone: newIsDoneValue} : t;
      });
      setTasksObj({...tasksObj});
   };


   return (
      <div className="App">

         {
            todoListItem.map(tl => {

               const getFilteredTasks = () => {
                  switch (tl.filter) {
                     case "active":
                        return tasksObj[tl.id].filter(t => !t.isDone);
                     case "completed":
                        return tasksObj[tl.id].filter(t => t.isDone);
                     default:
                        return tasksObj[tl.id];
                  }
               };
               const GetTaskForTodoList = getFilteredTasks()

               return <TodoList
                  key={tl.id}
                  id={tl.id}
                  title={tl.title}
                  tasks={GetTaskForTodoList}
                  removeTasks={removeTasks}
                  changeTodoListFilter={changeTodoListFilter}
                  addTask={addTask}
                  filter={tl.filter}
                  changeTaskStatus={changeTaskStatus}
                  removeTodoList={removeTodoList}
               />
            })
         }

      </div>
   );
}
