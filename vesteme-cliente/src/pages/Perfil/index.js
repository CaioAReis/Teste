import ColumnBack from '../../components/ColumnBack';

import './styles.css';

// import Sour from '../../assets/1.jpg';

export default function Perfil() {
    return(
        <section className="perfil-container">
            <ColumnBack />
            <section className="perfil-main">
                <h1>Perfil</h1>
                <div className="info-container">
                    <div className="info-perfil">
                        <h1>Nome: <span>Nome da criatura</span></h1>
                        <br />
                        <h1>CPF: <span>000.000.000-00</span></h1>
                        <br />
                        <h1>Email: <span>Teste@mail.com</span></h1>
                        <br />
                        <h1>Data de nascimento: <span>00/00/0000</span></h1>
                        <br />
                        <h1>Celular: <span>(00) 0 0000-0000</span></h1>
                        <br />
                        <h1>Telefone: <span>(00) 0000-0000</span></h1>
                    </div>
                    <div style={{width: "20%"}}>
                        <button className="button">Alterar dados</button>
                        <button className="button">Alterar senha</button>
                    </div>
                </div>
                <h1>Endereço</h1>
                <div className="info-container">
                    <div className="info-perfil">
                        <h1>CEP: <span>49400-000</span></h1>
                        <br />
                        <h1>Estado: <span>Sergipe</span></h1>
                        <br />
                        <h1>Cidade: <span>Lagarto</span></h1>
                        <br />
                        <h1>Bairro: <span>Loiola</span></h1>
                        <br />
                        <h1>Rua: <span>Av. Eremita Francisca de Jesus</span></h1>
                        <br />
                        <h1>Número: <span>000</span></h1>
                    </div>
                    <button className="button" style={{width: "20%"}} >Alterar</button>
                </div>

                <h1>Pedidos realizados</h1>
                <ul className="lista-pedidos">
                    <li>
                        <p><span>Data do pedido:</span> 00/00/0000</p>
                        <p><span>Status:</span> Cancelado</p>
                        <p><span>Data de entrega:</span> 00/00/0000</p>
                        <p><span>Valor da compra:</span> R$ 283,33</p>
                        {/* <ul className="lista-produtos">
                            <li>
                                <img src={Sour} width={100} alt="" />
                                <p>Nome do produto</p>
                                <p>Quantidade: 1</p>
                                <p>Tamanho: M</p>
                                <p>Valor: 79,90</p>
                            </li>
                        </ul> */}
                    </li>

                    <li>
                        <p><span>Data do pedido:</span> 00/00/0000</p>
                        <p><span>Status:</span> Cancelado</p>
                        <p><span>Data de entrega:</span> 00/00/0000</p>
                        <p><span>Valor da compra:</span> R$ 283,33</p>
                        {/* <ul className="lista-produtos">
                            <li>
                                <img src={Sour} width={100} alt="" />
                                <p>Nome do produto</p>
                                <p>Quantidade: 1</p>
                                <p>Tamanho: M</p>
                                <p>Valor: 79,90</p>
                            </li>
                        </ul> */}
                    </li>

                    <li>
                        <p><span>Data do pedido:</span> 00/00/0000</p>
                        <p><span>Status:</span> Cancelado</p>
                        <p><span>Data de entrega:</span> 00/00/0000</p>
                        <p><span>Valor da compra:</span> R$ 283,33</p>
                        {/* <ul className="lista-produtos">
                            <li>
                                <img src={Sour} width={100} alt="" />
                                <p>Nome do produto</p>
                                <p>Quantidade: 1</p>
                                <p>Tamanho: M</p>
                                <p>Valor: 79,90</p>
                            </li>
                        </ul> */}
                    </li>


                </ul>

            </section>
        </section>
    );
}