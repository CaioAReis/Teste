import ColumnBack from '../../components/ColumnBack';
import { BiBarcode } from 'react-icons/bi';
import { AiFillCreditCard } from 'react-icons/ai';

import Sour from '../../assets/1.jpg'

import './styles.css';

export default function FinalizarCompra() {
    return(
        <section className="compra-container">
            <ColumnBack />
            <section className="compra-main">
                <h1 style={{marginBottom: 40}}>Finalizar compra</h1>
                <h1 style={{fontSize: "30px"}}>Detalhes</h1>
                <ul>
                    <li>
                        <img src={Sour} width={80} alt="" />
                        <p>Nome do produto</p>
                        <p>Quantidade: 1</p>
                        <p>Tamanho: M</p>
                        <p>Valor: 79,90</p>
                    </li>

                    <li>
                        <img src={Sour} width={80} alt="" />
                        <p>Nome do produto</p>
                        <p>Quantidade: 1</p>
                        <p>Tamanho: M</p>
                        <p>Valor: 79,90</p>
                    </li>

                    <li>
                        <img src={Sour} width={80} alt="" />
                        <p>Nome do produto</p>
                        <p>Quantidade: 1</p>
                        <p>Tamanho: M</p>
                        <p>Valor: 79,90</p>
                    </li>
                </ul>

                <div className="frete">
                    <h1>Valor do frete</h1>
                    <h1> R$ 0.00 </h1>
                </div>

                <div className="valor-compra">
                    <h1>Valor total:</h1>
                    <h1>R$ 139,8</h1>
                </div>
                
                <h1 style={{marginBottom: 20, fontSize: 30}}>Forma de pagamento</h1>
                <div className="compra-pagamento">
                    <form action="">
                        <div>
                            <label htmlFor="boleto">
                                <input type="radio" name="pagamento" id="boleto" value="Boleto" />
                                <p style={{zIndex: 1}}>Boleto</p>
                                <BiBarcode size={200} style={{zIndex: 1}} />
                            </label>
                            <label htmlFor="cartao">
                                <input type="radio" name="pagamento" id="cartao" value="Cartão"/>
                                <p className style={{zIndex: 1}}>Cartão</p>
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