import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import Logo from '../../assets/logo.svg'
import { AiOutlinePoweroff } from 'react-icons/ai';

import AdminCategorias from '../../components/AdminScreens/AdminCategorias';
import AdminPedidos from '../../components/AdminScreens/AdminPedidos';
import AdminProdutos from '../../components/AdminScreens/AdminProdutos';
import AdminTamanhos from '../../components/AdminScreens/AdminTamanhos';
import AdminUsuarios from '../../components/AdminScreens/AdminUsuarios';

export default function AdminScreen() {

    const [selected, setSelected] = useState(1);
    const [infoSelected, setInfoSelected] = useState(<AdminCategorias />);
    const userName = sessionStorage.getItem('userName');

    const handleSelected = (item) => { 
        setSelected(item);

        switch (item) {
            case 1:
                setInfoSelected(<AdminCategorias />);
                break;
            case 2:
                setInfoSelected(<AdminUsuarios />);
                break;
            case 3:
                setInfoSelected(<AdminPedidos />);
                break;
            case 4:
                setInfoSelected(<AdminProdutos />);
                break;
            case 5:
                setInfoSelected(<AdminTamanhos />);
                break;
            default:
                setInfoSelected(null);
        }
    }

    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
    }

    return (
        <section className="admin-container">
            <section className="admin-tab">

                <img src={Logo} width="90%" alt="Logo-vesteme"/>
                <h1>
                    <strong>Seja bem vindo(a): Administrador {userName.toLocaleUpperCase()}</strong>
                </h1>

                <ul>
                    <li 
                        className={1 === selected ? "selected" : ""}
                        onClick={() => handleSelected(1)}>
                            Categorias
                    </li>
                    <li 
                        className={2 === selected ? "selected" : ""}
                        onClick={() => handleSelected(2)}>
                            Usuários
                    </li>
                    <li 
                        className={3 === selected ? "selected" : ""}
                        onClick={() => handleSelected(3)}>
                            Pedidos
                    </li>
                    <li 
                        className={4 === selected ? "selected" : ""}
                        onClick={() => handleSelected(4)}>
                            Produtos
                    </li>
                    <li 
                        className={5 === selected ? "selected" : ""}
                        onClick={() => handleSelected(5)}>
                            Tamanhos
                    </li>
                </ul>

                <div className="admin-profile">
                    <Link>Perfil</Link>
                    <Link onClick={logout} to="/login" title="Sair">
                        <AiOutlinePoweroff size={40}/>
                    </Link>
                </div>

            </section>
            <section className="admin-body">
                {infoSelected}
            </section>
        </section>
    );
}