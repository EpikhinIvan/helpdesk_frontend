import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NewRequestsPage = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/helpdesk-requests/');
                setRequests(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
        };

        fetchData();
    }, []); 

    const handleAcceptRequest = async (id) => {
        const helpdeskUsername = localStorage.getItem('helpdeskUsername');
        const userId = localStorage.getItem('userId');

        try {
            const res = await axios.patch(`http://localhost:8000/api/helpdesk-requests/${id}/`, { 
                status: 'IN_PROCESS',
                handler: userId,
             });

            setRequests(requests.map(request => (request.id === id ? { ...request, status: 'IN_PROCESS', handler: helpdeskUsername, handler_username: helpdeskUsername } : request)));
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const minutes = date.getMinutes();
        const hours = date.getHours();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${hours}:${minutes} ${day}.${month}.${year}`;
    };


    return (
        <div className='container py-4'>

             <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Главная</Link></li>
                    <li class="breadcrumb-item"><Link to="/requests">Все заявки</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Новые заявки</li>
                    <li class="breadcrumb-item"><Link to="/my-requests">Мои заявки</Link></li>
                </ol>
            </nav>

            <h2 className="mb-4">Новые заявки</h2>

           
            
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Аудитория</th>
                            <th scope="col">Преподаватель/Сотрудник</th>
                            <th scope="col">Описание</th>
                            <th scope="col">Создана</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length > 0 && requests.some(request => request.status === 'NEW') ? (
                            requests.map((request, index) => (
                                request.status === 'NEW' && (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{request.auditorium_number}</td>
                                        <td>{request.creator}</td>
                                        <td>{request.description}</td>
                                        <td>{formatDate(request.created_at)}</td>
                                        <td>
                                            <button onClick={() => handleAcceptRequest(request.id)} className="btn btn-success">Принять</button>
                                        </td>
                                    </tr>
                                )
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">Новых заявок нет</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NewRequestsPage;
