import React, { useState, useEffect } from 'react';
import { Image } from 'react-feather';
import styles from './RegisterOngForm.module.css';


// Componentes de UI e compartilhados
import Stepper from '../../Ui/Stepper';
import Input from '../../Ui/Input';
import Button from '../../Ui/Button';
import Select from '../../Ui/Select';
import AddressForm from '../../shared/AddressForm';
import PasswordInput from '../../Ui/PasswordInput';

// Utilitários de formatação
import { formatCNPJ, formatPhone, formatCEP } from '../../../utils/formatters';

/**
 * ID: AUTH-004
 * Arquivo: src/components/auth/RegisterOngForm/index.jsx
 * Tipo: Componente de Formulário (Malcador Ordo)
 * 
 * @componente
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.formData - Dados do formulário de cadastro de ONG
 * @param {Object} props.errors - Erros de validação do formulário
 * @param {Function} props.handleChange - Manipulador de alteração de campos (do componente pai)
 * @param {Function} props.handleSubmit - Manipulador de submissão do formulário
 * @param {Function} props.onNextStep - Callback para validação e avanço de etapa
 * @param {Function} props.handleBlur - Manipulador de evento blur para validação
 * @param {boolean} props.isLoading - Indica se o formulário está em estado de carregamento
 * @param {boolean} props.isSubmitting - Indica se está ocorrendo submissão de formulário
 * @param {Ref} ref - Referência para animações e transições
 * 
 * @descrição
 * Formulário multi-etapas para cadastro de Organizações Não-Governamentais.
 * Implementa um sistema complexo com duas etapas, preview de imagem,
 * validação condicional e integração com componente de endereço.
 * 
 * @comportamento
 * - Gerencia estado local de etapa atual e preview de logo
 * - Aplica formatação automática em campos específicos (CNPJ, telefone, CEP)
 * - Implementa sistema de preview para upload de logo
 * - Utiliza forwardRef para permitir animações de transição
 * - Coordena validação entre etapas antes de permitir avanço
 */


