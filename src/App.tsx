import './App.css';
import { TodoComponent } from './components/TodoComponent/TodoComponent';
import { useAppSelector,useAppDispatch } from './redux/hooks';
import { useEffect } from 'react';
import { fetchTodo } from './redux/reducers/todoSlice';
import { Button } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/Authorization/Login';
import { Home } from './pages/Home';
import { fetchAuthMe, isAuth } from './redux/reducers/auth';
import { Register } from './pages/Registration/Register';
import { Profile } from './pages/Profile/Profile';

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
          <Route path='/register' element={<Register/>} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      
    </div>
  );
}

export default App;
