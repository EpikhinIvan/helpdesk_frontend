import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link} from 'react-router-dom';

const RequestDetailsPage = () => {
    const [request, setRequest] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/helpdesk-requests/${id}/`);
                setRequest(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
        };

        fetchData();
    }, [id]);

    if (!request) {
        return (
            <div className="container py-4 text-center">
                <p>Нет заявки с номером {id}</p>
            </div>
        );
    }

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
                    <li class="breadcrumb-item"><Link to="/newrequests">Новые заявки</Link></li>
                    <li class="breadcrumb-item"><Link to="/my-requests">Мои заявки</Link></li>
                </ol>
            </nav>

            <h2 className="mb-4">Заявка №{request.id}</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Детали заявки</h5>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Аудитория:</strong> {request.auditorium_number}</li>
                        <li className="list-group-item"><strong>Преподаватель/Сотрудник:</strong> {request.creator}</li>
                        <li className="list-group-item"><strong>Описание:</strong> {request.description}</li>
                        <li className="list-group-item"><strong>HelpDesk сотрудник:</strong> {request.handler}</li>
                        <li className="list-group-item"><strong>Создана:</strong> {formatDate(request.created_at)}</li>
                        <li className="list-group-item"><strong>Статус:</strong> {request.status === 'NEW' ? 'Новый' : 
                                    request.status === 'IN_PROCESS' ? 'В процессе' : 
                                    request.status === 'CLOSED' ? 'Закрыт' : 'CLOSED'}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RequestDetailsPage;
