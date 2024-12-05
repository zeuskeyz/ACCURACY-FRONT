import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContextCreator } from '../context/UserContext';
import ThemeSwitch from './ThemeSwitch';
import Logout from './Logout'

export const NavLinks = () => {
    const {user} = useContext(UserContextCreator)
    const MarketOwner = [{ 'home-page': 'Dashboard' }, { 'allocations/me': 'Stocks' }, { 'sales': 'Sales' }, { 'stock-movements': 'Stock Movements' } ]
    const Admin = [{ 'users': 'Users' }, { 'markets': 'Markets' }, { 'allocations': 'Allocations' }, { 'phones': 'Devices' }]
    const Seller = [{ 'home-page': 'Dashboard' }, {'allocations/me': 'Stock'}, {'sales': 'Sell'}]
    const NoUser = [{'': 'About' , '/contact-us': 'Feedback'}]
    
    const menuList = user?.role === 'Admin' ? Admin : user?.role === 'MarketOwner' ? MarketOwner : user?.role === 'Seller' ? Seller : NoUser
    return ( 
        <ul className="navbar-nav ms-auto">
            {menuList.map((nav, index) => (
                <li key={index} className="nav-item">
                    <NavLink className="nav-link" to={`/${Object.keys(nav)[0]}`}>{Object.values(nav)[0]} </NavLink>
                </li>
            ))}
            <li className="nav-item">
                <ThemeSwitch/>
            </li>

            <li>
                <Logout/>
            </li>
        </ul>
    )
}

