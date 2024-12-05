import { Pagination } from 'react-bootstrap';

const Paginations = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => onPageChange(i)}>
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
      <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>PREV</Pagination.Prev>
      {pageNumbers}
      <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>NEXT</Pagination.Next>
      <Pagination.Last onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} />
    </Pagination>
  );
};

export default Paginations;