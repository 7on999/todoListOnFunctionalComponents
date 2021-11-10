import React from 'react';
// import Button from './Button';
import s from '../Todo/Todo.module.css'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { IconButton } from '@mui/material';
import { Icon } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';


type AddTaskComponentType = {
  callback: (title: string) => void,
  placeholder: string
}

const AddItemForm = ({ callback, placeholder }: AddTaskComponentType) => {

  const [newTask, setNewTask] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');


  const onClickToAddNewTask = (): void => {
    const trimmedNewTask = newTask.trim();
    if (trimmedNewTask) {
      callback(newTask);
      setNewTask('');
      setError('')
    } else {
      setError('title is requried')
    }
  }

  const onKeyPressAddTaskToTodoList = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickToAddNewTask()
    }
  }

  const onChangeValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    setNewTask(e.currentTarget.value);
  }

  return (
    <div>
      <TextField size="small" defaultValue="Small" style={{ marginTop: '5px' }} value={newTask} className={error ? s.error : ''}
        id="outlined-basic" label={placeholder} variant="outlined" onKeyPress={onKeyPressAddTaskToTodoList}
        onChange={onChangeValueInput} error={!!error} helperText={error} />
      {/* <input type='text' value={newTask}
        placeholder={placeholder}
        onKeyPress={onKeyPressAddTaskToTodoList}
        onChange={onChangeValueInput}
        className={error ? s.error : ''} /> */}
      <IconButton  onClick={onClickToAddNewTask} >
        <AddBoxIcon fontSize='large' />
      </IconButton>
      {/* <Button style={{ margin: '5px', minWidth: '60px', maxWidth: '60px', marginLeft: '5px', minHeight: '58px', maxHeight: '58px' }} onClick={onClickToAddNewTask} variant='contained' color='primary'>+</Button> */}
      {/* {error && <p className={s.errorMessage}>Вы ввели некоректную задачу</p>} */}
    </div>
  )
}

export default AddItemForm