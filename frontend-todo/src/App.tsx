// import { useState } from 'react'
// import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../styles/index.css'
import SignIn from './pages/signin'
import SignUp from './pages/signup'
import Dashboard from './pages/dashboard'
const initialTodos = [{id:'a',name:'fsdf',description:'asdsf',isDone:true},{id:'a',name:'fsdf',description:'asdsf',isDone:true},{id:'a',name:'fsdf',description:'asdsf',isDone:true},{id:'a',name:'fsdf',description:'asdsf',isDone:true},{id:'a',name:'fsdf',description:'asdsf',isDone:true}]
function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<SignIn/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/dashboard' element={<Dashboard todos={initialTodos}/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
