import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import api from '../../../services/api';

import { IoIosCloseCircleOutline } from 'react-icons/io'

export const EditTamanhos = ({setEditTamanho, tamanho}) => {

    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setEditTamanho(false);
        }
    };

    const [nome, setNome] = useState(tamanho.nome);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            id: tamanho.id,
            nome
        }
        try {
            await api.put(`api/tamanho/${tamanho.id}`, data);
            alert("Tamanho atualizado com sucesso!");
        } catch (error) {
            alert("Erro ao atualizar tamanho");
        }
        setEditTamanho(false);        
    }

    return ReactDOM.createPortal(
         <section className="container-modal" ref={modalRef} onClick={closeModal}>
            <div className="modal">
                <button onClick={() => setEditTamanho(false)}> 
                    <IoIosCloseCircleOutline size={50} /> 
                </button>
                <div className="form-container">
                    <h1>Alterar tamanho</h1>
                    <form onSubmit={handleSubmit}>
                        <section>
                            <label htmlFor="form">Nome: </label>
                            <input 
                                id="form" 
                                value={nome} 
                                onChange={e => 
                                setNome(e.target.value)}
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