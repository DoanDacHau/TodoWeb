import React, { useState, useEffect } from 'react';
import { Dropdown, Nav } from 'react-bootstrap';
import { FcAdvertising } from 'react-icons/fc'
import { Link } from 'react-router-dom';

const NotiHome = () => {
    const [noti, setNoti] = useState([]);

    const user = JSON.parse(localStorage.getItem('USER'));
    const getuserId = user.data.user_id;

    // const changeStatus = (t) => {

    //     const newNoti = {
    //         "id":1
    //     };

    //     fetch('http://localhost:5000/api/v1/notifications/u/'+getuserId, {
    //         method: 'POST',
    //         headers: {'Content-Type':'Application/Json'},
    //         body: JSON.stringify(newNoti)
    //     })
    //     .then((e)=>{
    //         e.preventDefault();
    //     })
    //  }
    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/notifications/${getuserId}`, {
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(a => {
                setNoti(a.data.notification.rows);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, [getuserId]);
    const maxRows = 5;
    const countByAttribute = (attribute) => {
        const count = noti.filter(item => item.status === attribute).length;
        return count;
    };
    const slicedData = noti.slice(0, maxRows);

    return (
        <>

            <Dropdown as={Nav.Item}>
                <Dropdown.Toggle
                    as={Nav.Link}
                    data-toggle="dropdown"
                    id="dropdown-67443507"
                    variant="default"
                    className="m-0"
                // onClick={(t)=>changeStatus(t)}
                >
                    <i className="nc-icon nc-planet"></i>
                    <FcAdvertising style={{ height: '30px', width: '30px' }} variant="primary" />
                    <span className="notification">{countByAttribute(1)}</span>
                    <span className="d-lg-none ml-1">Notification</span>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ transform: 'translateY(0px) translateX(-250px)' }}>
                    <h3 style={{ textAlign: "center" }}>Notification</h3>
                    <hr />
                    {
                        slicedData.map((i) => {
                            return (
                                <Dropdown.Item key={i.id}>
                                    {i.content}
                                </Dropdown.Item>
                            )
                        })
                    }
                    <hr />
                    <div style={{ textAlign: "center" }}>
                        <Link to={'/api/v1/app/viewallnotification'}  >View All</Link>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );

}
export default NotiHome
