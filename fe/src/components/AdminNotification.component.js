import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from 'react-bootstrap';
import { createNotification } from '../services/admin.service'
import Alert from '@mui/material/Alert';

const AdminNotification = () => {
    const [notification, setNotification] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const handlerSubmit = () => {
        if (JSON.parse(localStorage.getItem('USER')) && notification !== '') {
            createNotification(notification)
                .then((res) => {
                    if (res.status === 201) {
                        setShowSuccessAlert(true);
                        setTimeout(() => {
                            setShowSuccessAlert(false);
                        }, 3000);
                    }
                })
        }
    }
    return (
        <div>
            <div style={{ marginLeft: 470, marginBottom: 30 }}>
                <h2>Create Notification</h2>
            </div>
            <TextField
                id="outlined-textarea"
                label="Notification"
                placeholder="..."
                multiline
                style={{ marginLeft: 500, marginBottom: 40 }}
                size='medium'
                value={notification} onChange={(e) => setNotification(e.target.value)}
            />
            <div style={{ marginLeft: 560 }}>
                <Button className='btn btn-primary' onClick={(e) => handlerSubmit()}>Create</Button>
            </div>
            {showSuccessAlert && <Alert severity="success">Create notification successfully, Notification sent to users!</Alert>}

        </div>

    )
}

export default AdminNotification