import email from '../../assets/icons/e-mail-green.svg';
import facebook from '../../assets/icons/facebook-white.svg';
import location from '../../assets/icons/green-location.svg';
import telephone from '../../assets/icons/green-telephone.svg';
import instagram from '../../assets/icons/white-instagram.svg';
import linkedin from '../../assets/icons/white-linkedin.svg';
import logo from '../../assets/icons/white-Logotipo.svg';
import twitter from '../../assets/icons/white-twitter.svg';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className='container'>
                <section className='grid'>
                    <div className="footer-introduction">
                        <img className="logo-image" src={logo} alt="ONG Finder LogoTipo" />
                        <p className="introduction-text">Conectando pessoas com organizações que fazem a diferença
                            Encontre ONGs próximas a você e seja parte da mudança.</p>
                        <div className="icons-media">
                            <img className="media-icon" src={facebook} alt="Icone do Facebook" />
                            <img className="media-icon" src={instagram} alt="Icone do Instagram" />
                            <img className="media-icon" src={linkedin} alt="Icone do Linkedin" />
                            <img className="media-icon" src={twitter} alt="Icone do X" />
                        </div>
                    </div>

                    <div className="list-menus">
                        <ul className="list menu-info">
                            <li className="list-title list-item">Contato</li>
                            <li className="list-item">
                                <img className="item-icon" src={email} alt="Icone de E-mail" />
                                contato@ongfinder.com.br
                            </li>
                            <li className="list-item">
                                <img className="item-icon" src={telephone} alt="Icone de telefone" />
                                (11) 9999-9999
                            </li>
                            <li className="list-item">
                                <img className="item-icon" src={location} alt="Icone de localização" />
                                São Paulo, SP, Brasil
                            </li>
                        </ul>
                        <ul className="list menu-list">
                            <li className="list-title list-item">Links Rápidos</li>
                            <li className="list-item">Encontrar ONGs</li>
                            <li className="list-item">Ser Voluntário</li>
                            <li className="list-item">Fazer Doação</li>
                            <li className="list-item">Cadastrar ONG</li>
                            <li className="list-item">Sobre Nós</li>
                        </ul>
                    </div>

                    <div className="footer-details">
                        <span className="line-trought"></span>
                        <div className="details">
                            <p className="directives">© 2024 ONG Finder. Todos os direitos reservados.</p>
                            <p className="privacy">Política de Privacidade</p>
                            <p className="terms">Termos de Uso</p>
                        </div>
                    </div>
                </section>
            </div>
        </footer>
    );
}