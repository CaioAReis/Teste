import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import Sour from '../../assets/1.jpg'

import ColumnBack from '../../components/ColumnBack';

export default function Produto() {

    const history = useHistory();

    if (sessionStorage.getItem('Compra') !== null)
        sessionStorage.removeItem("Compra");

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

    const handleComprarAgora = async () => {
        const userID = localStorage.getItem('userID');
        if (userID !== null) {
            const endereco = await api.get(`api/endereco/usuario/${userID}`);

            if (endereco !== null) {
                const cep = endereco.data.cep;
                let valorCep = 0;
                if (cep !== '49400-000') valorCep = 15;

                produto.quantidadePedido = qtd;
                produto.tamanhoID = tmnSelecionado;
                produto.tamanho = tamanhos.find(t => t.id === tmnSelecionado);

                const compra = [];
                compra.push(produto);
                compra.push(valorCep);
                compra.push((produto.valor * qtd) + 15);

                sessionStorage.setItem("Compra", JSON.stringify(compra));

                history.push('../compra');
            } else {
                alert("Defina um endereço no perfil.");
                history.push('../perfil');
            }
        } else {
            alert("Faça o seu login ou cadastre-se");
            history.push('../login');
        }

    }

    const handleAdicionar = () => {
        produto.quantidadePedido = qtd;
        produto.tamanhoID = tmnSelecionado;
        produto.tamanho = tamanhos.find(t => t.id === tmnSelecionado);
        const data = produto;

        const sss = JSON.parse(sessionStorage.getItem("Carrinho"));

        sss.push(data);
        sessionStorage.setItem("Carrinho", JSON.stringify(sss));

        history.push('../carrinho');
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
                            <button 
                                onClick={handleComprarAgora} 
                                className="button">
                                    Comprar agora
                            </button>
                            <button 
                                onClick={handleAdicionar} 
                                className="button"
                                style={{backgroundColor: '#156950', color: '#D6EBDF'}}>
                                    Adicionar ao carrinho
                            </button>
                        </div> 
                    </div>
                </div>
            </section>
        </section>
    );
}