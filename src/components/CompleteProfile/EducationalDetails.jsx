/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import { useContext, useEffect, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ProfileDataContext } from '../../Context/CompleteProfileContext';


function SoCDetails ({ showDelete, handleDeleteEducation, id, handleAddEduData, edudata }){
    const [ socData, setSocData] = useState(edudata ? edudata : { id: id });
    const [ grade , setGrade ]  = useState(edudata ? edudata.grade: 0);
    const [ school , setScool ] = useState(edudata? edudata.school : "");
    const [ schoolAddr , setSchoolAddr ] = useState(edudata? edudata.addr : "");
    const handleGradeChange = (event) => {
        setGrade(event.target.value);
        setSocData({...socData, grade: event.target.value});
        if (grade > 0 && school!=="" && schoolAddr!==""){
            handleAddEduData(edudata);
        }
    };

    const handleSchoolChange = (event) => {
        setScool(event.target.value);
        setSocData({...socData, school: event.target.value});
        if (grade > 0 && school!=="" && schoolAddr!==""){
            handleAddEduData(socData);
        }
    };

    const handleAddrChange = (event) => {
        setSchoolAddr(event.target.value);
        setSocData({...socData, addr: event.target.value});
        if (grade > 0 && school!=="" && schoolAddr!==""){
            handleAddEduData(socData);
        }
    };

    useEffect(()=>{
        if (grade > 0 && school!=="" && schoolAddr!==""){
            handleAddEduData(socData);
        }
    }, [grade, school, schoolAddr, socData])
    return(
        <FormControl fullWidth  sx={{ mb: 1, maxWidth: 600}}>
            { showDelete && <hr style={{ width: "100%" , height: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", border: "none"}}/>}
            <TextField inputProps={{ name:"school_name" }} required={id===1} value={school} onChange={handleSchoolChange} sx={{ mb: 1, minWidth: 600 }} fullWidth variant="filled" size="small" label="School/College" color="primary" />
            <FormControl fullWidth variant="filled" sx={{ mb: 1, minWidth: 600 }}>
                <InputLabel id="grade-label">Grade</InputLabel>
                <Select
                    inputProps={{ name:"grade" }}
                    labelId="grade-label"
                    id="grade-select"
                    value={grade}
                    label="Grade"
                    onChange={handleGradeChange}
                    required={id===1} 
                >
                    <MenuItem value={0}>None</MenuItem>
                    <MenuItem value={1}>10th</MenuItem>
                    <MenuItem value={2}>12th</MenuItem>
                    <MenuItem value={3}>Under Graduate</MenuItem>
                    <MenuItem value={4}>Post Graduate</MenuItem>
                </Select>
            </FormControl>
            <TextField inputProps={{ name:"addr" }} value={schoolAddr} onChange={handleAddrChange} required={id===1} sx={{ mb: 1, minWidth: 600 }} fullWidth variant="filled" size="small" label="Address" color="primary" />
            { showDelete && <Button sx={{ maxWidth: 100 }}  onClick={() => { handleDeleteEducation(id)}} size="small" variant="contained" color="error" startIcon={<DeleteIcon />}> Delete </Button> }
        </FormControl>
    )
}




export default function EducationalDetails({ resetProfileForm }){
    const { profileData } = useContext(ProfileDataContext);

    const [ noOfSchool , setNoOfSchool ] = useState(1);
    const [ socList , setSocList ] = useState(profileData?.education.length === 0 ? [1] : profileData?.education.map(ed=>ed.id));
    const [ eduData , setEduData ] = useState(profileData.education ? profileData.education : []);
    
    const handleAddEducation = () => {
        if (socList.length < 4){
            let addSoc = [...socList, noOfSchool + 1];
            setSocList(addSoc);
            setNoOfSchool((noOfSchool) => noOfSchool + 1);
        }
    }

    const handleDeleteEducation = (id) =>{
        if (noOfSchool-1 >= 0){
            let addSoc = socList.filter((val, indx)=> (val!==id));
            let newData = eduData.filter((val, indx) => (val.id !== id ));
            profileData.education = newData;
            setSocList(addSoc);
            setEduData(newData);
        }
    }

    const addEduData = (data) => {
        if (data){
            let newData = [data, ...eduData.filter((val, indx) => (val.id !== data.id ))];
            profileData.education = newData;
            setEduData(newData);
        }
    }

    useEffect(()=>{
        socList.sort();
        eduData.sort((a,b)=> (a.id - b.id));
    },[])

    useEffect(()=>{
        if (resetProfileForm){
            setEduData([]);
        }
    }, [resetProfileForm]);

    return(
        <>  
            {socList.map((val, indx)=> (
                <SoCDetails key={`Soc_${val}`} edudata={eduData.find(value=>value.id===val)} id={val} handleAddEduData={addEduData} showDelete={val!==1} handleDeleteEducation={handleDeleteEducation}/>
            ))}
            {socList.length<4 ? 
                <div style={{ mb: 1, width: "100%", maxWidth: 600, display: "flex", flexDirection: "row-reverse" }}>
                    <Button sx={{  }} variant="contained" startIcon={<AddCircleOutlineIcon/>} onClick={handleAddEducation} size="small">Add Education</Button>
                </div>            
            : ''}
        </>
    )
}