import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'react-feather';
import './Donation.css';
import donationImage from '../../assets/images/doacao-para-ong.png';




const Donation = () => {


    return (
        <section className="donationSection">
            <div className="donationContainer">


                <div className="donationContent">
                    <h2>
                        Seja Parte desta <br />
                        <span className="highlight">Transformação</span>
                    </h2>

                    <p>
                        Sua contribuição pode transformar vidas. Doe, seja voluntário ou
                        cadastre sua ONG.
                    </p>

                    <div className="donationActions">
                        <button className="donationBtn primary">
                            <span>Fazer Doação</span>
                            <div className="heartIconContainer">
                                <Heart className="heartIcon" size={20} />
                            </div>
                        </button>

                        <Link to="/auth?view=registerUser" className="donationBtn secondary">
                            Ser Voluntário
                        </Link>

                    </div>
                </div>

                <div className="donationImage">
                    <img
                        src={donationImage}
                        alt="Mãos segurando um coração."
                    />
                </div>

            </div>
        </section>
    );


};

export default Donation;