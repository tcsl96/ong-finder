import React, { useState, useEffect, useRef } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import styles from './AuthPage.module.css';

// Hooks e componentes de autenticação
import { useFormValidation } from '../../hooks/useFormValidation';

import AuthToggle from '../../components/Auth/AuthToggle';
import LoginForm from '../../components/Auth/LoginForm';
import RegisterUserForm from '../../components/Auth/RegisterUserForm';
import RegisterOngForm from '../../components/Auth/RegisterOngForm';
import ReturnButton from '../../components/Auth/ReturnButton';
import Button from '../../components/Ui/Button';

/**
 * Componente Coordenador (Golden Throne) - Página principal de autenticação
 * 
 * @componente
 * 
 * @descrição
 * Controla todo o fluxo de autenticação da aplicação, gerenciando:
 * - Estado das visualizações (login, cadastro de usuário, cadastro de ONG)
 * - Dados de todos os formulários
 * - Validações e submissões
 * - Transições animadas entre formulários
 * 
 * @state {string} activeView - Visualização ativa ('login', 'registerUser', 'registerOng')
 * @state {string} submissionStatus - Status da submissão ('idle', 'loading', 'success')
 * @state {Object} allFormsData - Dados consolidados de todos os formulários
 * 
 * @hooks
 * @uses useFormValidation - Hook personalizado para validação de formulários
 */



