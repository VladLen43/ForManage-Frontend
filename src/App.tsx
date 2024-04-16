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
import { CreateTodo } from './pages/CreatePage/CreateTodo';
import { Single } from './pages/SingleTodoPage/Single';
import { CompletedTodos } from './pages/CompletedTodos/CompletedTodos';

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
          <Route path='/profile/:id/edit' element={<Profile/>} />
          <Route path='/create' element={<CreateTodo/>} />
          <Route path='/create/:id/edit' element={<CreateTodo/>} />
          <Route path='/todos/:id' element={<Single/>} />
          <Route path='/todos/completed' element={<CompletedTodos />} /> 
        </Routes>
      
    </div>
  );
}

export default App;
