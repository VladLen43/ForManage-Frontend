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

    const [hide, setHide] = useState(false)
    
  return (
    <div className={styles.container}>
      <button className={styles.hide_button} style={hide ? {color: 'white',transform: 'translateX(0%)'} : {color: 'black',transform: 'translateX(0%)'} } onClick={() => setHide(!hide)}>{hide ? '>>' : '<<'}</button>
      <Header hide={hide} setHide={setHide} />
      
          <div className={styles.content} style={hide ? {transform: 'translateX(-8%)'} : {transform: 'translateX(0%)'}}>
            
                  {loading === true && <h2>Loading...</h2>}
                  {error && <h2>{error}</h2>}

 

      <ul className={styles.todos}>
      <h1>Список добавленных дел</h1>
        { 
         todos.map((todo, index) => (
         <div className={styles.one_todo}>
          { todo.completed === false ?
          <li key={todo._id}>

            { todo.imageUrl === "" ? <div></div> : <img className={styles.image} src={`http://localhost:4444${todo.imageUrl}`} alt="..." />}
            <div>
            <Link to={`todos/${todo._id}`}><h3>{todo.title}</h3></Link>
            <p>Теги: {todo.tags.join(',')}</p>
              <input 
                className={styles.check} 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => {
                //@ts-ignore
                  dispatch(toggleStatus(todo._id))
                  dispatch(changeStatus(todo._id))
                }} />

            <span>{todo.completed ? 'Выполнено' : 'Пометить как выполненное'}</span>
          
            </div>
            <div className={styles.rightButtons}>
                <Button className={styles.todo_buttons} variant="contained"><Link to={`/create/${todo._id}/edit`}>Редактировать</Link></Button>
                <Button className={styles.todo_buttons} variant='outlined' onClick={() => {

              if( window.confirm('Вы дейтсвительно хотите удалить?'))
              removTodo(todo._id)

             }}  
              >Удалить</Button>
             </div> 
        </li>
         : <div></div> } 
        </div>
        )) 
        
        }
       
        </ul>
      </div>
    </div>
  )}
