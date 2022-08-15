import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Exam from './Exam/Exam';
import "./Exam/Exam.css"
import "./Question/Questions.css"
import Questions from './Question/Questions';
import Home from './Home/Home';
import Signin from './AuthForm/Signin';
import Signup from './AuthForm/Signup';


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/signin' element={<Signin/>} />
                <Route path='/signup' element={<Signup/>} />
                <Route path='/exam' element={<Exam/>} />
                <Route path='/exam/:id/questions' element={<Questions/>} />
            </Routes>
        </BrowserRouter>
    )
}