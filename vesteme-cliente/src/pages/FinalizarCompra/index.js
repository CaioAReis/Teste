import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ColumnBack from '../../components/ColumnBack';
import { BiBarcode } from 'react-icons/bi';
import { AiFillCreditCard } from 'react-icons/ai';

import Sour from '../../assets/1.jpg'

import api from '../../services/api';

import './styles.css';

export default function FinalizarCompra() {

    const history = useHistory();

    const usuarioID = sessionStorage.getItem('userID');
    const userToken = sessionStorage.getItem('userToken');
    const compra = JSON.parse(sessionStorage.getItem("Compra"));
    const [pagamentoID, setPagamento] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);
    const [valorCep, setValorCep] = useState(0);
    const [produtos, setProdutos] = useState([]);

    const handleFazerPedido = async (e) => {
        e.preventDefault();

        for (let i = 0; i < compra.length; i++) {
            setProdutos(produtos.push(compra[i]));
        }

        const data = {
            usuarioID,
            pagamentoID,
            valorTotal,
            produtos: JSON.stringify(produtos)
        };

        console.log(JSON.stringify(produtos));

         try {
            await api.post('api/pedido', data,  {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            alert("Compra realizada com sucesso.");
            sessionStorage.clear();
            history.push('/');
         } catch (error) {
             alert("Erro ao fazer compra.");
         }
        // console.log(JSON.parse("[{\"id\":2,\"nome\":\"Camisa 2\",\"descricao\":\"A melhor camisa 2 do mundo\",\"valor\":59.9,\"quantidadeEstoque\":12,\"dataCadastro\":\"2021-08-26T18:55:38.470623\",\"dataAlteracao\":\"2021-08-26T18:55:38.503625\",\"categoriaID\":1,\"categoria\":null,\"tamanhoID\":1,\"tamanho\":{\"id\":1,\"nome\":\"PP\",\"produtos\":null},\"tamanhos\":null,\"pedidos\":null},{\"id\":3,\"nome\":\"Camisa 3\",\"descricao\":\"A melhor camisa 3 do mundo\",\"valor\":59.9,\"quantidadeEstoque\":12,\"dataCadastro\":\"2021-08-26T18:55:50.108289\",\"dataAlteracao\":\"2021-08-26T18:55:50.12129\",\"categoriaID\":1,\"categoria\":null,\"tamanhoID\":5,\"tamanho\":{\"id\":5,\"nome\":\"GG\",\"produtos\":null},\"tamanhos\":null,\"pedidos\":null}]"));
        // "produtos": "[{\"id\":2,\"nome\":\"Camisa 2\",\"descricao\":\"A melhor camisa 2 do mundo\",\"valor\":59.9,\"quantidadeEstoque\":12,\"dataCadastro\":\"2021-08-26T18:55:38.470623\",\"dataAlteracao\":\"2021-08-26T18:55:38.503625\",\"categoriaID\":1,\"categoria\":null,\"tamanhoID\":1,\"tamanho\":{\"id\":1,\"nome\":\"PP\",\"produtos\":null},\"tamanhos\":null,\"pedidos\":null},{\"id\":3,\"nome\":\"Camisa 3\",\"descricao\":\"A melhor camisa 3 do mundo\",\"valor\":59.9,\"quantidadeEstoque\":12,\"dataCadastro\":\"2021-08-26T18:55:50.108289\",\"dataAlteracao\":\"2021-08-26T18:55:50.12129\",\"categoriaID\":1,\"categoria\":null,\"tamanhoID\":5,\"tamanho\":{\"id\":5,\"nome\":\"GG\",\"produtos\":null},\"tamanhos\":null,\"pedidos\":null}]"
    }
    
    useEffect(()=>{
        if (compra !== null) {
            if (valorTotal === 0 && valorCep === 0) {
                setValorTotal(compra.pop());
                setValorCep(compra.pop());
            }
        }
    }, [compra, valorCep, valorTotal])

    return(
        <section className="compra-container">
            <ColumnBack back="../carrinho"/>
            <section className="compra-main">
                <h1 style={{marginBottom: 40}}>Finalizar compra</h1>
                <h1 style={{fontSize: "30px"}}>Detalhes</h1>
                <ul>
                    {compra === null ? "" : compra.map((i, index) => (
                        <li key={index}>
                            <img src={Sour} width={80} alt="" />
                            <p>{i.nome}</p>
                            <p>Quantidade: {i.quantidadePedido}</p>
                            <p>Tamanho: {i.tamanho.nome}</p>
                            <p>
                                {Intl.NumberFormat('pt-br', 
                                {style: 'currency', currency: 'BRL'}).format(i.valor * i.quantidadePedido)}
                            </p>
                        </li>
                    ))}
                </ul>

                <div className="frete">
                    <h1>Valor do frete</h1>
                    <h1>
                        {Intl.NumberFormat('pt-br', 
                        {style: 'currency', currency: 'BRL'}).format(valorCep)}
                    </h1>
                </div>

                <div className="valor-compra">
                    <h1>Valor total:</h1>
                    <h1>
                        {Intl.NumberFormat('pt-br', 
                        {style: 'currency', currency: 'BRL'}).format(valorTotal)}
                    </h1>
                </div>
                
                <h1 style={{marginBottom: 20, fontSize: 30}}>Forma de pagamento</h1>
                <div className="compra-pagamento">
                    <form onSubmit={handleFazerPedido}>
                        <div>
                            <label htmlFor="boleto" onClick={() => setPagamento(2)} >
                                <input type="radio" name="pag" id="boleto" value={2} />
                                <p style={{zIndex: 1}}>Boleto</p>
                                <BiBarcode size={200} style={{zIndex: 1}} />
                            </label>
                            <label htmlFor="cartao" onClick={() => setPagamento(1)}>
                                <input type="radio" name="pag" id="cartao" value={1} />
                                <p style={{zIndex: 1}}>Cartão</p>
                                <AiFillCreditCard size={200} style={{zIndex: 1}}/>
                            </label>
                        </div>
                        <button className="button">Finalizar compra</button>
                    </form>
                </div>
            </section>
        </section>
    );
}