import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import Sour from '../../assets/1.jpg'

import ColumnBack from '../../components/ColumnBack';

export default function Produto() {

    const { idproduto } = useParams();

    const [produto, setProduto] = useState(null);
    const [qtd, setQtd] = useState(1);
    const valorProduto = produto != null ? produto.valor : 0;
    const estoqueProduto = produto != null ? produto.quantidadeEstoque : 0;
    const [tamanhos, setTamanhos] = useState([]);
    const [tmnSelecionado, setTmnSelecionado] = useState(1);

    function hundleIncrement() { if (qtd < estoqueProduto) setQtd(qtd + 1); }
    function hundleDecrement() { if (qtd > 1) setQtd(qtd - 1); }

    const handleSelectTamanho = (tamanho) => {
        setTmnSelecionado(tamanho);
    }

    const handleAdicionar = () => {
        let carID, carTMN, carQTD;
        const carrinhoID = localStorage.getItem('CarrinhoID');
        const carrinhoTMN = localStorage.getItem('CarrinhoTMN');
        const carrinhoQTD = localStorage.getItem('CarrinhoQTD');
        if (carrinhoID === '') {
            localStorage.setItem('CarrinhoID', produto.id);
            localStorage.setItem('CarrinhoTMN', tmnSelecionado);
            localStorage.setItem('CarrinhoQTD', qtd);
        } else {
            carID = carrinhoID.split(',').map(i => parseInt(i));
            carID.push(produto.id);
            carTMN = carrinhoTMN.split(',').map(i => parseInt(i));
            carTMN.push(tmnSelecionado);
            carQTD = carrinhoQTD.split(',').map(i => parseInt(i));
            carQTD.push(qtd);
            localStorage.setItem('CarrinhoID', carID);
            localStorage.setItem('CarrinhoTMN', carTMN);
            localStorage.setItem('CarrinhoQTD', carQTD);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            await api.get(`api/produto/${idproduto}`)
            .then(response => {
                setProduto(response.data);
            });
            await api.get('api/tamanho')
            .then(response => {
                setTamanhos(response.data);
            })
        }
        fetch();
    }, [idproduto]);

    return(
        <section className="produto-container">
            <ColumnBack />
            <section className="produto-main-container">
                <h1>{produto != null ? produto.nome : ""}</h1>
                <div className="produto-info">
                    <img src={Sour} alt="" />
                    <div>
                        <h1 className="valor">
                            {Intl.NumberFormat('pt-br', 
                            {style: 'currency', currency: 'BRL'}).format(valorProduto * qtd)}
                        </h1>
                        <div className="quantidade">
                            <p>Quantidade: </p>
                            <div className="qtd-buttons">
                                <button className="button" onClick={hundleDecrement}>-</button>
                                <p>{qtd}</p>
                                <button className="button" onClick={hundleIncrement}>+</button>
                            </div>
                        </div>
                        <div className="tamanho">
                            <p>Tamanho: </p>
                            <ul>
                                {tamanhos.map(t => (
                                    <li key={t.id}>
                                        <button className={t.id === tmnSelecionado ? 'selected' : ""} onClick={() => handleSelectTamanho(t.id)}> 
                                            {t.nome} 
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <h2 style={{fontSize: 25, marginTop: 20}} >Descrição:</h2>
                        <p style={{fontSize: 18, marginTop: 10, marginBottom: 10}}>
                            {produto != null ? produto.descricao : ""}
                        </p>

                        <div className="produto-buttons">
                            <Link onClick={handleAdicionar} to={localStorage.getItem('userID') == null ? '../login' : '../compra'}
                                className="button">
                                    Comprar agora
                            </Link>
                            <Link onClick={handleAdicionar} to='../carrinho'
                                className="button" 
                                style={{backgroundColor: '#156950', color: '#D6EBDF'}}>
                                    Adicionar ao carrinho
                            </Link>
                        </div> 
                    </div>
                </div>
            </section>
        </section>
    );
}