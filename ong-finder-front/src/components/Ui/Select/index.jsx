/**
 * File: src/components/Ui/Select/index.jsx
 * Componente de UI (Forge World) - Select personalizado com label e tratamento de erros
 */

import React from 'react';
import styles from './Select.module.css';
import { ChevronDown } from 'react-feather';

/**
 * Componente de UI (Forge World) - Select personalizado com acessibilidade
 * 
 * @componente
 * @param {Object} props - Propriedades do componente
 * @param {string} props.label - Texto do label do select
 * @param {string} props.id - ID para associação entre label e select
 * @param {Array} props.options - Array de opções do select
 * @param {string} props.className - Classes CSS adicionais para customização
 * @param {string} props.error - Mensagem de erro para exibição
 * @param {Object} rest - Demais propriedades passadas para o elemento select nativo
 * 
 * @descrição
 * Componente de select personalizado que inclui label, indicador visual de dropdown
 * e tratamento de erros. Implementa acessibilidade completa e mantém consistência
 * visual com os demais componentes de input do sistema.
 * 
 * @comportamento
 * - Renderiza um label associado ao select para acessibilidade
 * - Exibe ícone de dropdown personalizado
 * - Aplica estilos de erro quando presente
 * - Mantém todas as funcionalidades nativas do elemento select
 */
function Select({ label, id, options = [], className = '', error, ...rest }) {
  // Classes condicionais para estilização
  const wrapperClassName = `${styles.selectWrapper} ${className}`;
  const selectClassName = `${styles.select} ${error ? styles.error : ''}`;

  return (
    <div className={wrapperClassName}>
      {/* Label acessível associado ao select */}
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      {/* Container do select personalizado */}
      <div className={styles.selectContainer}>
        {/* Elemento select nativo com todas as propriedades */}
        <select 
          id={id} 
          className={selectClassName} 
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value || option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Ícone de dropdown personalizado (apresentacional) */}
        <span className={styles.chevWrapper} aria-hidden="true">
          <ChevronDown size={20} />
        </span>
      </div>

      {/* Exibição de mensagens de erro */}
      {/* {error && (
        <div id={`${id}-error`} className={styles.errorMessage}>
          {error}
        </div>
      )} */}
    </div>
  );
}

export default Select;