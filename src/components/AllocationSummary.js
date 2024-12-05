import { useContext, useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Axios from 'axios'
import Accordion from './Accordion'
import toast from 'react-hot-toast'
import { UserContextCreator } from '../context/UserContext'

const AllocationSummary = () => {
    const {user} = useContext(UserContextCreator)
    const [data, setData] = useState({})
    const { id } = useParams()

    const getDays = (timestamp) => {
        const updateDate = new Date(timestamp);
        const currentDate = new Date();
        const diffInMs = currentDate - updateDate;
        return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    };

    useEffect(() => {
        Axios.get(`allocations/me/${id}`).then(res => setData(res.data)).catch(error => toast.error(error.message))
    }, [data])

    const handleClick = (e) => {
        Axios.post(`allocations/me/${id}`, {}).then(res => toast.success(res.data)).catch(res => toast.error(res.data))
    }

    return (
        <div className="card border border-none">

            <div className="card-body shadow-lg">

                <div className="container d-flex justify-content-between shadow">
                    <h6 className='card-title text-uppercase my-3 display-md-6'>ALLOCATION : {data.number} </h6>
                    <h6 className="card-title text-uppercase my-3 display-md-6"> MARKET - {data.market} </h6>
                </div>

                <div className="accordion accordion-flush my-3 shadow" id='serialsAccordion'>

                    {data.items?.map(item => <Accordion accordData={item} key={item._id} />)}

                </div>

                <div className="container mb-3 d-flex justify-content-between align-items-baseline shadow">
                    { user.role === 'MarketOwner' ?
                        <>
                            <button className={`btn btn-primary text-uppercase my-2 ${data.status !== 'issued' ? 'd-none': 'd-block'}` }onClick={handleClick}>  DISPATCH </button>
                            <button className={`btn btn-primary text-uppercase my-2 ${data.status !== 'issued' ? 'd-block': 'd-none'}` } onClick={handleClick}> CLOSE </button>
                        </>
                        : data.status === 'dispatched' ? <button className={`btn btn-primary text-uppercase my-2 ${data.status !== 'issued' ? 'd-block': 'd-none'}` } onClick={handleClick}> RECEIVE </button>
                        : <NavLink to= {`/sales/${id}`} className={`btn btn-outline-primary text-uppercase my-2 ` }>  SELL </NavLink>
                    }
                    <div className="fst-italic">
                        {
                            user.role === 'MarketOwner' ?
                            <>
                                <small>issued by: <span className='text-uppercase fw-bold'> {data.creator}</span> </small>
                                <small>{getDays(data.createdAt)} {getDays(data.createdAt) === 1 ? 'day' : 'days'} ago. </small>
                            </> :

                            <>
                                <small>sent by: <span className='text-uppercase fw-bold'> {data.owner}</span> </small>
                                <small>{getDays(data.createdAt)} {getDays(data.updateDate) === 1 ? 'day' : 'days'} ago. </small>
                            </>        
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}

export default AllocationSummary
