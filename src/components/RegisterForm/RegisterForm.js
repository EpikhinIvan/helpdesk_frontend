import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        full_name: ''
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post('http://localhost:8000/api/register/', {
                user: {
                    username: formData.username,
                    password: formData.password
                },
                full_name: formData.full_name
            });
            console.log(res.data);

            // Перенаправление на другую страницу после успешной регистрации
            navigate('/login');
        } catch (err) {
            console.error(err.response.data);
        }

        setFormData({
            username: '',
            password: '',
            full_name: ''
        });
    };

    const { username, password, full_name } = formData;

    return (
        <div className="form-container"> 
            <h2 className='form-h2'>Регистрация</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group"> 
                    <label>Полное Имя:</label>
                    <input type="text" name="full_name" value={full_name} onChange={handleChange} className="form-control" />
                </div>

                <div className="form-group">
                    <label>Логин:</label>
                    <input type="text" name="username" value={username} onChange={handleChange} className="form-control" />
                </div>

                <div className="form-group"> 
                    <label>Пароль:</label>
                    <input type="password" name="password" value={password} onChange={handleChange} className="form-control" />
                </div>

                <div className='btn-box'>
                    <button type="submit" className="btn">Зарегистрироваться</button> 
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
