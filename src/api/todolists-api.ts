import axios from "axios";


/**
 * Api
 */
const instance = axios.create({
   withCredentials: true,
   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   headers: {
      'API-KEY': '3928f52f-fe0d-4ea9-97d7-8b764f267e74'
   },
});

export const todolistsAPI = {
   getTodolist() {
      return instance.get<TodolistType[]>('todo-lists')
   },
   createTodolist(title: string) {
      return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
   },
   deleteTodolist(id: string) {
      return instance.delete<ResponseType>(`todo-lists/${id}`)
   },
   updateTodolistTitle(id: string, title: string) {
      return instance.put<ResponseType>(`todo-lists/${id}`, {title})
   }
}

export const taskAPI = {
   getTasks(todolistId: string) {
      return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
   },
   createTask(todolistId: string, title: string) {
      return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
   },
   deleteTask(todolistId: string, taskId: string) {
      return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
   },
   updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
      return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
   }
}

/**
 * Types
 */
export enum TaskStatuses {
   New = 0,
   InProgress = 1,
   Completed = 2,
   Draft = 3
}
export enum TaskPriorities {
   low = 0,
   Middle = 1,
   Hi = 2,
   Urgently = 3,
   Later = 4
}
export type TodolistType = {
   id: string,
   title: string,
   addedDate: string,
   order: number
}
export type TaskType = {
   description: string
   title: string
   status: TaskStatuses
   priority: TaskPriorities
   startDate: string
   deadline: string
   id: string
   todoListId: string
   order: number
   addedDate: string
}
export type UpdateTaskModelType = {
   title: string
   description: string
   status: TaskStatuses
   priority: TaskPriorities
   startDate: string
   deadline: string
}
type GetTaskResponse = {
   error: string | null
   totalCount: number
   items: TaskType[]
}
type ResponseType<D = {}> = {
   fieldsErrors: string[]
   resultCode: number
   messages: string[]
   data: D
}