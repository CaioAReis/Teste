import React, { useEffect, useState } from 'react';

import api from '../../../services/api';

import './styles.css';
import { FiTrash2, FiEdit } from 'react-icons/fi';

import { EditModal } from './EditModal';
import { CreateModal } from './CreateModal';

export default function AdminCategorias() {

    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState(null);
    const [modalAlterar, setModalAlterar] = useState(false);
    const [modalCriar, setModalCriar] = useState(false);

    const handleRemove = async (id) => {
        // await api.delete(`api/categoria/${id}`);
        setCategorias(categorias.filter(c => c.id !== id));
    }

    const handleEdit = (categoria) => {
        setCategoria(categoria);
        setModalAlterar(!modalAlterar);
    }

    useEffect(() => {
        api.get('api/categoria').then(response => setCategorias(response.data));
    }, [modalAlterar, modalCriar]);

    return(
        <section className="adm-categorias">
            <h1>Adiministração de categorias</h1>
            <button 
                className="button"
                onClick={() => setModalCriar(!modalCriar)}
            >
                Nova categoria
            </button>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map(categoria => (
                        <tr key={categoria.id}>
                            <td>{categoria.id}</td>
                            <td>{categoria.nome}</td>
                            <td style={{border: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                                <FiTrash2 
                                    className="trash-icon" 
                                    size={30} 
                                    title="Remover"
                                    onClick={() => handleRemove(categoria.id)}
                                /> 
                                <FiEdit 
                                    className="edit-icon" 
                                    size={30} 
                                    title="Editar"
                                    onClick={() => handleEdit(categoria)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalAlterar ? <EditModal categoria={categoria} setModal={setModalAlterar} /> : null}
            {modalCriar ? <CreateModal setModalCriar={setModalCriar} /> : null}
        </section>
    );
}