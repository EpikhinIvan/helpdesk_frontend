import React, { Component } from 'react';
import axios from 'axios';
import './RegisterForm.css';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            full_name: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
    
        const { username, password, full_name } = this.state;
    
        try {
            const userData = {
                user: {
                    username: username,
                    password: password
                },
                full_name: full_name
            };
    
            const res = await axios.post('http://localhost:8000/api/register/', userData);
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    
        this.setState({
            username: '',
            password: '',
            full_name: ''
        });
    };

    render() {
        const { username, password, full_name } = this.state;

        return (
            <div className="form-container"> 
                <h2 className='form-h2'>Регистрация</h2>

                <form onSubmit={this.handleSubmit}>

                    <div className="form-group"> 
                        <label>Полное Имя:</label>
                        <input type="text" name="full_name" value={full_name} onChange={this.handleChange} className="form-control" />
                    </div>

                    <div className="form-group">
                        <label>Логин:</label>
                        <input type="text" name="username" value={username} onChange={this.handleChange} className="form-control" />
                    </div>

                    <div className="form-group"> 
                        <label>Пароль:</label>
                        <input type="password" name="password" value={password} onChange={this.handleChange} className="form-control" />
                    </div>

                    
                    <div className='btn-box'>
                        <button type="submit" className="btn">Зарегистрироваться</button> 
                    </div>
                </form>
            </div>
        );
    }
}

export default RegisterForm;
