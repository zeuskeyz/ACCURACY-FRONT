import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { Homepage } from './pages/Homepage';
import { NewUser } from './pages/NewUser';
import { UserLogin } from './pages/UserLogin';
import Axios from 'axios'
import { UserManagement } from './pages/UserManagement';
import { ThemeProvider } from './context/ThemeContext';
import NewMarket from './pages/NewMarket';
import MarketManagement from './pages/MarketManagement';
import { PhoneManagement } from './pages/PhoneManagement';
import NewPhone from './pages/NewPhone';
import { AllocationMngmt } from './pages/AllocationMngmt';
import NewAllocation from './pages/NewAllocation';
import OwnerAllocations from './pages/OwnerAllocations';
import AllocationSummary from './components/AllocationSummary';
import Alerter from './components/Alerter';
import { NewSale } from './pages/NewSale';
import SalesSummary from './pages/SalesSummary';

Axios.defaults.withCredentials = true
Axios.defaults.baseURL = 'http://localhost:3003/api/'

function App() {

  return (
    <div className="App">
      <ThemeProvider>
      
          <Navbar />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/auth/login' element={<UserLogin />} />
            <Route path='/users' element={<UserManagement />} />
            <Route path='/phones' element={<PhoneManagement />} />
            <Route path='/markets' element={<MarketManagement />} />
            <Route path='/allocations' element={<AllocationMngmt />} />
            <Route path='/users/new' element={<NewUser />} />
            <Route path='/markets/new' element={<NewMarket />} />
            <Route path='/phones/new' element={<NewPhone />} />
            <Route path='/allocations/new' element={<NewAllocation />} />
            <Route path='allocations/me' element={<OwnerAllocations/>} >
              <Route path=':id' element={<AllocationSummary/>} />
            </Route>
            <Route path='/sales/:id' element={<NewSale />} />
            <Route path='/sales' element={<SalesSummary />} />




          </Routes>
          <Alerter />

      </ThemeProvider>
    </div>
  );
}

export default App;
