import React, { useEffect, useState } from 'react';

import api from '../../../services/api';

import { FiTrash2, FiEdit } from 'react-icons/fi';
import { EditTamanhos } from './EditTamanhos';
import { CreateTamanhos } from './CreateTamanhos';

export default function AdminTamanhos() {

    const [tamanhos, setTamanhos] = useState([]);
    const [tamanho, setTamanho] = useState(null);
    const [editTamanho, setEditTamanho] = useState(false);
    const [createTamanho, setCreateTamanho] = useState(false);

    const handleRemove = async (id) => {
        // await api.delete(`api/tamanho/${id}`);
        setTamanhos(tamanhos.filter(t => t.id !== id));
        alert(`Tamanho com ID: ${id} foi removido com sucesso!!`);
    }

    useEffect(() => {
        api.get('api/tamanho').then(response => setTamanhos(response.data));
    }, [editTamanho, createTamanho]);

    return (
        <section className="adm-categorias">
            <h1>Administração de tamanhos</h1>
            <button 
                className="button"
                onClick={() => setCreateTamanho(!createTamanho)}
            >
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
                                onClick={() => {setEditTamanho(!editTamanho); setTamanho(tamanho)}}
                            />
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            {editTamanho ? <EditTamanhos setEditTamanho={setEditTamanho} tamanho={tamanho} /> : null}
            {createTamanho ? <CreateTamanhos setCreateTamanho={setCreateTamanho}  /> : null}
        </section>
    );
}