import { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker'
import { useNavigate } from 'react-router-dom'
import moment from 'moment';


const NewReminder = () => {

    const [categories, setCategories] = useState([]);
    const user = JSON.parse(localStorage.getItem('USER'));
    const getuserId = user.data.user_id;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState(moment(new Date()).format('YYYY-MM-DD HH:mm'));
    const [priority, setPriority] = useState(0);
    const [cate, setCate] = useState(0);

    const listInputs = [title, description];

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/categories/my-reminder/${getuserId}`)
            .then(res => res.json())
            .then(data => {
                if(data.data.categories.rows.length !== 0) {
                    setCategories(data.data.categories.rows);
                    setCate(data.data.categories.rows[0].category_id);
                }
            })
    }, [getuserId])

    const closeModalReminder = () => {
        const modal = document.querySelector('.modal-reminder');
        modal.classList.remove('open');
    }

    const checkValidate = () => {
        if (listInputs.every(listInput => listInput !== '')) {
            return true;
        } else {
            return false;
        }
    }

    const createReminder = () => {
        console.log(time.toString());
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
                const option = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(data)
                }
                console.log(option.body);
                fetch('http://localhost:5000/api/v1/reminders', option)
                    .then(res => res.json())
                    .then((data) => {
                        if (data !== null) {
                            alert('Them reminder thanh cong');
                            window.location.reload();
                        }
                    })
            } else {
                navigate('/api/v1/auth');
            }
        }
    }


    return (
        <>
            <div className="modal-reminder">
                <div className="modal-container-reminder">
                    <div className="modal-reminder-title">
                        <h5>Create new reminder</h5>
                    </div>
                    <div>
                        <div className="input">
                            <label htmlFor="contact">Title: </label>
                            <input id="contact" type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <span style={{ color: 'red', display: 'none', fontSize: '12px' }} className='error'>Please enter title</span>
                        </div>
                        <div className="input">
                            <label htmlFor="price">Description: </label>
                            <textarea id="price" type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                            <span style={{ color: 'red', display: 'none', fontSize: '12px' }} className='error'>Please enter description</span>
                        </div>
                        <div style={{ margin: '20px 0' }}>
                            <span style={{ marginRight: '12px' }}>Deadline: </span>
                            <DateTimePicker value={time} onChange={setTime} />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <span>Priority: </span>
                            <select onChange={(e) => setPriority(e.target.value)}>
                                <option value={0}>None</option>
                                <option value={1}>Low</option>
                                <option value={2}>Medium</option>
                                <option value={3}>High</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <span style={{ marginRight: '12px' }}>Categories: </span>
                            <select onChange={(e) => setCate(e.target.value)}>
                                {
                                    categories.map(cate =>
                                        <option value={cate.category_id} key={cate.category_id}>{cate.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="button">
                            <button className="btn-cancel" onClick={closeModalReminder} >Cancel</button>
                            <button style={{ marginLeft: "6px" }} className="btn btn-primary" onClick={createReminder}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewReminder;