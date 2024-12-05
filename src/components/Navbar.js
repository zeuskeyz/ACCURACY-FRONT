import React, { useContext } from 'react'
import { NavLinks } from "./NavLinks";
import { UserContextCreator } from "../context/UserContext";

const Navbar = () => {
    const {user,error} = useContext(UserContextCreator)
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <p className="navbar-brand">{user ? `Welcome ${user.username}` : 'Accuracy'} </p>
                    <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <NavLinks/>
                    </div>
                </div>
            </nav>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
        </>
    )
}

export default Navbar
