import React, { useEffect, useState } from 'react';

import api from '../../../services/api';

import { FiTrash2, FiEdit } from 'react-icons/fi';

export default function AdminTamanhos() {

    const [tamanhos, setTamanhos] = useState([]);

    const handleRemove = (id) => {

    }

    const handleEdit = (id) => {
        
    }

    useEffect(() => {
        api.get('api/tamanho').then(response => setTamanhos(response.data));
    }, []);

    return (
        <section className="adm-categorias">
            <h1>Administração de tamanhos</h1>
            <button className="button">
                Novo tamanho
            </button>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tamanhos.map(tamanho => (
                    <tr key={tamanho.id}>
                        <td>{tamanho.id}</td>
                        <td>{tamanho.nome}</td>
                        <td style={{border: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                            <FiTrash2 
                                className="trash-icon" 
                                size={30} 
                                title="Remover"
                                onClick={() => handleRemove(tamanho.id)}
                            /> 
                            <FiEdit 
                                className="edit-icon" 
                                size={30} 
                                title="Editar"
                                onClick={() => handleEdit(tamanho.id)}
                            />
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}