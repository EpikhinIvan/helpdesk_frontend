import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const navigate = useNavigate();

    const loadDataFromServer = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/helpdesk-requests/');
            setRequests(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    useEffect(() => {
        loadDataFromServer();
        const interval = setInterval(loadDataFromServer, 5000); 
        return () => clearInterval(interval); 
    }, []);

    const filteredRequests = requests.filter(request => {
        return (
            (!statusFilter || request.status.toLowerCase() === statusFilter.toLowerCase()) &&
            (!searchTerm || 
                (request.auditorium_number && request.auditorium_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (request.creator && request.creator.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (request.handler && request.handler.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (request.status && request.status.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        );
    });

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const handleRowClick = (id) => {
        navigate(`/requests/${id}`);
    };

    return (
        <div className='container py-4'>

            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item active" aria-current="page">Все заявки</li>
                    <li class="breadcrumb-item"><Link to="/newrequests">Новые заявки</Link></li>
                    <li class="breadcrumb-item"><Link to="/my-requests">Мои заявки</Link></li>
                </ol>
            </nav>

            <h2 className="mb-4">Заявки</h2>

            <div className="row mb-3">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Поиск..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <select className="form-select" onChange={handleStatusFilterChange}>
                        <option value="">Все статусы</option>
                        <option value="NEW">Новый</option>
                        <option value="IN_PROCESS">В процессе</option>
                        <option value="CLOSED">Закрыт</option>
                    </select>
                </div>
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
                            <th scope="col">Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map((request, index) => (
                            <tr key={index} onClick={() => handleRowClick(request.id)}>
                                <td>{index + 1}</td>
                                <td>{request.auditorium_number}</td>
                                <td>{request.creator}</td>
                                <td>{request.description}</td>
                                <td>{request.handler}</td>
                                <td>{new Date(request.created_at).toLocaleDateString()}</td>
                                <td>{request.status === 'NEW' ? 'Новый' : 
                                    request.status === 'IN_PROCESS' ? 'В процессе' : 
                                    request.status === 'CLOSED' ? 'Закрыт' : 'CLOSED'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestsPage;
