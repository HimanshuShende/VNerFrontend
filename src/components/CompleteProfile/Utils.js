function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const validateEmail = (email) => {
    return email.match(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

export function validatePersonalDetails(data){
    if (data["first_name"] === ""){
        return { validated: false, msg: "First Name is required" }
    }
    if (data["last_name"] === ""){
        return { validated: false, msg: "Last Name is required" }
    }
    if (data["date_of_birth"] === ""){
        return { validated: false, msg: "Date of birth is required." }
    }
    if (getAge(data["date_of_birth"]) < 15){
        return { validated: false, msg: "Age must be more than 15 years." }
    }
    if (data["countryCode"] === "" || data["countryCode"] === 0 || data["countryCode"] === undefined){
        return { validated: false, msg: "Select country code." }
    }
    if (data["mobile"].length !== 11 && data["mobile"].length !== 10 ){
        return { validated: false, msg: "Mobile must contain 10 or 11 numbers excluding country code." }
    }
    if (!validateEmail(data["email"]) ){
        return { validated: false, msg: "Not a valid email address." }
    }
    return { validated: true, msg: ""}
}

export function validateEducationDetails(data){
    if (data["education"].length < 1) { return { validated: false, msg: "Atleast one school/college detail is required."}; }
    // const result = { validated: false, msg: "One of the filled detail of school/college is empty."};
    // for (var edu in data["education"]){
    //     if (data["education"][edu]["school"] === ""){ return result; }
    //     if (data["education"][edu]["grade"] === 0){ return result; }
    //     if (data["education"][edu]["addr"] === ""){ return result; }
    // }
    return { validated: true, msg: "" };
}

export function validateTargetExamsDetails(data){
    return { validated: data["target_exams"].length >= 1, msg : "Select atleast one exam." }
}

export function validateSelectedRoleDetails(data){
    return { validated: data["role"] !== 0, msg : "Select a role." }
}