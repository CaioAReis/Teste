import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import api from '../../../services/api';

import { IoIosCloseCircleOutline } from 'react-icons/io'

export const EditUsuarios = ({setEditUsuario, usuario}) => {

    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setEditUsuario(false);
        }
    };

    const [form, setForm] = useState({
        nome: usuario.nome,
        cpf: usuario.cpf,
        email: usuario.email,
        senha: usuario.senha,
        dataNascimento: usuario.dataNascimento,
        celular: usuario.celular,
        telefone: usuario.telefone,
        tipoUsuarioID: usuario.tipoUsuarioID
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            id: usuario.id,
            ...form
        }
        try {
            await api.put(`api/usuario/dados/${usuario.id}`, data);
            alert("Usuário atualizado com sucesso!");
        } catch (error) {
            alert("Erro ao atualizar usuário");
        }
        setEditUsuario(false);        
    }

    return ReactDOM.createPortal(
         <section className="container-modal" ref={modalRef} onClick={closeModal}>
            <div className="modal">
                <button onClick={() => setEditUsuario(false)}> 
                    <IoIosCloseCircleOutline size={50} /> 
                </button>
                <div className="form-container">
                    <h1>Alterar usuário</h1>
                    <form onSubmit={handleSubmit}>
                        <section>
                            <label htmlFor="nome">Nome: </label>
                            <input 
                                id="nome" 
                                value={form.nome} 
                                onChange={e => 
                                setForm({...form, nome: e.target.value})}
                            />
                        </section>

                         <section>
                            <label htmlFor="cpf">CPF: </label>
                            <input 
                                id="cpf" 
                                value={form.cpf} 
                                onChange={e => 
                                setForm({...form, cpf: e.target.value})}
                            />
                        </section>

                         <section>
                            <label htmlFor="email">Email: </label>
                            <input 
                                id="email" 
                                type='email'
                                value={form.email} 
                                onChange={e => 
                                setForm({...form, email: e.target.value})}
                            />
                        </section>

                         <section>
                            <label htmlFor="senha">Senha: </label>
                            <input 
                                id="senha" 
                                type='password'
                                value={form.senha} 
                                onChange={e => 
                                setForm({...form, senha: e.target.value})}
                            />
                        </section>

                         <section>
                            <label htmlFor="data">Data de nascimento: </label>
                            <input 
                                id="data" 
                                type='date'
                                value={form.dataNascimento} 
                                onChange={e => 
                                setForm({...form, dataNascimento: e.target.value})}
                            />
                        </section>

                         <section>
                            <label htmlFor="celular">Celular: </label>
                            <input 
                                id="celular" 
                                value={form.celular} 
                                onChange={e => 
                                setForm({...form, celular: e.target.value})}
                            />
                        </section>

                         <section>
                            <label htmlFor="telefone">Telefone: </label>
                            <input 
                                id="telefone" 
                                value={form.telefone} 
                                onChange={e => 
                                setForm({...form, telefone: e.target.value})}
                            />
                        </section>

                        <section>
                            <label htmlFor="tipo">Tipo do usuário: </label>
                            <input 
                                id="tipo" 
                                placeholder='1 - ADMIN, 2 - CLIENTE'
                                value={form.tipoUsuarioID} 
                                onChange={e => 
                                setForm({...form, tipoUsuarioID: e.target.value})}
                            />
                        </section>
                        <button type="submit" className='button'>Alterar</button>
                    </form>
                </div>
            </div>
        </section>,
        document.getElementById("modal")
    );
}