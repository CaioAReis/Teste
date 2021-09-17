import React, { useEffect, useState } from 'react';

import api from '../../../services/api';

import { FiTrash2, FiEdit } from 'react-icons/fi';

export default function AdminPedidos() {

    const [pedidos, setPedidos] = useState([]);

    const handleRemove = (id) => {

    }

    const handleEdit = (id) => {

    }

    useEffect(() => {
        api.get('api/pedidos').then(response => setPedidos(response.data));
    }, []);

    return (
        <section className="adm-categorias">
            <h1>Administração de pedidos</h1>

            <table>
                <thead>
                    <tr>
                        <th>ID</th> 
                        <th>ID usuário</th>
                        <th>Tipo pagamento</th>
                        <th>Status</th>
                        <th>Valor total</th>
                        <th>Entrega</th>
                        <th>Pedido</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map(pedido => (
                    <tr key={pedido.id}>
                        <td>{pedido.id}</td>
                        <td>{pedido.usuarioID}</td>
                        <td>{pedido.pagamentoID}</td>
                        <td>{pedido.status}</td>
                        <td>{pedido.valorTotal}</td>
                        <td>{pedido.dataEntrega}</td>
                        <td>{pedido.dataPedido}</td>
                        <td style={{border: 0,display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                            <FiTrash2 
                                className="trash-icon" 
                                size={30} 
                                title="Remover"
                                onClick={() => handleRemove()}
                            /> 
                            <FiEdit 
                                className="edit-icon" 
                                size={30} 
                                title="Editar"
                                onClick={() => handleEdit()}
                            />
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}