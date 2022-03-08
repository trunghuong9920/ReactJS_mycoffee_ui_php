import {Routes, Route,useLocation, Navigate, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';

import { AdminRoute } from './AdminRouter.js';
import Header from './components/header/Header'
import Login from './components/login/Login'


function App() {
  const Navigate = useNavigate()
  const location = useLocation()
  let checkLocation = true
  let checkLocalstorage = false
  if(location.pathname === '/login'){
    checkLocation = false
  }
  
  useEffect(()=>{
    if(localStorage.getItem("account")){
      checkLocalstorage = true
    }
    else{
      checkLocalstorage = false
      Navigate("/login")
    }
  }, [])

  return (
    <div className="App">
      {checkLocation && <Header/>}
      <Routes>
        <Route path='/login' element= {<Login/>}/>
        { 
          AdminRoute.map((item, index) => (
            <Route key={index} path={item.path} element={item.component}/>
          ))
        }
      </Routes>
    </div>
  );
}

export default App;
