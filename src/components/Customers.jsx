import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers')
      .then(response => {
        console.log("API Response:", response.data); 
        if (response.data._embedded && Array.isArray(response.data._embedded.customers)) {
          setCustomers(response.data._embedded.customers);
        } else {
          console.error('Expected an array of customers but received:', response.data);
          setCustomers([]); 
        }
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
        setCustomers([]); 
      });
  }, []);

  return (
    <div>
      <h1>Customers</h1>
      <ul>
        {customers.map(customer => (
          
          <li key={customer.id}>
            {customer.firstname} {customer.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Customers;
