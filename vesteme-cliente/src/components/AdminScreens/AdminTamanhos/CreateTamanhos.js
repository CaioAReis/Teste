import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import api from '../../../services/api';

import { IoIosCloseCircleOutline } from 'react-icons/io';

export const CreateTamanhos = ({setCreateTamanho}) => {

    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setCreateTamanho(false);
        }
    };

    const [nome, setNome] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            nome
        }
        try {
            await api.post(`api/tamanho/`, data);
            alert("Tamanho criado com sucesso!");
        } catch (error) {
            alert("Erro ao criar tamanho");
        }
        setCreateTamanho(false);        
    }

    return ReactDOM.createPortal(
         <section className="container-modal" ref={modalRef} onClick={closeModal}>
            <div className="modal">
                <button onClick={() => setCreateTamanho(false)}> 
                    <IoIosCloseCircleOutline size={50} /> 
                </button>
                <div className="form-container">
                    <h1>Criar tamanho</h1>
                    <form onSubmit={handleSubmit}>
                        <section>
                            <input 
                                placeholder="Nome" 
                                value={nome} 
                                onChange={e => 
                                setNome(e.target.value)}
                            />
                        </section>
                        <button type="submit" className='button'>Criar</button>
                    </form>
                </div>
            </div>
        </section>,
        document.getElementById("modal")
    );
}