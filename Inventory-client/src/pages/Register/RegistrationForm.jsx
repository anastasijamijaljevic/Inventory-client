import './RegistrationForm.css'
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';

const RegistrationForm = ({ setIsRegistered }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newFormErrors = validateForm(formData);
    setFormErrors(newFormErrors);

    if (Object.values(newFormErrors).every((error) => error === '')) {
      // Implement registration logic here
      console.log('Registration successful:', formData);
      setIsRegistered(true); // Set registered status

      // Save registration information in Local Storage
      localStorage.setItem('isRegistered', true);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.username.trim()) {
      errors.username = 'Username is required';
    } else if (!isValidUsername(data.username)) {
      errors.username =
        'Username can only contain letters, numbers and underscores';
    }
    if (!data.password.trim()) {
      errors.password = 'Password is required';
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  const isValidUsername = (username) => {
    const usernamePattern = /^[a-zA-Z0-9_]+$/;
    return usernamePattern.test(username);
  };

  return (
    <>
    <Navbar/>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        {formErrors.username && <p className="error">{formErrors.username}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {formErrors.password && <p className="error">{formErrors.password}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {formErrors.confirmPassword && (
          <p className="error">{formErrors.confirmPassword}</p>
        )}
      </div>
      <button type="submit">Sign Up</button>
    </form>
    </>
  );
};

export default RegistrationForm;
