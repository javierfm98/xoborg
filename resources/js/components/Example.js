import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles.css";
import { Login } from "./Login";
import { Register } from "./Register"; 
import { Home } from "./Home"; 


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/register" element={<Register />}/>
    </Routes>
  </BrowserRouter>

  , document.getElementById('example')
);
