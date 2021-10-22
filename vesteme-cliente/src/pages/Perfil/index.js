import React, { useEffect, useState } from 'react';
import ColumnBack from '../../components/ColumnBack';

import api from '../../services/api';

import './styles.css';

import AlterarEndereco from '../../components/AlterarEndereco';
import AdicionarEndereco from '../../components/AdicionarEndereço';
import AlterarDados from '../../components/AlterarDados';
import AlterarSenha from '../../components/AlterarSenha';
import ConfirmarUsuario from '../../components/Confirmacao';

// import Sour from '../../assets/1.jpg';

export default function Perfil() {

    const userID = sessionStorage.getItem('userID');
    const userToken = sessionStorage.getItem('userToken');
    const [usuario, setUsuario] = useState(null);
    const [endereco, setEndereco] = useState(null);
    const [pedidos, setPedidos] = useState([]);

    const [modalAlterar, setModalAlterar] = useState(false);
    const [modalCriar, setModalCriar] = useState(false);
    const [modalDados, setModalDados] = useState(false);
    const [modalSenha, setModalSenha] = useState(false);
    const [modalConfirmar, setModalConfirmar] = useState(false);
    const [modalNumber, setModalNumber] = useState(0);

    const handleConfirmar = (e) => {
        setModalNumber(e);
        setModalConfirmar(!modalConfirmar);
    }

    useEffect(() => {
        const fetch = async () => {
            await api.get(`api/usuario/${userID}`,  {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }).then(response => setUsuario(response.data));

            await api.get(`api/endereco/usuario/${userID}`,  {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }).then(response => setEndereco(response.data));

            await api.get(`api/pedido/usuario/${userID}`,  {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then(response => setPedidos(response.data));
        }
        fetch();
    }, [userID, endereco, userToken, modalDados, modalCriar, modalAlterar]);

    return(
        <section className="perfil-container">
            <ColumnBack />
            <section className="perfil-main">
                <h1>Perfil</h1>
                <div className="info-container">
                    {usuario === null ? '' : <div className="info-perfil">
                        <h1>Nome: <span>{usuario.nome}</span></h1>
                        <h1>CPF: <span>{usuario.cpf}</span></h1>
                        <h1>Email: <span>{usuario.email}</span></h1>
                        <h1>Data de nascimento: <span>{
                            Intl.DateTimeFormat('pt-br', {timeZone: 'UTC'})
                            .format( new Date(usuario.dataNascimento.slice(0,10)))
                        }</span></h1>
                        {usuario.celular === null ? "" : 
                            <h1>Celular: <span>{usuario.celular}</span></h1>}
                        {usuario.celular === null ? "" : 
                            <h1>Telefone: <span>{usuario.telefone}</span></h1>}
                    </div>}
                    <div style={{width: "20%"}}>
                        <button className="button" onClick={() => handleConfirmar(3)}>Alterar dados</button>
                        <button className="button" onClick={() => handleConfirmar(4)}>Alterar senha</button>
                    </div>
                </div>
                <h1>Endereço</h1>
                <div className="info-container">
                    {endereco === null ? '' : <div className="info-perfil">
                        <h1>CEP: <span>{endereco.cep}</span></h1>
                        <h1>Estado: <span>{endereco.estado}</span></h1>
                        <h1>Cidade: <span>{endereco.cidade}</span></h1>
                        <h1>Bairro: <span>{endereco.bairro}</span></h1>
                        <h1>Rua: <span>{endereco.rua}</span></h1>
                        {endereco.complemento === null ? '' : <h1>Complemento: <span>{endereco.complemento}</span></h1>}
                        <h1>Número: <span>{endereco.numero}</span></h1>
                    </div>}
                    <button 
                        onClick={endereco === null ? 
                            () => handleConfirmar(2) : 
                            () => handleConfirmar(1)}
                        className="button" 
                        style={{width: "20%"}}>
                            {endereco === null ? "Adicionar endereço" : "Alterar endereço"}
                    </button>
                </div>

                <h1>Pedidos realizados</h1>
                <ul className="lista-pedidos">

                    {pedidos === [] ? '' : pedidos.map((iten, index) => (
                        <li key={index}>
                        <p><span>Pedido:</span> {
                            Intl.DateTimeFormat('pt-br', {timeZone: 'UTC'})
                            .format(new Date(iten.dataPedido.slice(0,10)))
                        }</p>
                        <p><span>Status:</span> {iten.status}</p>
                        <p><span>Entrega:</span> {
                            Intl.DateTimeFormat('pt-br', {timeZone: 'UTC'})
                            .format(new Date(iten.dataEntrega.slice(0,10)))
                        }</p>
                        <p><span>Valor:</span> {
                            Intl.NumberFormat('pt-br', 
                            {style: 'currency', currency: 'BRL'}).format(iten.valorTotal)
                        }</p>
                        {/* <ul className="lista-produtos">
                            <li>
                                <img src={Sour} width={100} alt="" />
                                <p>Nome do produto</p>
                                <p>Quantidade: 1</p>
                                <p>Tamanho: M</p>
                                <p>Valor: 79,90</p>
                            </li>
                        </ul> */}
                    </li>))}
                </ul>
                {modalAlterar ? <AlterarEndereco endereco={endereco} setModalAlterar={setModalAlterar} /> : null}
                {modalCriar ? <AdicionarEndereco setModalCriar={setModalCriar} /> : null}
                {modalDados ? <AlterarDados usuario={usuario} setModalDados={setModalDados} /> : null}
                {modalSenha ? <AlterarSenha setModalSenha={setModalSenha} /> : null}
                {modalConfirmar ? <ConfirmarUsuario setModalConfirmar={setModalConfirmar} modalNumber={modalNumber}
                    setModalAlterar={setModalAlterar}
                    setModalCriar={setModalCriar}
                    setModalDados={setModalDados}
                    setModalSenha={setModalSenha}
                /> : null}
            </section>
        </section>
    );
}