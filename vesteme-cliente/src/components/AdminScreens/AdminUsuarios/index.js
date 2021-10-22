import React, { useEffect, useState } from 'react';

import api from '../../../services/api';

import { FiTrash2, FiEdit } from 'react-icons/fi';
import { EditUsuarios } from './EditUsuarios';
import { CreateUsuarios } from './CreateUsuarios';

export default function AdminUsuarios() {

    const userToken = sessionStorage.getItem('userToken');

    const [usuarios, setUsuarios] = useState([]);
    const [usuario, setUsuario] = useState(null);
    const [editUsuario, setEditUsuario] = useState(false);
    const [createUsuario, setCreateUsuario] = useState(false);

    const handleRemove = async (id) => {
        try {
            await api.delete(`api/usuario/${id}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
            alert(`Usuário com ID: ${id} foi removido com sucesso!!`);
        } catch {
            alert('Erro ao remover usuário!!');
        }
    }

    useEffect(() => {
        api.get('api/usuario', {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }).then(response => setUsuarios(response.data));
    }, [createUsuario, editUsuario, userToken]);

    return (
        <section className="adm-categorias">

            <h1>Administração de usuários</h1>
            <button 
                className="button"
                onClick={() => setCreateUsuario(!createUsuario)}
            >
                Novo usuário
            </button>

            <table>
                <thead>
                    <tr>
                        <th style={{width: 40}}>ID</th>
                        <th>Nome</th>
                        <th style={{width: 120}}>CPF</th>
                        <th>E-mail</th>
                        <th style={{width: 90}}>Nascimento</th>
                        <th style={{width: 125}}>Celular</th>
                        <th style={{width: 120}}>Telefone</th>
                        <th style={{width: 40}} >Tipo</th>
                        <th style={{width: 90}}></th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios === [] ? null : 
                        usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nome}</td>
                            <td>{usuario.cpf}</td>
                            <td>{usuario.email}</td>
                            <td>{Intl.DateTimeFormat('pt-br', {timeZone: 'UTC'})
                                .format( new Date(usuario.dataNascimento.slice(0,10)))}</td>
                            <td>{usuario.telefone}</td>
                            <td>{usuario.celular}</td>
                            <td>{usuario.tipoUsuarioID}</td>
                            <td style={{border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <FiTrash2 
                                    style={{marginRight: 30}} 
                                    className="trash-icon" 
                                    size={30} title="Remover"
                                    onClick={() => handleRemove(usuario.id)}
                                />
                                <FiEdit 
                                    className="edit-icon" 
                                    size={30} 
                                    title="Editar"
                                    onClick={() => {
                                        setEditUsuario(!editUsuario)
                                        setUsuario(usuario)
                                    }}
                                />
                            </td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
            {editUsuario ? <EditUsuarios setEditUsuario={setEditUsuario} usuario={usuario}/> : null}
            {createUsuario ? <CreateUsuarios setCreateUsuario={setCreateUsuario} /> : null}
        </section>
    );
}