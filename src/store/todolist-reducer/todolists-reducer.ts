import { TodolistDomainType, TodolistsActionsType } from './types';


const initialState: TodolistDomainType[] = [];


export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsActionsType): TodolistDomainType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.todolistId);
    case 'ADD-TODOLIST':
      return [{ ...action.todolist, filter: 'all', entityStatus: 'idle' }, ...state];
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.todolistId ? { ...tl, title: action.title } : tl);
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.todolistId ? { ...tl, filter: action.filter } : tl);
    case 'CHANGE-TODOLIST-ENTITY-STATUS':
      return state.map(tl => tl.id === action.todolistId ? { ...tl, entityStatus: action.status } : tl);
    case 'SET_TODOLISTS':
      return action.todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }));
    default:
      return state;
  }
};

