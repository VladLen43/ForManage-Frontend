import React, { useEffect, useState } from 'react'
import styles from './Single.module.scss'
import { Header } from '../../components/Header/Header'
import { Link, useParams } from 'react-router-dom'
import axios from '../../axios'
import { changeStatus, fetchTodo, toggleStatus } from '../../redux/reducers/todoSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

export const Single = () => {

    const { id } = useParams();
    const dispatch = useAppDispatch();
    //@ts-ignore
    const user = useAppSelector((state) => state.auth.data)
   
    const [ids, setId] = useState('')
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl]  = useState('');
    const [tags, setTags] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [fullName, setFullName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        axios.get('auth/me').then(({ data }) => {
            setFullName(data.fullName);
            setAvatarUrl(data.avatarUrl);
            console.log(data)
        })

},[])

   
    useEffect(() => {
           axios.get(`/todos/${id}`).then(({data}) => {
                setImageUrl(data.imageUrl);
                setTitle(data.title);
                setText(data.text);
                setTags(data.tags);
                setCompleted(data.completed);
                setId(data._id);
           })
           
    },[])



    const isSubmit = async () => {
        await axios.patch(`/todos/${id}`, completed)
        setCompleted(!completed)
    }
    const [hide, setHide] = useState(false)

  return (
    <div className={styles.container}>
        <Header hide={hide} setHide={setHide} />
        <button className={styles.hide_button} style={hide ? {color: 'white',transform: 'translateX(0%)'} : {color: 'black',transform: 'translateX(0%)'} } onClick={() => setHide(!hide)}>{hide ? '>>' : '<<'}</button>
            <div className={styles.content} style={hide ? {transform: 'translateX(-8%)'} : {transform: 'translateX(0%)'}}>
                
                <div style={hide ? {transform: 'translateX(-16%)'} : {transform: 'translateX(0%)'}} className={styles.list}>
                <span className={styles.ghosts}>Название: <h1>{title}</h1></span>
                 
                 { imageUrl ? <img src={`http://localhost:4444${imageUrl}`} alt="" /> : <div></div> }
                
                { tags[0] ? <span className={styles.ghosts}>
                    Теги:<p className={styles.tags}>
                        {tags.map((tag) => (
                         <p className={styles.tag}>#{tag}</p>
                    ))}</p></span> 
                    : <div></div> }
             
                       <span className={styles.ghosts}>Создатель:<p><Link to='/profile'>{fullName}</Link></p></span>
                
                <div>
                <input type="checkbox" onChange={() => {
                     //@ts-ignore
                     dispatch(toggleStatus(ids))
                     dispatch(changeStatus(ids))
                     setCompleted(!completed)
                    }
                //@ts-ignore
                } checked={completed} /> 
                    <span>{completed ? 'Выполнено' : 'Пометить как выполненное'}</span>
                    </div> 

                { text ? <span className={styles.ghosts}>Подробное описание:<p>{text}</p></span> : <div></div>}
            </div>
        </div>
    </div>
  )
}
