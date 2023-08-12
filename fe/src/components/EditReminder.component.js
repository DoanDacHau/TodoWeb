import React from 'react'
import { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker'
import { useNavigate, useParams } from 'react-router-dom'
import Navbarr from './Navbar.component';
import { updateReminderById, getReminderByid } from '../services/reminder.service';
const EditReminder = () => {
    const { reminder_id } = useParams();
    const [categories, setCategories] = useState([]);
    const user = JSON.parse(localStorage.getItem('USER'));
    const getuserId = user.data.user_id;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState(new Date());
    const [priority, setPriority] = useState(0);
    const [cate, setCate] = useState(0);
    const listInputs = [title, description];

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/categories/my-reminder/${getuserId}`)
            .then(res => res.json())
            .then(data => {
                setCategories(data.data.categories.rows);
                setCate(data.data.categories.rows[0].category_id);
            })
    }, [getuserId])
    const checkValidate = () => {
        if (listInputs.every(listInput => listInput !== '')) {
            return true;
        } else {
            return false;
        }
    }
    useEffect(() => {
        getReminderByid(reminder_id)
            .then(res => {
                // JSON.stringify(res.data.data)
                setTitle(res.data.data.title)
                setDescription(res.data.data.description)
                setTime(res.data.data.due_date)
                setPriority(res.data.data.priority)
                setCate(res.data.data.category_id)
            })

    }, [reminder_id])
    const handleSubmit = () => {
        if (!checkValidate()) {
            alert('Hay nhap du thong tin')
        } else {
            if (JSON.parse(localStorage.getItem('USER'))) {
                const data = {
                    title: title,
                    description: description,
                    due_date: time,
                    priority: parseInt(priority),
                    status: 'Pending',
                    category_id: parseInt(cate),
                    user_id: JSON.parse(localStorage.getItem('USER')).data.user_id
                }
                updateReminderById(reminder_id, data)
                    .then((res) => {
                        alert('Update Successfull')
                        window.location.reload();
                        navigate(-1);
                    })

            } else {
                navigate('/api/v1/auth');
            }
        }
    }
    const handerBack = () => {
        navigate(-1)
    }
    return (
        <>
            <Navbarr />
            <br />
            <div className="container">
                <div className="reminder-title" style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h3>Update reminder</h3>
                </div>

                <div>
                    <div className="input">
                        <label htmlFor="contact">Title</label>
                        <input id="contact" type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <span style={{ color: 'red', display: 'none', fontSize: '12px' }} className='error'>Please enter title</span>
                    </div>
                    <div className="input">
                        <label htmlFor="price">Description</label>
                        <textarea id="price" type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <span style={{ color: 'red', display: 'none', fontSize: '12px' }} className='error'>Please enter description</span>
                    </div>
                    <div style={{ margin: '20px 0' }}>
                        <span style={{ marginRight: '12px' }}>Dealine</span>
                        <DateTimePicker value={time} onChange={setTime} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <span>Priority</span>
                        <select onChange={(e) => setPriority(e.target.value)} value={priority}>
                            <option value={0}>None</option>
                            <option value={1}>Low</option>
                            <option value={2}>Medium</option>
                            <option value={3}>High</option>
                        </select>

                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <span style={{ marginRight: '12px' }}>Categories</span>
                        <select onChange={(e) => setCate(e.target.value)} value={cate}>
                            {
                                categories.map(cate =>
                                    <option value={cate.category_id} key={cate.category_id}>{cate.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="button">
                        <button className="btn-cancel" onClick={e => handerBack(e)} >Cancel</button>
                        <button style={{ marginLeft: "6px" }} className="btn btn-primary" onClick={e => handleSubmit(e)}>Update</button>
                    </div>
                </div>

            </div>
        </>
    );
}

export default EditReminder