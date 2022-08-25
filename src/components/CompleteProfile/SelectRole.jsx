import { useContext, useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ProfileDataContext } from '../../Context/CompleteProfileContext';

export default function TargetExams({ resetProfileForm }){
    const { profileData } = useContext(ProfileDataContext);
    
    const [ role , setRole ] = useState(profileData?.role);
    const handleChange = (event) => {
        setRole(event.target.value);
        profileData.role = event.target.value;
    };

    useEffect(()=>{
        if (resetProfileForm){
            setRole(0);
        }
    }, [resetProfileForm]);
    
    return (
        <FormControl fullWidth variant="filled" sx={{ mb: 1, maxWidth: 900, minWidth: 600 }}>
            <InputLabel id="select-role-label" size="small">Select Role</InputLabel>
            <Select
                inputProps={{ name:"role" }}
                labelId="select-role-label"
                id="select-role-select"
                value={role}
                label="Select Role"
                onChange={handleChange}
            >
                <MenuItem  value={0} key={`sr_ns`}>
                    Not Selected
                </MenuItem>
                <MenuItem  value={1} key={`sr_student`}>
                    Student
                </MenuItem>
                <MenuItem  value={2} key={`sr_examiner`}>
                    Examiner
                </MenuItem>
                {/* <MenuItem  value={3} key={`sr_both`}>
                    Both
                </MenuItem> */}
            </Select>
        </FormControl>
    )
}