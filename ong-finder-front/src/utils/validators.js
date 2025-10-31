/**
 * ID: AUTH-012
 * File: src/utils/validators.js
 * Tipo: Utils / Utilitário (Codex)
 * Propósito: Funções de validação reutilizáveis (e-mail, CPF, CNPJ, senha, data de nascimento, etc.).
 * Observação: Removidos trechos comentados de versão antiga. Mantida a lógica usada pelos formulários.
 */

/**
 * Verifica se um valor é uma string vazia ou contém apenas espaços.
 * @param {string|null|undefined} value
 * @returns {boolean} true se for vazio; false caso contrário.
 */
export const isEmpty = (value) => !value || !value.trim();

/**
 * Verifica se um e-mail tem um formato válido.
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  if (isEmpty(email)) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Verifica se duas senhas são idênticas.
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {boolean}
 */
export const isPasswordMatching = (password, confirmPassword) => {
  if (isEmpty(password) || isEmpty(confirmPassword)) return false;
  return password === confirmPassword;
};

/**
 * Valida um número de CPF brasileiro usando o algoritmo dos dígitos verificadores.
 * @param {string} cpf
 * @returns {boolean}
 */
export const isValidCPF = (cpf) => {
  if (!cpf) return false;
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let sum = 0;
  let remainder;
  for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;
  return true;
};

/**
 * Valida um número de CNPJ brasileiro (inclui cálculo dos dígitos verificadores).
 * @param {string} cnpj
 * @returns {boolean}
 */
export const isValidCNPJ = (cnpj) => {
  if (isEmpty(cnpj)) return false;
  const numericCNPJ = cnpj.replace(/[^\d]/g, '');

  if (numericCNPJ.length !== 14 || /^(\d)\1{13}$/.test(numericCNPJ)) return false;

  let size = numericCNPJ.length - 2;
  let numbers = numericCNPJ.substring(0, size);
  const digits = numericCNPJ.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result != digits.charAt(0)) return false;

  size += 1;
  numbers = numericCNPJ.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result != digits.charAt(1)) return false;

  return true;
};

/**
 * Verifica a força de uma senha.
 * Atualmente a regra é apenas comprimento mínimo (>= 8).
 * @param {string} password
 * @returns {boolean}
 */
export const isPasswordStrong = (password) => {
  if (isEmpty(password)) return false;
  return password.length >= 8;
};

/**
 * Valida uma data de nascimento.
 * - Não pode ser vazia
 * - Não pode ser inválida (ex.: 31/02)
 * - Não pode ser no futuro
 * - Não pode indicar idade > 120 anos
 *
 * @param {string} dateString - formato aceito pelo construtor Date (ex.: 'YYYY-MM-DD' vindo do <input type="date">)
 * @returns {boolean}
 */
export const isValidBirthdate = (dateString) => {
  if (isEmpty(dateString)) return false;

  const birthDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(birthDate.getTime())) {
    return false;
  }

  if (birthDate > today) {
    return false;
  }

  const oldestPossibleYear = today.getFullYear() - 120;
  if (birthDate.getFullYear() < oldestPossibleYear) {
    return false;
  }

  return true;
};



// // Dentro de src/utils/validators.js, adicione esta nova função:

// /**
//  * Valida um arquivo com base no tipo e no tamanho.
//  * @param {File} file - O objeto de arquivo do input.
//  * @param {string[]} allowedTypes - Um array de tipos MIME permitidos (ex: ['image/jpeg', 'image/png']).
//  * @param {number} maxSizeInMB - O tamanho máximo permitido em Megabytes.
//  * @returns {{isValid: boolean, message: string}} - Um objeto com o status da validação e uma mensagem.
//  */
// export const validateFile = (file, allowedTypes, maxSizeInMB) => {
//   if (!file) {
//     return { isValid: true, message: '' }; // Não há arquivo, não há erro
//   }

//   const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

//   // Validação de tipo
//   if (!allowedTypes.includes(file.type)) {
//     return {
//       isValid: false,
//       message: `Tipo de arquivo inválido. Use: ${allowedTypes.join(', ')}`,
//     };
//   }

//   // Validação de tamanho
//   if (file.size > maxSizeInBytes) {
//     return {
//       isValid: false,
//       message: `Arquivo muito grande. O tamanho máximo é de ${maxSizeInMB}MB.`,
//     };
//   }

//   return { isValid: true, message: '' };
// };


/**
 * Valida um arquivo com base no tipo, tamanho e outras opções configuráveis.
 * @param {File} file - O objeto de arquivo do input.
 * @param {object} options - Opções de validação.
 * @param {number} options.maxSizeMB - Tamanho máximo em Megabytes (padrão: 2MB).
 * @param {string[]} options.allowedTypes - Um array de tipos MIME permitidos (padrão: ['image/jpeg', 'image/png', 'image/svg+xml']).
 * @param {number} options.minSizeMB - Tamanho mínimo em Megabytes (padrão: 0MB).
 * @param {RegExp} options.namePattern - Padrão de nome de arquivo válido (opcional).
 * @returns {{valid: boolean, message: string}} - Um objeto com o status da validação e uma mensagem.
 */
export const validateFile = (file, options = {}) => {
  // Valores padrão para as opções
  const {
    maxSizeMB = 2,
    allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'],
    minSizeMB = 0,
    namePattern = null,
  } = options;

  if (!file) {
    // Se não houver arquivo, retornamos como válido para não bloquear o formulário
    return { valid: true, message: '' };
  }

  // Calculando os tamanhos em bytes
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  const minSizeBytes = minSizeMB * 1024 * 1024;

  // 1. Validação de tamanho
  if (file.size > maxSizeBytes) {
    return { valid: false, message: `Arquivo muito grande. O tamanho máximo é de ${maxSizeMB}MB.` };
  }
  if (file.size < minSizeBytes) {
    return { valid: false, message: `Arquivo muito pequeno. O tamanho mínimo é de ${minSizeMB}MB.` };
  }

  // 2. Validação de tipo
  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      message: `Tipo de arquivo inválido. Apenas os tipos seguintes são permitidos: ${allowedTypes.join(', ')}.` 
    };
  }

  // 3. Validação do nome (opcional)
  if (namePattern && !namePattern.test(file.name)) {
    return { valid: false, message: `Nome de arquivo inválido. O nome deve corresponder ao padrão ${namePattern.source}.` };
  }

  // Se passou por todas as validações, o arquivo é válido
  return { valid: true, message: '' };
};


export const isValidPhone = (phone) => {
  if (!phone) return false;

  // Remove tudo que não é dígito (parênteses, traços, espaços)
  const digitsOnly = phone.replace(/\D/g, '');

  // Verifica se o número de dígitos é 11 (padrão celular com DDD)
  return digitsOnly.length === 11;
};


export const isValidURL = (url) => {
  // O campo é opcional, então uma string vazia é considerada válida.
  if (!url || url.trim() === '') {
    return true;
  }

  // Adiciona 'https://' se nenhum protocolo for fornecido.
  // Isso permite a validação de formatos como 'www.site.com' e 'site.com'.
  const urlWithProtocol = /^(https?:\/\/)/.test(url) ? url : `https://${url}`;

  try {
    // Tenta criar um objeto URL. Isso valida a estrutura geral da URL.
    const parsedUrl = new URL(urlWithProtocol);
    
    // Como verificação extra, garantimos que o nome do host (hostname)
    // contenha pelo menos um ponto, para evitar entradas inválidas como 'https://site'.
    return parsedUrl.hostname.includes('.');
  } catch (e) {
    // Se a construção new URL() falhar, a URL é inválida.
    return false;
  }
};