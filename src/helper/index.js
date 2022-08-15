
import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const baseURL = "https://vnerapi.azurewebsites.net/api";

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false
    }

    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    return false
}

export const signup = async formData => {
    try {

        const response = axios.post(`${baseURL}/`, formData);
        return (await response).data.json();
    }
    catch (error) {
        return console.log(error)
    }
}

export const signin = async formData => {
    try {
        const response = axios.post(`${baseURL}/token/`, formData);
        return (await response).data.json()
    }
    catch (error) {
        return console.log(error)
    }
}

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data["data"]["access"]))
        next()
    }
}