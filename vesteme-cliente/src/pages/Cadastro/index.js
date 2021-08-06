import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';

import './styles.css';
import Logo from '../../assets/logo.svg'

export default function Cadastro() {
    return(
        <div className="cadastro-container">
            
            <section className="bigger-tab">
                <div className="seta-icon">
                    <Link to="/">
                        <FiArrowLeftCircle size={50} color="#323935" />
                    </Link>
                </div>

                <div className="center-itens">
                    <img src={Logo} width="100%" alt="Logo-vesteme"/>
                    <p><strong>Seja muito bem vindo(a)</strong></p>
                    <div className="cad-div">
                        <p>Acesse sua conta</p>
                        <Link to="/" className="button-black">Entrar</Link>
                    </div>
                </div>
            </section>
            <section className="form-cadastro">
                <form>
                    <h1>Cadastre sua conta</h1>
                    <input placeholder="Nome completo" type="text"/>
                    <input placeholder="CPF" type="text" />
                    <input placeholder="E-mail" type="email" />
                    <input placeholder="Senha" type="password" />
                    <section className="data-label">
                        <label htmlFor="dtnas">Data de nascimento: </label>
                        <input placeholder="Data de nascimento" id="dtnas" type="date" />
                    </section>
                    <input placeholder="Celular" type="text" />
                    <input placeholder="Telefone" type="text" />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </section>
        </div>
    );
}