import React, { useEffect } from 'react'
import styles from './Profile.module.scss'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'
import { fetchAuthMe, isAuth } from '../../redux/reducers/auth'

export const Profile = () => {
    useEffect(() => {
        fetchAuthMe()
    
    },[])
    
    const user = useAppSelector((state) => state.auth.data)

  return (
    <div className={styles.container}>
        <h1>Профиль</h1>
        <Button ><Link to="/">На главную</Link></Button>
        {/* @ts-ignore */}
        <div>Имя: {user?.fullName}</div>
         {/* @ts-ignore */}
         <div>Email: {user?.email}</div>
          {/* @ts-ignore */}
          <div>Зарегестрирован: {user?.createdAt}</div>
    </div>
  )
}
