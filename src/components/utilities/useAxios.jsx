import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { authPrefix, INDIVIDUAL_TAB_LOGIN, refreshTokenUrl, REFRESH_TOKEN_RETRY, XsrfCookieName, XsrfHeaderName } from "./constants";

const baseUrl = "https://vnerapi.azurewebsites.net/";


const useAxios = () => {
    const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: {
            Authorization : `${authPrefix} ${authTokens?.access}`
        },
        xsrfCookieName: XsrfCookieName,
        xsrfHeaderName: XsrfHeaderName
    }) 

    axiosInstance.interceptors.request.use(async req => {
        
        const user = jwt_decode(authTokens?.access);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
        console.log("isExpired : ", isExpired);
        if (!isExpired){ return req; }
    
        console.log("Retrying to login...")
        let resp;
        try{
            resp = await axios.post(refreshTokenUrl, {
                refresh: authTokens.refresh
            })
        }catch(err){
            if(err.response){
                if (err.response.data.code === "token_not_valid" || err.response.status === 401 ){
                    console.log("401 Unauthorized...")
                    resp = await axios.post(refreshTokenUrl, {
                        refresh: authTokens.refresh
                    })
                }
            }
        }
        
        
        if (INDIVIDUAL_TAB_LOGIN) { 
            sessionStorage.setItem("authTokens", JSON.stringify(resp.data))
        }
        else {
            localStorage.setItem("authTokens", JSON.stringify(resp.data))
        }

        setAuthTokens(resp.data)
        setUser(jwt_decode(resp.data.access))

        req.headers.Authorization = `${authPrefix} ${resp.data.access}`;
        return req
    })

    return axiosInstance
}

export default useAxios;