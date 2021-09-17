import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import api from '../../services/api';

import './styles.css';
import { IoIosCloseCircleOutline } from 'react-icons/io'

export default function AlterarSenha({setModalSenha}) {

    const userID = localStorage.getItem('userID');
    const [senha, setSenha] = useState('');
    const [repetir, setRepetir] = useState('');

    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setModalSenha(false);
        }
    };

    const handleAlterarSenha = async (e) => {
        e.preventDefault();

        if (senha === repetir) {
            try {
                const data = { senha };
                await api.patch(`api/usuario/senha/${userID}`, data);    
                alert("Senha alterada com sucesso.");
                setModalSenha(false);
            } catch (error) {
                alert("Erro ao alterar senha, tente novamente.");
            }
        } else alert("Erro. Os campos precisam ser iguais.");
    }

    return ReactDOM.createPortal(
        <section className="container-modal" ref={modalRef} onClick={closeModal}>
            <section className="senha-container">
                <button onClick={() => setModalSenha(false)}> 
                    <IoIosCloseCircleOutline size={50} /> 
                </button>
                <div>
                    <h1>Alterar senha</h1>
                    <form onSubmit={handleAlterarSenha}>
                        <input 
                            type="password" 
                            placeholder="Nova senha" 
                            required size="255"
                            value={senha}
                            onChange={e => setSenha(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder="Repetir senha" 
                            required size="255"
                            value={repetir}
                            onChange={e => setRepetir(e.target.value)} 
                        />
                        <button type="submit" className="button">Alterar senha</button>
                    </form>
                </div>
            </section>
        </section>,
    document.getElementById('modal')
    );
}