import React, { useEffect } from 'react';
import { baseURL } from './utilities/constants';
import useAxios from "./utilities/useAxios";


const Profile = () => {

    let API = useAxios();

    const getProfileDetail = async () => {
        let response = await API.get(`${baseURL}/v2/getUserProfile/`);
        let data = await response.data;
    }

    useEffect(()=>{
        getProfileDetail();
    }, [])
    
    return (
        <>
            Profile
        </>
    )
}

export default Profile;