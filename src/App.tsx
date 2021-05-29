import React, {useState} from 'react';
import './App.scss';
import {TodoList} from "./components/TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";

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
export type TaskStateType = {
   [key: string]: TaskType[]
};

const useStyles = makeStyles({
   header: {
      background: 'linear-gradient(90deg, rgba(43,86,123,1) 0%, rgba(66,123,172,1) 43%, rgba(93,151,200,1) 100%)'
   },
});

export function App() {
   const classes = useStyles();
   /**
    *  Т.к нам нужно что бы каждая тудушка была отдельной сущьностью и существовала сама по себе,
    *  нам необходимо создать массив который будет содержать в себе объекты самих тудушек.
    *  Сами ТАСКИ, будем хранить в объекте где ключи будут IDшниками наших туду листов
    *  Так же нам не ободимо как-то их связать. В качестве связующего мы будем использовать ID.
    *  По этому мы создадим переменные с ID.
    *  Для туду №1 в ключе ID будем хранить переменную, которая ссылается на вызов ф-ии v1() (генератор ID)
    *  Для объекта с тасками, указываем ключ - ключ это та же переменная что и ID в массиве с ТУДУШКАМИ это
    *  называется вычесляемое свойство объекта
    *  в результате мы связали наш массив с ТУДУШКАМИ с Объктом с ТАСКАМИ.
    *  ID в ТУДУШКЕ №1 === Ключу объекта с тасками №1 (а точнее tasks[0])
    */

   const todolistID_1 = v1();
   const todolistID_2 = v1();
   const todolistID_3 = v1();

   const [todoListsItem, setTodoListsItem] = useState<Array<TodoListItemType>>([
      {id: todolistID_1, title: 'What to learn', filter: 'all'},
      {id: todolistID_2, title: 'What to buy', filter: 'all'},
      {id: todolistID_3, title: 'What you need to be happy', filter: 'all'},
   ]);

   const [tasks, setTasks] = useState<TaskStateType>({
      [todolistID_1]: [
         {id: v1(), title: 'HTML', isDone: true},
         {id: v1(), title: 'CSS', isDone: true},
         {id: v1(), title: 'React', isDone: false},
         {id: v1(), title: 'Rest API', isDone: true},
         {id: v1(), title: 'GraphQL', isDone: false},
      ],
      [todolistID_2]: [
         {id: v1(), title: 'Gin', isDone: true},
         {id: v1(), title: 'Whisky', isDone: true},
         {id: v1(), title: 'Hennessy', isDone: false},
         {id: v1(), title: 'Angostura', isDone: true},
         {id: v1(), title: 'Jagermeister', isDone: false},
      ],
      [todolistID_3]: [
         {id: v1(), title: 'Husqvarna 701 Enduro', isDone: false},
         {id: v1(), title: 'Find a job in IT', isDone: false},
         {id: v1(), title: 'Move to another city', isDone: false},
         {id: v1(), title: 'Buy a garage there', isDone: false},
      ]
   });

   const removeTodoList = (todolistId: string) => {
      /**
       * Удаление тудушки. Удаляем из массива todoListsItem тудушек,
       * так же удаляем и объекта tasks
       */
      const newTodoListItem = todoListsItem.filter(tl => tl.id !== todolistId);
      setTodoListsItem(newTodoListItem);

      delete tasks[todolistId];
      setTasks({...tasks});
   }
   const addTask = (title: string, todolistId: string) => {
      /**
       * Добавление новой таски. т.к изменили способ хранения данных изменился алгоритм
       * добавления/удаления тасок, а так же фильтрация и смена статуса
       * Вытаскиваем (создаём его копию) из объекта нужный массив tasks[todolistId],
       * делаем изменения в этом массиве, в данном случае мы создали новую таску и
       * помещаем в массив новую таску + старые таски.
       * В setState помещаем новый объект (при помощи spread создаём прям копию) tasks
       * уже с проделанными изменениями
       *
       * Так же для всех последующих операций. Ддостаём массив из объекта, делаем изменения,
       * изменённый массив уже кладём обратно в объект и ложим копию обратно в setState.
       */
      const newTask: TaskType = {id: v1(), title: title, isDone: false};
      /**
       * Вариант записи
       *  const copyTasks = tasks[todolistId];
       *  tasks[todolistId] = [newTask, ...copyTasks];
       *  setTasks({...tasks});
       */

      setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
   };
   const removeTasks = (id: string, todolistId: string) => {
      const copyTasks = tasks[todolistId];
      tasks[todolistId] = copyTasks.filter(t => t.id !== id);

      setTasks({...tasks});
   }
   const changeTodoListFilter = (filterValue: FilterValuesType, todolistId: string) => {
      /**
       * Делаем фильтрацию all active completed
       */
      setTodoListsItem(todoListsItem.map(tl => tl.id === todolistId ? {...tl, filter: filterValue} : tl))
   };
   const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todolistId: string) => {
      /**
       * Меняем статус таски сделана/не сделана
       */
      const taskStatus = tasks[todolistId];
      tasks[todolistId] = taskStatus.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t);
      setTasks({...tasks});
   };
   const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {

      const taskTitle = tasks[todolistId];
      tasks[todolistId] = taskTitle.map(t => t.id === taskId ? {...t, title: newTitle} : t);
      setTasks({...tasks});
   }
   const changeTodoListTitle = (newTitle: string, todolistId: string) => {
      const titleForTodoList = todoListsItem.map(t => t.id === todolistId
         ? {...t, title: newTitle}
         : t);
      setTodoListsItem([...titleForTodoList]);
   }

   const addTodoListForm = (title: string) => {
      /**
       * Обязательно нужно указывать тип того объекта или массива который собираемся добавить
       * newTodoListForm: TodoListItemType
       */
      const newTodoListForm: TodoListItemType = {id: v1(), title: title, filter: 'all'};
      setTodoListsItem([newTodoListForm, ...todoListsItem]);
      setTasks({
         ...tasks,
         [newTodoListForm.id]: []
      })
   }

   return (
      <div className="App">
         <AppBar position="static" className={classes.header}>
            <Toolbar>
               <IconButton edge="start" color="inherit" aria-label="menu">
                  <Menu/>
               </IconButton>
               <Typography variant="h6">
                  News
               </Typography>
               <Button color="inherit">Login</Button>
            </Toolbar>
         </AppBar>
         <Container fixed>
            <Grid container style={ { padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center'} }>
               <Paper style={ { padding: '10px'} } ><AddItemForm addItem={addTodoListForm}/></Paper>
            </Grid>
            <Grid container spacing={5}>
               {
                  todoListsItem.map(tl => {

                     const getFilteredTasks = () => {
                        switch (tl.filter) {
                           case "active":
                              return tasks[tl.id].filter(t => !t.isDone);
                           case "completed":
                              return tasks[tl.id].filter(t => t.isDone);
                           default:
                              return tasks[tl.id];
                        }
                     };
                     const GetTaskForTodoList = getFilteredTasks()

                     return <Grid item>

                        <Paper elevation={3} style={{padding: '10px'}}>
                           <TodoList
                              key={tl.id}
                              todolistID={tl.id}
                              title={tl.title}
                              tasks={GetTaskForTodoList}
                              removeTasks={removeTasks}
                              changeTodoListFilter={changeTodoListFilter}
                              addTask={addTask}
                              filter={tl.filter}
                              changeTaskStatus={changeTaskStatus}
                              removeTodoList={removeTodoList}
                              changeTaskTitle={changeTaskTitle}
                              changeTodoListTitle={changeTodoListTitle}
                           />
                        </Paper>
                     </Grid>
                  })
               }
            </Grid>
         </Container>
      </div>
   );
}


