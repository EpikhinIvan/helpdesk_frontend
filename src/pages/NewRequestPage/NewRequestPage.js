import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    const filteredRequests = requests.filter(request => request.status == 'NEW')

    return (
        <div className='container py-4'>
            <h2 className="mb-4">Новые заявки</h2>
            <div className="row mb-3">
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Аудитория</th>
                            <th scope="col">Преподаватель/Сотрудник</th>
                            <th scope="col">Описание</th>
                            <th scope="col">HelpDesk сотрудник</th>
                            <th scope="col">Создана</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map((request, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{request.auditorium_number}</td>
                                <td>{request.creator}</td>
                                <td>{request.description}</td>
                                <td>{request.handler}</td>
                                <td>{request.created_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NewRequestsPage;
