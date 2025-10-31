import locationIcone from '../../assets/icons/gray-location.svg';
import peopleIcone from '../../assets/icons/gray-people.svg';
import imageOngExample from '../../assets/images/imageOng1.jpg';


import './Highlights.css';

const Highlights = () => {
    const highlightsData = [
        {
            name: 'ONG Esperança Animal',
            description: 'Resgate animais em São Paulo',
            address: 'São Paulo, SP',
            category: 'Animais',
            volunteers: 120,
            image: imageOngExample,
        },
        {
            name: 'ONG Leitura Viva',
            description: 'Distribui livros em comunidades',
            address: 'Rio de Janeiro, RJ',
            category: 'Educação',
            volunteers: 85,
            image: imageOngExample,
        },
        {
            name: 'ONG Semeando o Futuro',
            description: 'Educação e apoio social, Belo Horizonte',
            address: 'Belo Horizonte, MG',
            category: 'Apoio Social',
            volunteers: 200,
            image: imageOngExample,
        },
    ];

    return (
        <section className="highlightsSection">
            <div className="highlightsContainer">
                <div className="highlightsHeader">
                    <h2>ONGs em Destaque</h2>
                    <p>Conheça algumas das organizações que estão fazendo a diferença</p>
                </div>

                <div className="highlightsGrid">
                    {highlightsData.map((item, index) => (
                        <div className="highlightCard" key={index}>
                            <div className="highlightImageWrapper">
                                <img src={item.image} alt={item.name} className="highlightImage" />
                                <span className="highlightCategory">{item.category}</span>
                            </div>

                            <div className="highlightContent">
                                <h3>{item.name}</h3>
                                <p className="highlightDescription">{item.description}</p>

                                <div className="highlightInfo">
                                    <span>
                                        <img src={locationIcone} alt="Ícone de localização" />
                                        {item.address}
                                    </span>
                                    <span>
                                        <img src={peopleIcone} alt="Ícone de voluntários" />
                                        {item.volunteers}+
                                    </span>
                                </div>

                                <div className="highlightButtons">
                                    <button className="btnDetails">Ver detalhes</button>
                                    <button className="btnContact">Contato</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="viewAllContainer">
                    <button className="btnViewAll">Ver Todas as ONGs</button>
                </div>
            </div>
        </section>
    );
};

export default Highlights;
