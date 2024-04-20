import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [isAuthenticated] = useState(localStorage.getItem('token') !== null);
    const navigate = useNavigate();

    const exitAcc = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="form-container"> 
            {isAuthenticated ? (
                <>
                    <p>Добро пожаловать, {username}!</p>
                    <button onClick={exitAcc}>Выйти</button>


                </>
            ) : (
                <>
                    <p>Вы не зарегистрированы. Пожалуйста, <Link to="/register">зарегистрируйтесь</Link>.</p>
                    <p>Или <Link to="/login">войдите</Link>, используя свой логин и пароль.</p>
                </>
            )}
        </div>
    );
};

export default HomePage;
