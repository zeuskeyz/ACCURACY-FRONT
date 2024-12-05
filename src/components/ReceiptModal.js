import React, { useState } from 'react'
import { FormInput } from './FormInput'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import toast from 'react-hot-toast'

const ReceiptModal = ({classNm}) => {
    const initData = { receipt:''}
    const [formData, setFormData] = useState(initData)


    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    const handleClick = e => {
       
        toast.success('SOLD SUCCESSSULLY');

    }
    
    return (
       
        <Form className={classNm}>                        
            <FormInput label='Enter Folio Number' type="text" name="receipt" value={formData.receipt} onChange={handleChange} required/>
            
            <div className='d-flex justify-content-between'>
                <button type="button" className="btn btn-secondary col-5" data-bs-dismiss="modal">CANCEL</button>

                <button type="button" className="btn btn-primary col-5" onClick={handleClick}>SUBMIT</button>
            </div>
        </Form>


    )
}

 export default ReceiptModal
