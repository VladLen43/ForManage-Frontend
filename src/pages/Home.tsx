import { Button, Input } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { deleteTodos, fetchTodo, removeTodo,toggleStatus, changeStatus, sortAsc, sortDesc } from '../redux/reducers/todoSlice'
import styles from './Home.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { isAuth } from '../redux/reducers/auth'
import { Header } from '../components/Header/Header'
import axios from '../axios'
import { Pagination } from '../components/Pagination/Pagination'

export const Home = React.memo( () => {

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

    useEffect(() => {
        //@ts-ignore
        setTodos(todos[0])
  

    },[sortAsc])
   

    const [hide, setHide] = useState(false);
    const [value, setValue] = useState('');
    const [todo, setTodos] = useState([]);

    const filteredTodos =
    todos.filter(todo => {
      return todo.title.toLowerCase().includes(value.toLowerCase())

  })
  const isCompletedTodos = filteredTodos.filter(todo => {
    return todo.completed === false
  })

    //Pagination

    const [elementsOnPage, setElementsOnPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(1)

    const lastPageIndex : number = elementsOnPage * currentPage;
    const firstPageIndex = lastPageIndex - elementsOnPage;
    const currentElements = isCompletedTodos.slice(firstPageIndex, lastPageIndex)

    const lastPage = isCompletedTodos.length / elementsOnPage
    const firstPage = 1
   

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
    
  

    const sortNameAsc = () => {
      const fields = {
        user: user,
        sortType: 1,
      }
      //@ts-ignore
      dispatch(sortAsc(fields))
      console.log(fields)
    }
    const sortNameDesc = () => {
      const fields = {
        user: user,
        sortType: -1,
      }
      //@ts-ignore
      dispatch(sortDesc(fields))
      console.log(fields)
    }


    const nextPage = () => {
      if(currentPage < lastPage){
      for(let i = 1; i < lastPage; i++) {
        setCurrentPage(prev => prev + 1)
      }
    }
    else {
      setCurrentPage(firstPage)
    }    
}


    const prevPage = () => {
      if(currentPage > 1) {
          setCurrentPage(prev => prev - 1)
      
    } else {
      setCurrentPage(lastPage)
    
  }
}

useEffect(() => {
  if(isCompletedTodos.length <= 3) {
    setCurrentPage(1)
  }
},[isCompletedTodos.length]) 
   
    
    
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
       <button onClick={ () => sortNameDesc()}>Сортировка По имени в плюс</button> 
       

        { 
       
         currentElements.map((todo) => (
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
        {isCompletedTodos.length > 3 ?
            <div className={styles.pagination}>
                <Pagination
                    firstIndex = {firstPageIndex} 
                    lastIndex={lastPageIndex} 
                    elementsPerPage={elementsOnPage}
                    totalElements={isCompletedTodos.length}
                    setCurrentPage={setCurrentPage} 
                />
          
          <div className={styles.pagination_buttons}>
              <button onClick={() => prevPage()}>{`<<`}</button>
              <button onClick={() => nextPage()}>{`>>`}</button>
          </div>
      
    </div> 
     : <div></div> }
      </div>
    </div>
  )})
