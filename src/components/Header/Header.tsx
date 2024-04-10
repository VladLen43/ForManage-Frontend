import React from 'react'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className={styles.container}>
        <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/profile">Личный кабинет</Link></li>
        </ul>
    </div>
  )
}
