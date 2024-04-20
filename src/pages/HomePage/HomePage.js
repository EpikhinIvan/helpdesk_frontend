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
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="form-container"> 
                        {isAuthenticated ? (
                            <>
                                <p>Добро пожаловать, {username}!</p>
                                <button className="btn btn-primary mb-3" onClick={exitAcc}>Выйти</button>
                                <div className="d-grid gap-2">
                                    <Link to="/requests" className="btn btn-secondary mb-2">Посмотреть заявки</Link>
                                    <Link to="/add-request" className="btn btn-secondary">Добавить заявку</Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <p>Вы не зарегистрированы. Пожалуйста, <Link to="/register">зарегистрируйтесь</Link>.</p>
                                <p>Или <Link to="/login">войдите</Link>, используя свой логин и пароль.</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
