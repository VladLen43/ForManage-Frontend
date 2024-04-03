import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {todoState, removeTodos, changeStatuss, todoList } from "./types";
import axios from '../../axios';


export const fetchTodo = createAsyncThunk<todoList, undefined, {rejectValue : string}> (
   'todos/fetchTodos', 
   async function (_, {rejectWithValue}) {

    try{ 
        const { data } = await axios.get('/todos')

       
        return data;
        

    } catch (error: any) {
       return rejectWithValue(error.message);
    }

       
        
        
   }
)

export const deleteTodo = createAsyncThunk (
    'todos/removeTodo',
    async function(id: string, {rejectWithValue, dispatch},) {
        try{
        const { data } = await axios.delete(`http://localhost:4444/todos/${id}`)

        dispatch(removeTodo({id}))
        return data;
    
        
        }
        catch(error:any) {
            return rejectWithValue(error.message)
        }
    }
)

export const toggleStatus = createAsyncThunk(
    'todos/toggleStatus',
    async function(id:string, {rejectWithValue, dispatch,getState}) {
        //@ts-ignore
        const isCompletedTodoId = getState().todos.list.find(todo => todo.id === id);
        
        try{
            const responce = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    completed : !isCompletedTodoId
                })
            })
        
            if(!responce.ok) {
                throw new Error ('Hello, unlucky to change status')
            }
            const data = await responce.json();
            console.log(responce)
    
            dispatch(changeStatus({id}))
            return data;
 
           

        }
        catch(error:any) {
            return rejectWithValue(error.message)
        }
        
    }
)

export const addTodoToBase = createAsyncThunk(
    'todos/addTodoToBase',
    async function(title: string,{rejectWithValue, dispatch, getState}) {
        const todo: todoList = {
            UserId: new Date().toISOString(),
            //@ts-ignore
            id: getState().todos.list.find(todo => todo.id + 1),
            title: title,
            completed: false,
        }
        try{
            const responce = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo)
            })
            if(!responce.ok){
                throw new Error('Some Problem with adding')
            }
            const data = await responce.json()
            dispatch(addTodo(data))
            console.log(data)
            return data;
        }
        catch{
            
        }
    }
)


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
        }
        },
        removeTodo(state, action : PayloadAction<removeTodos>) {
            state.list = state.list.filter(todo => todo.id !== action.payload.id)
        },
        changeStatus(state, action : PayloadAction<changeStatuss>) {
            const todo = state.list.find(todo => todo.id === action.payload.id)
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
            .addCase(deleteTodo.rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(toggleStatus.rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(addTodoToBase.rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})

const {addTodo, removeTodo, changeStatus} = todoSlice.actions;
export default todoSlice.reducer;