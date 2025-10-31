import React from 'react';
import { Heart, Users, Gift, TrendingUp } from 'react-feather';
import './Impact.css';



const Impact = () => {
  const impactData = [
    {
      Icon: Heart,
      value: 'R$ 2.5M',
      label: 'Doações Arrecadadas',
      colorClass: 'iconBgGreen',
    },
    {
      Icon: Users,
      value: '15.000+',
      label: 'Voluntários Ativos',
      colorClass: 'iconBgOrange',
    },
    {
      Icon: Gift,
      value: '500+',
      label: 'ONGs Parceiras',
      colorClass: 'iconBgBlue',
    },
    {
      Icon: TrendingUp,
      value: '100K+',
      label: 'Vidas Impactadas',
      colorClass: 'iconBgLightGreen',
    },
  ];



  return (
    
    <section className="impactSection">
      <div className="impactContainer">
        <div className="impactHeader">
          <h2>Nosso Impacto</h2>
          <p>Juntos estamos criando mudanças positivas em toda a comunidade</p>
        </div>
        <div className="impactGrid">
          {impactData.map((item, index) => (
            <div className="impactCard" key={index}>
              <div className={`iconWrapper ${item.colorClass}`}>
                <item.Icon size={32} />
              </div>
              <span className="impactValue">{item.value}</span>
              <span className="impactLabel">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;