function AuthPage() {
  // Estados de controle da visualização ativa e status de submissão
  const [activeView, setActiveView] = useState('login');
  const [submissionStatus, setSubmissionStatus] = useState('idle');
  const isSubmitting = submissionStatus === 'loading';


  // O hook useLocation serve para acessar a url atual, isso permite escolher 
  // qual vai ser a tela carregado, ao entra nesta página ( login cadastros)
  const location = useLocation();


  // Estado que armazena todos os dados dos formulários
  const [allFormsData, setAllFormsData] = useState({
    login: {
      email: '',
      password: ''
    },
    registerUser: {
      userName: '',
      cpf: '',
      birthdate: '',
      gender: '',
      phone: '',
      email: '',
      password: '',
      password2: ''
    },
    registerOng: {
      ongName: '',
      cnpj: '',
      category: '',
      website: '',
      logo: null,
      phone: '',
      email: '',
      password: '',
      password2: '',
      cep: '',
      state: '',
      city: '',
      district: '',
      street: '',
      number: '',
      complement: ''
    }
  });

  // Hook de validação de formulários
  const { errors, setErrors, validateForm, validateField } = useFormValidation(allFormsData[activeView]);



  // Este efeito é executado apenas UMA VEZ na montagem do componente.
  // Ele lê a URL para ver se uma visão inicial foi especificada.
      // URLSearchParams é uma API do navegador para trabalhar com query strings (ex: "?view=registerUser")
      useEffect(() => {const params = new URLSearchParams(location.search);
        const initialView = params.get('view'); // Pega o valor do parâmetro 'view'

          // Se o parâmetro for 'registerUser', ajusta a visão ativa.
            if (initialView === 'registerUser') {
              setActiveView('registerUser');
           }
            // O array de dependências vazio [] garante que isso só rode na montagem.
        }, [location.search]); 


  /**
   * Efeito para resetar a rolagem e erros ao mudar de visualização
   */
  useEffect(() => {
    window.scrollTo(0, 0);
    setErrors({});
  }, [activeView]);


  /**
   * Manipulador de alterações nos campos dos formulários
   * 
   * @param {string} formType - Tipo do formulário ('login', 'registerUser', 'registerOng')
   * @param {Object} event - Evento do campo de formulário
   * 
   * @descrição
   * Limpa erros do campo, aplica validação instantânea para arquivos
   * e atualiza o estado principal com os novos dados
   */

  const handleFormChange = (formType, event) => {
    const { name, value, type, files } = event.target;

    // Limpa o erro do campo ao começar a interagir
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Validação instantânea para campos de arquivo
    if (type === 'file') {
      const file = files ? files[0] : null;
      
      // Valida o arquivo imediatamente
      const error = validateField(name, file);
      
      // Se houver erro, atualiza o estado de erros
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    }


    // Atualiza o estado principal com os novos dados
    setAllFormsData((prevData) => ({
      ...prevData,
      [formType]: {
        ...prevData[formType],
        [name]: type === 'file' ? (files ? files[0] : null) : value
      }
    }));
  };


  /**
   * Manipulador de evento blur para validação de campos
   * 
   * @param {Object} event - Evento do campo de formulário
   */

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };


  /**
   * Validação para avançar para a próxima etapa do cadastro de ONG
   * 
   * @returns {boolean} - Retorna true se a etapa 1 for válida
   */

  const handleOngNextStep = () => {
    const fieldsToValidate = ['ongName', 'cnpj', 'category', 'phone', 'email', 'password', 'password2', 'logo'];
    const isStep1Valid = validateForm(fieldsToValidate);
    return isStep1Valid;
  };


  /**
   * Manipulador de submissão dos formulários
   * 
   * @param {string} formType - Tipo do formulário a ser submetido
   * 
   * @descrição
   * Define campos para validação baseado no tipo de formulário,
   * executa validação completa e simula submissão com tempo adaptativo
   */

  const handleSubmit = (formType) => {
    let fieldsToValidate = [];
    
    // Define campos para validação baseado no tipo de formulário
    if (formType === 'login') {
      fieldsToValidate = ['email', 'password'];
    } else if (formType === 'registerUser') {
      fieldsToValidate = ['userName', 'cpf', 'birthdate', 'gender', 'phone', 'email', 'password', 'password2'];
    } else if (formType === 'registerOng') {
      fieldsToValidate = ['ongName', 'cnpj', 'category', 'phone', 'email', 'password', 'password2', 'cep', 'state', 'city', 'district', 'street', 'number'];
    }


    // Valida o formulário completo
    const isFormValid = validateForm(fieldsToValidate);

    if (isFormValid) {
      setSubmissionStatus('loading');
      
      // LÓGICA DE TEMPO ADAPTATIVO: Define duração baseada no tipo de formulário | ANTIGO 2500 6000
      const submissionTime = formType === 'login' ? 1250 : 2300;
      
      // Simula processo de submissão
      setTimeout(() => {
        const currentFormData = allFormsData[formType];
        console.log(`Dados validados:`, currentFormData);
        setSubmissionStatus('success');
      }, submissionTime);
    } else {
      console.log('Formulário contém erros.');
    }
  };


  /**
   * Reseta o formulário para o estado inicial
   * 
   * @descrição
   * Volta ao estado inicial após submissão bem-sucedida
   */
  
  const resetForm = () => {
    setSubmissionStatus('idle');
    setActiveView('login');
  };

  // Refs para as transições animadas (Rito dos Elos de Alma)
  const loginRef = useRef(null);
  const registerUserRef = useRef(null);
  const registerOngRef = useRef(null);
  
  const nodeRefs = {
    login: loginRef,
    registerUser: registerUserRef,
    registerOng: registerOngRef,
  };
  
  const currentNodeRef = nodeRefs[activeView];

  




  return (
  <div className={styles.authPageContainer}>
    <main className={styles.authWrapper}>
      {submissionStatus === 'success' ? (
        /**
         * Container de sucesso - exibido após submissão bem-sucedida
         */
        <div className={styles.successContainer}>
          <h2>Cadastro Efetuado!</h2>
          <p>Sua solicitação foi registrada.</p>
          <Button onClick={resetForm}>Voltar ao Início</Button>
        </div>
      ) : (
        <>
          {/* Controle de navegação - exibe botão Voltar ou seletor de visualização */}
          {activeView === 'registerOng' ? (
            <ReturnButton 
              onReturnClick={() => setActiveView('login')} 
              isSubmitting={isSubmitting} 
            />
          ) : (
            <AuthToggle 
              currentView={activeView} 
              onViewChange={setActiveView} 
              isSubmitting={isSubmitting} 
            />
          )}

          {/* Sistema de transição entre formulários com animações */}
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={activeView}
              nodeRef={currentNodeRef} // Ref específica para a transição atual
              timeout={300}            // <-------------- Duração total da animação
              classNames={{
                enter: styles.fadeEnter,
                enterActive: styles.fadeEnterActive,
                exit: styles.fadeExit,
                exitActive: styles.fadeExitActive,
              }}
            >
              <>
                {/* Formulário de Login */}
                {activeView === 'login' && (
                  <LoginForm
                    ref={loginRef}
                    formData={allFormsData.login}
                    errors={errors}
                    handleChange={(e) => handleFormChange('login', e)}
                    handleSubmit={() => handleSubmit('login')}
                    handleBlur={handleBlur}
                    isLoading={submissionStatus === 'loading'}
                  />
                )}

                {/* Formulário de Cadastro de Usuário */}
                {activeView === 'registerUser' && (
                  <RegisterUserForm
                    ref={registerUserRef}
                    formData={allFormsData.registerUser}
                    errors={errors}
                    handleChange={(e) => handleFormChange('registerUser', e)}
                    handleSubmit={() => handleSubmit('registerUser')}
                    handleBlur={handleBlur}
                    isLoading={submissionStatus === 'loading'}
                  />
                )}

                {/* Formulário de Cadastro de ONG (multi-etapas) */}
                {activeView === 'registerOng' && (
                  <RegisterOngForm
                    ref={registerOngRef}
                    formData={allFormsData.registerOng}
                    errors={errors}
                    handleChange={(e) => handleFormChange('registerOng', e)}
                    handleSubmit={() => handleSubmit('registerOng')}
                    onNextStep={handleOngNextStep}
                    handleBlur={handleBlur}
                    isLoading={submissionStatus === 'loading'}
                    isSubmitting={isSubmitting}
                  />
                )}
              </>
            </CSSTransition>
          </SwitchTransition>
          {/* FIM DO SISTEMA DE TRANSIÇÃO */}

          {/* Link alternativo para cadastro de ONG */}
          <div className={styles.footerLinks}>
            {activeView !== 'registerOng' && (
              <button
                className={styles.linkButton}
                onClick={() => setActiveView('registerOng')}
                disabled={isSubmitting}
              >
                Cadastrar ONG
              </button>
            )}
          </div>
        </>
      )}
    </main>
  </div>
);
}

export default AuthPage;