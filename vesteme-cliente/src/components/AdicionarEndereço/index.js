import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import api from '../../services/api';

import InputMask from 'react-input-mask';
import { IoIosCloseCircleOutline } from 'react-icons/io'

import './styles.css';

export default function AdicionarEndereco ({setModalCriar}) {

    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setModalCriar(false);
        }
    };

    const userID = sessionStorage.getItem('userID');
    const userToken = sessionStorage.getItem('userToken');
    const [cep, setCep] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [complemento, setComplemento] = useState('');
    const [numero, setNumero] = useState('');

    const handleCriarEndereco = async (e) => {
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
            await api.post(`api/endereco/usuario/${userID}`, data,  {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
            alert("Endereço criado com sucesso!");
        } catch (error) {
            alert("Erro ao atualizar endereço");
        }
        setModalCriar(false);        
    }

    return ReactDOM.createPortal(
        <div className="container-modal" ref={modalRef} onClick={closeModal}>
            <div className="modal">
                <button onClick={() => setModalCriar(false)}> 
                    <IoIosCloseCircleOutline size={50} /> 
                </button>
                <div className="form-containerAdd">
                    <h1>Adicionar endereço</h1>
                    <form onSubmit={handleCriarEndereco}>
                        <section>
                            <InputMask 
                                style={{width:'45%'}}
                                placeholder="CEP"
                                size="15" 
                                mask="99999-999"
                                value={cep}
                                onChange={e => setCep(e.target.value)}
                            />
                            <select name="estado" id="estado" value={estado} onChange={e => setEstado(e.target.value)}>
                                    <option value="">Estado---</option>
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
                                
                            <input 
                                placeholder="Cidade"
                                value={cidade} 
                                onChange={e => setCidade(e.target.value)}
                            />
                        </section>

                        <input 
                            placeholder="Bairro"
                            value={bairro} 
                            onChange={e => setBairro(e.target.value)}
                        />

                        <section>
                            <input 
                                placeholder="Rua"
                                value={rua} 
                                onChange={e => setRua(e.target.value)} 
                            />

                            <input  
                                style={{width:'20%'}}   
                                placeholder="Número"
                                value={numero} 
                                onChange={e => setNumero(e.target.value)} 
                            />
                        </section>

                        <input 
                            placeholder="Complemento"
                            value={complemento} 
                            onChange={e => setComplemento(e.target.value)}
                        />
                        <button type="submit" className='button'>Adicionar endereço</button>
                    </form>
                </div>
            </div>
        </div>,
        document.getElementById("modal")
    );
}