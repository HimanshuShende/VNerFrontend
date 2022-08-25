import { useState, useContext, useRef, useEffect } from 'react';
import { Alert, Collapse, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import "./style.css";

import PersonalDetails from './PersonalDetails';
import EducationalDetails from './EducationalDetails';
import TargetExams from './TargetExams';
import SelectRole from './SelectRole';
import { ProfileDataContext } from '../../Context/CompleteProfileContext';
import { validateEducationDetails, validatePersonalDetails, validateSelectedRoleDetails, validateTargetExamsDetails } from './Utils';

import useAxios from "../utilities/useAxios";
import { baseURL } from "../utilities/constants";
import { AuthContext } from '../../Context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

export default function CompleteProfile() {
  let { user, setProfileCompleted, profileCompleted, setUserRole } = useContext(AuthContext);
  console.log("profileCompleted : ", user?.profile_completed, profileCompleted)
  const { profileData, resetProfileData } = useContext(ProfileDataContext);
  const [completionMsg, setCompletionMsg] = useState(user?.profile_completed ? "Profile already completed" : "");
  const [resetProfileForm, setResetProfileForm] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [alertContent, setAlertContent] = useState("");
  const formElem = useRef(null);

  const API = useAxios();
  const navigate = useNavigate();

  const steps = [
    { label: 'Personal Details', content: <PersonalDetails resetProfileForm={resetProfileForm} /> },
    { label: 'Educational Details', content: <EducationalDetails resetProfileForm={resetProfileForm} /> },
    { label: 'Target Exams', content: <TargetExams resetProfileForm={resetProfileForm} /> },
    { label: 'Select Role', content: <SelectRole resetProfileForm={resetProfileForm} /> },
  ];

  const handleNext = () => {
    if (activeStep === 0) {
      let { validated, msg } = validatePersonalDetails(profileData);
      // validated =  true; msg = " sdad ";
      if (validated) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        setAlertContent(msg)
        setAlertOpen(true)
      }
    } else if (activeStep === 1) {
      let { validated, msg } = validateEducationDetails(profileData);
      // validated =  true; msg = " sdad ";
      if (validated) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        setAlertContent(msg);
        setAlertOpen(true);
      }
    } else if (activeStep === 2) {
      let { validated, msg } = validateTargetExamsDetails(profileData);
      // validated =  true; msg = " sdad ";
      if (validated) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        setAlertContent(msg);
        setAlertOpen(true);
      }
    } else if (activeStep === 3) {
      let { validated, msg } = validateSelectedRoleDetails(profileData);
      // validated =  true; msg = " sdad ";
      if (validated) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        setAlertContent(msg);
        setAlertOpen(true);
      }
    }

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setResetProfileForm(true);
    setActiveStep(0);
    resetProfileData();
    setResetProfileForm(false);
  };

  const handleProfileValidationError = (error) => {
    console.log(error);
  }

  const handleSubmit = (event) => {
    console.log("Submitted Data : ", profileData);
    event.preventDefault();

    const formData = new FormData();
    formData.append("profileData", JSON.stringify(profileData))
    API.post(`${baseURL}/v2/complete_profile/`, formData)
      .then(response => {
        // console.log("Resopnse : ", response.data)
        if (!response.data["task_completed"]) {
          handleProfileValidationError(response.data["error"]);

        } else {
          console.log("Profile Updated Successfully")
          setCompletionMsg(response.data["msg"]);
          user.profile_completed = true
          setTimeout(() => {
            setUserRole(response.data["role"])
            setProfileCompleted(true);
            navigate("/", { replace: true })
          }, 100);
        }
      })
      .catch(err => {
        console.log("error : ", err)
        setAlertContent("Unnexpected error occured!");
        setAlertOpen(true);
      })
    console.log("Form submitted");
  }
  // console.log(user)

  useEffect(() => {
    let timeOut;
    if (alertOpen) {
      timeOut = setTimeout(() => {
        if (alertOpen) { setAlertOpen(false) };
      }, 6000);
    }

    return () => {
      clearTimeout(timeOut);
    }
  }, [alertOpen])

  // useEffect(() => {
  //   API.get(`${baseURL}/v2/getUserDetails/`)
  //         .then(resp => {
  //             if (resp.data["task_completed"]) {
  //                 setProfileCompleted(resp.data["profile_completed"]);
  //             }
  //         })
  // }, [])

  useEffect(() => {
    // if (user?.profile_completed) {
    if (profileCompleted) {
      // navigate("/", { replace: true })
      setCompletionMsg("Profile already completed");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileCompleted])

  return (
    <>
      <div id="complete-profile">
        <Box sx={{ width: '100%' }}>
          <Collapse in={alertOpen}>
            <Alert
              severity="error"
              variant="filled"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlertOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{
                width: "100%",
                maxWidth: 400,
                margin: "0px auto",
                position: "absolute",
                right: 0,
                left: 0
              }}
            >
              {alertContent}
            </Alert>
          </Collapse>
        </Box>

        {completionMsg !== "" ?
          <div id="profile-form-header">
            {completionMsg}
            <br />
            <Link to="/" style={{ fontSize: "20px" }}>
              Go Home
            </Link>
          </div>
          :
          <form ref={formElem} action="" method="post" onSubmit={handleSubmit}>
            <Box sx={{ maxWidth: 700, width: "100%" }} id="profile-form">
              <div id="profile-form-header">
                Complete Profile
              </div>
              <Stepper activeStep={activeStep} sx={{ padding: "10px 15px" }} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel>
                      {step.label}
                    </StepLabel>
                    <StepContent>
                      <Box sx={{ mb: 2 }}>
                        {step.content}
                        <div>
                          <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }} >
                            {index === steps.length - 1 ? 'Finish' : 'Next'}
                          </Button>
                          <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }} >
                            Back
                          </Button>
                        </div>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3, minWidth: 600, width: "100%" }}>
                  <Typography>All steps completed - you&apos;re finished</Typography>
                  <Button type="submit" variant="contained" color="primary" sx={{ mt: 1, mr: 1 }}>
                    Submit
                  </Button>
                  <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Reset
                  </Button>
                </Paper>
              )}
            </Box>
          </form>
        }
      </div>
    </>
  );
}
