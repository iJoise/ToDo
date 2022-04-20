import {appReducer} from "../store/app-reducer/app-reducer";
import {InitialStateType} from "../store/app-reducer/types";
import {setAppErrorAC, setAppStatusAC} from "../store/app-reducer/actions";

let startState: InitialStateType;

beforeEach(() => {

   startState = {
      error: null,
      status: "idle",
      initialized: true
   }

})

test('correct error message should be set', () => {
   const endState = appReducer(startState, setAppErrorAC('some error'));

   expect(endState.error).toBe('some error');
});

test('correct status should be set', () => {
   const endState = appReducer(startState, setAppStatusAC('loading'));

   expect(endState.status).toBe('loading');
});








