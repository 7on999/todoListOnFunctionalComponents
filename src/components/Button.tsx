import React from 'react';
import {filterValueType} from '../Todo/Todo';
import s from '../Todo/Todo.module.css'

type ButtonType = {
  callback:()=>void,
  name:string,
  filter?:filterValueType
}

const Button:React.FC<ButtonType> = ({callback, name, filter})=>{
  const buttonHandler = ()=>{
    callback();
  }
  return (
    <button className={filter===name?s.activeFilter : ''} onClick={buttonHandler}>{name}</button>
  )
}

export default Button