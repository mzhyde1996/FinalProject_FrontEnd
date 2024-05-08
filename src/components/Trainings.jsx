import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const Trainings = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    axios.get('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings')
      .then(response => {
        const trainings = response.data._embedded.trainings;
        const fetchTasks = trainings.map(training => {
          return axios.get(training._links.customer.href) 
            .then(customerResponse => {
              return {
                ...training,
                date: dayjs(training.date).format('DD.MM.YYYY HH:mm'),
                customerName: `${customerResponse.data.firstname} ${customerResponse.data.lastname}`
              };
            })
            .catch(error => {
              console.error('Error fetching customer:', error);
              return {
                ...training,
                date: dayjs(training.date).format('DD.MM.YYYY HH:mm'),
                customerName: 'No customer' 
              };
            });
        });

        Promise.all(fetchTasks).then(completedTrainings => {
          setTrainings(completedTrainings);
        });
      })
      .catch(error => {
        console.error('Error fetching trainings:', error);
        setTrainings([]); 
      });
  }, []);

  return (
    <div>
      <h1>Trainings</h1>
      <ul>
        {trainings.map(training => (
          <li key={training.id}>
            {training.activity} on {training.date} by {training.customerName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trainings;


