import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import { FiSearch, FiShoppingCart } from 'react-icons/fi';

import Logo from '../../assets/logo.svg'

export default function HomePage() {
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
                    <Link to="/cadastro">Crie sua conta</Link>
                    <Link to="/login">Entrar</Link>
                    <FiShoppingCart size={40} color="#323935" />
                </div>
            </header>

            <section className="carrossel">

            </section>

            <section className="categorias">
                <h2>Categorias:</h2>
                <ul>
                    <li>Todos</li>
                    <li>Camisas</li>
                    <li>Camisetas</li>
                    <li>Calças</li>
                    {/* FlatList by category */}
                </ul>
            </section>

            <section className="lista-produtos">
                <ul>
                    <li>
                        <div className="produto">
                            <img src="" alt="" />
                            <div className="produto-info">
                                <h2>R$ 69.90</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Quibusdam perspiciatis, optio officia soluta minima quia. 
                                    Sit, rerum aliquam dolores laboriosam soluta consectetur 
                                    at ab pariatur eum minus perferendis asperiores. Facilis!
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
        </section>
    );
}