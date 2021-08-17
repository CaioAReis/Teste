import { useState } from 'react';

import './styles.css';
import Sour from '../../assets/1.jpg'

import ColumnBack from '../../components/ColumnBack';

export default function Produto() {

    const [counter, setCounter] = useState(1);

    function hundleIncrement() { setCounter(counter + 1); }

    function hundleDecrement() { if (counter > 1) setCounter(counter - 1); }

    return(
        <section className="produto-container">
            <ColumnBack />
            <section className="produto-main-container">
                <h1>Categoria + Nome do produto - Detalhe da estampa - Cor </h1>
                <div className="produto-info">
                    <img src={Sour} alt="" />
                    <div>
                        <h1 className="valor">R$ 79,99</h1>
                        <div className="quantidade">
                            <p>Quantidade: </p>
                            <div className="qtd-buttons">
                                <button className="button" onClick={hundleDecrement}>-</button>
                                <p>{counter}</p>
                                <button className="button" onClick={hundleIncrement}>+</button>
                            </div>
                        </div>
                        <div className="tamanho">
                            <p>Tamanho: </p>
                            <ul>
                                <li><button className="selected" >PP</button></li>
                                <li><button>P</button></li>
                                <li><button>M</button></li>
                                <li><button>G</button></li>
                                <li><button>GG</button></li>
                                <li><button>XGG</button></li>
                            </ul>
                        </div>
                        <h2 style={{fontSize: 25, marginTop: 20}} >Descrição:</h2>
                        <p style={{fontSize: 18, marginTop: 10, marginBottom: 10}}>
                            Lorem ipsum dolor sit, amet consectetur 
                            adipisicing elit. Libero eos enim tempore
                            quasi a eum! Esse, possimus cumque fugiat 
                            veritatis ut doloribus debitis corrupti 
                            molestiae harum ad autem inventore alias.
                        </p>

                        <div className="produto-buttons">
                            <button className="button">Comprar agora</button>
                            <button className="button" style={{backgroundColor: '#156950', color: '#D6EBDF'}} >Adicionar ao carrinho</button>
                        </div> 
                    </div>
                </div>
            </section>
        </section>
    );
}