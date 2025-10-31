import heart from '../../assets/icons/orange-heart.svg';
import location from '../../assets/icons/orange-location.svg';
import people from '../../assets/icons/orange-people.svg';
import lupa from '../../assets/icons/white-lupa.svg';
import './Banner.css';


const Banner = () => {
    return (
        <section className='header-banner'>
            <div className='container'>
                <div className='main-text'>
                    <h1 className='text-title'>Busque uma ONG perto de você</h1>
                    <p className='text-description'>Conecte-se com organizações que fazem a diferença na sua comunidade</p>
                </div>

                <div className="search-container">
                    <form className='input-group' action="">
                        <input className='input-search' type="text" placeholder="Digite uma cidade ou causa..." name="search" />
                        <button className='btn-search' type="submit"><img src={lupa} alt="Icone de uma lupa" className='search-icon' /></button>
                    </form>
                </div>

                <div className='data-info'>
                    <div className='data'>
                        <h2 className='data-number'>500+</h2>
                        <p className='data-description'>ONGs</p>
                    </div>
                    <div className='data'>
                        <h2 className='data-number'>1M+</h2>
                        <p className='data-description'>Doações</p>
                    </div>
                    <div className='data'>
                        <h2 className='data-number'>50K+</h2>
                        <p className='data-description'>Voluntários</p>
                    </div>
                </div>

                <div className='icons-values'>
                    <div className='icon'>
                        <img src={location} alt="Icone de ponto de localização" className='icon-img' />
                        <div className='icon-description'>
                            <h3 className='icon-title'>Encontre ONGs Locais</h3>
                            <p className='icon-text'>Descubra organizações que atuam na sua região</p>
                        </div>
                    </div>
                    <div className='icon'>
                        <img src={heart} alt="Icone de coração" className='icon-img' />
                        <div className='icon-description'>
                            <h3 className='icon-title'>Doe com Segurança</h3>
                            <p className='icon-text'>Faça doações seguras e acompanhe o impacto</p>
                        </div>
                    </div>
                    <div className='icon'>
                        <img src={people} alt="Icone de três avatares" className='icon-img' />
                        <div className='icon-description'>
                            <h3 className='icon-title'>Seja Voluntário</h3>
                            <p className='icon-text'>Conecte-se com causas que fazem sentido para você</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner;