import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { toggleStatus,deleteTodos, fetchTodo, removeTodo } from '../../redux/reducers/todoSlice'
import { removeTodos } from '../../redux/reducers/types';

type TodoProps = {
    _id: removeTodos;
    title: string;
    completed: boolean;
}


export const TodoComponent:React.FC<TodoProps> = ({_id, title, completed}) => {

    const userData = useAppSelector((state) => state.auth.data)
    //@ts-ignore
    const user = userData?.user._id
    const dispatch = useAppDispatch();
    useEffect(() => {
      //@ts-ignore
      dispatch(fetchTodo(user))
    },[dispatch])

    const removTodo = () => {
      dispatch(removeTodo(_id))
      dispatch(deleteTodos(_id))
    }
 


  return (  
     <li>       
      {/*  @ts-ignore */}   
        <input type="checkbox" checked="" onChange={() => dispatch(toggleStatus(_id))} />
        <span>{title}</span>
        {/* @ts-ignore */}
        <button onClick={() => removTodo()}>Удалить</button>

    </li>
  )
}
