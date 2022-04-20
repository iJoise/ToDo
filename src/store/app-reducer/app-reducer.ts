import {AppActionType, InitialStateType} from "./types";

const initialState: InitialStateType = {
  status: 'idle',
  error: null,
  initialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status};
    case 'APP/SET-ERROR':
      return {...state, error: action.error};
    case "APP/SET-IS-INITIALIZED":
      return {...state, initialized: action.value};
    default:
      return state;
  }
}
