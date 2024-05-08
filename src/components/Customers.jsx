import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerForm from './CustomerForm';
import ConfirmDialog from './ConfirmDialog';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        axios.get('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers')
            .then(response => {
                if (response.data && response.data._embedded) {
                    setCustomers(response.data._embedded.customers);
                } else {
                    setCustomers([]);
                }
            })
            .catch(error => console.error('Error fetching customers:', error));
    };

    const handleOpenForm = (customer = null) => {
        setSelectedCustomer(customer);
        setDialogOpen(true);
    };

    const handleCloseForm = () => {
        setDialogOpen(false);
    };

    const handleConfirmDelete = (customer) => {
        setSelectedCustomer(customer);
        setConfirmOpen(true);
    };

    const handleDelete = () => {
        if (!selectedCustomer || !selectedCustomer.id) {
            console.error('Delete action attempted without a valid customer selection.');
            setConfirmOpen(false);
            return;
        }

        axios.delete(`https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${selectedCustomer.id}`)
            .then(() => {
                setConfirmOpen(false);
                fetchCustomers(); // Refresh the list after deletion
            })
            .catch(error => {
                console.error('Failed to delete customer:', error);
                setConfirmOpen(false);
            });
    };

    const handleSubmit = (formData) => {
        const method = selectedCustomer && selectedCustomer.id ? 'put' : 'post';
        const url = selectedCustomer && selectedCustomer.id
            ? `https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${selectedCustomer.id}`
            : 'https://customerrestservice-personaltraining.rahtiapp.fi/api/customers';

        axios({
            method: method,
            url: url,
            data: formData,
        })
        .then(() => {
            setDialogOpen(false);
            fetchCustomers(); // Refresh the list after add or update
        })
        .catch(error => {
            console.error('Error submitting customer data:', error);
            setDialogOpen(false);
        });
    };

    return (
        <div>
            <h1>Customers</h1>
            <button onClick={() => handleOpenForm()}>Add Customer</button>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>
                        {customer.firstname} {customer.lastname}
                        <button onClick={() => handleOpenForm(customer)}>Edit</button>
                        <button onClick={() => handleConfirmDelete(customer)}>Delete</button>
                    </li>
                ))}
            </ul>
            {dialogOpen && (
                <CustomerForm
                    open={dialogOpen}
                    handleClose={handleCloseForm}
                    handleSubmit={handleSubmit}
                    customer={selectedCustomer}
                />
            )}
            {confirmOpen && (
                <ConfirmDialog
                    open={confirmOpen}
                    handleClose={() => setConfirmOpen(false)}
                    handleConfirm={handleDelete}
                    title="Confirm Deletion"
                    children={`Are you sure you want to delete ${selectedCustomer ? selectedCustomer.firstname : 'this customer'}?`}
                />
            )}
        </div>
    );
};

export default Customers;
