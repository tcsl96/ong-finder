import React from 'react';
import styles from './ReturnButton.module.css';

/**
 * Componente Auxiliar (Malleus) - Botão de retorno para navegação
 * 
 * @componente
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.onReturnClick - Callback acionado ao clicar no botão
 * @param {boolean} props.isSubmitting - Indica se está ocorrendo submissão de formulário
 * 
 * @descrição
 * Componente simples que renderiza um botão de retorno estilizado.
 * Utilizado principalmente no fluxo de cadastro de ONG para voltar à tela de login.
 * 
 * @comportamento
 * - Exibe uma seta para a esquerda (←) seguida do texto "Voltar para Login"
 * - Fica desabilitado durante submissões de formulário para evitar conflitos de estado
 * - Executa a função fornecida via props quando clicado
 * 
 * @exemplo
 * <ReturnButton 
 *   onReturnClick={() => setActiveView('login')} 
 *   isSubmitting={isSubmitting} 
 * />
 */


function ReturnButton({ onReturnClick, isSubmitting }) {
  return (
    <button
      type="button"
      className={styles.returnButton}
      onClick={onReturnClick}
      disabled={isSubmitting}
      aria-label="Voltar para a tela de login"
    >
      &larr; Voltar para Login
    </button>
  );
}

export default ReturnButton;