import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const helpdeskUsernameFromStorage = localStorage.getItem('helpdeskUsername');

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
        try {
            const res = await axios.patch(`http://localhost:8000/api/helpdesk-requests/${id}/`, { 
                status: 'CLOSED',
             });

            setRequests(requests.map(request => (request.id === id ? { ...request, status: 'CLOSED'} : request)));
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className='container py-4'>
            <h2 className="mb-4">Мои Заявки</h2>

            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Аудитория</th>
                            <th scope="col">Преподаватель/Сотрудник</th>
                            <th scope="col">HelpDesk сотрудник</th>
                            <th scope="col">Создана</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        requests.filter(request => 
                            request.status === 'IN_PROCESS' && request.handler === helpdeskUsernameFromStorage
                        ).length > 0 ? (
                            requests.filter(request => 
                            request.status === 'IN_PROCESS' && request.handler === helpdeskUsernameFromStorage
                            ).map((request, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{request.auditorium_number}</td>
                                <td>{request.creator}</td>
                                <td>{request.handler}</td>
                                <td>{new Date(request.created_at).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleAcceptRequest(request.id)} className="btn btn-success">Закрыть</button>
                                </td>
                            </tr>
                            ))
                        ) : (
                            
                            <tr>
                            <td colSpan="6" className="text-center">Заявок в процессе обработки нет или они не назначены на вас</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyRequestsPage;
