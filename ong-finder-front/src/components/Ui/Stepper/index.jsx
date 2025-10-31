// Em: src/components/Ui/Stepper/index.jsx
import React from 'react';
import { Check } from 'react-feather';
import styles from './Stepper.module.css';

/**
 * Componente de UI (Kaldor Draigo) - Indicador de progresso em etapas
 * 
 * @componente
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.steps - Array com os nomes das etapas
 * @param {number} props.currentStep - Número da etapa atual (1-based)
 * 
 * @descrição
 * Componente visual que exibe o progresso em formulários multi-etapas.
 * Mostra cada etapa com seu nome e estado (completa, ativa ou pendente),
 * conectadas por linhas que formam um caminho visual contínuo.
 * 
 * @comportamento
 * - Etapas completas são marcadas com um ícone de check (✓)
 * - Etapa atual é destacada visualmente
 * - Etapas pendentes mostram seu número sequencial
 * - Conexões visuais entre as etapas
 */


function Stepper({ steps, currentStep }) {
  return (
    <div className={styles.stepperContainer}>
      {steps.map((stepName, index) => {
        const stepNumber = index + 1;
        const isCompleted = currentStep > stepNumber;
        const isActive = currentStep === stepNumber;

        // Classes condicionais para estilização
        const stepGroupClasses = `
          ${styles.stepGroup} 
          ${isCompleted ? styles.completed : ''}
        `;

        const stepItemClasses = `
          ${styles.stepItem} 
          ${isActive ? styles.active : ''}
        `;

        return (
          <div className={stepGroupClasses.trim()} key={stepName}>
            <div className={styles.contentWrapper}>
              {/* Container principal da etapa */}
              <div className={stepItemClasses.trim()}>
                {/* Indicador numérico ou ícone de conclusão */}
                <div className={styles.stepCounter}>
                  {isCompleted ? <Check size={22} /> : stepNumber}
                </div>
                
                {/* Nome da etapa */}
                <div className={styles.stepName}>{stepName}</div>
              </div>
            </div>

            {/* Conector entre etapas (exceto para a última etapa) */}
            {stepNumber < steps.length && (
              <div className={styles.connector}>
                <div className={styles.connectorLine}></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Stepper;