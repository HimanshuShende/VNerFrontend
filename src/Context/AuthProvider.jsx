import { useEffect, useState, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import { authPrefix, baseURL, INDIVIDUAL_TAB_LOGIN, tokenUrl, UserRoleType } from "../components/utilities/constants";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const getAuthToken = () => {
        if (INDIVIDUAL_TAB_LOGIN){
            return sessionStorage.getItem("authTokens");
        }else{
            return localStorage.getItem("authTokens");
        }
    }
    // const [ user, setUser ] = useState(() => localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null);
    // const [ authTokens, setAuthTokens ] = useState(() => localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null);
    // const [ user, setUser ] = useState(() => sessionStorage.getItem("authTokens") ? jwt_decode(sessionStorage.getItem("authTokens")) : null);
    // const [ authTokens, setAuthTokens ] = useState(() => sessionStorage.getItem("authTokens") ? JSON.parse(sessionStorage.getItem("authTokens")) : null);

    const [ user, setUser ] = useState(() => getAuthToken() ? jwt_decode(getAuthToken()) : null);
    const [ authTokens, setAuthTokens ] = useState(() => getAuthToken() ? JSON.parse(getAuthToken()) : null);
    const [ loading, setLoading ] = useState(true);
    const [ profileCompleted, setProfileCompleted ] = useState(false);
    const [ userRole, setUserRole ] = useState(UserRoleType.NOT_SELECTED);
    const [ authErrorMsg, setAuthErrorMsg ] = useState(null);

    const [ showLoginPopup, setShowLoginPopup ] = useState(false);


    const navigate = useNavigate();
    const location = useLocation();

    const getIsProfileCompleted = async (tempUser, access_key) => {
        let resp_profile = await fetch(`${baseURL}/v2/isProfileCompleted/`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `${authPrefix} ${access_key}`
            },
        })
        let tempData = await resp_profile.json()
        setUser({ ...tempUser, profile_completed: tempData["profile_completed"] })
        setProfileCompleted(tempData["profile_completed"]);
        return tempData
    }

    const getUserRole = async (tempUser, access_key) => {
        let resp_role = await fetch(`${baseURL}/v2/getUserRole/`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `${authPrefix} ${access_key}`
            },
        })
        let roleData = await resp_role.json()
        setUser({ ...tempUser, userRole: roleData["role"] })
        setUserRole(roleData["role"]);
        return roleData
    }

    const login = async (email, pswd) => {
        let response = await fetch(tokenUrl,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "email": email, "password": pswd })
        })

        let data = await response.json();
        
        if (response.status === 200){
            setAuthTokens(data);
            const tempUser = jwt_decode(data.access)
            // console.log(tempUser)
            setUser(tempUser);
            setUserRole(tempUser["userRole"]);

            if(INDIVIDUAL_TAB_LOGIN){
                sessionStorage.setItem("authTokens", JSON.stringify(data))
            }else{
                localStorage.setItem("authTokens", JSON.stringify(data))
            }
            
            let profile_completed_result = await getIsProfileCompleted(tempUser, data.access)
            // console.log(profile_completed_result)
            if (!profile_completed_result["profile_completed"]){
                console.log("Redirect to complete profile.....")
                navigate("/complete_profile", { replace: true })
            }else{

                await getUserRole(tempUser,data.access);

                if (location.search !== ""){
                    console.log("Redirecting.....")
                    let next = location.search.split("=").pop();
                    navigate(next, { replace: true })
                }else{
                    console.log("Redirecting to home.....")
                    navigate("/", { replace: true })
                }
            }         
            
            
        }else if(response.status === 401){
            setAuthErrorMsg("Invalid email and/or password.");
        }else{
            setAuthErrorMsg("Something went wrong");
        }
    }

    const loginUser = async (e) =>{
        e.preventDefault();
        setShowLoginPopup(true);

        await login(e.target.login_email.value, e.target.login_pswd.value);
        
        setShowLoginPopup(false);
    }

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        if (INDIVIDUAL_TAB_LOGIN){
            sessionStorage.removeItem("authTokens");
        }else{
            localStorage.removeItem("authTokens");
        }
    }

    let authContextData = {
        user:user,
        login: login,
        setUser: setUser,
        userRole:userRole,
        setUserRole: setUserRole,
        loginUser: loginUser,
        logoutUser: logoutUser,
        authTokens: authTokens,
        authErrorMsg: authErrorMsg,
        setAuthTokens:setAuthTokens,
        showLoginPopup: showLoginPopup,
        profileCompleted: profileCompleted,
        setProfileCompleted: setProfileCompleted
    }

    useEffect(()=>{        
        if (authTokens){
            setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={authContextData}>
            {loading ? null : children }
        </AuthContext.Provider>
    )
}
