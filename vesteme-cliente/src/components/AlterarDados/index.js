import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import api from '../../services/api';

import './styles.css';

import InputMask from 'react-input-mask';
import { IoIosCloseCircleOutline } from 'react-icons/io'

export default function AlterarDados({setModalDados, usuario}) {

    const userID = sessionStorage.getItem('userID');
    const userToken = sessionStorage.getItem('userToken');
    const [nome, setNome] = useState(usuario.nome);
    const [cpf, setCpf] = useState(usuario.cpf);
    const [email, setEmail] = useState(usuario.email);
    const [data, setData] = useState(usuario.dataNascimento.slice(0,10));
    const [celular, setCelular] = useState(usuario.celular);
    const [telefone, setTelefone] = useState(usuario.telefone);

    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setModalDados(false);
        }
    };

    const handleAlterarDados = async (e) => {
        e.preventDefault();

        const info = {
            nome,
            cpf,
            email,
            data,
            celular,
            telefone
        }

        try {
            api.put(`api/usuario/dados/${userID}`, info,  {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            localStorage.setItem("userName", nome);
            alert("Seus dados foram atualizados");
        } catch (error) {
            alert("Erro ao atualizar dados");
        }
        setModalDados(false);
    };

    return ReactDOM.createPortal(
        <section className="container-modal" ref={modalRef} onClick={closeModal}>
            <section className="modal">
                <button onClick={() => setModalDados(false)}> 
                    <IoIosCloseCircleOutline size={50} /> 
                </button>
                <div className="form-container">
                    <h1>Alterar Dados</h1>
                    <form onSubmit={handleAlterarDados} >
                        <section>
                            <label htmlFor="nome">Nome: </label>
                            <input 
                                placeholder="Nome completo" 
                                required size="255"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                            />
                        </section>
                            
                        <section>
                            <label htmlFor="cpf">CPF: </label>
                            <InputMask 
                                placeholder="CPF" 
                                required size="50" 
                                mask="999.999.999-99"
                                value={cpf}
                                onChange={e => setCpf(e.target.value)}
                            />
                        </section>
                            
                        <section>
                            <label htmlFor="email">Email: </label>
                            <input 
                                type="email" 
                                placeholder="E-mail" 
                                required size="255" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </section>
                        <section>
                            <label htmlFor="data">Data de nascimento: </label>
                            <input 
                                id="data" 
                                type="date" 
                                required
                                value={data}
                                onChange={e => setData(e.target.value)}
                            />
                        </section>
                        <section>
                            <label htmlFor="celular">Celular: </label>
                            <InputMask 
                                placeholder="Celular" 
                                size="15" 
                                mask="(99) 9 9999-9999"
                                value={celular}
                                onChange={e => setCelular(e.target.value)}
                            />
                            <label htmlFor="telefone">Telefone: </label>
                            <InputMask 
                                placeholder="Telefone" 
                                size="15" 
                                mask="(99) 9999-9999"
                                value={telefone}
                                onChange={e => setTelefone(e.target.value)}
                            />
                        </section>
                        <button type="submit" className='button'>Alterar dados</button>
                    </form>
                </div>
            </section>
        </section>,
        document.getElementById('modal')
    );
}