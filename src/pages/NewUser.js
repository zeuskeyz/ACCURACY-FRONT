import { useState } from 'react';
import { FormInput } from '../components/FormInput';
import axios from 'axios'
import { Buttons } from '../components/Buttons';
import { FormHeader } from '../components/FormHeader';
import toast from 'react-hot-toast';

export const NewUser = () => {
  const fieldInits = { fullName: '', phoneNumber: '', username: '', gender: '', role: '', branchCode: '', password: '' }
  const [formData, setFormData] = useState(fieldInits);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormData(fieldInits);

    try {
      const response = await axios.post('/users/new', formData);
      toast.success(response.data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };


  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  const roleOptions = [
    { value: 'Admin', label: 'Admin' },
    { value: 'MarketOwner', label: 'Market Owner' },
    { value: 'Seller', label: 'Seller' }
  ];

  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              
              <FormHeader text='SIGN UP' path='/users' />

              <form onSubmit={handleSubmit}>

                <FormInput label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
                <FormInput label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} required />
                <FormInput label="Username" name="username" value={formData.username} onChange={handleChange} required />
                <FormInput label="Gender" name="gender" type="select" value={formData.gender} onChange={handleChange} options={genderOptions} required />
                <FormInput label="Role" name="role" type="select" value={formData.role} onChange={handleChange} options={roleOptions} required />
                <FormInput label="Branch Code" name="branchCode" value={formData.branchCode} onChange={handleChange} required />
                <FormInput label="Password" name="password" value={formData.password} onChange={handleChange} required />

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