import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';
import InputMask from 'react-input-mask';

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
                        <Link to="/login" className="button-black">Entrar</Link>
                    </div>
                </div>
            </section>
            <section className="form-cadastro">
                <form>
                    <h1>Cadastre sua conta</h1>
                    <input type="text" placeholder="Nome completo" required size="255"/>
                    <InputMask type="text" placeholder="CPF" required size="50" mask="999.999.999-99"/>
                    <input type="email" placeholder="E-mail" required size="255" />
                    <input type="password" placeholder="Senha" required size="255"/>
                    <section className="data-label">
                        <label htmlFor="dtnas">Data de nascimento: </label>
                        <input placeholder="Data de nascimento" id="dtnas" type="date" required/>
                    </section>
                    <InputMask type="text" placeholder="Celular" size="15" mask="(99) 9 9999-9999"/>
                    <InputMask type="text" placeholder="Telefone" size="15" mask="(99) 9999-9999"/>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </section>
        </div>
    );
}