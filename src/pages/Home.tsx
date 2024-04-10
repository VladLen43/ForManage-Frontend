import { Button, Input } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TodoComponent } from '../components/TodoComponent/TodoComponent'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addTodo, createTodo, deleteTodos, fetchTodo, removeTodo,toggleStatus, changeStatus } from '../redux/reducers/todoSlice'
import styles from './Home.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { isAuth, logout } from '../redux/reducers/auth'
import { Inputt } from '../components/Input/Input'
import { useDispatch } from 'react-redux'
import { todoList } from '../redux/reducers/types'

export const Home = () => {

  const dispatch = useAppDispatch();
  const dis = useDispatch();
  const isAutht = useAppSelector(isAuth);
  const navigate = useNavigate();
  const todos = useAppSelector(state => state.todos.list)
  const {loading, error} = useAppSelector(state => state.todos)
  const userData = useAppSelector((state) => state.auth.data)
  //@ts-ignore
  const user = userData?._id

    if(!isAutht) {
        navigate('/login')
      }
     

    const handleLogout = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
    }        
    console.log(todos)
    const removTodo = (id: any) => {
      dispatch(removeTodo(id))
      dispatch(deleteTodos(id))
    }
    const addTask = () => {
      //@ts-ignore
      const user = userData?._id
      if(title.length > 3) {
          //@ts-ignore
       //dispatch(addTodo(title, user))
        //@ts-ignore
        dispatch(createTodo(title,user))
        setText('')
      } else {
        alert('введите что нибьуль')
      }
    }
    useEffect(() => {
      const fetch = async () => {
        //@ts-ignore
       await dispatch(fetchTodo(user))
      }
      fetch()
      
    },[dispatch])
    
    
    const [title, setText] = React.useState('');
    
    const isComplete = (id: any) => {
      // dispatch(changeStatus(id))
      //@ts-ignore
      dispatch(toggleStatus(id))
    }
   
  return (
    <div className={styles.container}>
        <h1>Todo List</h1>
        {/* <Inputt></Inputt> */}
        <label>
          <Input type="text" value={title} onChange={event => setText(event.target.value)} />
          <Button onClick={addTask}>Добавить</Button>
    </label>
      {loading === true && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <ul>
        { /* @ts-ignore */}
        { 
         todos.map((todo, index) => (
          //@ts-ignore
          // <TodoComponent key= {index} _id={todo._id} title={todo.title} completed={todo.completed} />
          <li key={todo._id}>       
          {/*  @ts-ignore */}   
            <input type="checkbox" checked={todo.completed} onChange={() => dispatch(toggleStatus(todo._id))} />
            <span>{todo.title}</span>
            {/* @ts-ignore */}
            <button onClick={() => removTodo(todo._id)}>Удалить</button>
    
        </li>
        )) 
        
        }
       
      </ul>
      <Button onClick={handleLogout} variant="contained">Выйти</Button>
    </div>
  )}
