/**
 * ID: AUTH-005
 * Arquivo: src/components/auth/AuthToggle/index.jsx
 * Tipo: Componente Auxiliar (High Lords)
 * 
 * @componente
 * @param {Object} props - Propriedades do componente
 * @param {string} props.currentView - Visualização atual ('login' ou 'registerUser')
 * @param {Function} props.onViewChange - Callback para mudança de visualização
 * @param {boolean} props.isSubmitting - Indica se está ocorrendo submissão de formulário
 * 
 * @descrição
 * Controla a alternância entre as visualizações de autenticação principal
 * (login e cadastro de usuário). Renderiza botões estilizados com ícones
 * e estados ativo/inativo.
 * 
 * @comportamento
 * - Desabilita os botões durante submissões para evitar conflitos de estado
 * - Aplica estilos diferentes para o botão ativo
 * - Utiliza ícones da biblioteca react-feather para melhor UX
 */


import React from 'react';
import styles from './AuthToggle.module.css';
import { LogIn, User } from 'react-feather';

function AuthToggle({ currentView, onViewChange, isSubmitting }) {
  return (
    <div className={styles.toggleContainer}>
      {/* Botão de Login */}
      <button
        className={`${styles.toggleButton} ${currentView === 'login' ? styles.activeButton : ''}`}
        onClick={() => onViewChange('login')}
        type="button"
        disabled={isSubmitting}
        aria-pressed={currentView === 'login'}
        aria-label="Alternar para tela de login"
      >
        <div className={styles.childrenWrapperLogin}>
          <span className={styles.loginIcon}>
            <LogIn size={17} />
          </span>
          <span className={styles.loginText}>Login</span>
        </div>
      </button>

      {/* Botão de Cadastro de Usuário */}
      <button
        className={`${styles.toggleButton} ${currentView === 'registerUser' ? styles.activeButton : ''}`}
        onClick={() => onViewChange('registerUser')}
        type="button"
        disabled={isSubmitting}
        aria-pressed={currentView === 'registerUser'}
        aria-label="Alternar para tela de cadastro de usuário"
      >
        <div className={styles.childrenWrapperUser}>
          <span className={styles.userIcon}>
            <User size={17} />
          </span>
          <span className={styles.userText}>Cadastro</span>
        </div>
      </button>

      {/*
        ID: AUTH-005-COMP-ALT
        Botão alternativo para cadastro de ONG - Mantido como referência para futuras implementações
        
        Motivo de existência:
        Este botão foi concebido como uma opção de UX alternativa para permitir acesso direto
        ao cadastro de ONGs a partir do seletor principal. Atualmente desativado porque:
        1. O fluxo de ONG é mais complexo e multi-etapas
        2. Foi optado por um acesso secundário via link dedicado
        3. Mantém a interface principal mais limpa e focada nos fluxos primários
        
        Para reativar:
        - Remover o comentário deste bloco
        - Adicionar lógica de manipulação no componente pai
        - Atualizar os estilos para accommodar o terceiro botão
      */}
      {/* 
      <button 
        className={`${styles.toggleButton} ${currentView === 'registerOng' ? styles.activeButton : ''}`}
        onClick={() => onViewChange('registerOng')}
        type="button"
        disabled={isSubmitting}
      >
        Cadastro ONG
      </button>
      */}
    </div>
  );
}

export default AuthToggle;