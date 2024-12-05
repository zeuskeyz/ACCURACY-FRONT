import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import toast from 'react-hot-toast'
import SaleCard from '../components/SaleCard'

const SalesSummary = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        Axios.get("sales").then(res => setData(res.data)).catch(error => toast.error(error.message))
    }, [data])


    return (
        <div className="container">

                <div className="row">
                    {data.map(item => <SaleCard info={item} key={item._id}/>)}
                </div>

        </div>
    )
}

export default SalesSummary
