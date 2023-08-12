import axios from 'axios';

export const getAllUser = async () => {
    return await axios.get(
        `http://localhost:5000/api/v1/user/all`
    )
}
export const createNotification = async (content) => {
    return await axios.post(
        `http://localhost:5000/api/v1/notifications/c/`,
        {
            content
        }
    )
}
export const updateStatusUser = async (uid) => {
    return await axios.put(
        `http://localhost:5000/api/v1/user`,
        {
            uid
        }
    )
}