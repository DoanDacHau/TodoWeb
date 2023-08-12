import React, { useEffect, useState } from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAllUser, updateStatusUser } from '../services/admin.service'
import { Link } from 'react-router-dom';
import { FormLabel } from 'react-bootstrap';
import TablePagination from './Pagination.component';
import Alert from '@mui/material/Alert';
import { Modal, Button } from 'react-bootstrap'



const AdminUser = () => {

    const [users, setUsers] = useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [show, setShow] = useState(false);
    const [selectedUid, setSelectedUid] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (uid) => {
        setSelectedUid(uid);
        setShow(true);
    };
    useEffect(() => {
        getAllUser()
            .then(res => {
                setUsers(res.data.data.rows)
            })
    })
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // số lượng hàng trong mỗi trang

    // Tính toán số trang dựa trên dữ liệu tổng cộng
    const totalPages = Math.ceil(users.length / itemsPerPage);

    // Lấy danh sách dữ liệu cho trang hiện tại
    const currentData = users.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Xử lý sự kiện thay đổi trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDelete = () => {
        if (selectedUid) {
            updateStatusUser(selectedUid)
                .then((res) => {
                    if (res.status === 204) {
                        setShowSuccessAlert(true);
                        setTimeout(() => {
                            setShowSuccessAlert(false);
                        }, 3000);
                    }
                });
        }
        handleClose();
    };
    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Ban & Unban User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    When you click, you will Ban or Unban the user of your choice
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => handleDelete()}>Save</Button>
                </Modal.Footer>
            </Modal>
            <div style={{ marginLeft: 470, marginBottom: 30 }}>
                <h2>All User</h2>
            </div>
            <TableContainer component={Paper} style={{ justifyContent: 'center' }}>
                <Table aria-label="collapsible table" style={{ width: 1000 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>ID</TableCell>
                            <TableCell align="center">First Name</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Role</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            currentData.map((u, i) => {
                                return (
                                    <TableRow key={u.user_id}>
                                        <TableCell align="right"></TableCell>
                                        <TableCell component="th" scope="row">
                                            {i += 1}
                                        </TableCell>
                                        <TableCell align="center">{u.first_name}</TableCell>
                                        <TableCell align="center">{u.last_name}</TableCell>
                                        <TableCell align="center">{u.email}</TableCell>
                                        <TableCell align="center">{u.role_id === 1 ? "Admin" : u.role_id === 2 ? "User" : ""}</TableCell>
                                        <TableCell align="center">{u.status === 1 ? <FormLabel style={{ color: 'green' }}>Active</FormLabel> : u.status === 2 ? <FormLabel style={{ color: 'red' }}>Inactive</FormLabel> : ""}</TableCell>
                                        <TableCell align="center">
                                            {
                                                u.status === 1 ? <Link className='btn btn-danger' onClick={(e) => handleShow(u.user_id)}>Ban</Link> : u.status === 2 ? <Link className='btn btn-success' onClick={(e) => handleShow(u.user_id)}>Unban</Link> : ""
                                            }

                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>

                </Table>
                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </TableContainer>
            {showSuccessAlert && <Alert severity="success">Successfully!</Alert>}

        </div>

    )
}

export default AdminUser