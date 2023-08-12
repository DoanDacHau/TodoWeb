import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const TablePagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageItems = [];

  // Tạo danh sách các trang
  for (let page = 1; page <= totalPages; page++) {
    pageItems.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => onPageChange(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  return (
    <Pagination style={{marginTop:20,marginLeft:20,justifyContent:'center'}}>
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      {pageItems}
      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </Pagination>
  );
};

export default TablePagination;
