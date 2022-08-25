import React, { useContext } from 'react';
import {  Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Exam from './Exam/Exam';
import "./Exam/Exam.css"
import "./Question/Questions.css"
import "./components/Auth/Auth.css";

import Questions from './Question/Questions';
import Home from './Home/Home';

import LoginPage from './components/Auth/Login';
import SignupPage from './components/Auth/Signup';
import { AuthContext } from './Context/AuthProvider';
import { Header } from './components/Header';
import ExamListView from './components/dashboard/ExamListView';
import { ExamTypeDetail } from './components/utilities/constants';
import CompleteProfile from './components/CompleteProfile/CompleteProfile';
import { ProfileDataProvider } from './Context/CompleteProfileContext';
import FilterExamList from './components/FilterExamList';
import Wallet from './components/Wallet/Wallet';
import Profile from './components/Profile';


export default function AppRoutes() {
    let { user } = useContext(AuthContext);
    let location = useLocation();

    const renderCompleteProfile = () => {
        return (
            <ProfileDataProvider> 
                <CompleteProfile />
            </ProfileDataProvider>
        )
    }
    return (
        <Header>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/signin' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/exam' element={user ? <Exam/> : <Navigate to="/signin?next=/exam" />} />
                <Route path="/exams" element={user ? <ExamListView examTypeDetail={ExamTypeDetail.exam}  /> : <Navigate to="/signin?next=/exams" />} />
                <Route path="/quizes" element={user ? <ExamListView examTypeDetail={ExamTypeDetail.quiz} /> : <Navigate to="/signin?next=/quizes" />} />
                <Route
                    path='/exam/:id/questions'
                    element={user ? <Questions exam_type={"exam"} /> : <Navigate to={`/signin?next=${location.pathname}`} /> }
                />
                <Route
                    path='/quiz/:id/questions'
                    element={user ? <Questions exam_type={"quiz"} /> : <Navigate to={`/signin?next=${location.pathname}`} /> }
                />
                <Route path='/complete_profile' element={ user ? renderCompleteProfile() : <Navigate to="/signin?next=/complete_profile" /> } />
                <Route path="/search" element={<FilterExamList />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/wallet" element={<Wallet />}/>
            </Routes>
        </Header>
    )
}
