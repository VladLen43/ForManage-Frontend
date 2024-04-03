import React from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { toggleStatus,deleteTodo } from '../../redux/reducers/todoSlice'

interface TodoProps {
    id: string;
    title: string;
    completed: boolean;
}

export const TodoComponent:React.FC<TodoProps> = ({id, title, completed}) => {

    const dispatch = useAppDispatch();

  return (  
     <li>          
        <input type="checkbox" checked={completed} onChange={() => dispatch(toggleStatus(id))} />
        <span>{title}</span>
        <button onClick={() => dispatch(deleteTodo(id))}>Удалить</button>
    </li>
  )
}
