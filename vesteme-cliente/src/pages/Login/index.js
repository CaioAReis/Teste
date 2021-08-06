import React from 'react';
import { FiArrowLeftCircle } from 'react-icons/fi';

import './styles.css';
import Logo from '../../assets/logo.svg'

export default function Login() {
    return(
        <div className="login-container">
            
            <section className="bigger-tab">
                <button className="seta-icon">
                    <FiArrowLeftCircle size={50} color="#323935" />
                </button>

                <div className="center-itens">
                    <img src={Logo} width="100%" alt="Logo-vesteme"/>
                    <p><strong>Bem vindo(a) de volta</strong></p>
                    <div className="cad-div">
                        <p>Crei sua conta</p>
                        <button className="button-black">Cadastre-se</button>
                    </div>
                </div>
            </section>
            <section className="form-login">
                <form>
                    <h1>Entre na sua conta</h1>
                    <input placeholder="Email" type="Email"/>
                    <input placeholder="Senha" type="password" />
                    <button className="button" type="submit">Entrar</button>
                </form>
            </section>
        </div>
    );
}