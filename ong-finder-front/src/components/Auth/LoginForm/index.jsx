/**
 * ID: AUTH-002
 * Arquivo: src/components/auth/LoginForm/index.jsx
 * Tipo: Componente de Formulário (Ministorum)
 * 
 * @componente
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.formData - Dados do formulário (email, password)
 * @param {Object} props.errors - Erros de validação do formulário
 * @param {Function} props.handleChange - Manipulador de alteração de campos
 * @param {Function} props.handleSubmit - Manipulador de submissão do formulário
 * @param {Function} props.handleBlur - Manipulador de evento blur para validação
 * @param {boolean} props.isLoading - Indica se o formulário está em estado de carregamento
 * @param {Ref} ref - Referência para animações e transições
 * 
 * @descrição
 * Formulário de login responsável pela autenticação de usuários existentes.
 * Implementa validação de campos, feedback visual de erros e integração
 * com sistemas de autenticação social (Facebook e Google).
 * 
 * @comportamento
 * - Utiliza forwardRef para permitir animações de transição
 * - Valida campos localmente antes da submissão
 * - Exibe mensagens de erro específicas para cada campo
 * - Desabilita interações durante o carregamento
 * - Previne submissão acidental de formulário por botões sociais
 */
import React from 'react';
import styles from './LoginForm.module.css';

// Componentes de UI
import Input from '../../Ui/Input';
import Button from '../../Ui/Button';
import PasswordInput from '../../Ui/PasswordInput';

// Ícones para autenticação social
import Facebook from '../../../assets/icons/facebook.svg';
import Google from '../../../assets/icons/google.svg';



const LoginForm = React.forwardRef(({ 
  formData, 
  errors, 
  handleChange, 
  handleSubmit, 
  handleBlur, 
  isLoading 
}, ref) => {

  /**
   * Manipulador de submissão do formulário
   * 
   * @param {Event} event - Evento de submissão do formulário
   * 
   * @descrição
   * Previne o comportamento padrão do formulário e delega
   * a lógica de submissão para o componente pai (AuthPage)
   */
  const onFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(); // Delega para o componente coordenador
  };

  return (
    <form 
      ref={ref} 
      className={styles.formContainer} 
      onSubmit={onFormSubmit} 
      noValidate
    >
      {/* Cabeçalho do formulário */}
      <h1>Acesse sua conta</h1>
      <p>
        Faça login para continuar com sua doação ou ter acesso aos demais recursos do site!
      </p>

      {/* Campos do formulário */}
      <div className={styles.inputsContainer}>
        {/* Campo de e-mail */}
        <div className={styles.formField}>
          <Input 
            label="E-mail"
            type="email"
            id="login-email"
            name="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            aria-describedby={errors.email ? "loginEmail-error" : undefined}
          />
          <div className={styles.errorContainer}>
            {errors.email && (
              <p id="loginEmail-error" className={styles.error}>
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Campo de senha */}
        <div className={styles.formField}>
          <PasswordInput 
            label="Senha"
            type="password"
            id="login-password"
            name="password"
            placeholder="sua senha"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            aria-describedby={errors.password ? "loginPassword-error" : undefined}
          />
          <div className={styles.errorContainer}>
            {errors.password && (
              <p id="loginPassword-error" className={styles.error}>
                {errors.password}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Botão de submissão principal */}
      <Button 
        type="submit" 
        isLoading={isLoading}
        className={styles.enterButton}
        loadingType="spinner"
      >
        Entrar
      </Button>

      {/* Divisor visual para opções alternativas */}
      <div className={styles.dividerContainer}>
        <div className={styles.divider}>ou</div>
      </div>

      {/* ID: AUTH-002-COMP-SOCIAL
          Bloco de autenticação social - Facebook e Google
          
          Observações:
          - Botões são type="button" para evitar submissão acidental do formulário
          - Implementação atual é visual apenas (placeholders)
          - Requer integração com serviços OAuth no futuro
      */}

      <div className={styles.socialLoginContainer}>
        <Button 
          type="button"
          className={styles.socialButton}
        >
          <div className={styles.containerLogo}>
            <img src={Facebook} alt="Logo do Facebook" className={styles.icon} />
          </div>
          <div className={styles.containerSpan}>
            <span>Continuar com Facebook</span>
          </div>
        </Button>

        <Button 
          type="button"
          className={styles.socialButton}
        >
          <div className={styles.containerLogo}>
            <img src={Google} alt="Logo do Google" className={styles.icon} />
          </div>
          <div className={styles.containerSpan}>
            <span>Continuar com Google</span>
          </div>
        </Button>


        {/* ID: AUTH-002-COMP-FP
            Link de recuperação de senha - placeholder para implementação futura
            
            Observações:
            - Atualmente é um link estático sem funcionalidade
            - Deve ser implementado com rota/funcionalidade de recuperação de senha
        */}
        <a href="#" className={styles.forgotPasswordLink}>
          Esqueci a senha
        </a>

      </div>
    </form>
  );
});

export default LoginForm;