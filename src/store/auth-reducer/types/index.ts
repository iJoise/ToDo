import { setIsLoggedInAC } from '../auth-reducer';

/**
 * types
 */

type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>;
export type LoginActionsType = SetIsLoggedInActionType
export type LoginStateType = {
  isLoggedIn: boolean
}
