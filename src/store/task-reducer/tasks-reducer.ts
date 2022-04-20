import {TasksActionsType, TasksStateType} from "./types";


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
      };
    case 'ADD-TASK':
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
      };
    case 'UPDATE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId
          ? {...t, ...action.model}
          : t)
      };
    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todolist.id]: []
      };
    case "REMOVE-TODOLIST": {
      const stateCopy = {...state};
      delete stateCopy[action.todolistId];
      return stateCopy;
    }
    case "SET_TODOLISTS": {
      const copyState = {...state};
      action.todolists.forEach(tl => copyState[tl.id] = []);
      return copyState;
    }
    case "SET-TASKS":
      return {
        ...state,
        [action.todolistId]: action.tasks
      };
    default:
      return state;
  }
}

