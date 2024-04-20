import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './LoginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post('http://localhost:8000/api/login/', { username, password });
            console.log(res.data);

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', username)

            console.log(res.status);

            navigate('/home'); 

        } catch (err) {
            console.error(err.response.data);
        }

        setUsername('');
        setPassword('');
    };

    return (
        <div className="form-container"> 
            <h2 className='form-h2'>Вход</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Логин:</label>
                    <input type="text" name="username" value={username} onChange={handleChange} className="form-control" />
                </div>

                <div className="form-group"> 
                    <label>Пароль:</label>
                    <input type="password" name="password" value={password} onChange={handleChange} className="form-control" />
                </div>

                <div className='btn-box'>
                    <button type="submit" className="btn">Войти</button> 
                </div>
            </form>
        </div>
    );
}

export default LoginForm;