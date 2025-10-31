/**
 * ID: AUTH-008
 * Arquivo: src/components/Ui/Button/index.jsx
 * Tipo: Componente de UI (Forge World)
 * 
 * @componente
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Conteúdo do botão (texto, ícones, etc.)
 * @param {string} props.className - Classes CSS adicionais para customização
 * @param {boolean} props.isLoading - Indica se o botão está em estado de carregamento
 * @param {string} props.loadingType - Tipo de animação de loading ('spinner', 'progress', 'submit')
 * @param {Object} rest - Demais propriedades do elemento button nativo
 * 
 * @descrição
 * Componente de botão genérico e altamente customizável com suporte a múltiplos tipos
 * de animações de loading. Implementa substituição visual completa durante estados
 * de carregamento com animações especializadas para diferentes contextos.
 * 
 * @comportamento
 * - Renderiza conteúdo normal quando não está carregando
 * - Substitui por animações específicas durante loading
 * - Mantém acessibilidade e estados desabilitados apropriados
 * - Preserva todas as propriedades nativas do elemento button
 */

import React from "react";
import styles from "./Button.module.css";
import SubmitAnimation from "../Animations/SubmitAnimation";



function Button({ children, className = '', isLoading, loadingType = 'spinner', ...rest }) {
  // Combina classes base com classes adicionais
  const finalClassName = `${styles.Button} ${className}`;

  /**
   * Renderiza animações de loading baseadas no tipo especificado
   * 
   * @descrição
   * Substitui completamente o botão por animações especializadas
   * durante o estado de carregamento, proporcionando feedback
   * visual contextual apropriado para diferentes operações
   */
  if (isLoading) {
    switch (loadingType) {
      case 'submit':
        return <SubmitAnimation />;
      case 'spinner':
      default:
        // Container que mantém a estética do botão durante loading
        return (
          <div className={`${finalClassName} ${styles.loadingContainer}`} disabled>
            <div className={styles.loadingSpinner}></div>
          </div>
        );
    }
  }

  // Renderização padrão do botão quando não está carregando
  return (
    <button className={finalClassName} disabled={isLoading} {...rest}>
      {children}
    </button>
  );
}

export default Button;