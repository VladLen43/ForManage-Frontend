import React from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import styles from './Register.module.scss'
import { fetchRegister, isAuth } from '../../redux/reducers/auth';


export const Register = () => {
         const dispatch = useAppDispatch();
         const navigate = useNavigate()
         const isAutht = useAppSelector(isAuth)

  const { register, handleSubmit, setError,formState : {errors, isValid} 
} = useForm({
    defaultValues: {
      email: '',
      fullName: '',
      password: ''
    },
    mode : 'onChange'
  });

  const onSubmit = async (values: any) => {
        //@ts-ignore
   const data = await dispatch(fetchRegister(values))
   console.log(values)

   if(!data.payload) {
     return alert('Не удалось зарегистрироваться')
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
      <h1>Зарегестрируйтесь</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} action="">
         <TextField {...register('email', { required: 'Укажите почту'})} type='email' error={Boolean(errors.email?.message)} helperText={errors.email?.message} id="standard-basic" label="Standard" variant="standard" />
         <TextField {...register('fullName', { required: 'Укажите Полное Имя'})} error={Boolean(errors.fullName?.message)} helperText={errors.fullName?.message} type='text'  id="standard-basic" label="Standard" variant="standard" />
         <TextField {...register('password', { required: 'Укажите пароль'})} error={Boolean(errors.password?.message)} helperText={errors.password?.message} id="standard-basic" label="Standard" variant="standard" />
         <Button disabled={!isValid} type='submit' variant="contained">Зарегестрироваться</Button>
         <Link to="/login">Уже есть аккаунт? Авторизуйтесь !</Link>
        </form>
    </div>
  )
}
