import React, { useState } from 'react';

function RegisterForm() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const user = { name, username, yearOfBirth };

    try {
      const response = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      let data;
      try {
        data = await response.json();
      } catch (err) {
        console.error('Error parsing JSON:', err);
        setMessage('Server returned an unexpected response.');
        return;
      }

      if (response.ok) {
        setMessage(`Success: ${data.message}`);
        setName('');
        setUsername('');
        setYearOfBirth('');
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Register User</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="number"
          placeholder="Year of Birth"
          value={yearOfBirth}
          onChange={(e) => setYearOfBirth(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterForm;
