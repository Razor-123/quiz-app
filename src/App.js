import React, { Component, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Adminhome from './components/Adminhome';
import CreateQuiz from './components/CreateQuiz';
import Login from './components/Login';
import Quiz from './Quiz';
import Result from './components/Result';
import EnterUrl from './components/EnterUrl';
import Register from './components/Register';
import Reset from './components/Reset';

function App() {
  useEffect(()=>{
    console.log('use Effect in App.js');
  },[])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/createquiz" element={<CreateQuiz/>} />
        <Route path="/admin/result/:qid" element={<Result />} />
        <Route path="/admin" element={<Adminhome />} />
        <Route path="/enterurl" element={<EnterUrl />} />
        <Route path="/quiz/:qid" element={<Quiz />} />
        <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
      </Routes>
    </Router>
  );
}

export default App;
