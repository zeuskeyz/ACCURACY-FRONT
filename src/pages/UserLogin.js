import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormInput } from '../components/FormInput';
import { Buttons } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const UserLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: ''});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/auth/login', formData);
      toast.success(response.data.message);
      // You might want to store the user data in state or context here
      // Redirect the user or update app state here
      navigate('/users')
    } catch (error) {
      if (error.response) toast.error(error.response.data.message); 
      else toast.error('An error occurred. Please try again.');
    } finally { setIsLoading(false);}
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">

              <h4 className="card-title text-center mb-4">WELCOME TO ACCURACY</h4>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <FormInput label="Username" type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                  <FormInput label="Password" type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>

                <div className='text-center mb-3'>
                  <p  className='my-2'>Forgot Password ?</p>
                </div>

                <div className="d-grid my-3">
                  <Buttons type= 'submit' value= {isLoading ? 'Logging in...' : 'Login'} disabled={isLoading}/>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

