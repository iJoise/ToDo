import axios from 'axios';

/**
 * Api
 */
const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    'API-KEY': '3928f52f-fe0d-4ea9-97d7-8b764f267e74',
  },
});

export const todolistsAPI = {
  async getTodolist(): Promise<TodolistType[]> {
    const res = await instance.get<TodolistType[]>('todo-lists');
    return res.data;
  },
  async createTodolist(title: string): Promise<ResponseType<CreateTodolistResponseType>> {
    const res = await instance.post<ResponseType<CreateTodolistResponseType>>('todo-lists', { title });
    return res.data;
  },
  async deleteTodolist(id: string): Promise<ResponseType> {
    const res = await instance.delete<ResponseType>(`todo-lists/${id}`);
    return res.data;
  },
  async updateTodolistTitle(id: string, title: string): Promise<ResponseType> {
    const res = await instance.put<ResponseType>(`todo-lists/${id}`, { title });
    return res.data;
  },
};

export const taskAPI = {
  async getTasks(todolistId: string): Promise<GetTaskResponse> {
    const res = await instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`);
    return res.data;
  },
  async createTask(todolistId: string, title: string): Promise<ResponseType<CreateTaskResponseType>> {
    const res = await instance.post<ResponseType<CreateTaskResponseType>>(`todo-lists/${todolistId}/tasks`, { title });
    return res.data;
  },
  async deleteTask(todolistId: string, taskId: string): Promise<ResponseType> {
    const res = await instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    return res.data;
  },
  async updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType): Promise<ResponseType> {
    const res = await instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    return res.data;
  },
};

export const authAPI = {
  async auth(data: LoginParamsType): Promise<ResponseType> {
    const res = await instance.post<ResponseType<{ userId?: number }>>('auth/login', data);
    return res.data;
  },
  async me(): Promise<ResponseType<MeResponseType>> {
    const res = await instance.get<ResponseType<MeResponseType>>('auth/me');
    return res.data;
  },
  async logout(): Promise<ResponseType> {
    const res = await instance.delete<ResponseType>('auth/login');
    return res.data;
  },
};


/**
 * Types
 */

export type CreateTodolistResponseType = { item: TodolistType }

export type CreateTaskResponseType = { item: TaskType }

export type MeResponseType = { id: number, email: string, login: string }

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
export type GetTaskResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}
export type ResponseType<D = {}> = {
  fieldsErrors: string[]
  resultCode: ResultsCode
  messages: string[]
  data: D
}

export enum ResultsCode {
  OK = 0,
  ERROR = 1
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}
