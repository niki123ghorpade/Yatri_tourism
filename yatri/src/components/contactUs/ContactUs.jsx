import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "./contactUs.css";
import axios from 'axios'; 


export const ContactUs = ({ destination, dates, options }) => {
  const form = useRef();


  const sendEmail =  async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(form.current);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
  
      // Adding additional data to the email template
      data.destination = destination;
      data.dates = dates;
      data.options = JSON.stringify(options);
  
      // Send form data to backend API
      const response = await axios.post('/api/contact', data);
      console.log('Contact form submitted successfully:', response.data);
      // Optionally, you can show a success message or redirect the user
    } catch (error) {
      console.error('Error submitting contact form:', error);
      // Handle error, show error message to the user, etc.
    }
  
    emailjs
      .sendForm('service_7d63wr7', 'template_jg1sws7', form.current, {
        publicKey: '7wJVLtUF-1rhUPZjP',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className="form-container">
        <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="from_name" />
      <label>Email</label>
      <input type="email" name="from_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="hidden" name="destination" value={destination} />
        <input type="hidden" name="dates" value={dates} />
        <input type="hidden" name="options" value={JSON.stringify(options)} />
      <input type="submit" value="Send" />
    </form>
    <div className="image-container">
        <img src="https://img.freepik.com/free-vector/customer-support-flat-illustration_23-2148889375.jpg?size=626&ext=jpg&ga=GA1.1.452489824.1694654790&semt=ais" alt="Your Image" />
      </div>
    </div>
  );
};