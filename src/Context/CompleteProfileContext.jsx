/* eslint-disable react-hooks/exhaustive-deps */
import { useState, createContext, useEffect } from "react";
import { baseURL } from "../components/utilities/constants";
import useAxios from "../components/utilities/useAxios";

export const ProfileDataContext = createContext({});  


export const ProfileDataProvider = ({ children }) =>{
    const API = useAxios();
    const [ examNames, setExamNames ] = useState([])
    const [ profileData, setProfileData ] = useState({
        "first_name": "",
        "middle_name": "",
        "last_name": "",
        "date_of_birth": "",
        "countryCode": "",
        "mobile": "",
        "email": "",
        "target_exams": [],
        "role": 0,
        "education": [] 
    });

    const resetProfileData = () =>{
        setProfileData({
            "first_name": "",
            "middle_name": "",
            "last_name": "",
            "date_of_birth": "",
            "countryCode": "",
            "mobile": "",
            "email": "",
            "target_exams": [],
            "role": 0,
            "education": [] 
        });
    }

    useEffect(()=>{
        API.get(`${baseURL}/v2/getTargetExams/`)
              .then(resp => {
                setExamNames(resp.data["exams"])
               })
    },[]);

    return (
        <ProfileDataContext.Provider value={{ 
                                                profileData,
                                                setProfileData,
                                                resetProfileData,
                                                examNames
                                            }}>
            { children }
        </ProfileDataContext.Provider>
    )
}