import {AppThunkType} from "../../App/store";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../App/app-reducer";
import {authAPI, LoginParamsType, ResultsCode} from "../../api/todolists-api";


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


/**
 * Thunk Creator
 */
export const loginTC = (data: LoginParamsType): AppThunkType => async dispatch => {
   dispatch(setAppStatusAC('loading'));
   try {
      const res = await authAPI.auth(data);
      if (res.data.resultCode === ResultsCode.OK) {
         dispatch(setIsLoggedInAC(true));
      } else {
         handleServerAppError(res.data, dispatch);
      }
   } catch (err) {
      handleServerNetworkError(err, dispatch);
   } finally {
      dispatch(setAppStatusAC('succeeded'));
   }
};

export const logoutTC = (): AppThunkType => async dispatch => {
   dispatch(setAppStatusAC('loading'));
   try {
      const res = await authAPI.logout()
      if (res.data.resultCode === ResultsCode.OK) {
         dispatch(setIsLoggedInAC(false));
      } else {
         handleServerAppError(res.data, dispatch);
      }
   } catch (err) {
      handleServerNetworkError(err, dispatch);
   } finally {
      dispatch(setAppStatusAC('succeeded'));
   }
}


/**
 * types
 */

type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>;

export type LoginActionsType = SetIsLoggedInActionType
export type LoginStateType = {
   isLoggedIn: boolean
}

