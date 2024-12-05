import { useContext, useEffect, useState } from "react";
import { FormHeader } from "../components/FormHeader";
import { FormInput } from "../components/FormInput";
import { Buttons } from "../components/Buttons";
import { Button } from "react-bootstrap";
import axios from 'axios'
import { UserContextCreator } from "../context/UserContext";
import toast from "react-hot-toast";

const NewAllocation = () => {
    const initData = { number: "", market: "", owner:'', seller:'', items: [{ phone: '', serials: [] }] }
    const [formData, setFormData] = useState(initData);
    const [markets, setMarkets] = useState([]);
    const [phones, setPhones] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(UserContextCreator)


    const handleInputChange = (e) => { setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value })) };

    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = value;
        setFormData(prevState => ({
            ...prevState,
            items: newItems
        }));
    };

    const handleSerialsInput = (index, value) => {
        const cleanedValue = value.replace(/,\s*/g, '');
        const characters = cleanedValue.split('');
        const formattedValue = characters.reduce((acc, char, i) => {
            if (i > 0 && i % 15 === 0) {
                return `${acc},${char}`;
            }
            return acc + char;
        }, '');

        handleItemChange(index, 'serials', formattedValue.split(','));
    };

    const addItem = () => {
        setFormData(prevState => ({
            ...prevState,
            items: [...prevState.items, { phone: '', serials: '' }]
        }));
    };


    const handleSubmit = async (e) => {

        let payload = { ...formData, creator: user.username}
        e.preventDefault();

        try {
            const resp = await axios.post('/allocations', payload);
            setFormData(initData);
            toast.success('Allocation created successfully' || resp.data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred while creating the phones.');
        } finally { setIsLoading(false) }

    };

    useEffect(() => {
        axios.get('/markets/')
            .then(({ data }) => { data.map(item => setMarkets(prev => [...prev, { value: item.name, label: item.name }])) })

    }, [])

    useEffect(() => {
        axios.get('/markets/')
            .then(({ data }) => {
                if (formData.market !== '') {
                    data.forEach(result => {
                        Object.values(result).includes(formData.market) && setFormData(prevState => ({...prevState, 'owner': result.owner, 'seller': result.seller}))
                        
                    });
                }
            })

    }, [formData])

    useEffect(() => {
        axios.get('/phones/').then(({ data }) => data.map(item => setPhones(prev => [...prev, { value: item.name, label: item.name }])))
    }, [])

    /* useEffect(()=>{
        if (formData.market !== '') {
            setFormData(prevState => ({...prevState, branchCode: user.branchCode}));
          }
    },[]) */


    return (
        <div className="container my-3">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">

                            <FormHeader text='NEW ALLOCATION' path='/allocations' />

                            <form onSubmit={handleSubmit} className="">

                                <FormInput label='Allocation No. ' type="text" name="number" value={formData.number} onChange={handleInputChange} required />
                                <FormInput label="Destination Market" type='select' name="market" value={formData.market} options={markets} onChange={handleInputChange} required />

                                <div>
                                    <h4 className="font-semibold mb-2">Item</h4>
                                    {formData.items.map((item, index) => (
                                        <div key={index} className="border p-4 my-2 rounded-md">

                                            <FormInput label="Phone Type" type='select' name="phone" value={item.phone} options={phones} onChange={(e) => handleItemChange(index, 'phone', e.target.value)} required />
                                            <FormInput label="Enter Serials" type='text' name="serials" value={item.serials} onChange={(e) => handleSerialsInput(index, e.target.value)} required />

                                        </div>
                                    ))}
                                </div>

                                <div className="d-sm-grid d-md-flex mb-2">
                                    <div className='col-md-6 m-1 ps-md-0'> <Button className='col-12' type="button" onClick={addItem} variant='light' > Add Item </Button> </div>
                                    <div className="col-md-6 m-1 pe-md-3"> <Buttons itsClass='col-12' type="submit" value={isLoading ? 'Submitting...' : 'Submit'} disabled={isLoading} /></div>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewAllocation;
