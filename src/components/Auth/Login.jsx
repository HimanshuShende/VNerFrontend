import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';


const LoginPage = () => {
    let { loginUser, authErrorMsg, showLoginPopup } = useContext(AuthContext);

    const showLoadingCircle = () =>{
        return true;
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

                    <div className='login_providers'></div>

                    <div>Need an account? <Link to={"/signup"}>Sign Up</Link></div>
                </div>

            </div>
        </>
    )
}

export default LoginPage;