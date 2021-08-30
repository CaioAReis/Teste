import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';
import InputMask from 'react-input-mask';

import api from '../../services/api';

import './styles.css';
import Logo from '../../assets/logo.svg'

export default function Cadastro() {

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [dataNascimento, setData] = useState('');
    const [celular, setCelular] = useState('');
    const [telefone, setTelefone] = useState('');

    const history = useHistory();

    const handleCadastro = async (e) => {
        e.preventDefault();
        
        const data = {
            nome,
            cpf,
            email,
            senha,
            dataNascimento,
            celular,
            telefone
        };

        try {
            await api.post("api/usuario", data);
            alert('Conta criada com sucesso!');
            history.push('/login');
        } catch (err) {
            alert('Erro ao criar conta, tente novamente.')
        }
    }

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
                <form onSubmit={handleCadastro} autoComplete="off">
                    <h1>Cadastre sua conta</h1>
                    <input 
                        autoComplete="off"
                        placeholder="Nome completo" 
                        required size="255"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />

                    <InputMask 
                        placeholder="CPF" 
                        required size="50" 
                        mask="999.999.999-99"
                        value={cpf}
                        onChange={e => setCpf(e.target.value)}
                    />

                    <input 
                        type="email" 
                        placeholder="E-mail" 
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

                    <section className="data-label">
                        <label htmlFor="dtnas">Data de nascimento: </label>
                        <input 
                            placeholder="Data de nascimento" 
                            id="dtnas" 
                            type="date" 
                            required
                            value={dataNascimento}
                            onChange={e => setData(e.target.value)}
                        />
                    </section>

                    <InputMask 
                        placeholder="Celular" 
                        size="15" 
                        mask="(99) 9 9999-9999"
                        value={celular}
                        onChange={e => setCelular(e.target.value)}
                    />

                    <InputMask 
                        placeholder="Telefone" 
                        size="15" 
                        mask="(99) 9999-9999"
                        value={telefone}
                        onChange={e => setTelefone(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </section>
        </div>
    );
}