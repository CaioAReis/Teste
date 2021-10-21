import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import api from '../../../services/api';

import { IoIosCloseCircleOutline } from 'react-icons/io';

export const EditProdutos = ({setEditProduto, produto}) => {

    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setEditProduto(false);
        }
    };

    const [form, setForm] = useState({
        nome: produto.nome,
        descricao: produto.descricao,
        valor: produto.valor,
        quantidadeEstoque: produto.quantidadeEstoque,
        categoriaId: produto.categoriaID
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            id: produto.id,
            nome: form.nome,
            descricao: form.descricao,
            valor: parseFloat(form.valor),
            quantidadeEstoque: parseInt(form.quantidadeEstoque),
            categoriaId: parseInt(form.categoriaId)
        }
        try {
            await api.put(`api/produto/${produto.id}`, data);
            alert("Produto atualizado com sucesso!");
        } catch (error) {
            alert("Erro ao atualizar produto");
        }
        setEditProduto(false);
    }

    return ReactDOM.createPortal(
         <section className="container-modal" ref={modalRef} onClick={closeModal}>
            <div className="modal">
                <button onClick={() => setEditProduto(false)}> 
                    <IoIosCloseCircleOutline size={50} /> 
                </button>
                <div className="form-container">
                    <h1>Alterar produto</h1>
                    <form onSubmit={handleSubmit}>
                        <section>
                            <label htmlFor="nome">Nome: </label>
                            <input 
                                id="nome" 
                                value={form.nome} 
                                onChange={e => 
                                setForm({...form, nome: e.target.value})}
                            />
                        </section>

                        <section>
                            <label htmlFor="desc">Descrição: </label>
                            <input 
                                id="desc" 
                                value={form.descricao} 
                                onChange={e => 
                                setForm({...form, descricao: e.target.value})}
                            />
                        </section>

                        <section>
                            <label htmlFor="valor">Valor: </label>
                            <input 
                                id="valor" 
                                type='number'
                                value={form.valor} 
                                onChange={e => 
                                setForm({...form, valor: e.target.value})}
                            />
                        </section>

                        <section>
                            <label htmlFor="estoque">Quantidade no Estoque: </label>
                            <input 
                                id="estoque" 
                                type='number'
                                value={form.quantidadeEstoque} 
                                onChange={e => 
                                setForm({...form, quantidadeEstoque: e.target.value})}
                            />
                        </section>

                        <section>
                            <label htmlFor="catego">ID categoria: </label>
                            <input 
                                id="catego" 
                                type='number'
                                value={form.categoriaId} 
                                onChange={e => 
                                setForm({...form, categoriaId: e.target.value})}
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