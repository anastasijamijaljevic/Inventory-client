import './LoginForm.css'
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
  });

  const [loginMessage, setLoginMessage] = useState('');

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
      // sa unapred definisanim korisnickim imenom i lozinkom
      if (formData.username === 'test' && formData.password === 'test') {
        setLoginMessage('Successful login!');
      } else {
        setLoginMessage('Login failed. Check your username and password.');
      }
      setFormData({
        username: '',
        password: '',
      });
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!data.password.trim()) {
      errors.password = 'Password is required';
    }
    return errors;
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
      {loginMessage && <p className="login-message">{loginMessage}</p>}
      <button type="submit">Sign Up</button>
    </form>
    </>
  );
};

export default LoginForm;

/*const handleSubmit = async (event) => {
    event.preventDefault();
    const newFormErrors = validateForm(formData);
    setFormErrors(newFormErrors);

    if (Object.values(newFormErrors).every((error) => error === '')) {
      try {
        const response = await axios.post('/login', formData); // Simuliranje POST zahteva na "/login" sa formData
        if (response.data.success) {
          setLoginMessage('Successful login!');
        } else {
          setLoginMessage('Login failed. Check your username and password.');
        }
      } catch (error) {
        console.error('Login error:', error);
        setLoginMessage('An error occurred while logging in. Try again later.');
      }
      setFormData({
        username: '',
        password: '',
      });
    }
  };*/  
  //ovaj kod mi je chat gpt izbacio za povezivanje ove login forme sa bazom na osnovu ove nase login forme, ali moramo da istrazimo malo, ostavila sam u kom da ne zaboravim :D

  





