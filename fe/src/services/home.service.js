import axios from 'axios';

export const myList = async (user_id) => {
    return await axios.get(
        `http://localhost:5000/api/v1/categories/my-reminder/${user_id}`
    )
}
export const updateCategories = async (cateId,data) => {
    return await axios.put(
        `http://localhost:5000/api/v1/categories/${cateId}`,
        {
            data
        }
    )
}