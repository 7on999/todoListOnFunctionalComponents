import React from 'react';
import s from '../Todo/Todo.module.css'
import { TextField } from '@mui/material';

type EditableSpanType = {
  title:string
  isDone?:boolean
  callback:(title:string)=>void
}

const EditableSpan:React.FC<EditableSpanType> = ({title, isDone, callback})=>{
const [edit, setEdit]=React.useState(false)
const [step, setStep]=React.useState(title)

const addTask = (): void => {
  const trimmedNewTask = step.trim();
  if (trimmedNewTask) {
    callback(step);
    setStep('');
}
}
const editTrue = ()=>{
  setEdit(true)
}

const editFalse = ()=>{
  setEdit(false);
  addTask()

}

const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
  setStep(e.currentTarget.value)
}


  return (
    edit? <TextField id="standard-basic" label="edit task" variant="standard" value={step} onBlur={editFalse} autoFocus onChange={onChangeHandler}/>
   : <span onDoubleClick={editTrue} className={isDone ? s.done : ''}> {title} </span>
  )
}

export default EditableSpan