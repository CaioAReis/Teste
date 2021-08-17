import React from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import './styles.css';

import Sour1 from '../../assets/1.png'
import Sour2 from '../../assets/2.png'
import Sour3 from '../../assets/3.png'

import Sour4 from '../../assets/1.jpg'

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
                    <Link to="/carrinho"><FiShoppingCart size={40} /></Link>
                </div>
            </header>

            <section className="carrossel">
                <Carousel autoPlay={true} infiniteLoop={true} showArrows={true} showThumbs={false} showStatus={false}>
                    <div>
                        <img src={Sour1} alt="Slide de boas vindas" />
                    </div>

                    <div>
                        <img src={Sour2} alt="Slide sobre os melhores produtos"/>
                    </div>

                    <div>
                        <img src={Sour3} alt="Slide sobre a variedade"/>
                    </div>
                </Carousel>
            </section>

            <section className="categorias">
                <h1>Categorias:</h1>
                <ul>
                    <li>
                        <button className="selected">Todos</button>
                    </li>
                    <li>
                        <button>Camisas</button>
                    </li>
                    <li>
                        <button>Camisetas</button>
                    </li>
                    <li>
                        <button>Calças</button>
                    </li>
                    <li>
                        <button>Bermudas e Shorts</button>
                    </li>
                    <li>
                        <button>Blusas</button>
                    </li>
                    <li>
                        <button>Saias</button>
                    </li>
                    <li>
                        <button>Vestidos</button>
                    </li>
                    <li>
                        <button>Casacos</button>
                    </li>
                    <li>
                        <button>Ternos</button>
                    </li>
                    <li>
                        <button>Meias</button>
                    </li>
                </ul>
            </section>

            <section className="lista-produtos">
                <ul>
                    <li>
                        <Link to="/produto">
                            <img src={Sour4} alt="" />
                            <div className="produto-info">
                                <h2>R$ 69.90</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Quibusdam perspiciatis, optio officia soluta minima quia. 
                                    Sit, rerum aliquam dolores laboriosam soluta consectetur 
                                    at ab pariatur eum minus perferendis asperiores. Facilis!
                                </p>
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link>
                            <img src={Sour4} alt="" />
                            <div className="produto-info">
                                <h2>R$ 69.90</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Quibusdam perspiciatis, optio officia soluta minima quia. 
                                    Sit, rerum aliquam dolores laboriosam soluta consectetur 
                                    at ab pariatur eum minus perferendis asperiores. Facilis!
                                </p>
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link>
                            <img src={Sour4} alt="" />
                            <div className="produto-info">
                                <h2>R$ 69.90</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Quibusdam perspiciatis, optio officia soluta minima quia. 
                                    Sit, rerum aliquam dolores laboriosam soluta consectetur 
                                    at ab pariatur eum minus perferendis asperiores. Facilis!
                                </p>
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link>
                            <img src={Sour4} alt="" />
                            <div className="produto-info">
                                <h2>R$ 69.90</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Quibusdam perspiciatis, optio officia soluta minima quia. 
                                    Sit, rerum aliquam dolores laboriosam soluta consectetur 
                                    at ab pariatur eum minus perferendis asperiores. Facilis!
                                </p>
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link>
                            <img src={Sour4} alt="" />
                            <div className="produto-info">
                                <h2>R$ 69.90</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Quibusdam perspiciatis, optio officia soluta minima quia. 
                                    Sit, rerum aliquam dolores laboriosam soluta consectetur 
                                    at ab pariatur eum minus perferendis asperiores. Facilis!
                                </p>
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link>
                            <img src={Sour4} alt="" />
                            <div className="produto-info">
                                <h2>R$ 69.90</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Quibusdam perspiciatis, optio officia soluta minima quia. 
                                    Sit, rerum aliquam dolores laboriosam soluta consectetur 
                                    at ab pariatur eum minus perferendis asperiores. Facilis!
                                </p>
                            </div>
                        </Link>
                    </li>
                    
                </ul>
            </section>
        </section>
    );
}