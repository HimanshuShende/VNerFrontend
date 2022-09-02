import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';

export function googleLogin(accessToken) {
    axios
      .post(`http://127.0.0.1:8000/auth/convert-token`, {
        token: accessToken,
        backend: "google-oauth2",
        grant_type: "convert_token",
        "client_id": "CZ3UDpI141q7xoXnlWA15eSbNP8pfot5RRDQlOqs",
        "client_secret": "7sXNME1i0VTmhVpIWmYZ5t1Ri4v63prOnxFORMEAs4M5eSKQam2y7GvSWM8BKBOafhg9Uo8gGtP8tpxLMKsc6RiNIdkNilcUHE3wqmCRWv8gDQmk71fGJhxbLH9F1HvJ",
      })
      .then((res) => {
       // Save somewhere these access and refresh tokens
        console.log("convert-token response : ", res);
        console.log("convert-token response : ", res.data);
      });
   }

const LoginPage = () => {
    let { loginUser, authErrorMsg, showLoginPopup } = useContext(AuthContext);

    const showLoadingCircle = () =>{
        return true;
    }

    function responseGoogle(response) {
        console.log("Google token response: ", response);
        // googleLogin(response.accessToken);
    }
    return (
        <>
            { showLoginPopup && 
                <div className='popup_container'>
                    <div className="popup">
                        {showLoadingCircle() && <div className='loadingCircle'></div>}
                        <div className='loadingText'>
                            Logging you in
                            <span></span>
                        </div>
                    </div>
                </div>
            }
            <div className='signin_container'>

                <div className="signin_form">
                    <div className="form_title">Login</div>
                    
                    { authErrorMsg && 
                        <div className='form_error'>
                            {authErrorMsg}
                        </div>
                    }

                    <form onSubmit={loginUser}>
                        <div>
                            <label htmlFor="login_email">Email</label>
                            <input type="email" name="login_email" id="login_email" placeholder='Enter email address' />
                        </div>
                        <div>
                            <label htmlFor="login_pswd">Password</label>
                            <input type="password" name="login_pswd" id="login_pswd" placeholder='Enter password' />
                        </div>
                        <div>
                            <input type="submit" value="Login" />
                        </div>
                    </form>

                    <div className="form_seperator">
                        <hr />
                        <span>OR</span>
                        <hr />
                    </div>

                    <div className='login_providers'>
                        {/* clientId="195265870257-68m8nudqbsol51u6dgmqdhv6c8c8eo47.apps.googleusercontent.com" */}
                        <GoogleLogin
                            onSuccess={responseGoogle}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            ux_mode="popup"
                        />
                    </div>

                    <div>Need an account? <Link to={"/signup"}>Sign Up</Link></div>
                </div>

            </div>
        </>
    )
}

export default LoginPage;