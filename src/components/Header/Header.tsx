import React from 'react'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { logout } from '../../redux/reducers/auth'
import { useAppDispatch } from '../../redux/hooks'

export const Header = () => {

    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
    }     

  return (
    <div className={styles.container}>
        <ul>
            <li><Button variant='contained'><Link to="/profile">Личный кабинет</Link></Button></li>
            <li><Button variant='contained'><Link to="/">Главная</Link></Button></li>
            <li><Button variant='contained'><Link to="/create">Добавление дела</Link></Button></li>
            <li><Button onClick={handleLogout} variant="contained">Выйти</Button></li>
        </ul>
    </div>
  )
}
