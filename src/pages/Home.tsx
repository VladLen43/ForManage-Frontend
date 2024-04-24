import { Button, Input } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TodoComponent } from '../components/TodoComponent/TodoComponent'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addTodo, createTodo, deleteTodos, fetchTodo, removeTodo,toggleStatus, changeStatus, sortAsc } from '../redux/reducers/todoSlice'
import styles from './Home.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { isAuth, logout } from '../redux/reducers/auth'
import { Inputt } from '../components/Input/Input'
import { useDispatch } from 'react-redux'
import { todoList } from '../redux/reducers/types'
import { Header } from '../components/Header/Header'
import axios from '../axios'

export const Home = React.memo( () => {

  const dispatch = useAppDispatch();
  const isAutht = useAppSelector(isAuth);
  const navigate = useNavigate();


  const todos = useAppSelector(state => state.todos.list)
  console.log(todos)
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

    useEffect(() => {
        //@ts-ignore
        setTodos(todos[0])
  

    },[sortAsc])
   

    const [hide, setHide] = useState(false);
    const [value, setValue] = useState('');
    const [todo, setTodos] = useState([])
    

    // const sortAsc = async () => {
    //   const field = {
    //     user: user,
    //     sortType: -1
    //   }
    //   await axios.post('/todos/sortByName', field).then(({data}) => {
    //     setTimeout(() => setTodos(data), 100)
    //     console.log(todo)
    //   })
    // }

    // const sortDesc = async () => {
    //   const field = {
    //     user: user,
    //     sortType: 1
    //   }
    //   await axios.post('/todos/sortByName', field).then(({data}) => {
    //     //@ts-ignore
    //     setTimeout(() => setTodos(data), 100)
    //     console.log(todo)
    //   })
    // }
    
    // const filteredTodos =
    //   todos.filter(todo => {
    //     return todo.title.toLowerCase().includes(value.toLowerCase())

    // })

    const sortNameAsc = () => {
      const fields = {
        user: user,
        sortType: 1,
      }
      //@ts-ignore
      dispatch(sortAsc(fields))
      console.log(fields)
    }
   
    
    
  return (
    <div className={styles.container}>
      <button className={styles.hide_button} style={hide ? {color: 'white',transform: 'translateX(0%)'} : {color: 'black',transform: 'translateX(0%)'} } onClick={() => setHide(!hide)}>{hide ? '>>' : '<<'}</button>
      <Header hide={hide} setHide={setHide} />
      
          <div className={styles.content} style={hide ? {transform: 'translateX(-8%)'} : {transform: 'translateX(0%)'}}>
            
                  {loading === true && <h2>Loading...</h2>}
                  {error && <h2>{error}</h2>}

 

      <ul className={styles.todos}>

      <h1>Список добавленных дел</h1>

      <input type='text' className={styles.search} placeholder='Поиск...' onChange={(event) => setValue(event?.target.value)}></input>
        <button onClick={() => sortNameAsc()}>Сортировка По имени в минус</button> 
       {/* <button onClick={ () => { setTimeout(() => sortAsc(), 100)}}>Сортировка По имени в плюс</button>  */}
       

        { 
       
         todos.map((todo) => (
         <div key={todo._id} className={styles.one_todo}>
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
            {/* <span>Приоритет: {todo.priority}</span> */}
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
  )})
