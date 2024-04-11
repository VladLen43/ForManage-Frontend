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
import { Header } from '../components/Header/Header'

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

    const removTodo = (id: any) => {
      dispatch(removeTodo(id))
      dispatch(deleteTodos(id))
    }

    useEffect(() => {
        const fetch = async () => {
            //@ts-ignore
            await dispatch(fetchTodo(user))
        }

      fetch();
      
    },[dispatch])
    
  return (
    <div className={styles.container}>
      <Header />
        <h1>Time Manager</h1>
          <div className={styles.content}>
            
                  {loading === true && <h2>Loading...</h2>}
                  {error && <h2>{error}</h2>}

 

      <ul className={styles.todos}>
      <h1>Список добавленных дел</h1>
        { 
         todos.map((todo, index) => (

          <li key={todo._id}>

            { todo.imageUrl === "" ? <div></div> : <img src={todo.imageUrl} alt="..." />}

            <input 
            className={styles.check} 
            type="checkbox" 
            checked={todo.completed} 
            onChange={() => {
                //@ts-ignore
              dispatch(toggleStatus(todo._id))
              dispatch(changeStatus(todo._id))
              }} />

            <span>{todo.title}</span>

            <Button variant='outlined' onClick={() => {

              if( window.confirm('Вы дейтсвительно хотите удалить?'))
              removTodo(todo._id)

             }}  
              >Удалить</Button>
        </li>
        )) 
        
        }
       
        </ul>
      </div>
    </div>
  )}
