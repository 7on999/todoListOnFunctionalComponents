import { tasksType } from '../App';

const taskReducer = (state: tasksType, action: MainActionType): tasksType => {
  switch (action.type) {
    case 'DELETE-TASK':
      return {
        ...state,
        [action.todolistsID]: state[action.todolistsID].filter(t => t.id !== action.id)
      }
    case 'ADD-TASK':
      return {
        ...state,
        [action.todolistsID]: [{ id: action.id, isDone: false, step: action.newTask }, ...state[action.todolistsID]]
      }
    case 'CHANGE-STATUS':
      return {
        ...state,
        [action.todolistsID]: state[action.todolistsID].map(t => t.id === action.id ? { ...t, isDone: action.isDone } : t)
      }
    case 'UPDATE-TASK':
      return {
        ...state,
        [action.todolistsID]: state[action.todolistsID].map(t => t.id === action.id ? { ...t, step: action.title } : t)
      }
    case 'ADD-NEW-TODO':
      return {
        ...state,
        [action.todolistsID]: [],

      }
    case 'CLEAR-TODO': {

      const newState = { ...state }
      delete newState[action.todolistsID]
      return {
        ...newState,
      }
    }
    default: return state
  }
}



type MainActionType = RemoveTaskACType | AddTaskACType | ChangeStatusTaskACType | UpdatExistTaskACType | AddTodoTasksACType | deleteAllTasksOfChooseTodoACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistsID: string, id: string) => {
  return {
    type: 'DELETE-TASK',
    todolistsID,
    id
  } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistsID: string, newTask: string, id: string) => {
  return {
    type: 'ADD-TASK',
    todolistsID,
    newTask,
    id
  } as const
}


type ChangeStatusTaskACType = ReturnType<typeof changeStatusTaskAC>
export const changeStatusTaskAC = (todolistsID: string, id: string, isDone: boolean,) => {
  return {
    type: 'CHANGE-STATUS',
    todolistsID,
    id,
    isDone
  } as const
}

type UpdatExistTaskACType = ReturnType<typeof updatExistTaskAC>
export const updatExistTaskAC = (todolistsID: string, id: string, title: string) => {
  return {
    type: 'UPDATE-TASK',
    todolistsID,
    id,
    title
  } as const
}

type AddTodoTasksACType = ReturnType<typeof addTodoTasksAC>
export const addTodoTasksAC = (todolistsID: string, title: string) => {
  return {
    type: 'ADD-NEW-TODO',
    todolistsID,
    title
  } as const
}

type deleteAllTasksOfChooseTodoACType = ReturnType<typeof deleteAllTasksOfChooseTodoAC>
export const deleteAllTasksOfChooseTodoAC = (todolistsID: string) => {
  return {
    type: 'CLEAR-TODO',
    todolistsID
  } as const
}



export default taskReducer;