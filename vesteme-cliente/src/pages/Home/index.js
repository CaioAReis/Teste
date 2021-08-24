import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import './styles.css';

import api from '../../services/api';

import Slide1 from '../../assets/1.png'
import Slide2 from '../../assets/2.png'
import Slide3 from '../../assets/3.png'

import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { AiOutlinePoweroff } from 'react-icons/ai';

import Logo from '../../assets/logo.svg';

export default function HomePage() {

    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const userID = localStorage.getItem('userID');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        api.get('api/produto').then(response => {
            setProdutos(response.data);
        });
        api.get('api/categoria').then(response => {
            setCategorias(response.data);
        })
    }, [userID]);

    const UserLogged = () => { 
        return <div>
            <Link to="/perfil" title="Acessar perfil">{userName}</Link>
            <Link to="/login" title="Sair"><AiOutlinePoweroff size={40}/></Link>
        </div>}

    const UserUnLogged = () => { 
        return <div> 
            <Link to="/cadastro">Crie sua conta</Link> 
            <Link to="/login">Entrar</Link>
        </div>}

    const Greeting = (props) => {
        const isLogged = props.isLogged;
        if (isLogged) return <UserLogged />
        return <UserUnLogged />
    }

    const [selected] = useState("selected");

    return(
        <section className="home-container">
            <header className="home-header">
                <img src={Logo} alt="Logo-vesteme" width="20%" />
                <div className="search-form">
                    <form>
                        <input type="search" placeholder="Buscar produtos" />
                        <button type="submit"> <FiSearch size={28} color="#323935" /> </button>
                    </form>
                </div>
                <div className="info-car">
                    <Greeting isLogged={userName != null ? true : false} />
                    <Link to="/carrinho" title="Carrinho de compras"><FiShoppingCart size={40} /></Link>
                </div>
            </header>

            <section className="carrossel">
                <Carousel autoPlay={true} infiniteLoop={true} showArrows={true} showThumbs={false} showStatus={false}>
                    <div>
                        <img src={Slide1} alt="Slide de boas vindas" />
                    </div>

                    <div>
                        <img src={Slide2} alt="Slide sobre os melhores produtos"/>
                    </div>

                    <div>
                        <img src={Slide3} alt="Slide sobre a variedade"/>
                    </div>
                </Carousel>
            </section>

            <section className="categorias">
                <h1>Categorias:</h1>
                <ul>
                    <li>
                        <button className={selected}>Todos</button>
                    </li>
                    {categorias.map(categoria => (
                        <li key={categoria.id}>
                            <button>{categoria.nome}</button>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="lista-produtos">
                <ul>
                    <li>
                        {produtos.map(produto => (
                            <Link to={`/produto/${produto.id}`} key={produto.id}>
                                <img src={produto.imagem} alt="Imagem do produto" />
                                <div className="produto-info">
                                    <h2>{produto.valor}</h2>
                                    <p>{produto.nome}</p>
                                </div>
                            </Link>
                        ))}
                    </li>
                </ul>
            </section>
        </section>
    );
}