import axios from 'axios';

export const updateReminderById = async (reminder_id, data) => {
    return await axios.put(
        `http://localhost:5000/api/v1/reminders/${reminder_id}`,
        data
    )
}

export const getReminderByid = async (reminder_id) => {
    return await axios.get(`http://localhost:5000/api/v1/reminders/${reminder_id}`)
}
export const getAllReminderByUserId = async (reminder_id) => {
    return await axios.get(`http://localhost:5000/api/v1/reminders/u/${reminder_id}`)
}