import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { deleteTodos, fetchTodo, removeTodo,toggleStatus, changeStatus, sortAsc, sortDesc, sortDefault, sortAscDate, sortDescDate } from '../../redux/reducers/todoSlice'
import styles from './CompTodos.module.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { isAuth } from '../../redux/reducers/auth'
import { Header } from '../../components/Header/Header'
import axios from '../../axios'
import { Pagination } from '../../components/Pagination/Pagination'


export const CompletedTodos = React.memo( () => {

  const dispatch = useAppDispatch();
  const isAutht = useAppSelector(isAuth);
  const navigate = useNavigate();
  const  id  = useParams()
  console.log(id)


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
    //@ts-ignore
    todos.filter(todo => {
      return todo.title.toLowerCase().includes(value.toLowerCase())

  })
  //@ts-ignore
  const CompletedTodos = filteredTodos.filter(todo => {
    return todo.completed === true
  })

    //Pagination

    const [elementsOnPage, setElementsOnPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(1)

    const lastPageIndex : number = elementsOnPage * currentPage;
    const firstPageIndex = lastPageIndex - elementsOnPage;
    const currentElements = CompletedTodos.slice(firstPageIndex, lastPageIndex)

    const lastPage = Math.ceil(CompletedTodos.length / elementsOnPage)
    const firstPage = 1

    const [filterButtonIndex, setFilterButtonIndex] = useState(0)
    const buttonSortNameText = () => {
      if(filterButtonIndex === 0) {
        return 'Сортировка по имени (По умолчанию)'
      }
      if(filterButtonIndex === 1) {
        return 'Cортировка по имени вниз'
      }
      if(filterButtonIndex === 2) {
        return 'Сортировка по имени вверх'
      } 
    }
    const [filterDateIndex, setFilterDateIndex] = useState(0)
    const buttonSortDateText = () => {
      // if(filterDateIndex === 0) {
      //   return 'Сортировка по дате'
      // }
      if(filterDateIndex === 0) {
        return 'Сортировка по дате сначала старые'
      } 
      if(filterDateIndex === 1) {
        return 'Сортировка по дате сначала новые'
      } 
    }

    const sortName = () => {
      if(filterButtonIndex < 2) {
        setFilterButtonIndex((prev) => prev + 1 )
      }
      if(filterButtonIndex ===2) {
        setFilterButtonIndex(0)
      }
    }
    const sortDate = () => {
      if(filterDateIndex < 1) {
        setFilterDateIndex((prev) => prev + 1 )
      }
      if(filterDateIndex ===1) {
        setFilterDateIndex(0)
      }
    }
    
    useEffect(() => {
      if(filterButtonIndex === 0) {
        sortNameDefault()
      }
      if(filterButtonIndex ===1) {
        sortNameDesc()
        
      }
      if(filterButtonIndex ===2) {
        sortNameAsc()
       
      }
    
    },[filterButtonIndex])
     
    useEffect(() => {
      if(filterDateIndex === 0) {
        sortDateAsc()
  
      }
      if(filterDateIndex ===1) {
        sortDateDesc()
       
      }
      // if(filterDateIndex ===2) {
      //   sortDateDesc()
      // }
    },[filterDateIndex])
  

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

    const sortNameDefault = () => {
      const fields = {
        user: user,
      }
      //@ts-ignore
      dispatch(sortDefault(fields))
      console.log(fields)
    }
    const sortDateAsc = () => {
      const fields = {
        user: user,
        sortType: 1,
      }
      //@ts-ignore
      dispatch(sortAscDate(fields))
      console.log(fields)
    }
    const sortDateDesc = () => {
      const fields = {
        user: user,
        sortType: -1,
      }
      //@ts-ignore
      dispatch(sortDescDate(fields))
      console.log(fields)
    }

    // const sortDateDefault = () => {
    //   const fields = {
    //     user: user,
    //   }
    //   //@ts-ignore
    //   dispatch(sortDefaultDate(fields))
    //   console.log(fields)
    // }


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
      if(currentPage <= firstPage) {
        setCurrentPage(lastPage)
    } else {
    
      setCurrentPage(prev => prev - 1)
    
  }
}

useEffect(() => {
  if(CompletedTodos.length <= 3) {
    setCurrentPage(1)
  }
},[CompletedTodos.length]) 
   
    
    
  return (
    <div className={styles.container}>
      <button className={styles.hide_button} style={hide ? {color: 'white',transform: 'translateX(0%)'} : {color: 'black',transform: 'translateX(0%)'} } onClick={() => setHide(!hide)}>{hide ? '>>' : '<<'}</button>
      <Header hide={hide} setHide={setHide} />

        {}
          <div className={styles.content} style={hide ? {transform: 'translateX(-8%)'} : {transform: 'translateX(0%)'}}>
            
                  {loading === true && <h2>Loading...</h2>}
                  {error && <h2>{error}</h2>}

 

      <ul className={styles.todos}>

      <h1>Список Выполненных дел</h1>

      <input type='text' className={styles.search} placeholder='Поиск...' onChange={(event) => setValue(event?.target.value)}></input>

      <div className={styles.sorting}>
          <button onClick={() => sortName()}>{buttonSortNameText()}</button> 
          <button onClick={ () => sortDate()}>{buttonSortDateText()}</button> 
          
      </div> 

        { 
       
         currentElements.map((todo) => (
         <div key={todo._id} className={styles.one_todo}>
          { todo.completed === true ?
          <li key={todo._id}>

            { todo.imageUrl === "" ? <div></div> : <img className={styles.image} src={`http://localhost:4444${todo.imageUrl}`} alt="..." />}
            <div>
            <Link to={`/todos/${todo._id}`}><h3>{todo.title}</h3></Link>
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
        {CompletedTodos.length > 3 ?
            <div className={styles.pagination}>
                <Pagination
                    firstIndex = {firstPageIndex} 
                    lastIndex={lastPageIndex} 
                    elementsPerPage={elementsOnPage}
                    totalElements={CompletedTodos.length}
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
