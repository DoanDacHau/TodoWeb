import axios from 'axios';

export const register = async (
    firstName,
    lastName,
    email,
    password
) => {
    return await axios.post(
        'http://localhost:5000/api/v1/register',
        {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName
        }
    )
}

export const login = async (
    email,
    password
) => {
    return await axios.post(
        'http://localhost:5000/api/v1/login',
        {
            email: email,
            password: password
        }
    )
}

export const verifyCode = async (
    email,
    code
) => {
    return await axios.post(
        'http://localhost:5000/api/v1/verification',
        {
            email: email,
            code: code
        }
    )
}

export const getOne = async (roleId) => {
    return await axios.get(
        'http://localhost:5000/api/v1/role',
        {
            params: {
                id: roleId
            }
        }
    )
}