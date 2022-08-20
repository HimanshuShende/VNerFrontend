import { useContext, useState, useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import { Box, Chip, FilledInput, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ProfileDataContext } from '../../Context/CompleteProfileContext';



const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

function getStyles(exam, examNames, theme) {
    return {
        fontWeight:
        examNames.indexOf(exam) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}

export default function TargetExams({ resetProfileForm }){
    const { profileData, examNames } = useContext(ProfileDataContext);

    const [ exams , setExams ] = useState(typeof profileData?.target_exams === 'string' ? profileData?.target_exams.split(',') : profileData?.target_exams);
    const theme = useTheme();
    const handleChange = (event) => {
        const { target: { value }, } = event;
        let val = typeof value === 'string' ? value.split(',') : value;
        
        setExams(val);
        profileData.target_exams = val;
    };
    useEffect(()=>{
        if (resetProfileForm){
            setExams([]);
        }
    }, [resetProfileForm]);

    return (
        <FormControl fullWidth variant="filled" sx={{ mb: 1, minWidth: 300 }}>
            <InputLabel id="target-exams-label" size="small">Target Exam</InputLabel>
            <Select
                multiple
                inputProps={{ name:"target_exams" }}
                labelId="target-exams-label"
                id="target-exams-select"
                value={exams}
                label="Target Exam"
                input={<FilledInput id="select-multiple-chip" label="Chip" />}
                onChange={handleChange}
                MenuProps={MenuProps}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                        <Chip sx={{ mt: 1}} key={value} label={value} />
                        ))}
                    </Box>
                    )}
            >
                {examNames.map((val, indx) => (
                    <MenuItem 
                        value={val[1]}
                        key={`Exam_${val[1]}_${val[0]}_${indx}`}
                        style={getStyles(val[1], exams, theme)}
                    >
                        {val[1]}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}