const RegisterOngForm = React.forwardRef(({
  formData,
  errors,
  handleChange,
  handleSubmit,
  onNextStep,
  handleBlur,
  isLoading,
  isSubmitting
}, ref) => {

  // Opções de categoria para ONGs
  const ongCategories = [
    { value: '', label: 'Selecione uma categoria' },
    { value: 'animal', label: 'Proteção Animal' },
    { value: 'ambiente', label: 'Meio Ambiente' },
    { value: 'saude', label: 'Saúde' },
    { value: 'criancas', label: 'Crianças e Adolescentes' },
    { value: 'educacao', label: 'Educação' },
    { value: 'direitos-humanos', label: 'Direitos Humanos' },
    { value: 'assistencia-social', label: 'Assistência Social' },
    { value: 'cultura', label: 'Cultura' },
    { value: 'outra', label: 'Outra' },
  ];

  // Estados locais para controle de UI
  const [step, setStep] = useState(1); // Etapa atual do formulário
  const [logoPreview, setLogoPreview] = useState(null); // URL temporária para preview da logo

  // Definição das etapas do formulário
  const steps = ['Dados da ONG', 'Endereço'];

  /**
   * Manipulador intermediário de alteração de campos
   * 
   * @param {Object} event - Evento de change do campo
   * 
   * @descrição
   * Manipula eventos de change de forma especializada para:
   * - Gerar preview de imagens para upload de logo
   * - Aplicar máscaras de formatação em campos específicos
   * - Preservar todas as propriedades do evento original
   */

  const handleLocalChange = (event) => {
    const { name, value, type, files } = event.target;

    // Lógica de preview para upload de logo
    if (type === 'file' && name === 'logo') {
      const file = files ? files[0] : null;
      
      // Limpa preview anterior para evitar vazamento de memória
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
      
      // Cria nova URL temporária para preview
      setLogoPreview(file ? URL.createObjectURL(file) : null);
    } else {
      // Aplica máscaras de formatação para campos específicos
      if (name === 'cnpj') {
        event.target.value = formatCNPJ(value);
      }
      if (name === 'phone') {
        event.target.value = formatPhone(value);
      }
      if (name === 'cep') {
        event.target.value = formatCEP(value);
      }
    }

    // Repassa o evento (modificado ou original) para o componente pai
    handleChange(event);
  };

  /**
   * Remove a logo selecionada e limpa o preview
   * 
   * @descrição
   * Limpa a seleção de logo tanto no estado local quanto no estado principal
   * através de um evento sintético que simula a remoção do arquivo
   */
  const handleRemoveLogo = () => {
    // Limpa o preview e libera a URL da memória
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
    }
    setLogoPreview(null);
    
    // Cria evento sintético para limpar o campo no estado principal
    const fakeEvent = {
      target: {
        name: 'logo',
        value: null,
        type: 'file',
        files: []
      }
    };
    handleChange(fakeEvent);
  };

  /**
   * Efeito para limpeza de URLs temporárias
   * 
   * @descrição
   * Garante que as URLs temporárias criadas para preview de imagens
   * sejam liberadas da memória quando o componente for desmontado
   * ou quando o preview for alterado
   */
  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  /**
   * Avança para a próxima etapa do formulário
   * 
   * @descrição
   * Executa a validação da etapa atual através da função onNextStep
   * fornecida pelo componente pai e avança para a próxima etapa
   * apenas se a validação for bem-sucedida
   */
  const handleStepAdvance = () => {
    if (onNextStep()) {
      setStep(2);
    }
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


  
  return (
  <form 
    ref={ref}
    className={styles.formContainer} 
    onSubmit={onFormSubmit} 
    noValidate
  >
    {/* Cabeçalho do formulário */}
    <h1>Cadastre sua ONG</h1>
    <p>Registre sua organização para se conectar com voluntários e ampliar seu impacto.</p>

    {/* Componente Stepper para mostrar o progresso */}
    <div className={styles.stepperWrapper}>
      <Stepper steps={steps} currentStep={step} />
    </div>

    {/* ETAPA 1: Dados básicos da ONG */}
    {step === 1 && (
      <>
        <div className={styles.formGrid}>
          {/* Campo: Nome da ONG */}
          <div className={styles.formField}>
            <Input 
              label="Nome da ONG"
              type="text"
              id="ong-name"
              name="ongName"
              placeholder="nome da organização"
              value={formData.ongName}
              onChange={handleLocalChange}
              onBlur={handleBlur}
              error={errors.ongName}
            />
            <div className={styles.errorContainer}>
              {errors.ongName && <p className={styles.error}>{errors.ongName}</p>}
            </div>
          </div>

          {/* Campo: CNPJ com formatação automática */}
          <div className={styles.formField}>
            <Input 
              label="CNPJ"
              type="text"
              id="cnpj"
              name="cnpj"
              placeholder="CNPJ válido"
              value={formData.cnpj}
              onChange={handleLocalChange}
              onBlur={handleBlur}
              error={errors.cnpj}
            />
            <div className={styles.errorContainer}>
              {errors.cnpj && <p className={styles.error}>{errors.cnpj}</p>}
            </div>
          </div>

          {/* Campo: Categoria da ONG */}
          <div className={styles.formField}>
            <Select 
              label="Categoria"
              id="ong-category"
              name="category"
              options={ongCategories}
              value={formData.category}
              onChange={handleLocalChange}
              onBlur={handleBlur}
              error={errors.category}
            />
            <div className={styles.errorContainer}>
              {errors.category && <p className={styles.error}>{errors.category}</p>}
            </div>
          </div>

          {/* Campo: Website (opcional) */}
          <div className={styles.formField}>
            <Input 
              label="Website (opcional)"
              id="ong-website"
              name="website"
              type="url"
              placeholder="site institucional (opcional)"
              value={formData.website}
              onChange={handleLocalChange}
              onBlur={handleBlur}
              error={errors.website}
            />
            <div className={styles.errorContainer}>
              {errors.website && <p className={styles.error}>{errors.website}</p>}
            </div>
          </div>

          {/* Campo: Upload de Logo (opcional) */}
          <div className={styles.formField}>
            <label htmlFor="ong-logo" className={styles.labelFoto}>
              Logo (opcional)
            </label>
            
            {/* Input de arquivo oculto com label estilizado */}
            <input 
              id="ong-logo" 
              name="logo" 
              type="file" 
              accept="image/*" 
              onChange={handleLocalChange} 
              className={styles.fileInputHidden} 
            />
            
            <label htmlFor="ong-logo" className={styles.fileInputLabel}>
              Escolher arquivo
              <span><Image size={17} /></span>
            </label>
            
            {/* Nome do arquivo selecionado */}
            <span className={styles.fileName}>
              {formData.logo ? formData.logo.name : 'Nenhum arquivo escolhido'}
            </span>
            
            <div className={styles.errorContainer}>
              {errors.logo && <p className={styles.error}>{errors.logo}</p>}
            </div>

            {/* Preview da logo selecionada */}
            {logoPreview && (
              <div className={styles.previewContainer}>
                <img 
                  src={logoPreview} 
                  alt="Pré-visualização da logo" 
                  className={styles.logoPreview} 
                />
                <button 
                  type="button" 
                  onClick={handleRemoveLogo} 
                  className={styles.removeButton}
                >
                  Remover Imagem
                </button>
              </div>
            )}
          </div>

                    {/* Campo: Telefone com formatação automática */}
          <div className={styles.formField}>
            <Input 
              label="Telefone"
              id="ong-phone"
              name="phone"
              type="tel"
              placeholder="telefone da organização"
              value={formData.phone}
              onChange={handleLocalChange}
              onBlur={handleBlur}
              error={errors.phone}
            />
            <div className={styles.errorContainer}>
              {errors.phone && <p className={styles.error}>{errors.phone}</p>}
            </div>
          </div>

          {/* Campo: E-mail de contato */}
          <div className={styles.formField}>
            <Input 
              label="E-mail de Contato"
              id="ong-email"
              name="email"
              type="email"
              placeholder="ong@email.com"
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
              id="ong-password"
              name="password"
              type="password"
              placeholder="senha da ONG"
              value={formData.password}
              onChange={handleLocalChange}
              onBlur={handleBlur}
              error={errors.password}
            />
            <div className={styles.errorContainer}>
              {errors.password && <p className={styles.error}>{errors.password}</p>}
            </div>
          </div>

          {/* Campo: Confirmação de senha */}
          <div className={styles.formField}>
            <PasswordInput 
              label="Confirmação de Senha"
              id="ong-password2"
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

        {/* Botão para avançar para a próxima etapa */}
        <Button type="button" onClick={handleStepAdvance}>
          Próximo
        </Button>
      </>
    )}

    {/* ETAPA 2: Endereço da ONG */}
    {step === 2 && (
      <>
        {/* Componente de formulário de endereço compartilhado */}
        <AddressForm 
          addressData={formData} 
          handleChange={handleLocalChange} 
          errors={errors} 
          handleBlur={handleBlur} 
        />
        
        {/* Botões de navegação entre etapas */}
        <div className={styles.formGrid}>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={() => setStep(1)} 
            disabled={isSubmitting}
            className={styles.ButtonVoltar}
          >
            Voltar
          </Button>
          
          <Button 
            type="submit" 
            isLoading={isLoading} 
            loadingType="submit"
          >
            Finalizar Cadastro
          </Button>
        </div>
      </>
    )}
  </form>
);
});

export default RegisterOngForm;