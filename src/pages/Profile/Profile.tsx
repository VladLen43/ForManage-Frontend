import React, { useEffect } from 'react'
import styles from './Profile.module.scss'
import { Button } from '@mui/material'
import { Link, Location, useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'
import { fetchAuthMe, isAuth } from '../../redux/reducers/auth'
import { Header } from '../../components/Header/Header'

export const Profile = () => {
    useEffect(() => {
        fetchAuthMe()
    },[])

        
    const location = useNavigate() 
    const user = useAppSelector((state) => state.auth.data)
 


  return (
    <div className={styles.container}>
        <Header/>

        <h1>Профиль</h1>
        {/* @ts-ignore */}
        <div>Имя: {user?.fullName}</div>
        {/* @ts-ignore */}
        <img src={user?.avatarUrl} alt="..." />
         {/* @ts-ignore */}
         <div>Email: {user?.email}</div>
          {/* @ts-ignore */}
          <div>Зарегестрирован: {user?.createdAt}</div>
     
    </div>
  )
}
