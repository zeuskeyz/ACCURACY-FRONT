import { useEffect, useState } from "react";
import Axios from 'axios'
import { NavLink, Outlet } from "react-router-dom";
import Search from "./Search";
import Paginations from "./Paginations";


const ListItems = () => {
    const itemsPerPage = 5
    const [items, setItems] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (pageNumber) => { setCurrentPage(pageNumber) };

    useEffect(() => {
        Axios.get('allocations/me').then(res => setItems(res.data))
    }, [])

    //Search  
    useEffect(() => {
        setFilteredData(
            items.filter((item) =>
                Object.values(item).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
            )
        ); setCurrentPage(1);
    }, [searchTerm, items]);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div>
            <div className="d-flex justify-content-between my-3">
                <div className=""> </div>

                <div className=""> 
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
            </div>
            
            <nav className="nav nav-pills nav-fill mb-md-1 flex-column flex-sm-row text-center">
                {
                    currentItems.map( item => <li className="nav-item pe-1" key={item._id}> <NavLink to={`${item._id}`} className="nav-link text-uppercase shadow-lg mb-2 "> {item.market} {item.number} </NavLink> </li>)
                }
            </nav>

           <div className="py-3"> 
                <Outlet/>
            </div>

            <div className="d-flex justify-content-center pt-md-3"> 
                <Paginations currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            </div>
        
        </div>
        
    );
};

export default ListItems;