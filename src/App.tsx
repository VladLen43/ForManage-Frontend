import './App.css';
import { Input } from './components/Input/Input';
import { TodoComponent } from './components/TodoComponent/TodoComponent';
import { useAppSelector,useAppDispatch } from './redux/hooks';
import { useEffect } from 'react';
import { fetchTodo } from './redux/reducers/todoSlice';
import { Button } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/Authorization/Login';
import { Home } from './pages/Home';
import { fetchAuthMe, isAuth } from './redux/reducers/auth';

function App() {

 const dispatch = useAppDispatch();
 const isAutht = useAppSelector(isAuth)

 useEffect(() => {
  dispatch(fetchAuthMe())
 },[])

  return (
    <div className="App">
        <Routes>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/' element={<Home />} />
        </Routes>
      
    </div>
  );
}

export default App;
