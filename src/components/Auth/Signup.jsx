import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import { baseURL, XsrfCookieName, XsrfHeaderName } from '../utilities/constants';
import { validateEmail } from '../utilities/utility';


const SignupPage = () => {
    let { logoutUser, login } = useContext(AuthContext);
    const [ regMsg, setRegMsg ] = useState(null);
    const [ regError, setRegError ] = useState(false);
    const [ showPopup, setShowPopup ] = useState(false);
    const [ popupMsg, setPopupMsg ] = useState("Registering");

    
    const showLoadingCircle = () => {
        return popupMsg.includes("Registering") || popupMsg.includes("Logging in")
    }

    const validateEntries = (e) => {
        const fname = e.target.signup_fname;
        const lname = e.target.signup_lname;
        const email = e.target.signup_email;
        const pswd = e.target.signup_pswd;
        const confirmpswd = e.target.signup_confirmpswd;

        if (fname.value === ""){ 
            setRegMsg("First name cannot be left empty")
            setRegError(true);
            fname.focus();
            return false;
        }else if (lname.value === ""){ 
            setRegMsg("Last name cannot be left empty")
            setRegError(true);
            lname.focus();
            return false;
        }else if (email.value === ""){ 
            setRegMsg("Email cannot be left empty")
            setRegError(true);
            email.focus();
            return false;
        }else if (!validateEmail(email.value)){ 
            setRegMsg("Enter a valid email address")
            setRegError(true);
            email.focus();
            return false;
        }else if (pswd.value === ""){ 
            setRegMsg("Enter a password")
            setRegError(true);
            pswd.focus();
            return false;
        }else if (pswd.value.length < 6){ 
            setRegMsg("Password must contains atleast 6 character")
            setRegError(true);
            pswd.focus();
            return false;
        }else if (confirmpswd.value === ""){ 
            setRegMsg("Confirm the entered password")
            setRegError(true);
            confirmpswd.focus();
            return false;
        }else if (confirmpswd.value !== pswd.value){ 
            setRegMsg("Passwords do not match")
            setRegError(true);
            return false;
        }
        return true;
    }

    const registerUser = async (e) => {
        e.preventDefault();
        setRegError(false);
        setShowPopup(false);
        let validated = validateEntries(e);

        if (validated){
            setShowPopup(true)
            let formData = new FormData();
            formData.append("data", JSON.stringify({
                email: e.target.signup_email.value,
                first_name: e.target.signup_fname.value,
                last_name: e.target.signup_lname.value,
                password : e.target.signup_pswd.value
            }));
            // try{
            let response = await axios.post(`${baseURL}/v2/register/`, formData, {
                xsrfCookieName: XsrfCookieName,
                xsrfHeaderName: XsrfHeaderName
            })
            console.log("Register response : ", response)
            if (response.status === 200){
                let data = response.data;
                
                if (data["task_completed"]){
                    // setRegMsg(data["msg"]);
                    setPopupMsg(data["msg"]);
                    logoutUser();
                    setRegError(false);
                    setPopupMsg("Logging in...")
                    await login(e.target.signup_email.value, e.target.signup_pswd.value);
                    setShowPopup(false);
                    setPopupMsg("Registering...")
                    
                }else{
                    setShowPopup(false);
                    setPopupMsg("Registering");
                    if (data.provider){
                        setRegMsg(`User already registered using ${data.provider}`)
                    }else{
                        setRegMsg(data["msg"]);
                    }
                    setRegError(true);
                }
                
            }else{
                setRegMsg("Unexpected error occured!!!");
                setRegError(true);
                setShowPopup(false);
                setPopupMsg("Registering")
            }
            // }catch(e){
            //     setRegMsg("Unexpected error occured!!!");
            //     setRegError(true);
            //     setShowPopup(false);
            //     setPopupMsg("Registering")
            // }
            
            
        }
    }

    return (
        <>  
            { showPopup && 
                <div className='popup_container'>
                    <div className="popup">
                        {showLoadingCircle && <div className='loadingCircle'></div>}
                        <div className='loadingText'>
                            { popupMsg }
                            <span></span>
                        </div>
                    </div>
                </div>
            }
            <div className='signup_container'>

                <div className="signin_form">
                    <div className="form_title">Sign Up</div>
                    {regError &&
                        <div className='form_error'>
                            {regMsg}
                        </div>
                    }

                    <form onSubmit={registerUser}>
                        <div>
                            <label htmlFor="signup_fname">First Name <span>*</span> </label>
                            <input type="text" name="signup_fname" id="signup_fname" placeholder='Enter first name' />
                        </div>
                        <div>
                            <label htmlFor="signup_lname">Last Name <span>*</span> </label>
                            <input type="text" name="signup_lname" id="signup_lname" placeholder='Enter lirst name' />
                        </div>
                        <div>
                            <label htmlFor="signup_email">Email <span>*</span> </label>
                            <input type="email" name="signup_email" id="signup_email" placeholder='Enter email address' />
                        </div>
                        <div>
                            <label htmlFor="signup_pswd">Password <span>*</span> </label>
                            <input type="password" name="signup_pswd" id="signup_pswd" placeholder='Enter password' />
                        </div>
                        <div>
                            <label htmlFor="signup_confirmpswd">Confirm Password <span>*</span> </label>
                            <input type="password" name="signup_confirmpswd" id="signup_confirmpswd" placeholder='Confirm password' />
                        </div>
                        <div>
                            <input type="submit" value="Sign Up" />
                        </div>
                    </form>

                    <div className="form_seperator">
                        <hr />
                        <span>OR</span>
                        <hr />
                    </div>

                    <div className='login_providers'></div>

                    <div>Already a user? <Link to={"/signin"}>Log In</Link></div>
                </div>

            </div>
        </>
    )
}

export default SignupPage;