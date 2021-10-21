import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import api from '../../../services/api';

import { IoIosCloseCircleOutline } from 'react-icons/io'

export const EditModal = ({setModal, categoria}) => {

    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setModal(false);
        }
    };

    const [nome, setNome] = useState(categoria.nome);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            id: categoria.id,
            nome
        }
        try {
            await api.put(`api/categoria/${categoria.id}`, data);
            alert("Categoria atualizado com sucesso!");
        } catch (error) {
            alert("Erro ao atualizar categoria");
        }
        setModal(false);        
    }

    return ReactDOM.createPortal(
         <section className="container-modal" ref={modalRef} onClick={closeModal}>
            <div className="modal">
                <button onClick={() => setModal(false)}> 
                    <IoIosCloseCircleOutline size={50} /> 
                </button>
                <div className="form-container">
                    <h1>Alterar categoria</h1>
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