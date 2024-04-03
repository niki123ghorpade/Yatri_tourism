import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    //Fetch contact data from backend API
    const fetchContacts = async () => {
      try {
        const response = await axios.get('api/contact');
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div>
      <h2>Contact Data</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact._id}>
            Name: {contact.name}, Email: {contact.email}, Message: {contact.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminContacts;
