import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import api from '../../../services/api';

import { IoIosCloseCircleOutline } from 'react-icons/io';

export const CreateProdutos = ({setCreateProduto}) => {

    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setCreateProduto(false);
        }
    };

    const [form, setForm] = useState({
        nome: '',
        descricao: '',
        valor: '',
        quantidadeEstoque: '',
        categoriaId: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            nome: form.nome,
            descricao: form.descricao,
            valor: parseFloat(form.valor),
            quantidadeEstoque: parseInt(form.quantidadeEstoque),
            categoriaId: parseInt(form.categoriaId)
        }
        try {
            await api.post(`api/produto`, data);
            alert("Produto criado com sucesso!");
        } catch (error) {
            alert("Erro ao criar produto");
        }
        setCreateProduto(false);
    }

    return ReactDOM.createPortal(
         <section className="container-modal" ref={modalRef} onClick={closeModal}>
            <div className="modal">
                <button onClick={() => setCreateProduto(false)}> 
                    <IoIosCloseCircleOutline size={50} /> 
                </button>
                <div className="form-container">
                    <h1>Criar produto</h1>
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
                        <button type="submit" className='button'>Criar</button>
                    </form>
                </div>
            </div>
        </section>,
        document.getElementById("modal")
    );
}