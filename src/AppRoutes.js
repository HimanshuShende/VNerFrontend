import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Exam from './Exam/Exam';
import "./Exam/Exam.css"
import "./Question/Questions.css"
import Questions from './Question/Questions';


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/exam' element={<Exam/>} />
                <Route path='/exam/:id/questions' element={<Questions/>} />
            </Routes>
        </BrowserRouter>
    )
}