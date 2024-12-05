import React from 'react';
import {Link} from 'react-router-dom'

export const Homepage = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">About Accuracy</h2>
              <p className="card-text">
                Welcome to our advanced Stock Management Application! This platform is designed to streamline the process of stock allocation and sales tracking across different branches of an organization.
              </p>
              <p className="card-text">
                Our app supports three types of users:
              </p>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item">
                  <strong>Admins:</strong> Create users, allocate phones to market owners, and manage the overall system.
                </li>
                <li className="list-group-item">
                  <strong>Market Owners:</strong> Verify received allocations and manage stock for their specific market.
                </li>
                <li className="list-group-item">
                  <strong>Sellers:</strong> Handle sales transactions and update stock status in real-time.
                </li>
              </ul>
              <p className="card-text">
                Our app ensures seamless tracking of phone stocks from allocation to sale, providing a comprehensive solution for inventory management and sales reporting.
              </p>

              <div className='text-center'>
              <Link className='text-decoration-none text-secondary fs-4 display-6' to= '/auth/login' >LOGIN</Link>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

