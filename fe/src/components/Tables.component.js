import { React, useState } from "react";
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import '../styles/Table.style.css'
import moment from 'moment';
import TablePagination from './Pagination.component';

const Tables = (props) => {
    const { header, data, handleDelete } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // số lượng hàng trong mỗi trang

    // Tính toán số trang dựa trên dữ liệu tổng cộng
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Lấy danh sách dữ liệu cho trang hiện tại
    const currentData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Xử lý sự kiện thay đổi trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <>
            <h1>
                {header}
            </h1>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Title</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Priority</th>
                        <th scope='col'>Due Date</th>
                        <th scope='col'>Create Date</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {
                        currentData.map(r => {
                            return (
                                <tr key={r.reminder_id}>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div className='ms-3'>
                                                <p className='fw-bold mb-1'>{r.title}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{r.description}</p>
                                    </td>
                                    <td>
                                        {
                                            r.status === "Completed" ? <MDBBadge color='success' pill>
                                                Completed
                                            </MDBBadge> : <MDBBadge color='warning' pill>
                                                Pending
                                            </MDBBadge>
                                        }
                                    </td>
                                    <td>
                                        {r.priority === 1
                                            ? <span style={{ color: "green" }}>Low</span>
                                            : r.priority === 2
                                                ? <span style={{ color: "orange" }}>Medium</span>
                                                : <span style={{ color: "red" }}>Hight</span>
                                        }
                                    </td>
                                    <td>{moment(r.due_date).format("DD/MM/YYYY")}</td>
                                    <td>{moment(r.create_date).format("DD/MM/YYYY")}</td>
                                    <td>
                                        <Link className='btn btn-primary m-3' to={`/api/v1/reminders/${r.reminder_id}`}>Edit</Link>
                                        <button className="btn btn-danger" onClick={() => handleDelete(r.reminder_id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>

                            )
                        })
                    }
                </MDBTableBody>
            </MDBTable>
            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
}
export default Tables