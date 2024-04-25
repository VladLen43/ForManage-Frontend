import React, { useEffect, useState } from 'react'
import styles from './CompTodos.module.scss'
import { Header } from '../../components/Header/Header'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Link, useNavigate } from 'react-router-dom'
import { isAuth } from '../../redux/reducers/auth'
import { changeStatus, deleteTodos, fetchTodo, removeTodo, toggleStatus } from '../../redux/reducers/todoSlice'
import { Button } from '@mui/material'
import { user, userData } from '../../redux/reducers/types'
import { Pagination } from '../../components/Pagination/Pagination'

export const CompletedTodos = () => {
    const navigate = useNavigate();
    const isAutht = useAppSelector(isAuth);
    const dispatch = useAppDispatch()
    const todos = useAppSelector(state => state.todos.list);
    const userData : user | null = useAppSelector((state) => state.auth.data);

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

      
      const [value,setValue] = useState('')
      const [hide, setHide] = useState(false)
      const filteredTodos = todos.filter(todo => {
        return todo.title.toLowerCase().includes(value.toLowerCase()) 
    })
    const isCompletedTodos = filteredTodos.filter(todo => {
      return todo.completed === true
    })

    const [elementsOnPage, setElementsOnPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(1)

    const lastPageIndex : number = elementsOnPage * currentPage;
    const firstPageIndex = lastPageIndex - elementsOnPage;
    const currentElements = isCompletedTodos.slice(firstPageIndex, lastPageIndex)

    const lastPage = isCompletedTodos.length / elementsOnPage
    const firstPage = 1

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
       <Header hide={hide}  setHide={setHide}/>
       <button className={styles.hide_button} style={hide ? {color: 'white',transform: 'translateX(0%)'} : {color: 'black',transform: 'translateX(0%)'} } onClick={() => setHide(!hide)}>{hide ? '>>' : '<<'}</button>
        <div className={styles.content} style={hide ? {transform: 'translateX(-8%)'} : {transform: 'translateX(0%)'}}>
        <ul className={styles.todos}>
    
      <h1>Список выполненных дел</h1>

      <input className={styles.search} placeholder='Поиск...' type="text" onChange={(e) =>setValue(e.target.value)} />
  
        { 
         currentElements.map((todo, index) => (
            <div className={styles.one_todo}>
                {/* {todo.completed === true ?  */}
          <li key={todo._id}>
            
            { todo.imageUrl === "" ? <div></div> : <img className={styles.image} src={`http://localhost:4444${todo.imageUrl}`} alt="..." />}
            <div >
            <Link to={`/todos/${todo._id}`}><h3>{todo.title}</h3></Link>
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
            {/* : <div></div>} */}
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
        setCurrentPage={setCurrentPage} />
          
          <div className={styles.pagination_buttons}>
              <button onClick={() => prevPage()}>{`<<`}</button>
              <button onClick={() => nextPage()}>{`>>`}</button>
          </div>
      
    </div> 
     : <div></div> }
        </div>
    </div>
  )
}
