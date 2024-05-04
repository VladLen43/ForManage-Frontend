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
    const [priority, setPriority] = useState(1);
    const [loading, setLoading] = useState(false);

    const userData = useAppSelector((state) => state.auth.data)
    const dispatch = useAppDispatch();
    const ref = React.useRef(null)
    //@ts-ignore
    const user = userData?._id;
    const location = useNavigate();

      const handleChangeFile = async (event: any) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file);
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
                priority,
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

                setPriority(data.priority);
        
                setTags(data.tags.join(', '));

                setTitle(data.title);

                console.log(data)
            })

        }
      },[])

      console.log(title, text, tags)
      const [hide, setHide] = useState(false)
  return (
    <div className={styles.container}>
        <Header hide={hide} setHide={setHide}/>
        <button className={styles.hide_button} style={hide ? {color: 'white',transform: 'translateX(0%)'} : {color: 'black',transform: 'translateX(0%)'} } onClick={() => setHide(!hide)}>{hide ? '>>' : '<<'}</button>
        <div className={styles.content} style={hide ? {transform: 'translateX(-8%)'} : {transform: 'translateX(0%)'}}>
            <label>
            
                <h1>{isEditing ? 'Редактирование дела' :'Добавить дело'}</h1>
                    {/* @ts-ignore */}
                    <Button onClick={() => ref.current.click()}>
                        Загрузить новую картинку
                    </Button>
                    { imageUrl && ( <> 
                    
                    <img className={styles.uploaded} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
                    <Button variant="contained" color='error' onClick={onClickRemove}>
                        Удалить картинку
                    </Button>
                    </>
                    )}
                        <input ref={ref} type="file" onChange={handleChangeFile} hidden/>

                        <Input placeholder='Напишите дело и нажмите на "добавить"' type="text" value={title} onChange={event => setTitle(event.target.value)} />

                        <Input placeholder="Напишите теги через запятую" value={tags} onChange={event => setTags(event.target.value)} />

                        <input type='hidden' placeholder="Приоритет" value={priority} />

                        <TextField id="outlined-multiline-flexible" value={text} onChange={event => setText(event.target.value)} multiline rows={8}  placeholder='Введите подробную информацию' />

                        <Button onClick={isSubmit}>{isEditing ? 'Сохранить' : 'Опубликовать'}</Button>
                    

            </label>
        </div>
    </div>
  )
}
