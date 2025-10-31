import React from 'react';
import styles from './Input.module.css';

/**
 * Componente de UI (Forge World) - Input com label integrado e tratamento de erros
 * 
 * @componente
 * @param {Object} props - Propriedades do componente
 * @param {string} props.label - Texto do label do input (obrigatório para acessibilidade)
 * @param {string} props.id - ID único para associação entre label e input (obrigatório)
 * @param {string} props.className - Classes CSS adicionais para customização do wrapper
 * @param {string} props.error - Mensagem de erro para exibição e estilização
 * @param {Object} rest - Demais propriedades do elemento input nativo (type, placeholder, value, onChange, etc.)
 * 
 * @descrição
 * Componente de input de texto com label integrado e suporte completo a acessibilidade.
 * Implementa validação visual de erros e mantém consistência com o design system.
 * 
 * @comportamento
 * - Renderiza um label associado ao input para acessibilidade
 * - Aplica estilos de erro quando a prop error está presente
 * - Mantém todas as funcionalidades nativas do elemento input
 * - Fornece atributos ARIA para melhor acessibilidade
 */
function Input({ label, id, className = '', error, ...rest }) {
  // Combinação de classes para estilização condicional
  const wrapperClassName = `${styles.inputWrapper} ${className}`.trim();
  const inputClassName = `${styles.input} ${error ? styles.error : ''}`.trim();

  return (
    <div className={wrapperClassName}>
      {/* Label acessível associado ao input */}
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      {/* Input nativo com todas as propriedades repassadas */}
      <input
        id={id}
        className={inputClassName}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />

      {/* Exibição condicional de mensagens de erro */}
      {/* {error && (
        <div id={`${id}-error`} className={styles.errorMessage}>
          {error}
        </div>
      )} */}
    </div>
  );
}

export default Input;