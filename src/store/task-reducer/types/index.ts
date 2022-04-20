import {TaskPriorities, TaskStatuses, TaskType} from "../../../api/todolists-api";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType
} from "../../todolist-reducer/todolists-reducer";
import {addTaskAC, removeTaskAC, setTasksAC, updateTaskAC} from "../actions";
import {addTask, fetchTasks, removeTask, updateTask} from "../sagas";

/**
 * types
 */
export type TasksStateType = {
  [key: string]: TaskType[]
};

// thunks return types
export type TasksActionsType =
  | RemoveTasksActionType
  | TasksTodolistActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksType

type RemoveTasksActionType = ReturnType<typeof removeTaskAC>
type TasksTodolistActionType = ReturnType<typeof addTaskAC>
type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
type SetTasksType = ReturnType<typeof setTasksAC>

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

// sagas type
export type FetchTasks = ReturnType<typeof fetchTasks>
export type RemoveTasks = ReturnType<typeof removeTask>
export type AddTasks = ReturnType<typeof addTask>
export type UpdateTask = ReturnType<typeof updateTask>
