import React, { useEffect, useRef, useState } from 'react'
import styles from './Profile.module.scss'
import { Button, Input, TextField } from '@mui/material'
import { Link, Location, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'
import { fetchAuthMe, isAuth } from '../../redux/reducers/auth'
import { Header } from '../../components/Header/Header'
import axios from '../../axios'

export const Profile = () => {
    

        
    const location = useNavigate() 
    const user = useAppSelector((state) => state.auth.data)
    const { id } = useParams()
    const isEditing = Boolean(id);
    const ref = useRef(null);
    const navigate = useNavigate()


    const [fullName, setFullName] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    
    useEffect(() => {
      
            axios.get('auth/me').then(({ data }) => {
                setFullName(data.fullName);
                setImageUrl(data.avatarUrl);
                console.log(data)
            })
    
    },[])

    const handleChangeFile = async (event: any) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file)

            const { data} = await axios.post('/upload', formData)

            setImageUrl(data.url)

            console.log(data);
        } catch (error) {
            
        }
    }
    const deleteFile = () => {
        setImageUrl('')
    }

    const isSubmit = async () => {
        const fields = {
            fullName: fullName,
            avatarUrl: imageUrl,
        }

        const { data } = await axios.patch(`auth/me/${id}`, fields)

        navigate('/profile')
    } 
    const [hide, setHide] = useState(false)

  return (
    <div>
         <button className={styles.hide_button} style={hide ? {color: 'white',transform: 'translateX(0%)'} : {color: 'black',transform: 'translateX(0%)'} } onClick={() => setHide(!hide)}>{hide ? '>>' : '<<'}</button>
    <div style={hide ? {transform: 'translateX(-8%)'} : {transform: 'translateX(0%)'}} className={styles.container}>
        <Header hide={hide} setHide={setHide} />
        { isEditing ? <div className={styles.edit}>
                        <h3>Редактировать имя</h3>
                        <TextField value={fullName} onChange={(e) => setFullName(e.target.value)} id="outline-required" required>  </TextField>
                        <img src={`http://localhost:4444${imageUrl}`} alt="image" />
                        <div className={styles.photo_buttons}>
                        {/* @ts-ignore */}
                            <Button variant='outlined' onClick={() => ref.current.click()}>Загрузить новое фото</Button>
                            {imageUrl && <Button variant='outlined' onClick={deleteFile} >Удалить фото</Button> }
                        </div>
                        <input hidden ref={ref} onChange={handleChangeFile} type='file'></input>
                        <Button variant='outlined' onClick={isSubmit}>Сохранить</Button>
                    </div> :
                    <div className={styles.profile}>
                        <h2>Профиль</h2>
                        <p>Имя: {fullName}</p>
                        {/* @ts-ignore */}
                        <img src={`http://localhost:4444${imageUrl}`} alt="..." />
                        {/* @ts-ignore */}
                        <div>Email: {user?.email}</div>
                        {/* @ts-ignore */}
                        <div>Зарегестрирован:  {user?.createdAt}</div>
                        {/* @ts-ignore */}
                        <Button variant='contained'><Link to={`/profile/${user?._id}/edit`}>Редактировать</Link></Button>
                    </div> }  
        
                
    </div>
    </div>
  )
}
