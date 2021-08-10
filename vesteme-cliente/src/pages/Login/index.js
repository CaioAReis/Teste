import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';

import './styles.css';
import Logo from '../../assets/logo.svg'

export default function Login() {
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
                        <Link to="/cadastro" className="button-black">Cadastre-se</Link>
                    </div>
                </div>
            </section>
            <section className="form-login">
                <form>
                    <h1>Entre na sua conta</h1>
                    <input type="Email" placeholder="Email" required size="255"/>
                    <input type="password" placeholder="Senha" required size="255"/>
                    <button className="button" type="submit">Entrar</button>
                </form>
            </section>
        </div>
    );
}