import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import BlockIcon from '@mui/icons-material/Block';
import SellIcon from '@mui/icons-material/Sell';
import { baseURL, ExamLevel } from './utilities/constants';
import useAxios from './utilities/useAxios';
import axios from 'axios';

export default function FilterExamList(){
    
    const [ showPopup, setShowPopup ] = useState(false);
    const [ filteredList, setFilteredList ] = useState([])

    let API = useAxios()
    const [ search_params ] = useSearchParams()

    console.log("search_params : ", search_params.get("tag"))

    const renderDilteredExamList = () => {
        return (
            <div className="exams">
            {filteredList.map((exam) => (
                <div className="exam" key={exam.id} id={`exam_${exam.id}`}>
                    <div className="details">
                        <div className="name" style={{ fontSize: "1.2rem", cursor: "pointer" }}>{ exam.name }</div>
                        <div className="other">
                            <span>
                                <CalendarMonthIcon /> {exam.created_at}
                            </span>
                            <span>
                                <AccessTimeFilledIcon /> {exam.duration} min
                            </span>
                            <span>
                                <SubjectIcon /> {ExamLevel[exam.level]}
                            </span>
                            {/* <span>
                                <PersonIcon /> 20
                            </span> */}
                            <span>
                                <BlockIcon /> {exam.allowed_attempts}
                            </span>
                            {exam.tag && 
                                (
                                    <span>
                                        <SellIcon /> {exam.tag.toUpperCase()}
                                    </span>
                                )
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>
        )
    }

    const fetchExamList = async () => {
        let resp = await axios.get(`${baseURL}/v2/filterexams?tag=${search_params.get("tag") ? search_params.get("tag").toLowerCase() : ""}`);
        let data = await resp.data;
        console.log(data.filteredExams)
        setFilteredList(data.filteredExams)
        // allowed_attempts: 2
        // created_at: "02-08-2022"
        // created_by: "Himanshu Ranjan Shende"
        // duration: 40
        // exam_type: 2
        // id: 2
        // last_modified: "13-08-2022 05:52 PM"
        // level: 2
        // name: "Chnagedd Exam name"
        // question_count: 0
        // tag: "iit-jee"
    }

    useEffect(()=>{
        fetchExamList();
    }, [])

    return (
        <>
            { showPopup && 
                <div className='popup_container'>
                    <div className={`popup`}>
                        <div className='loadingCircle'></div>
                        <div className='loadingText'>
                            Loading...
                            <span></span>
                        </div>
                    </div>
                </div>
            }
            <div className='ELV_container'>
                <div className='ELV_section'>
                    <div className="section_header">
                        <div className="name">Search Result</div>
                        {/* <hr /> */}
                    </div>

                    <div className="section_content">
                        {filteredList.length < 1 ? "No Records found" : renderDilteredExamList()}
                    </div>

                </div>
            </div>
        </>
    )
}