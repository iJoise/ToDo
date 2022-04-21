import { LoginActionsType, LoginStateType } from './types';


const initialState: LoginStateType = {
   isLoggedIn: false
}

export const authReducer = (state: LoginStateType = initialState, action: LoginActionsType): LoginStateType => {
   switch (action.type) {
      case "login/SET-IS-LOGGED-IN":
         return {...state, isLoggedIn: action.value}
      default:
         return state;
   }
}

/**
 * Action Creator
 */
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const);
