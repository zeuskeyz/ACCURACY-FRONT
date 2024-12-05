import React, { useState } from 'react';
import axios from 'axios';
import { FormInput } from '../components/FormInput';
import { Buttons } from '../components/Buttons';
import { FormHeader } from '../components/FormHeader';
import toast from 'react-hot-toast';

const NewPhone = () => {
    const formInits = { name: '', code: '', cash: '', deposit: '' }
    const [formData, setFormData] = useState(formInits);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(formData)

        try {
            const resp = await axios.post('/phones/new', formData);
            toast.success(resp.data?.message);
            setFormData(formInits);
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred while creating the phones.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container my-3">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">

                            <FormHeader text= 'NEW PHONES' path= '/phones' />

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <FormInput label='Phone Name' type="text" name="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <FormInput label='Phone Code' type="text" name="code" value={formData.code} onChange={handleChange} required />
                                </div>
                                <div className="mb-4">
                                    <FormInput label='Cash Price' type="text" name="cash" value={formData.cash} onChange={handleChange} required />
                                </div>
                                <div className="mb-4">
                                    <FormInput label='LMM Deposit' type="text" name="deposit" value={formData.deposit} onChange={handleChange} required />
                                </div>

                                <div className="d-grid mb-3">
                                    <Buttons type='submit' value={isLoading ? 'Submitting...' : 'Submit'} disabled={isLoading} />
                                </div>

                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPhone;