import React, { useState } from 'react'
import styles from './Create.module.scss'
import { addTodo, createTodo, deleteTodos, fetchTodo, removeTodo,toggleStatus, changeStatus } from '../../redux/reducers/todoSlice'
import { Button, Input } from '@mui/material'
import TextField from '@mui/material/TextField'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Header } from '../../components/Header/Header'
import { useForm } from 'react-hook-form'
import axios from '../../axios'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export const CreateTodo = () => {

  
    const { id } = useParams()
    const isEditing = Boolean(id)
    const [title, setTitle]  = useState('');
    const [tags, setTags] = useState('');
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const userData = useAppSelector((state) => state.auth.data)
    const dispatch = useAppDispatch();
    const ref = React.useRef(null)
    //@ts-ignore
    const user = userData?._id;
    const location = useNavigate();

    // const addTask = () => {
    //     //@ts-ignore
    //     const user = userData?._id
    //       if(title.length > 3) {
    //         //@ts-ignore
    //           dispatch(createTodo(title,user))
    //           setText('')
    //         } else {
    //             alert('введите что нибьуль')
    //         }
    //   }

     // const [title, setText] = React.useState('');

      const handleChangeFile = async (event: any) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file);
            //@ts-ignore
            const { data } = await axios.post('/upload', formData)
            setImageUrl(data.url)
            console.log(data);
            
        } catch (error) {
            console.log(error)
        }
        console.log(event.target.files)
      }

      const onClickRemove =() => {
        setImageUrl('')
      }

      const isSubmit = async () => {
        try {
            
        
        setLoading(true);
         
        const fields = {
            title,
            text,
            //@ts-ignore
            tags : tags.split(','),
            imageUrl
        }

            const { data } =  isEditing 
            ? await axios.patch(`/todos/${id}` , fields)
            : await axios.post('/todos', fields)
  
        const _id = isEditing ? id : data._id


        location(`/todos/${_id}`)

        setLoading(false)
        } catch (error) {
        console.warn(error)
        alert('Ошибка при загрузке') 
        }

      }

      React.useEffect(() => {
        if(id) {
            axios.get(`/todos/${id}`).then(({ data }) => {

                setImageUrl(data.imageUrl);

                setText(data.text);
        
                setTags(data.tags.join(', '));

                setTitle(data.title);

                console.log(data)
            })

        }
      },[])

      console.log(title, text, tags)
  return (
    <div className={styles.container}>
        <Header/>
        <div className={styles.content}>
            <label>
            
                <h1>{isEditing ? 'Редактирование дела' :'Добавить дело'}</h1>
                    {/* @ts-ignore */}
                    <Button onClick={() => ref.current.click()}>
                        Загрузить картинку
                    </Button>
                    { imageUrl && ( <> 
                    <Button variant="contained" color='error' onClick={onClickRemove}>
                        Удалить
                    </Button>
                    <img src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
                    </>
                    )}
                        <input ref={ref} type="file" onChange={handleChangeFile} hidden/>

                        <Input placeholder='Напишите дело и нажмите на "добавить"' type="text" value={title} onChange={event => setTitle(event.target.value)} />

                        <TextField  variant="standard" placeholder="Тэги" value={tags} onChange={event => setTags(event.target.value)} fullWidth />

                        <TextField id="outlined-multiline-flexible" value={text} onChange={event => setText(event.target.value)} multiline rows={8} placeholder='Введите подробную информацию' />

                        <Button onClick={isSubmit}>{isEditing ? 'Сохпанить' : 'Опубликовать'}</Button>
                    

            </label>
        </div>
    </div>
  )
}
