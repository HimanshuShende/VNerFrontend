export const testBaseURL = "http://127.0.0.1:8000/api";
export const baseURL = "https://vnerapi.azurewebsites.net/api";
// export const baseURL = testBaseURL;
export const tokenUrl = `${baseURL}/token/`;
export const refreshTokenUrl = `${baseURL}/token/refresh/`;
export const authPrefix = "Bearer";
export const XsrfCookieName = "csrftoken";
export const XsrfHeaderName = "X-CSRFTOKEN";
export const updateTokenIntervalTime = 1000 * 60 * 9;
export const INDIVIDUAL_TAB_LOGIN = false;
export const REFRESH_TOKEN_RETRY = 3;

export const UserRoleType = {
    NOT_SELECTED : 0,
    STUDENT : 1,
    EXAMINER : 2
} 

export const ExamLevel = {
    0: "Beginner",
    1: "Intermediate",
    2: "Advanced"
}

export const ExamTypeDetail = {
    "exam" : {
        "examType": "exam",
        "pageTitle": {
            "single": "Exam",
            "plural": "Exams"
        },
        "URL": `${baseURL}/v2/examList/`,
        "fetchAll":`${baseURL}/v2/allExamList/`
    },
    "quiz" : {
        "examType": "quiz",
        "pageTitle": {
            "single": "Quiz",
            "plural": "Quizes"
        },
        "URL": `${baseURL}/v2/quizList/`,
        "fetchAll": `${baseURL}/v2/allQuizList/`
    }
}