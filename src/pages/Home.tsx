import { Button, Input } from '@mui/material'
import React, { useEffect } from 'react'
import { TodoComponent } from '../components/TodoComponent/TodoComponent'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { fetchTodo } from '../redux/reducers/todoSlice'
import styles from './Home.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { isAuth, logout } from '../redux/reducers/auth'

export const Home = () => {

    const isAutht = useAppSelector(isAuth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        dispatch(fetchTodo())
  },[dispatch])

    const todos = useAppSelector(state => state.todos.list)
    const {loading, error} = useAppSelector(state => state.todos)

    if(!isAutht) {
        navigate('/login')
      }

    const handleLogout = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
    }
  return (
    <div className={styles.container}>
        <h1>Todo List</h1>
      <Input />
      {loading === true && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <ul>
        { todos.map(todo => (
            <TodoComponent key= {todo.id} {...todo} />
        ))}
 
      </ul>
      <Button onClick={handleLogout} variant="contained">Выйти</Button>
    </div>
  )
}
