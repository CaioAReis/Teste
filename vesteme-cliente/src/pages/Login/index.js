import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import Logo from '../../assets/logo.svg'

export default function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();

        const data = { email, senha };

        try {
            const response = await api.post('/api/usuario/login', data);
            sessionStorage.setItem('userID', response.data.usu.id);
            sessionStorage.setItem('userName', response.data.usu.nome);
            sessionStorage.setItem('userToken', response.data.token);
            
            if (response.data.usu.tipoUsuarioID === 1) history.push('/admin');
            else if (response.data.usu.tipoUsuarioID === 2) history.push('/');
        } catch (error) {
            alert('Email ou senha inválidos. Tente novamente.');
        }
    }

    return(
        <div className="login-container">
            
            <section className="bigger-tab">
                <div className="seta-icon">
                    <Link to="/">
                        <FiArrowLeftCircle size={50} color="#323935" />
                    </Link>
                </div>

                <div className="center-itens">
                    <img src={Logo} width="100%" alt="Logo-vesteme"/>
                    <p><strong>Bem vindo(a) de volta</strong></p>
                    <div className="cad-div">
                        <p>Crei sua conta</p>
                        <Link 
                            to="/cadastro" 
                            className="button-black"
                        >
                            Cadastre-se
                        </Link>
                    </div>
                </div>
            </section>
            <section className="form-login">
                <form onSubmit={handleLogin}>
                    <h1>Entre na sua conta</h1>
                    <input 
                        type="Email" 
                        placeholder="Email" 
                        required size="255"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                        type="password" 
                        placeholder="Senha" 
                        required size="255"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                </form>
            </section>
        </div>
    );
}