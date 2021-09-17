import React, { useEffect, useState } from 'react';

import api from '../../../services/api';

import './styles.css';
import { FiTrash2, FiEdit } from 'react-icons/fi';

export default function AdminCategorias() {

    const [categorias, setCategorias] = useState([]);

    const handleRemove = (id) => {

    }

    const handleEdit = (id) => {

    }

    useEffect(() => {
        api.get('api/categoria').then(response => setCategorias(response.data));
    }, []);

    return(
        <section className="adm-categorias">
            <h1>Adiministração de categorias</h1>
            <button className="button">
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
                                    onClick={() => handleEdit(categoria.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}