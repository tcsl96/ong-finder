import React from 'react';
import styles from './RegisterUserForm.module.css';

// Componentes de UI
import Input from '../../Ui/Input';
import Button from '../../Ui/Button';
import Select from '../../Ui/Select';
import PasswordInput from '../../Ui/PasswordInput';

// Utilitários de formatação
import { formatCPF, formatPhone, formatDate } from '../../../utils/formatters';

/**
 * ID: AUTH-003
 * Arquivo: src/components/auth/RegisterUserForm/index.jsx
 * Tipo: Componente de Formulário (Mechanicus)
 * 
 * @componente
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.formData - Dados do formulário de cadastro de usuário
 * @param {Object} props.errors - Erros de validação do formulário
 * @param {Function} props.handleChange - Manipulador de alteração de campos (do componente pai)
 * @param {Function} props.handleSubmit - Manipulador de submissão do formulário
 * @param {Function} props.handleBlur - Manipulador de evento blur para validação
 * @param {boolean} props.isLoading - Indica se o formulário está em estado de carregamento
 * @param {Ref} ref - Referência para animações e transições
 * 
 * @descrição
 * Formulário de cadastro de usuários (voluntários) com validação em tempo real
 * e formatação automática de campos. Implementa máscaras para CPF, telefone
 * e data de nascimento antes de enviar os dados para o componente pai.
 * 
 * @comportamento
 * - Aplica formatação automática em campos específicos (CPF, telefone, data)
 * - Utiliza forwardRef para permitir animações de transição
 * - Valida campos localmente antes da submissão
 * - Exibe mensagens de erro específicas para cada campo
 */



const RegisterUserForm = React.forwardRef(({
  formData,
  errors,
  handleChange,
  handleSubmit,
  handleBlur,
  isLoading
}, ref) => {

  /**
   * Manipulador intermediário de alteração de campos
   * 
   * @param {Object} event - Evento de change do campo
   * 
   * @descrição
   * Aplica máscaras de formatação específicas para cada tipo de campo
   * antes de repassar o evento para o manipulador principal do componente pai.
   * Esta abordagem mantém a formatação visual consistente enquanto preserva
   * os dados limpos no estado principal.
   */
  const handleLocalChange = (event) => {
    let { name, value } = event.target;

    // Aplica máscaras de formatação específicas para cada campo
    if (name === 'cpf') {
      value = formatCPF(value);
    }
    if (name === 'phone') {
      value = formatPhone(value);
    }
    if (name === 'birthdate') {
      value = formatDate(value);
    }

    // Cria um evento sintético com o valor formatado
    const syntheticEvent = {
      ...event,
      target: {
        ...event.target,
        name,
        value,
      },
    };

    // Repassa o evento formatado para o manipulador do componente pai
    handleChange(syntheticEvent);
  };

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
    handleSubmit();
  };


  /**
   * Opções para o campo de seleção de gênero
   * 
   * @description
   * Lista de opções formatadas para o componente Select
   * Inclui uma opção vazia como placeholder e diversas
   * opções de gênero com valores padronizados
   */


  const genderOptions = [
    { value: '', label: 'Selecione...' },
    { value: 'masculino', label: 'Masculino' },
    { value: 'feminino', label: 'Feminino' },
    { value: 'outro', label: 'Outro' },
    { value: 'nao-informar', label: 'Prefiro não informar' },
  ];



  return (
  <form 
    ref={ref} 
    className={styles.formContainer} 
    onSubmit={onFormSubmit} 
    noValidate
  >
    {/* Cabeçalho do formulário */}
    <h1>Crie sua Conta de Voluntário</h1>
    <p>Preencha seus dados para começar a fazer a diferença.</p>

    {/* Grid de campos do formulário */}
    <div className={styles.formGrid}>
      {/* Campo: Nome Completo */}
      <div className={styles.formField}>
        <Input 
          label="Nome Completo"
          id="user-name"
          name="userName"
          placeholder="seu nome"
          value={formData.userName}
          onChange={handleLocalChange}
          onBlur={handleBlur}
          error={errors.userName}
        />
        <div className={styles.errorContainer}>
          {errors.userName && <p className={styles.error}>{errors.userName}</p>}
        </div>
      </div>

      {/* Campo: CPF com formatação automática */}
      <div className={styles.formField}>
        <Input 
          label="CPF"
          id="reg-cpf"
          name="cpf"
          value={formData.cpf}
          placeholder="seu CPF"
          onChange={handleLocalChange}
          onBlur={handleBlur}
          error={errors.cpf}
        />
        <div className={styles.errorContainer}>
          {errors.cpf && <p className={styles.error}>{errors.cpf}</p>}
        </div>
      </div>

      {/* Campo: Data de Nascimento com formatação automática */}
      <div className={styles.formField}>
        <Input 
          label="Data de nascimento"
          id="reg-birthdate"
          name="birthdate"
          type="text"
          placeholder="dd/mm/aaaa"
          value={formData.birthdate}
          onChange={handleLocalChange}
          onBlur={handleBlur}
          error={errors.birthdate}
        />
        <div className={styles.errorContainer}>
          {errors.birthdate && <p className={styles.error}>{errors.birthdate}</p>}
        </div>
      </div>

      {/* Campo: Gênero com opções pré-definidas */}
      <div className={styles.formField}>
        <Select 
          label="Gênero"
          id="reg-gender"
          name="gender"
          options={genderOptions}
          value={formData.gender}
          onChange={handleLocalChange}
          onBlur={handleBlur}
          error={errors.gender}
        />
        <div className={styles.errorContainer}>
          {errors.gender && <p className={styles.error}>{errors.gender}</p>}
        </div>
      </div>

      {/* Campo: Telefone com formatação automática */}
      <div className={styles.formField}>
        <Input 
          label="Telefone"
          id="reg-phone"
          name="phone"
          type="tel"
          placeholder="seu telefone"
          value={formData.phone}
          onChange={handleLocalChange}
          onBlur={handleBlur}
          error={errors.phone}
        />
        <div className={styles.errorContainer}>
          {errors.phone && <p className={styles.error}>{errors.phone}</p>}
        </div>
      </div>

      {/* Campo: E-mail */}
      <div className={styles.formField}>
        <Input 
          label="E-mail"
          id="user-email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={handleLocalChange}
          onBlur={handleBlur}
          error={errors.email}
        />
        <div className={styles.errorContainer}>
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
      </div>

      {/* Campo: Senha com toggle de visibilidade */}
      <div className={styles.formField}>
        <PasswordInput 
          label="Senha"
          id="user-password"
          name="password"
          type="password"
          placeholder="sua senha"
          value={formData.password}
          onChange={handleLocalChange}
          onBlur={handleBlur}
          error={errors.password}
        />
        <div className={styles.errorContainer}>
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>
      </div>

      {/* Campo: Confirmação de Senha */}
      <div className={styles.formField}>
        <PasswordInput 
          label="Confirme a Senha"
          id="user-password2"
          name="password2"
          type="password"
          placeholder="confirme sua senha"
          value={formData.password2}
          onChange={handleLocalChange}
          onBlur={handleBlur}
          error={errors.password2}
        />
        <div className={styles.errorContainer}>
          {errors.password2 && <p className={styles.error}>{errors.password2}</p>}
        </div>
      </div>
    </div>

    {/* Botão de submissão do formulário */}
    <Button 
      type="submit" 
      isLoading={isLoading} 
      loadingType="submit"
    >
      Cadastrar
    </Button>
  </form>
);
});

export default RegisterUserForm;