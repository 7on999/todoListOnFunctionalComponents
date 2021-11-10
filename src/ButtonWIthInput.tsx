import React from 'react';
import s from './Todo/Todo.module.css';
import Button from './components/Button';

type ButtonType = {
  onKeyPress:(e: React.KeyboardEvent<HTMLInputElement>)=>void
  onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void
  error:boolean 
  callback:()=>void
  value:string
}

const ButtonWithInput = ({onKeyPress, onChange, error, callback, value}:ButtonType)=>{
  return (
    <div>
    <input type='text' value={value}
      placeholder='введите новую цель'
      onKeyPress={onKeyPress}
      onChange={onChange}
      className={error ? s.error : ''} />
    <Button callback={callback} name={'+'}/>
    
     { error && <p className={s.errorMessage}>Вы ввели некорректную задачу</p>}
    
  </div>
  )
}

export default ButtonWithInput;