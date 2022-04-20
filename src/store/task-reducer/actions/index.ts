import {TaskType} from "../../../api/todolists-api";
import {UpdateDomainTaskModelType} from "../types";

/**
 * Action Creator
 */
export const removeTaskAC = (taskId: string, todolistId: string) => {
  return {type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (task: TaskType) => {
  return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
  return {type: 'UPDATE-TASK', todolistId, taskId, model} as const
}
export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
  return {type: 'SET-TASKS', tasks, todolistId} as const
}
