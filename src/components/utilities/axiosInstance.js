import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { authPrefix,  refreshTokenUrl, XsrfCookieName, XsrfHeaderName } from "./constants";

let authTokens = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null;

const baseUrl = "https://vnerapi.azurewebsites.net/";

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization : `${authPrefix} ${authTokens?.access}`
    },
    xsrfCookieName: XsrfCookieName,
    xsrfHeaderName: XsrfHeaderName
}) 

axiosInstance.interceptors.request.use(async req => {
    if (!authTokens){
        authTokens = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null;
        req.headers.Authorization = `${authPrefix} ${authTokens?.access}`;
    }
    
    const user = jwt_decode(authTokens?.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    console.log("isExpired : ", isExpired);
    if (!isExpired){ return req; }

    console.log("Intercepted the req")
    const resp = await axios.post(refreshTokenUrl, {
        refresh: authTokens.refresh
    })

    localStorage.setItem("authTokens", JSON.stringify(resp.data))
    req.headers.Authorization = `${authPrefix} ${resp.data.access}`;
    return req
})

export default axiosInstance;