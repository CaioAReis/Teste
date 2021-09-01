import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import api from '../../services/api';

import './styles.css';

import { IoIosCloseCircleOutline } from 'react-icons/io'

export default function ConfirmarUsuario({setModalConfirmar, setModalDados}) {

    const [senha, setSenha] = useState('');

    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setModalConfirmar(false);
        }
    };

    const handleConfirmar = async (e) => {
        e.preventDefault();
        setModalDados(true);

        setModalConfirmar(false);
    }

    return ReactDOM.createPortal(
        <section className="container-modal" ref={modalRef} onClick={closeModal}>
            <section className="confirmar-container">
                <button onClick={() => setModalConfirmar(false)}> 
                    <IoIosCloseCircleOutline size={50} /> 
                </button>
                <div>
                    <h1>Confirmar usuário</h1>
                    <form onSubmit={handleConfirmar}>
                        <input 
                            type="password" 
                            placeholder="Senha" 
                            required size="255"
                            value={senha}
                            onChange={e => setSenha(e.target.value)} 
                        />
                        <button type="submit" className="button">Enviar</button>
                    </form>
                </div>
            </section>
        </section>,
    document.getElementById('modal')
    );
}