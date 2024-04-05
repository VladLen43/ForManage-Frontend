import React, { useEffect } from 'react';
import {useAppDispatch, useAppSelector } from '../../redux/hooks';
//import { addTodoToBase } from '../../redux/reducers/todoSlice';
import styles from './Input.module.scss'
import { createTodo, fetchTodo } from '../../redux/reducers/todoSlice';
import { Button,Input } from '@mui/material';

export const Inputt = () => {

const dispatch = useAppDispatch();
const userData = useAppSelector((state) => state.auth.data)

const addTask = () => {
  //@ts-ignore
  const user = userData?._id
  //@ts-ignore
    dispatch(createTodo(title,user))
    console.log(title)
    setText('')
}

const [title, setText] = React.useState('');
useEffect( () => {
  dispatch(fetchTodo())
},[dispatch])
console.log()

  return (
    <label>
        <Input type="text" value={title} onChange={event => setText(event.target.value)} />
        <Button onClick={addTask}>Добавить</Button>
    </label>
  )
}
