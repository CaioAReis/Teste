import ColumnBack from '../../components/ColumnBack';
import { FiTrash2 } from 'react-icons/fi';
import InputMask from 'react-input-mask';

import Sour from '../../assets/1.jpg'

import './styles.css';

export default function Carrinho() {
    return(
        <section className="cart-container">
            <ColumnBack />
            <section className="cart-main">
                <h1>Carrinho</h1>
                <ul>
                    <li>
                        <img src={Sour} width={100} alt="" />
                        <p>Nome do produto</p>
                        <p>Quantidade: 1</p>
                        <p>Tamanho: M</p>
                        <p>Valor: 79,90</p>
                        <button> <FiTrash2 size={25} /> </button>
                    </li>

                    <li>
                        <img src={Sour} width={100} alt="" />
                        <p>Nome do produto</p>
                        <p>Quantidade: 1</p>
                        <p>Tamanho: M</p>
                        <p>Valor: 79,90</p>
                        <button> <FiTrash2 size={25}/> </button>
                    </li>

                    <li>
                        <img src={Sour} width={100} alt="" />
                        <p>Nome do produto</p>
                        <p>Quantidade: 1</p>
                        <p>Tamanho: M</p>
                        <p>Valor: 79,90</p>
                        <button> <FiTrash2 size={25}  /> </button>
                    </li>
                </ul>
                <div className="frete">
                    <h1>Valor do frete</h1>
                    <form action="">
                        <InputMask type="text" placeholder="CEP" size="15" mask="99999-999"/>
                        <button className="button">Calcular</button>
                    </form>
                    <h1> R$ 0.00 </h1>
                </div>
                <div className="endereco-cart">
                    <div>
                        <h1>Endereço de entrega</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Voluptas ab facilis beatae veritatis dolorum. Perferendis 
                            possimus, reiciendis, voluptatem in quis iusto culpa harum 
                            perspiciatis, voluptas eveniet nam blanditiis mollitia laudantium!
                        </p>
                    </div>
                    <button className="button">Alterar</button>
                </div>
                <div className="valor-cart">
                    <div>
                        <h1>Valor total:</h1>
                        <h1>R$ 139,8</h1>
                    </div>
                    <button className="button">Finalizar compra</button>
                </div>
            </section>
        </section>
    );
}