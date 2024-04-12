const valid = ({ fullname, mobile, email, password }) => {
    const err = {}

    if (!fullname) {
        err.fullname = "Please add your full name."
    } else if (fullname.length > 25) {
        err.fullname = "Full name is up to 25 characters long."
    }

    if (!mobile) {
        err.mobile = "Please add your mobile number."
    } else if (!validateMobile(mobile)) {
        err.mobile = "Mobile number format is incorrect."
    }

    if (!email) {
        err.email = "Please add your email."
    } else if (!validateEmail(email)) {
        err.email = "Email format is incorrect."
    }

    if (!password) {
        err.password = "Please add your password."
    } else if (password.length < 6) {
        err.password = "Password must be at least 6 characters."
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateMobile(mobile) {
    const re = /^[6-9]\d{9}$/; // Only Indian mobile numbers are considered for validation
    return re.test(String(mobile));
}

export default valid;
