import { Button, TextField } from '@mui/material'
import React from 'react'
import styles from './Login.module.scss';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchUserData, isAuth } from '../../redux/reducers/auth';
import { Link, useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const isAutht = useAppSelector(isAuth)
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const { register, handleSubmit, setError,formState : {errors, isValid} 
} = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode : 'onChange'
  });

  const onSubmit = async (values: any) => {
    //@ts-ignore
   const data = await dispatch(fetchUserData(values))
    console.log(values)

    if(!data.payload) {
      return alert('Не удалось авторизоваться')
    }
    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    } 
  }


  if(isAutht) {
    navigate('/')
  }
  return (
    <div className={styles.container}>
      <h1>Авторизуйтесь</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} action="">
         <TextField {...register('email', { required: 'Укажите почту'})} type='email' error={Boolean(errors.email?.message)} helperText={errors.email?.message} id="standard-basic" label="Standard" variant="standard" />
         <TextField {...register('password', { required: 'Укажите пароль'})} error={Boolean(errors.password?.message)} helperText={errors.password?.message} id="standard-basic" label="Standard" variant="standard" />
         <Button disabled={!isValid} type='submit' variant="contained">Войти</Button>
        </form>
        <Link to="/register">Нет аккаунта? Зарегистрируйтесь !</Link>
    </div>
  )
}
