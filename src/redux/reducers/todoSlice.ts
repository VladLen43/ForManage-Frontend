import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {todoState, removeTodos, changeStatuss, todoList } from "./types";
import axios from '../../axios';
import { useAppSelector } from "../hooks";
import { authData, isAuth } from "./auth";


export const fetchTodo = createAsyncThunk<todoList, undefined, {rejectValue : string}> (
   'todos/fetchTodos', 
   async function (userId, {rejectWithValue, getState}) {

    try{
        console.log(userId)
        const { data } = await axios.get('/todos', userId)
        return data;
    } catch (error: any) {
       return rejectWithValue(error.message);
    }
   }
)

export const deleteTodos = createAsyncThunk (
    'todos/deleteTodo',
    async function(id: removeTodos, {dispatch},) {
          const { data } = await axios.delete(`/todos/${id}`)
           //@ts-ignore
            dispatch(removeTodo(id))
            return data
    }
)


export const toggleStatus = createAsyncThunk (
    'todos/toggleStatus',

    async (id, {getState, dispatch}) => {
        //@ts-ignore
        const comp:todoList = getState().todos.list.find(todo => todo._id === id);
       const res = await axios.patch(`/todos/${comp._id}`, {
            completed: !comp.completed 
        })
        const result = Object(res.data.json())
        return result;
    }
)
// export const toggleStatus = createAsyncThunk(
//     'todos/toggleStatus',
//     async function(id:string, {rejectWithValue, dispatch,getState}) {
//         //@ts-ignore
//         const isChecked = getState().todos.list.find(todo => todo.id === id);
        
//         try{
//             const responce = await fetch(`http://localhost:4444/todos/${id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     completed : !isChecked
//                 })
//             })
        
//             if(!responce.ok) {
//                 console.log(responce)
//                 throw new Error ('Hello, unlucky to change status')
//             }
//             const data = await responce.json();
//             console.log(responce)
    
//             dispatch(changeStatus({id}))
//             return data;
 
           

//         }
//         catch(error:any) {
//             return rejectWithValue(error.message)
//         }
        
//     }
// )

export const createTodo = createAsyncThunk(
    'todos/createTodo',
    async (title: string,userId) => {

        const todo = {
            title: title,
            imageUrl: '',
            user: userId
        }
        console.log(userId)
        const {data} = await axios.post('/todos', todo)
        return data;
    }
)

// export const addTodoToBase = createAsyncThunk(
//     'todos/addTodoToBase',
//     async function(title: string, {rejectWithValue, dispatch, getState}) {
//         const todo: todoList = {
//             //@ts-ignore
//             id: getState().todos.list.find(todo => todo.id + 1),
//             title: title,
//             completed: false,
//         }
//         try{
//             const responce = await fetch('https://jsonplaceholder.typicode.com/todos', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(todo)
//             })
//             if(!responce.ok){
//                 throw new Error('Some Problem with adding')
//             }
//             const data = await responce.json()
//             dispatch(addTodo(data))
//             console.log(data)
//             return data;
//         }
//         catch{
            
//         }
//     }
// )


const initialState: todoState = {
    list: [],
    loading: false,
    error: null ,
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state,action : PayloadAction<todoList>)  {
            if (action.payload) {
            state.list.push(action.payload);
            console.log(state.list)
        }
        },
        removeTodo(state, action : PayloadAction<removeTodos>) {
            state.list = state.list.filter(todo => todo._id !== action.payload._id)
        },
        changeStatus(state, action ) {
            //@ts-ignore
            const todo = state.list.find(todo => todo._id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodo.fulfilled, (state,action) => {
                state.loading = false;
                //@ts-ignore Здесь странная ошибка с типизацией
                state.list = action.payload;
            })
            .addCase(fetchTodo.rejected, (state,action) => {   
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(deleteTodos.fulfilled, (state,action) => {
                //@ts-ignore
                    state.list = state.list.filter(todo => todo._id !== action.meta.arg)
            })
            .addCase(deleteTodos.rejected, (state,action) => {
                              //@ts-ignore
                state.list = state.list.filter(todo => todo._id !== action.payload._id)
                state.loading = false;
                state.error = action.payload
            })
            .addCase(toggleStatus.fulfilled, (state,action) => {
                state.loading = false;
                state.error = action.payload
                //@ts-ignore
            //     const todo = state.list.find(todo => todo._id === action.meta.arg)
            // if (todo) {
            //     todo.completed = !todo.completed
            // }
            })
            .addCase(toggleStatus.rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(createTodo.fulfilled, (state,action) => {
                state.loading = false;
                if (action.payload) {
                    state.list.push(action.payload);
                    console.log(state.list)
                }
                state.error = null
            })
            .addCase(createTodo.rejected, (state,action) => {
                state.loading = false;
                //@ts-ignore
                state.list = action.payload
                state.error = action.payload
            })
    }
})

export const {addTodo, removeTodo, changeStatus} = todoSlice.actions;
export default todoSlice.reducer;