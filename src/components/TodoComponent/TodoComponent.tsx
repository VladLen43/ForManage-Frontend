import React, { useEffect } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { toggleStatus,deleteTodos, fetchTodo } from '../../redux/reducers/todoSlice'

type TodoProps = {
    id: string;
    title: string;
}


export const TodoComponent:React.FC<TodoProps> = ({id, title}) => {


    const dispatch = useAppDispatch();

    useEffect( () => {
      dispatch(fetchTodo())
    },[dispatch])
    console.log()

    const removeTodo = () => {
      //@ts-ignore
      dispatch(removeTodo(id))
      dispatch(deleteTodos(id))
    }
  return (  
     <li>       
      {/*  @ts-ignore */}   
        <input type="checkbox" onChange={() => dispatch(toggleStatus(id))} />
        <span>{title}</span>
        <button onClick={() => dispatch(deleteTodos(id))}>Удалить</button>

    </li>
  )
}
