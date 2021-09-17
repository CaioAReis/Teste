import React, { useEffect, useState } from 'react';

import api from '../../../services/api';

import { FiTrash2, FiEdit } from 'react-icons/fi';

export default function AdminProdutos() {

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        api.get('api/produto').then(response => setProdutos(response.data));
    }, []);

    return (
        <section className="adm-categorias">
            <h1>Administração de produtos</h1>
            <button className="button">
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
                            <FiTrash2 className="trash-icon" size={30} title="Remover"/> 
                            <FiEdit className="edit-icon" size={30} title="Editar"/>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <div style={{width:"100%", height: 30}} ></div>
        </section>
    );
}