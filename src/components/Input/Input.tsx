import React from 'react';
import {useAppDispatch } from '../../redux/hooks';
import { addTodoToBase } from '../../redux/reducers/todoSlice';
import styles from './Input.module.scss'

export const Input = () => {

const dispatch = useAppDispatch();

const addTask = () => {
    dispatch(addTodoToBase(text))
    setText('')
}
const [text, setText] = React.useState('');

  return (
    <label>
        <input className={styles.input} type="text" value={text} onChange={event => setText(event.target.value)} />
        <button onClick={addTask}>Добавить</button>
    </label>
  )
}
