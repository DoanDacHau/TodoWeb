import { Col, Container, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import Navbarr from "./Navbar.component";

const Noti = () => {
    const [noti, setNoti] = useState([]);

    const user = JSON.parse(localStorage.getItem('USER'));
    const getuserId = user.data.user_id;
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

    return (
        <Container fluid>
            <Navbarr />
            <Row>
                <Col xs={12} md={10}>
                    <Row>
                        <Col xs={12}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th><h2>Notification</h2></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        noti.map(c => {
                                            return (
                                                <tr key={c.id}>
                                                    <td>{c.content}
                                                    </td>
                                                </tr>)
                                        }
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
export default Noti