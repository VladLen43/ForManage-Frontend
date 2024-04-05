import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { TodoComponent } from '../components/TodoComponent/TodoComponent'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { fetchTodo } from '../redux/reducers/todoSlice'
import styles from './Home.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { isAuth, logout } from '../redux/reducers/auth'
import { Inputt } from '../components/Input/Input'

export const Home = () => {

  const dispatch = useAppDispatch();
  const isAutht = useAppSelector(isAuth);
  const navigate = useNavigate();
  const todos = useAppSelector(state => state.todos.list)
  const {loading, error} = useAppSelector(state => state.todos)
  const userData = useAppSelector((state) => state.auth.data)
    
  useEffect( () => {
    dispatch(fetchTodo())
  },[dispatch])
   
    if(!isAutht) {
        navigate('/login')
      }

    const handleLogout = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
    }

    const todosRender =  todos.filter(
      /* @ts-ignore */
(todo) => userData?._id === todo.user._id )
    console.log(todosRender)
  return (
    <div className={styles.container}>
        <h1>Todo List</h1>
        <Inputt></Inputt>
      {loading === true && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <ul>
        { /* @ts-ignore */}
        { todosRender.map((todo) => (
          //@ts-ignore
          <TodoComponent key= {todo._id} id={todo._id} title={todo.title} />
        ))}
       
      </ul>
      <Button onClick={handleLogout} variant="contained">Выйти</Button>
    </div>
  )}
