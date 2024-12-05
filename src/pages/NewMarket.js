import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FormInput } from '../components/FormInput';
import { Buttons } from '../components/Buttons';
import { FormHeader } from '../components/FormHeader';
import { UserContextCreator } from '../context/UserContext';
import toast from 'react-hot-toast';

const NewMarket = () => {
    const formInits = { name: '', owner: '', seller: '', branchCode: '' }
    const [formData, setFormData] = useState(formInits);
    const [isLoading, setIsLoading] = useState(false);
    const [owners, setOwners] = useState([])
    const [sellers, setSellers] = useState([])

    const {user} = useContext(UserContextCreator)
    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const resp = await axios.post('/markets/new', formData);
            toast.success(resp.data);
            setFormData(formInits);
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred while creating the market.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { axios.get('/users/owners').then(resp => setOwners(resp.data))}, [owners])
    useEffect(() => { axios.get('/users/sellers').then(resp => setSellers(resp.data))}, [sellers])
    useEffect(() => {
        if (formData.seller !== '') {
          setFormData(prevState => ({...prevState, branchCode: user.branchCode}));
        }
    }, [formData.seller, user.branchCode]);

    return (
        <div className="container my-3">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">

                            <FormHeader text= 'NEW MARKET' path= '/markets' />

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <FormInput label='Market Name' type="text" name="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <FormInput label='Owner' type="select" name="owner" value={formData.owner} onChange={handleChange} options={owners} required />
                                </div>
                                <div className="mb-4">
                                    <FormInput label='Seller' type="select" name="seller" value={formData.seller} onChange={handleChange} options={sellers} required />
                                </div>
                                <div className="mb-4">
                                    <FormInput label='Branch' type="text" name="branchCode" value={formData.branchCode} onChange={handleChange} required readOnly={formData.role === 'Admin'} />
                                </div>

                                <div className="d-grid mb-3">
                                    <Buttons type='submit' value={isLoading ? 'Creating User...' : 'Submit'} disabled={isLoading} />
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewMarket;