import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import './styles.css';

import api from '../../services/api';

import Sour from '../../assets/1.jpg';

import Slide1 from '../../assets/1.png'
import Slide2 from '../../assets/2.png'
import Slide3 from '../../assets/3.png'

import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { AiOutlinePoweroff } from 'react-icons/ai';

import Logo from '../../assets/logo.svg';

export default function HomePage() {

    if (sessionStorage.getItem('Carrinho') === null) 
        sessionStorage.setItem('Carrinho', JSON.stringify([]));
    
    if (sessionStorage.getItem('Compra') !== null)
        sessionStorage.removeItem("Compra");

    const userID = sessionStorage.getItem('userID');
    const userName = sessionStorage.getItem('userName');

    const [produtos, setProdutos] = useState([]);
    const [produtosFiltrados, setProdutosFiltrados] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(0);

    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        let pesquisa = produtosFiltrados.filter(p => p.nome.toLowerCase()
            .includes(search.toLowerCase()));
        setProdutosFiltrados(pesquisa);
    }

    const UserLogged = () => { 
        return <div>
            <Link to="/perfil" title="Acessar perfil"> {userName} </Link>

            <Link onClick={logout} to="/login" title="Sair">
                <AiOutlinePoweroff size={40}/>
            </Link>
        </div>
    }

    const UserUnLogged = () => { 
        return <div> 
            <Link to="/cadastro">Crie sua conta</Link> 
            <Link to="/login">Entrar</Link>
        </div>
    }

    const Greeting = (props) => {
        const isLogged = props.isLogged;
        if (isLogged) return <UserLogged />
        return <UserUnLogged />
    }

    const handleSelected = (categoria) => { 
        setSelected(categoria);
        if (categoria === 0)
            return setProdutosFiltrados(produtos);
        const filtered = produtos.filter(p => p.categoriaID === categoria);
        setProdutosFiltrados(filtered);
    }

    useEffect(() => {
        const fetch = async () => {
            await api.get('api/produto').then(response => {
                setProdutos(response.data);
                setProdutosFiltrados(response.data);
            });
            await api.get('api/categoria').then(response => {
                response.data.unshift({id: 0, nome: "Todos"});
                setCategorias(response.data);
            });
        }
        fetch();
    }, [userID]);

    return(
        <section className="home-container">
            <header className="home-header">
                <img src={Logo} alt="Logo-vesteme" width="20%" />
                <div className="search-form">
                    <form onSubmit={handleSearch}>
                        <input 
                            type="search" 
                            placeholder="Buscar produtos" 
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <button type="submit"> 
                            <FiSearch size={28} color="#323935" /> 
                        </button>
                    </form>
                </div>
                <div className="info-car">
                    <Greeting isLogged={userName != null ? true : false} />
                    <Link to="/carrinho" title="Carrinho de compras">
                        <FiShoppingCart size={40} />
                    </Link>
                </div>
            </header>

            <section className="carrossel">
                <Carousel 
                    autoPlay={true} 
                    infiniteLoop={true} 
                    showArrows={true} 
                    showThumbs={false} 
                    showStatus={false}
                >
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
                    {categorias.map(categoria => (
                        <li key={categoria.id}>
                            <button 
                                className={
                                    categoria.id === selected ? "selected" : ""
                                }
                                onClick={() => handleSelected(categoria.id)}>
                                    {categoria.nome}
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="lista-produtos">
                <ul>
                    {produtosFiltrados.map(produto => (
                        <li key={produto.id}>
                            <Link to={`/produto/${produto.id}`}>
                                <img src={Sour} alt="Imagem do produto" />
                                <div className="produto-info">
                                    <h2>
                                        {Intl.NumberFormat('pt-br', 
                                        {style: 'currency', currency: 'BRL'})
                                        .format(produto.valor)}
                                    </h2>
                                    <p>{produto.nome}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    );
}