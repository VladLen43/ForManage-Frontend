import React from 'react'
import styles from './Header.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { logout } from '../../redux/reducers/auth'
import { useAppDispatch } from '../../redux/hooks'

export const Header = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        if(window.confirm('Вы действительно хотите выйти из аккаунта ?')) {
            dispatch(logout())
            window.localStorage.removeItem('token')
            navigate('/login')
        }
    }     

  return (
    <div className={styles.container}>
        <ul>
            <li><Button variant='contained'><Link to="/profile">Профиль</Link></Button></li>
            <li><Button variant='contained'><Link to="/">Добавленные</Link></Button></li>
            <li><Button variant="contained"><Link to="/todos/completed">Выполненное</Link></Button></li>
            <li><Button variant='contained'><Link to="/create">Добавление дела</Link></Button></li>
            <li><Button onClick={handleLogout} variant="contained">Выйти</Button></li>
        </ul>
    </div>
  )
}
