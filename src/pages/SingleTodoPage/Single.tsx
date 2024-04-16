import React, { useEffect, useState } from 'react'
import styles from './Single.module.scss'
import { Header } from '../../components/Header/Header'
import { useParams } from 'react-router-dom'
import axios from '../../axios'
import { changeStatus, fetchTodo, toggleStatus } from '../../redux/reducers/todoSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

export const Single = () => {

    const { id } = useParams()
    const dispatch = useAppDispatch()

    const [ids, setId] = useState('')
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl]  = useState('');
    const [tags, setTags] = useState([]);
    const [completed, setCompleted] = useState(false);


    useEffect(() => {
           axios.get(`/todos/${id}`).then(({data}) => {
            data.map((todo: any) => {

                setImageUrl(todo.imageUrl);
                setTitle(todo.title);
                setText(todo.text);
                setTags(todo.tags);
                setCompleted(todo.completed);
                setId(todo._id)

             })
           })
    },[dispatch])

  return (
    <div className={styles.container}>
        <Header />
            <div className={styles.content}>
                
                <span className={styles.ghosts}>Название: <h1>{title}</h1></span>
                 
                 { imageUrl ? <img src={`http://localhost:4444${imageUrl}`} alt="" /> : <div></div> }
                
                { tags[0] ? <span className={styles.ghosts}>Теги:<p className={styles.tags}>{tags.map((tag) => (
                    <p className={styles.tag}>#{tag}</p>
                ))}</p> </span> : <div></div> }

                <input type="checkbox" onChange={() => {
                    //@ts-ignore
                    dispatch(toggleStatus(ids))
                    dispatch(changeStatus(ids))
                    setCompleted(!completed)
                }
                //@ts-ignore
                } checked={completed} />
                { text ? <span className={styles.ghosts}>Подробное описание:<p>{text}</p></span> : <div></div>}
            </div>
    </div>
  )
}
