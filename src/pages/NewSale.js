import { useContext, useEffect, useState } from 'react';
import { FormInput } from '../components/FormInput';
import axios from 'axios'
import { Buttons } from '../components/Buttons';
import { FormHeader } from '../components/FormHeader';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { UserContextCreator } from '../context/UserContext';

export const NewSale = () => {
  const {user} = useContext(UserContextCreator)
  const { id } = useParams()
  const fieldInits = { phone: '', serial: '', customer: '', msisdn: '', mpesa: ''}
  const [formData, setFormData] = useState(fieldInits);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([])
  const [serialOptions, setSerialOptions] = useState([])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData)
    setFormData(fieldInits);

    try {
      const response = await axios.post(`sales/${id}`, {...formData, seller: user.username});
      toast.success(response.data.message);
    } 
    catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }

  };

  const phoneOptions = [...data?.map(item => {return {value: item.phone, label: item.phone}})];

  useEffect(() => {
    axios.get(`allocations/me/${id}`).then(res => setData(res.data.items)).catch(error => toast.error(error.message))
  }, [data])

  useEffect(()=>{
    if(formData.phone !== '') {
      data.forEach(item => {

        if( item.phone===formData.phone) setSerialOptions([...item.serials?.map(srl => {return {value:srl, label:srl}})])
      } )
    }
  }, [data])

  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              
              <FormHeader text='SALE' path='/users' />

              <form onSubmit={handleSubmit}>

                <FormInput label="Phone Type" name="phone" type="select" value={formData.phone} onChange={handleChange} options={phoneOptions} required />
                <FormInput label="Serial" name="serial" type="select" value={formData.role} onChange={handleChange} options={serialOptions} required />
                <FormInput label="Customer Name" name="customer" value={formData.customer} onChange={handleChange} required />
                <FormInput label="Customer Number" name="msisdn" type="tel" value={formData.phoneNumber} onChange={handleChange} required />
                <FormInput label="Mpesa Code" name="mpesa" value={formData.username} onChange={handleChange} required />
                
                <div className="d-grid mb-3">
                  <Buttons type='submit' value={isLoading ? 'Sending...' : 'Send'} disabled={isLoading} />
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};