import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/icons/white-Logotipo.svg';
import hamburgerMenu from '../../assets/icons/white-menu-hamburger.svg';
import close from '../../assets/icons/white-close-icon.svg';
import Banner from "../Banner/Banner";
import './Header.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="header">
            <div className="container">
                <div className="header-logo-image">
                    <Link to="/">
                        <img src={logo} alt="LogoTipo" className="logo-image"/>
                    </Link>
                </div>
                <nav className="nav-menu">
                    {!isOpen && (
                        <button
                            className="menu-hamburger"
                            onClick={() => setIsOpen(true)}
                        >
                            <img
                                src={hamburgerMenu}
                                alt="Ícone de menu"
                                className="hamburger-icon"
                            />
                        </button>
                    )}
                    {isOpen && (
                        <div
                        className="overlay"
                        onClick={() => setIsOpen(false)}
                        ></div>
                    )}
                    <ul className={`menu ${isOpen ? "menu-open" : ""}`}>
                        <li className="header-menu">
                            <h3 className="title-menu">Explorar</h3>
                        </li>
                        <li className="menu-option">
                            <Link to="">Início</Link>
                        </li>
                        <li className="menu-option">
                            <Link to="">Sobre</Link>
                        </li>
                        <li className="menu-option">
                            <Link to="">ONGs</Link>
                        </li>
                        <li className="menu-option">
                            <Link to="">Fale Conosco</Link>
                        </li>
                    </ul>
                    {isOpen && (
                        <button
                            className="menu-close"
                            onClick={() => setIsOpen(false)}
                        >
                            <img
                                src={close}
                                alt="Ícone de fechar"
                                className="close-icon"
                            />
                        </button>
                    )}
                </nav>

                <div className="container-btn">
                        <Link to="/auth" className="link-login">Entrar</Link>
                </div>

                
            </div>
        </header>
    );
}

export default Header;
