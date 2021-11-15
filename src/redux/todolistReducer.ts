import {todolistsType} from '../App';
import { filterValueType } from '../Todo/Todo';

const todolistsReducer = (state:Array<todolistsType>, action:mainActionType):Array<todolistsType>=>{
  switch(action.type){
    case 'CHANGE-FILTER':
      return state.map(tl => tl.id === action.todolistsID ? { ...tl, filter: action.filterValue } : tl)
      
    case 'DELETE-TODO':
      return state.filter(t => t.id !== action.todolistsID)

     case 'UPDATE-NAME':
      return state.map(t => t.id === action.todolistsID ? { ...t, title: action.title } : t)

    case 'ADD-TODO':
      return [ ...state, { id: action.id, title: action.title, filter: 'All' }]
         
  }
}

type mainActionType = ChangeFilterACType|deleteTodoACType|updateNameTodoACType|AddTodoACType

type ChangeFilterACType = ReturnType<typeof ChangeFilterAC>

export const ChangeFilterAC=(todolistsID: string, filterValue: filterValueType)=>{
  return {
    type: 'CHANGE-FILTER',
    todolistsID,
    filterValue
  } as const
}


type deleteTodoACType = ReturnType<typeof deleteTodoAC>
export const deleteTodoAC=(todolistsID: string)=>{
  return {
    type: 'DELETE-TODO',
    todolistsID,
  } as const
}

type updateNameTodoACType = ReturnType<typeof updateNameTodoAC>
export const updateNameTodoAC=(todolistsID: string, title: string)=>{
  return {
    type: 'UPDATE-NAME',
    todolistsID,
    title
  } as const
}


type AddTodoACType = ReturnType<typeof AddTodoAC>
export const AddTodoAC=(id: string, title: string)=>{
  return {
    type: 'ADD-TODO',
    id,
    title,
  } as const
}


export default todolistsReducer;
