import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import ColumnBack from '../../components/ColumnBack';
import AlterarEndereco from '../../components/AlterarEndereco';
import { FiTrash2 } from 'react-icons/fi';
import InputMask from 'react-input-mask';

import Sour from '../../assets/1.jpg'

export default function Carrinho() {

    const history = useHistory();

    const [carrinho, setCarrinho] = useState(JSON.parse(sessionStorage.getItem("Carrinho")));
    const userID = localStorage.getItem('userID');
    const [endereco, setEndereco] = useState(null);

    const [cep, setCep] = useState('');
    const [valorCep, setValorCep] = useState('--');

    const [modalAlterar, setModalAlterar] = useState(false);

    let valorTotal = carrinho.reduce((accumulator, acctualValue) => {
         return accumulator + (acctualValue.valor * acctualValue.quantidadePedido);
    }, 0);

    const handleModalAlterar = () => {
        setModalAlterar(!modalAlterar);
    }

    const handleCEP = (e) => {
        e.preventDefault();
        if (cep !== '' && cep !== '--') {
            if (cep === '49400-000') setValorCep(0);
            else setValorCep(15);
        } else setValorCep('--');
    }

    const handleRemoveProduto = (index) => {
        setCarrinho(carrinho.filter((iten, i) => i !== index ? iten : null));
        const x = carrinho.filter((iten, i) => i !== index ? iten : null);
        sessionStorage.setItem("Carrinho", JSON.stringify(x));
    }

    const handleFinalizar = () => {
        if (userID !== null) {
            if (sessionStorage.getItem("Carrinho") === '[]')
                return alert("Adicione produtos ao carrinho!");
            if (valorCep === '--' || valorCep === '------')
                return alert('É necessário calcular o valor do frete.');
            if (endereco === null)
                return alert('É necessário adicionar um endereço.');

            valorTotal += valorCep;
            let compra = carrinho;
            compra.push(valorCep);
            compra.push(valorTotal);    
            
            setCarrinho(JSON.parse(sessionStorage.getItem("Carrinho")));
            sessionStorage.setItem("Compra", JSON.stringify(compra));

            history.push('../compra');
        } else {
            alert("Faça o seu login ou cadastre-se");
            history.push('../login');
        }
    }

    useEffect(() => {
        const fetch = async () => {
            await api.get(`api/endereco/usuario/${userID}`)
            .then(response => {
                setEndereco(response.data);
            });
            setCarrinho(JSON.parse(sessionStorage.getItem("Carrinho")));
        };
        fetch();
    }, [userID, carrinho]);

    return(
        
        <section className="cart-container">
            <ColumnBack />
            <section className="cart-main">
                <h1>Carrinho</h1>
                <ul>
                    {carrinho.map((i, index) => (
                        <li key={index}>
                            <div className="dropdown-img">
                                <img src={Sour} width={80} alt="" />
                                <div> <img src={Sour} width={300} alt="" /> </div>
                            </div>
                            <p>{i.nome}</p>
                            <p>Quantidade: {i.quantidadePedido}</p>
                            <p>Tamanho: {i.tamanho.nome}</p>
                            <p>
                                {Intl.NumberFormat('pt-br', 
                                {style: 'currency', currency: 'BRL'}).format(i.valor * i.quantidadePedido)}
                            </p>
                            <button 
                                onClick={() => handleRemoveProduto(index)}> 
                                    <FiTrash2 size={25}/> 
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="frete">
                    <h1>Valor do frete</h1>
                    <form onSubmit={handleCEP}>
                        <InputMask 
                            placeholder="CEP" 
                            size="15" mask="99999-999"
                            value={cep}
                            onChange={e => setCep(e.target.value)}
                        />
                        <button className="button">Calcular</button>
                    </form>
                    <h1>
                        {valorCep !== '--' ? Intl.NumberFormat('pt-br', 
                        {style: 'currency', currency: 'BRL'}).format(valorCep) : '------'}
                    </h1>
                </div>
                {userID === null ? (<p></p>) : (
                    <div className="endereco-cart">
                        <div>
                            <h1>Endereço de entrega</h1>
                            
                            {endereco === null ? "Endereço ainda não foi definido." : 
                            (
                                <div>
                                    <p><span>CEP:</span> {endereco.cep}</p>
                                    <p><span>Estado:</span> {endereco.estado}</p>
                                    <p><span>Cidade:</span> {endereco.cidade}</p>
                                    <p><span>Bairro:</span> {endereco.bairro}</p>
                                    <p><span>Rua:</span> {endereco.rua}</p>
                                    {endereco.complemento != null ? <p><span>Complemento:</span> {endereco.complemento}</p> : <span></span> }
                                    <p><span>Número:</span> {endereco.numero}</p>
                                </div>
                            )}
                        </div>
                        <button className="button" onClick={handleModalAlterar}>
                            {endereco === null ? "Adicionar endereço" : "Alterar endereço"}
                        </button>
                    </div>)
                }

                <div className="valor-cart">
                    <div>
                        <h1>Valor total:</h1>
                        <h1>
                            {Intl.NumberFormat('pt-br', 
                            {style: 'currency', currency: 'BRL'})
                            .format(valorCep !== '--' ? valorTotal + valorCep : valorTotal)}
                        </h1>
                    </div>
                    <button
                        onClick={handleFinalizar} 
                        className="button">
                            Finalizar compra
                    </button>
                </div>
                {modalAlterar ? <AlterarEndereco endereco={endereco} setModalAlterar={setModalAlterar} /> : null}
            </section>
        </section>
    );
}