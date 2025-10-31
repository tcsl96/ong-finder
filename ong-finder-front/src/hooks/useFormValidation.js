import { useState, useCallback } from 'react';
import {
  isEmpty,
  isValidCNPJ,
  isValidCPF,
  isValidEmail,
  isPasswordStrong,
  isPasswordMatching,
  validateFile,
  isValidPhone,
  isValidURL,
} from '../utils/validators';

/**
 * Hook Personalizado (Roboute) - Gerenciamento centralizado de validação de formulários
 * 
 * @customHook
 * @param {Object} formData - Dados do formulário a serem validados
 * 
 * @returns {Object}
 * @returns {Object} errors - Objeto contendo erros de validação por campo
 * @returns {Function} setErrors - Função para atualizar o estado de erros
 * @returns {Function} validateForm - Valida múltiplos campos de uma vez
 * @returns {Function} validateField - Valida um campo individual
 * 
 * @description
 * Hook responsável por toda a lógica de validação da aplicação, incluindo:
 * - Validação de campos individuais com regras específicas
 * - Validação de arquivos (tamanho e tipo)
 * - Validação de formulários completos
 * - Gestão de estado de erros de forma centralizada
 * 
 * @example
 * const { errors, validateForm, validateField } = useFormValidation(formData);
 */


export const useFormValidation = (formData) => {
  // Estado que armazena os erros de validação por campo
  const [errors, setErrors] = useState({});

  // Configurações para validação de arquivos
  const fileOptions = {
    maxSizeMB: 2,
    allowedTypes: ['image/jpeg', 'image/png', 'image/svg+xml'],
  };


  /**
   * Valida um campo individual baseado em seu nome e valor
   * 
   * @param {string} name - Nome do campo a ser validado
   * @param {any} value - Valor do campo a ser validado
   * @returns {string|null} - Mensagem de erro ou null se válido
   * 
   * @description
   * Implementa regras de validação específicas para cada tipo de campo,
   * incluindo validações de formato, obrigatoriedade e regras customizadas
   */

  const validateField = useCallback((name, value) => {
    switch (name) {
      // Validação para nome de usuário
      case 'userName':
        if (isEmpty(value)) return 'Nome do usuário é obrigatório.';
        if (value.trim().length < 3) return 'O nome deve ter pelo menos 3 caracteres.';
        break;

      // Validação para nome da ONG
      case 'ongName':
        if (isEmpty(value)) return 'Nome da ONG é obrigatório.';
        if (value.trim().length < 3) return 'O nome deve ter pelo menos 3 caracteres.';
        break;

        
      // Validação para CNPJ
      case 'cnpj':
        if (isEmpty(value)) return 'CNPJ é obrigatório.';
        if (!isValidCNPJ(value)) return 'CNPJ inválido.';
        break;

      // Validação para categoria
      case 'category':
        if (isEmpty(value)) return 'Categoria é obrigatória.';
        break;

      // Validação para CPF
      case 'cpf':
        if (isEmpty(value)) return 'CPF é obrigatório.';
        if (!isValidCPF(value)) return 'CPF inválido.';
        break;

      // Validação para website
      case 'website':
        if (!isValidURL(value)) return 'Por favor, insira uma URL válida (ex: https://site.com).';
        break;

      // Validação complexa para data de nascimento
      case 'birthdate':
        if (isEmpty(value)) return 'Data de nascimento é obrigatória.';
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
          return 'Use o formato DD/MM/AAAA.';
        }

        // Extrai e converte partes da data
        const [day, month, year] = value.split('/').map(Number);

        // Validação de ano bissexto para 29 de fevereiro
        const isLeapYear = (y) => (y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0));
        if (month === 2 && day === 29 && !isLeapYear(year)) {
          return 'Data inválida (ex: 29/02/2000).';
        }

        // Validação usando Date em UTC para evitar problemas de timezone
        const birthDateUTC = new Date(Date.UTC(year, month - 1, day));
        if (
          birthDateUTC.getUTCFullYear() !== year ||
          birthDateUTC.getUTCMonth() !== month - 1 ||
          birthDateUTC.getUTCDate() !== day
        ) {
          return 'Data inválida (ex: 29/02/2000).';
        }

        // Validação de idade mínima e máxima
        const birthDate = new Date(year, month - 1, day);
        birthDate.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (birthDate > today) {
          return 'A data de nascimento não pode ser uma data futura.';
        }

        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        if (age < 18) {
          return 'Você deve ter pelo menos 18 anos.';
        }

        if (age > 120) {
          return 'Data de nascimento inválida.';
        }
        break;

      // Validação para gênero
      case 'gender':
        if (isEmpty(value)) return 'Gênero é obrigatório.';
        break;

      // Validação para telefone
      case 'phone':
        if (isEmpty(value)) return 'Telefone é obrigatório.';
        if (!isValidPhone(value)) return 'Telefone inválido. Deve conter 11 dígitos (DDD + número).';
        break;

      // Validação para email
      case 'email':
        if (isEmpty(value)) return 'E-mail é obrigatório.';
        if (!isValidEmail(value)) return 'E-mail inválido.';
        break;

      // Validação para senha
      case 'password':
        if (isEmpty(value)) return 'Senha é obrigatória.';
        if (!isPasswordStrong(value)) return 'A senha deve ter no mínimo 8 caracteres.';
        break;

      // Validação para confirmação de senha
      case 'password2':
        if (isEmpty(value)) return 'Confirmação de senha é obrigatória.';
        if (!isPasswordMatching(formData.password, value)) return 'As senhas não coincidem.';
        break;

      // Validação para logo (arquivo)
      case 'logo':
        if (value) {
          const { valid, message } = validateFile(value, fileOptions);
          if (!valid) return message;
        }
        break;

      // Validações para campos de endereço
      case 'cep':
        if (isEmpty(value)) return 'CEP é obrigatório.';
        break;

      case 'state':
        if (isEmpty(value)) return 'Estado é obrigatório.';
        break;

      case 'city':
        if (isEmpty(value)) return 'Cidade é obrigatória.';
        break;

      case 'district':
        if (isEmpty(value)) return 'Bairro é obrigatório.';
        break;

      case 'street':
        if (isEmpty(value)) return 'Logradouro é obrigatório.';
        break;

      case 'number':
        if (isEmpty(value)) return 'Número é obrigatório.';
        break;

      // Campo complemento é opcional, sem validação de obrigatoriedade
      default:
        return null;
    }

    return null;
  }, [formData.password]); // Dependência para validação de confirmação de senha

  /**
   * Manipulador de evento blur para validação em tempo real
   * 
   * @param {Object} event - Evento do campo de formulário
   */
  const handleBlur = (event) => {
    const { name, value } = event.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  /**
   * Valida múltiplos campos de uma vez
   * 
   * @param {Array} fieldsToValidate - Lista de nomes de campos para validar
   * @returns {boolean} - True se todos os campos forem válidos
   */
  const validateForm = (fieldsToValidate) => {
    const newErrors = {};
    
    fieldsToValidate.forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Retorna as funções e estado para uso nos componentes
  return {
    errors,
    setErrors,
    handleBlur,
    validateForm,
    validateField,
  };
};