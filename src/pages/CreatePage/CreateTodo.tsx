import React from 'react'
import styles from './Create.module.scss'
import { addTodo, createTodo, deleteTodos, fetchTodo, removeTodo,toggleStatus, changeStatus } from '../../redux/reducers/todoSlice'
import { Button, Input } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Header } from '../../components/Header/Header'

export const CreateTodo = () => {

    const userData = useAppSelector((state) => state.auth.data)
    const dispatch = useAppDispatch()
    //@ts-ignore
    const user = userData?._id

    const addTask = () => {
        //@ts-ignore
        const user = userData?._id
          if(title.length > 3) {
            //@ts-ignore
              dispatch(createTodo(title,user))
              setText('')
            } else {
                alert('введите что нибьуль')
            }
      }

      const [title, setText] = React.useState('');

  return (
    <div className={styles.container}>
        <Header/>
        <label>
            
                <h1>Добавить дело</h1>

                    <Input placeholder='Напишите дело и нажмите на "добавить"' type="text" value={title} onChange={event => setText(event.target.value)} />
                    <Button onClick={addTask}>Добавить</Button>

            </label>
    </div>
  )
}
