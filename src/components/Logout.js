import axios from 'axios'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const [visible, setVisible] = useState(true)
    
    const handleLogout = async (e) => {
        setIsLoading(true);
    
        try {
            const response = await axios.post('/auth/logout');

            toast.success(response.data.message);
        } catch (error) {
            if (error.response) {toast.error(error.response.data.message);} 
            else toast.error('An error occurred. Please try again.');
        } finally { setIsLoading(false); setVisible(!visible); navigate('/')}
        

    }

    return (
        <>
            <p className={`nav-link ${visible ? 'd-block': 'd-none'}`} onClick={handleLogout}> {isLoading ? 'Logging Out...' : 'Logout'} </p>
        </>
    )

   
}

export default Logout;
