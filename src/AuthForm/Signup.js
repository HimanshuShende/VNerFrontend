import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { signup, isAuthenticated } from '../helper/index'


const Signup = () => {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const { firstName, lastName, email, password, error, success } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const performRedirect = () => {
        if (isAuthenticated()) {
            return <Navigate to="/" />
        }
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false })
        signup({ firstName, lastName, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setValues({
                        ...values,
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    })
                }
            })
            .catch(error => {
                setValues({ ...values, error: error, success: false })
                console.log("Error in signup")
            })
    }

    const signupForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    {successMessage()}
                    {errorMessage()}
                    <form>
                        <div className="form-group">
                            <label className="text-white">First name</label>
                            <input
                                className="form-control"
                                onChange={handleChange("firstName")}
                                type="text"
                                value={firstName}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-white">Last name</label>
                            <input
                                className="form-control"
                                onChange={handleChange("lastName")}
                                type="text"
                                value={lastName}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-white">Email</label>
                            <input
                                className="form-control"
                                onChange={handleChange("email")}
                                type="email"
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-white">Password</label>
                            <input
                                className="form-control"
                                onChange={handleChange("password")}
                                type="password"
                                value={password}
                            />
                        </div>
                        <button onClick={onSubmit} className="btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    const successMessage = () => {
        return (
            <div
                className="alert alert-success"
                style={{ display: success ? "" : "none" }}
            >
                New account was created successfully.
                Please <Link to="/signin">Login here</Link>
            </div>)
    }

    const errorMessage = () => {
        if (error) {
            return (
                <div
                    className="alert alert-danger"
                >
                    {error}
                </div>)
        }
    }

    return (
        
            <div>
            {signupForm()}
            {performRedirect()}
            </div>
        
    )
}

export default Signup