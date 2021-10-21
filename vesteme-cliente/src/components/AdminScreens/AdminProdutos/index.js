import React, { useEffect, useState } from 'react';

import api from '../../../services/api';

import { FiTrash2, FiEdit } from 'react-icons/fi';
import { EditProdutos } from './EditProdutos';
import { CreateProdutos } from './CreateProdutos';

export default function AdminProdutos() {

    const [produtos, setProdutos] = useState([]);
    const [produto, setProduto] = useState(null);
    const [editProduto, setEditProduto] = useState(false);
    const [createProduto, setCreateProduto] = useState(false);

    const handleRemove = async (id) => {
        await api.delete(`api/produto/${id}`);
        alert(`Produto com ID: ${id} foi removido com sucesso!!`);
    }

    useEffect(() => {
        api.get('api/produto').then(response => setProdutos(response.data));
    }, [produtos, editProduto, createProduto]);

    return (
        <section className="adm-categorias">
            <h1>Administração de produtos</h1>
            <button 
                className="button"
                onClick={() => setCreateProduto(!createProduto)}
            >
                Novo produto
            </button>

            <table>
                <thead>
                    <tr>
                        <th style={{width: 40}}>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th style={{width: 40}}>Estoque</th>
                        <th>Cadastro</th>
                        <th>Alteração</th>
                        <th style={{width: 40}}>Categoria</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(produto => (
                    <tr key={produto.id}>
                        <td>{produto.id}</td>
                        <td>{produto.nome}</td>
                        <td>{produto.descricao}</td>
                        <td>{Intl.NumberFormat('pt-br', 
                            {style: 'currency', currency: 'BRL'}).format(produto.valor)}</td>
                        <td>{produto.quantidadeEstoque}</td>
                        <td>{Intl.DateTimeFormat('pt-br', {timeZone: 'UTC'})
                            .format( new Date(produto.dataCadastro.slice(0,10)))}</td>
                        <td>{Intl.DateTimeFormat('pt-br', {timeZone: 'UTC'})
                            .format( new Date(produto.dataAlteracao.slice(0,10)))}</td>
                        <td>{produto.categoriaID}</td>
                        <td style={{border: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                            <FiTrash2 
                                className="trash-icon" 
                                size={30} 
                                title="Remover"
                                onClick={() => handleRemove(produto.id)} 
                            /> 
                            <FiEdit 
                                className="edit-icon" 
                                size={30} 
                                title="Editar"
                                onClick={() => {setProduto(produto); setEditProduto(!editProduto)}}
                            />
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <div style={{width:"100%", height: 30}} ></div>
            {editProduto ? <EditProdutos setEditProduto={setEditProduto} produto={produto} /> : null}
            {createProduto ? <CreateProdutos setCreateProduto={setCreateProduto} /> : null}
        </section>
    );
}