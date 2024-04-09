import React, { useEffect, useState } from 'react';
import {useAppDispatch, useAppSelector } from '../../redux/hooks';
//import { addTodoToBase } from '../../redux/reducers/todoSlice';
import styles from './Input.module.scss'
import { createTodo, fetchTodo, addTodo } from '../../redux/reducers/todoSlice';
import { Button,Input } from '@mui/material';

export const Inputt = () => {

const dispatch = useAppDispatch();
const userData = useAppSelector((state) => state.auth.data)
const todos = useAppSelector(state => state.todos.list)

const addTask = () => {
  //@ts-ignore
  const user = userData?._id
  if(title.length > 3) {
      //@ts-ignore
   dispatch(addTodo(title, user))
    //@ts-ignore
    dispatch(createTodo(title,user))
    setText('')
  } else {
    alert('введите что нибьуль')
  }
}


const [title, setText] = React.useState('');


  return (
    <label>
        <Input type="text" value={title} onChange={event => setText(event.target.value)} />
        <Button onClick={addTask}>Добавить</Button>
    </label>
  )
}
