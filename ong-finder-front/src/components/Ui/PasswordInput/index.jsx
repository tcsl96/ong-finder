import React, { useState } from 'react';
import styles from './PasswordInput.module.css';
import { Eye, EyeOff } from 'react-feather';
import Input from '../Input';

/**
 * Componente de UI (Forge World-Graia) - Input de senha com toggle de visibilidade
 * 
 * @componente
 * @param {Object} props - Propriedades repassadas para o componente Input
 * @param {string} props.label - Texto do label do campo
 * @param {string} props.id - ID para associação entre label e input
 * @param {string} props.name - Nome do campo para formulários
 * @param {string} props.value - Valor atual do campo
 * @param {Function} props.onChange - Manipulador de alteração do campo
 * @param {Function} props.onBlur - Manipulador de evento blur
 * @param {string} props.error - Mensagem de erro para exibição
 * @param {string} props.placeholder - Texto placeholder do campo
 * 
 * @descrição
 * Componente especializado para campos de senha que inclui um toggle para
 * alternar entre visualização oculta (pontos) e visível (texto claro).
 * Encapsula o componente Input base e adiciona funcionalidade de visibilidade.
 * 
 * @comportamento
 * - Renderiza um campo de senha com toggle de visibilidade
 * - Alterna entre tipo 'password' (oculto) e 'text' (visível)
 * - Mantém todas as funcionalidades do componente Input base
 * - Implementa acessibilidade completa para o toggle
 */



function PasswordInput(props) {
  // Estado para controlar a visibilidade da senha
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  /**
   * Alterna o estado de visibilidade da senha
   * 
   * @descrição
   * Inverte o estado atual de visibilidade, alternando entre
   * senha oculta (pontos) e senha visível (texto claro)
   */
  const toggleVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className={styles.passwordInputWrapper}>
      {/* Componente Input base com todas as props repassadas */}
      <Input
        {...props}
        // Altera dinamicamente o tipo baseado na visibilidade
        type={isPasswordVisible ? 'text' : 'password'}
        // Propaga eventuais erros para o componente base
        error={props.error}
      />
      
      {/* Botão toggle para mostrar/ocultar senha */}
      <button
        type="button"
        onClick={toggleVisibility}
        className={styles.toggleButton}
        aria-label={isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
        aria-pressed={isPasswordVisible}
      >
        {isPasswordVisible ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </div>
  );
}

export default PasswordInput;