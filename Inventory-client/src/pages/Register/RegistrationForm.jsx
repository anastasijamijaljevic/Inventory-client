import './RegistrationForm.css'
import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
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
      console.log(formData);
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
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
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Please enter a valid email';
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

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
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
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {formErrors.email && <p className="error">{formErrors.email}</p>}
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
  );
};

export default RegistrationForm;
