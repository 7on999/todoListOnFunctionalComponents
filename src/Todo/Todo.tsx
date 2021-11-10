import React from 'react';
import s from './Todo.module.css'
// import Button from '../components/Button';
import AddItemForm from '../components/AddTask';
import EditableSpan from '../components/EditableSpan';
import Delete from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import { Checkbox } from '@mui/material';





export type filterValueType = 'All' | 'Active' | 'Done';

export type TaskType = {
  id: string,
  isDone: boolean,
  step: string,
}

type todoListProps = {
  title: string,
  tasks: Array<TaskType>,
  removeStep: (todolistsID: string, id: string) => void,
  changeFilter: (todolistsID: string, filter: filterValueType) => any,
  addTask: (todolistsID: string, newTask: string) => void,
  changeStatusTask: (todolistsID: string, id: string, isDone: boolean) => void,
  filter: filterValueType,
  todolistsID: string,
  removeTodoList: (id: string) => void,
  updatExistTask: (todolistsID: string, id: string, title: string) => void,
  updateNameTodoList: (todolistsID: string, title: string) => void
}





const Todo = ({ title, tasks, removeStep, changeFilter, addTask, changeStatusTask, filter, todolistsID,
  removeTodoList, updatExistTask, updateNameTodoList }: todoListProps) => {



  const removeStepOnClick = (id: string): void => removeStep(todolistsID, id);


  const changeFilterCommon = (value: filterValueType) => {
    changeFilter(todolistsID, value)
  }

  const editTask = (id: string, title: string,) => {
    updatExistTask(todolistsID, id, title)
  }




  const tasksJSXElemens = tasks.map(t => {
    const changeStatusTaskOnClick = (e: React.ChangeEvent<HTMLInputElement>): void => changeStatusTask(todolistsID, t.id, e.currentTarget.checked);

    return (
      <div key={t.id}>
        <Checkbox checked={t.isDone} onChange={changeStatusTaskOnClick} />
        <EditableSpan callback={(title: string) => { editTask(t.id, title) }} isDone={t.isDone} title={t.step} />
        <IconButton size='small' onClick={() => { removeStepOnClick(t.id) }} aria-label="delete">
          <Delete fontSize="small" />
        </IconButton>
      </div>)
  })

  const removeTodo = () => {
    removeTodoList(todolistsID)
  }


  const addTaskHandler = (title: string) => {
    addTask(todolistsID, title)
  }

  return (
    <div>


      <h3 style={{display:'inline-block'}}><EditableSpan callback={(title: string) => { updateNameTodoList(todolistsID, title) }} title={title} /></h3>


      <IconButton size='large' onClick={removeTodo} aria-label="delete">
        <Delete fontSize="large" />
      </IconButton>

      {/* <Button onClick={removeTodo} style={{margin:'5px'}} variant="outlined" color='secondary' startIcon={<Delete />}>
        Delete Todo
      </Button> */}

      <AddItemForm callback={addTaskHandler} placeholder={'введите новую цель'} />
      <div>
        {tasksJSXElemens}
      </div>
      <div>
        <Button variant={filter==='All'?"contained":'text'} onClick={() => { changeFilterCommon('All') }} > All </Button>
        <Button variant={filter==='Active'?"contained":'text'} color='secondary' onClick={() => { changeFilterCommon('Active') }}> Active </Button>
        <Button variant={filter==='Done'?"contained":'text'} color="success" onClick={() => { changeFilterCommon('Done') }} > Done </Button>
      </div>
    </div>
  )
}

export default Todo;

