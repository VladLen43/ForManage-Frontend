import React, { useEffect, useRef, useState } from 'react'
import styles from './Header.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { logout } from '../../redux/reducers/auth'
import { useAppDispatch } from '../../redux/hooks'

interface HeaderProps {
    hide: boolean,
    setHide: (value: boolean) => void
}

export const Header:React.FC<HeaderProps> = ({hide, setHide}) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const ref = useRef();

    const handleLogout = () => {
        if(window.confirm('Вы действительно хотите выйти из аккаунта ?')) {
            dispatch(logout())
            window.localStorage.removeItem('token')
            navigate('/login')
        }
    }

  return (
    <div className={styles.container} style={hide ? {transform: 'translateX(-115%)',transition: 'all 0.5s ease-in-out'} : {transform: 'translateX(0%)',transition: 'all 0.5s ease-in-out'}}>
        <div>
        <ul className={styles.header} >
            <li style={{marginTop: '50px'}}><Button variant='contained'><Link to="/profile">Профиль</Link></Button></li>
            <li><Button variant='contained'><Link to="/">Добавленные</Link></Button></li>
            <li><Button variant="contained"><Link to="/todos/completed">Выполненное</Link></Button></li>
            <li><Button variant='contained'><Link to="/create">Добавление дела</Link></Button></li>
            <li><Button onClick={handleLogout} variant="contained">Выйти</Button></li>
        </ul>
        </div>
        {/* <button className={styles.hide_button} style={hide ? {color: 'white'} : {color: 'black' } } onClick={() => setHide(!hide)}>{hide ? '>>' : '<<'}</button> */}
    </div>
  )
}
