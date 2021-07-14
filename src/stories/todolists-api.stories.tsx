import React, {useEffect, useState} from 'react'
import axios from "axios";
import {taskAPI, todolistsAPI} from "../api/todolists-api";

export default {
  title: 'API/api'
}

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    'API-KEY': '3928f52f-fe0d-4ea9-97d7-8b764f267e74'
  },
});

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistsAPI.getTodolist()
       .then(data => setState(data.data))

  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistsAPI.createTodolist('what do')
       .then(data => setState(data.data))

  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'ca34c41e-0635-4a16-8304-5d4b46739678'
    todolistsAPI.deleteTodolist(todolistId)
       .then(data => setState(data.data))
  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'ca34c41e-0635-4a16-8304-5d4b46739678'
    todolistsAPI.updateTodolistTitle(todolistId, 'YOYO')
       .then(data => setState(data.data))
  }, [])

  return <div> {JSON.stringify(state)}</div>
}


export const GetTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '8c843791-3f17-4e55-ac6b-1dfbaf2bb8fb'
    taskAPI.getTasks(todolistId)
       .then(data => setState(data.data.items))
  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '8c843791-3f17-4e55-ac6b-1dfbaf2bb8fb'
    taskAPI.createTask(todolistId,'Find job')
       .then(data => setState(data.data.data))
  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)


  const deleteTask = () => {
    const todolistId = '8c843791-3f17-4e55-ac6b-1dfbaf2bb8fb'
    const taskId = '8956c918-3399-4e20-91a0-8250e29c3f75'
    taskAPI.deleteTask(todolistId, taskId)
       .then(data => setState(data.data))
  }

  return (
     <>
       <div> {JSON.stringify(state)}</div>
       <div><button onClick={deleteTask}>Delete Task</button></div>
     </>
  )
}

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '8c843791-3f17-4e55-ac6b-1dfbaf2bb8fb'
    const taskId = '8956c918-3399-4e20-91a0-8250e29c3f75'
    taskAPI.updateTask(todolistId, taskId, {
      title: 'string',
      description: 'string',
      status: 2,
      priority: 2,
      startDate: 'string',
      deadline: 'string',
    })
       .then(data => setState(data.data))
  }, [])

  return <div> {JSON.stringify(state)}</div>
}

