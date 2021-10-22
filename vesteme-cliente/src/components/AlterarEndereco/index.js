import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import api from '../../services/api';

import InputMask from 'react-input-mask';
import { IoIosCloseCircleOutline } from 'react-icons/io'

import './styles.css';

export default function AlterarEndereco ({setModalAlterar, endereco}) {

    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setModalAlterar(false);
        }
    };

    const userID = sessionStorage.getItem('userID');
    const userToken = sessionStorage.getItem('userToken');
    const [cep, setCep] = useState(endereco.cep);
    const [estado, setEstado] = useState(endereco.estado);
    const [cidade, setCidade] = useState(endereco.cidade);
    const [bairro, setBairro] = useState(endereco.bairro);
    const [rua, setRua] = useState(endereco.rua);
    const [complemento, setComplemento] = useState(endereco.complemento);
    const [numero, setNumero] = useState(endereco.numero);

    const handleAlterarEndereco = async (e) => {
        e.preventDefault();
        const data = {
            cep,
            estado,
            cidade,
            bairro,
            rua,
            complemento,
            numero
        }
        try {
            await api.put(`api/endereco/usuario/${userID}`, data,  {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
            alert("Endereço atualizado com sucesso!");
        } catch (error) {
            alert("Erro ao atualizar endereço");
        }
        setModalAlterar(false);        
    }

    return ReactDOM.createPortal(
        <section className="container-modal" ref={modalRef} onClick={closeModal}>
            <div className="modal">
                <button onClick={() => setModalAlterar(false)}> 
                    <IoIosCloseCircleOutline size={50} /> 
                </button>
                <div className="form-container">
                    <h1>Alterar endereço</h1>
                    <form onSubmit={handleAlterarEndereco}>
                        <section>
                            <label htmlFor="cep">CEP: </label>
                            <InputMask id="cep"
                                style={{width:'40%'}}
                                size="15" 
                                mask="99999-999"
                                value={cep}
                                onChange={e => setCep(e.target.value)}
                            />
                            <label htmlFor="estado">Estado: </label>
                            <select name="estado" id="estado" value={estado} onChange={e => setEstado(e.target.value)}>
                                    <option value="">------</option>
                                    <option value="Acre">Acre</option>
                                    <option value="Alagoas">Alagoas</option>
                                    <option value="Amapá">Amapá</option>
                                    <option value="Amazonas">Amazonas</option>
                                    <option value="Bahia">Bahia</option>
                                    <option value="Ceará">Ceará</option>
                                    <option value="Espirito Santo">Espirito Santo</option>
                                    <option value="Goiás">Goiás</option>
                                    <option value="Maranhão">Maranhão</option>
                                    <option value="Mato grosso">Mato grosso</option>
                                    <option value="Mato grosso do sul">Mato grosso do sul</option>
                                    <option value="Minas Gerais">Minas Gerais</option>
                                    <option value="Pará">Pará</option>
                                    <option value="Paraíba">Paraíba</option>
                                    <option value="Paraná">Paraná</option>
                                    <option value="Pernambuco">Pernambuco</option>
                                    <option value="Piauí">Piauí</option>
                                    <option value="Rio de Janeiro">Rio de Janeiro</option>
                                    <option value="Rio Grande do norte">Rio Grande do norte</option>
                                    <option value="Rio Grande do Sul">Rio Grande do Sul</option>
                                    <option value="Rondônia">Rondônia</option>
                                    <option value="Roraima">Roraima</option>
                                    <option value="Santa Catarina">Santa Catarina</option>
                                    <option value="São Paulo">São paulo</option>
                                    <option value="Sergipe">Sergipe</option>
                                    <option value="Tocantins">Tocantins</option>
                                </select>
                        </section>
                            
                        <section>
                            <label htmlFor="cidade">Cidade: </label>
                            <input id="cidade" value={cidade} onChange={e => setCidade(e.target.value)} />
                        </section>
                            
                        <section>
                            <label htmlFor="bairro">Bairro: </label>
                            <input id="bairro" value={bairro} onChange={e => setBairro(e.target.value)}/>
                        </section>

                        <section>
                            <label htmlFor="rua">Rua: </label>
                            <input id="rua" value={rua} onChange={e => setRua(e.target.value)} />
                                
                            <label htmlFor="numero">Número: </label>
                            <input id="numero" value={numero} style={{width:'20%'}} onChange={e => setNumero(e.target.value)} />
                        </section>

                        <section>
                            <label htmlFor="complemento">Complemento: </label>
                            <input id="complemento" value={complemento} onChange={e => setComplemento(e.target.value)}/>
                        </section>
                        <button type="submit" className='button'>Alterar</button>
                    </form>
                </div>
            </div>
        </section>,
        document.getElementById("modal")
    );
}