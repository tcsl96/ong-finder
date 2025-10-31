/**
 * ID: AUTH-011
 * File: src/utils/formatters.js
 * Tipo: Utils / Utilitário (Codex)
 * Propósito: Funções de formatação reutilizáveis (CPF, CNPJ, CEP, telefone).
 * Observação: Este arquivo faz parte do "Codex" — utilitários compartilhados por vários formulários.
 */

/**
 * Remove todos os caracteres não numéricos de uma string.
 * @param {string} value
 * @returns {string}
 */
const getNumericValue = (value) => {
  if (!value) return '';
  return value.replace(/\D/g, '');
};

/**
 * Formata um valor para o padrão de CPF (xxx.xxx.xxx-xx).
 * @param {string} value
 * @returns {string}
 */
export const formatCPF = (value) => {
  const numericValue = getNumericValue(value);

  return numericValue
    .slice(0, 11) // Garante que temos no máximo 11 dígitos
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2');
};

/**
 * Formata um valor para o padrão de CNPJ (xx.xxx.xxx/xxxx-xx).
 * @param {string} value
 * @returns {string}
 */
export const formatCNPJ = (value) => {
  const numericValue = getNumericValue(value);

  return numericValue
    .slice(0, 14)
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
};

export const formatDate = (date) => {
  if (!date) return '';

  const digitsOnly = date.replace(/\D/g, '');
  const len = digitsOnly.length;

  // Validação do dia: não pode ser maior que 31
  if (len >= 2) {
    let day = parseInt(digitsOnly.slice(0, 2), 10);
    if (day > 31) day = 31;
    // Se o usuário digitar '00', corrige para '01'
    if (day === 0) day = 1; 
  }

  // Validação do mês: não pode ser maior que 12
  if (len >= 4) {
    let month = parseInt(digitsOnly.slice(2, 4), 10);
    if (month > 12) month = 12;
    if (month === 0) month = 1;
  }
  
  // Aplica a máscara em etapas
  if (len <= 2) return digitsOnly;
  if (len <= 4) return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`;
  
  return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2, 4)}/${digitsOnly.slice(4, 8)}`;
};
/**
 * Formata um valor para o padrão de CEP (xx.xxx-xxx).
 * @param {string} value
 * @returns {string}
 */
export const formatCEP = (value) => {
  const numericValue = getNumericValue(value);

  return numericValue
    .slice(0, 8)
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2');
};

/**
 * Formata um valor para o padrão de Telefone ((xx) xxxxx-xxxx).
 * Lida com números de 10 ou 11 dígitos.
 * @param {string} value
 * @returns {string}
 */
export const formatPhone = (value) => {
  const numericValue = getNumericValue(value);

  if (numericValue.length > 10) {
    return numericValue
      .slice(0, 11)
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  } else {
    return numericValue
      .slice(0, 10)
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
};
