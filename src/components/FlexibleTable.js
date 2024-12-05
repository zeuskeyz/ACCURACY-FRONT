import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import Paginations from './Paginations';
import { NavLink } from 'react-router-dom';
import MissingInfoAlert from './MissingInfoAlert';
import toast from 'react-hot-toast';

const FlexibleTable = ({ columns, dataPath, editPath, deletePath, itemsPerPage = 5, button }) => {

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => { fetchData()}, [dataPath]);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        Object.values(item).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
      )
    ); setCurrentPage(1);
  }, [searchTerm, data]);

  const fetchData = async () => {
    try {
      const response = await axios.get(dataPath);
      setData(response.data);
    } catch (error) {
      toast.error('Error fetching data:', error);
    }
  };

  const handleEdit = (itemId) => {
    console.log('Edit item:', itemId);
    // TODO: Implement edit functionality
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${deletePath}/${itemId}`);
      fetchData();
      toast.success('item deleted successfully')
    } catch (error) {
      toast.error('Error deleting item:', error);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const onPageChange = (pageNumber) => { setCurrentPage(pageNumber) };

  return (
    <>
    { !data.length ? <MissingInfoAlert path={button.path} linkText={button.text}/>  :
    <div className="container mt-4">
      <div className='d-flex justify-content-between mb-3 align-items-baseline'>
        <div className="">
          <Button variant='light' ><NavLink className="text-decoration-none text-dark" to={button.path}>{button.text} <i className={button.icon}></i> </NavLink></Button>
        </div>
        <div className=''>
          <InputGroup className="">
            <Form.Control placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          </InputGroup>
        </div>

      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item._id}>
              {columns.map((column, index) => (
                <td key={index}>{item[column.key]}</td>
              ))}
              <td>
                <Button variant="primary" size="sm" className="me-2" onClick={() => handleEdit(item._id)}>
                  <i className="bi bi-pencil-square"></i>
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center">
        <Paginations
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
    }
    </>
  );
};

export default FlexibleTable;