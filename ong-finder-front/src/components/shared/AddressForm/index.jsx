import React, { useState, useEffect, useRef } from 'react';
import styles from './AddressForm.module.css';

// Componentes de UI
import Input from '../../Ui/Input';
import Select from '../../Ui/Select';

/**
 * Componente Compartilhado (Grey Knights) - Formulário de endereço com integração IBGE
 * 
 * @componente
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.addressData - Dados do endereço a serem preenchidos
 * @param {Function} props.handleChange - Manipulador de alteração de campos
 * @param {Object} props.errors - Erros de validação do formulário
 * @param {Function} props.handleBlur - Manipulador de evento blur para validação
 * 
 * @descrição
 * Componente reutilizável para captura de dados de endereço com integração
 * com a API do IBGE para busca de estados e municípios brasileiros.
 * Implementa cache de dados para otimizar performance e reduzir chamadas à API.
 * 
 * @comportamento
 * - Busca automaticamente a lista de estados ao montar o componente
 * - Busca municípios conforme o estado selecionado
 * - Aplica cache em memória para estados e municípios
 * - Gerencia estados de carregamento e erro
 */


function AddressForm({ addressData, handleChange, errors = {}, handleBlur }) {
  // Estados para dados e controle de UI
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoadingStates, setIsLoadingStates] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [errorStates, setErrorStates] = useState(null);
  const [errorCities, setErrorCities] = useState(null);

  // Referências para cache de dados
  const statesCacheRef = useRef(null);
  const citiesCacheRef = useRef({});
  const selectedState = addressData.state;

  /**
   * Efeito para carregamento da lista de estados
   * 
   * @descrição
   * Executa uma vez ao montar o componente para buscar a lista de estados
   * do IBGE. Implementa cache para evitar requisições repetidas.
   * Inclui cancelamento de requisição ao desmontar o componente.
   */

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadStates = async () => {
      setIsLoadingStates(true);
      setErrorStates(null);

      try {
        // Utiliza cache se disponível
        if (statesCacheRef.current) {
          if (isMounted) setStates(statesCacheRef.current);
          return;
        }

        // Requisição para API do IBGE
        const res = await fetch(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        const stateOptions = data.map((uf) => ({
          value: uf.sigla,
          label: uf.nome
        }));

        if (isMounted) {
          setStates(stateOptions);
          statesCacheRef.current = stateOptions; // Armazena em cache
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setErrorStates('Erro ao carregar estados.');
          console.error('Erro ao buscar estados:', err);
        }
      } finally {
        if (isMounted) setIsLoadingStates(false);
      }
    };

    loadStates();

    // Cleanup: cancela requisição se componente for desmontado
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  /**
   * Efeito para carregamento da lista de cidades
   * 
   * @descrição
   * Executa sempre que o estado selecionado é alterado.
   * Busca os municípios do estado selecionado no IBGE.
   * Implementa cache por estado para otimizar performance.
   */

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadCities = async () => {
      setIsLoadingCities(true);
      setErrorCities(null);

      try {
        // Não carrega cidades se nenhum estado estiver selecionado
        if (!selectedState) {
          if (isMounted) setCities([]);
          return;
        }

        // Utiliza cache se disponível para este estado
        if (citiesCacheRef.current[selectedState]) {
          if (isMounted) setCities(citiesCacheRef.current[selectedState]);
          return;
        }

        // Requisição para API do IBGE - municípios por estado
        const res = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        const cityOptions = data.map((city) => ({
          value: city.nome,
          label: city.nome
        }));

        if (isMounted) {
          setCities(cityOptions);
          citiesCacheRef.current[selectedState] = cityOptions; // Armazena em cache
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setErrorCities('Erro ao carregar cidades.');
          console.error('Erro ao buscar cidades:', err);
          if (isMounted) setCities([]);
        }
      } finally {
        if (isMounted) setIsLoadingCities(false);
      }
    };

    loadCities();

    // Cleanup: cancela requisição se componente for desmontado
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [selectedState]);

  /**
   * Manipulador de alteração de estado
   * 
   * @param {Object} event - Evento de change do campo de estado
   * 
   * @descrição
   * Repassa o evento para o manipulador do componente pai.
   * O efeito de cidades será acionado pela mudança no selectedState.
   */
  const handleStateChange = (event) => {
    handleChange(event);
  };


  
    return (
    <>
      {/* Título da seção de endereço */}
      <h3 className={styles.sectionTitle}>Endereço da ONG</h3>
      
      <div className={styles.formGrid}>
        {/* Campo: CEP */}
        <div className={styles.formField}>
          <Input
            label="CEP"
            id="cep"
            name="cep"
            placeholder="CEP da ONG"
            value={addressData.cep}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.cep}
          />
          <div className={styles.errorContainer}>
            {errors.cep && <p className={styles.errorText}>{errors.cep}</p>}
          </div>
        </div>

        {/* Campo: Estado com integração IBGE */}
        <div className={styles.formField}>
          <Select
            label="Estado"
            id="state"
            name="state"
            value={addressData.state}
            onChange={handleStateChange}
            onBlur={handleBlur}
            options={[
              { value: '', label: isLoadingStates ? 'Carregando...' : 'Selecione...' },
              ...states,
            ]}
            disabled={isLoadingStates || !!errorStates}
            error={errors.state || errorStates}
          />
          <div className={styles.errorContainer}>
            {errors.state && <p className={styles.errorText}>{errors.state}</p>}
            {errorStates && <p className={styles.errorText}>{errorStates}</p>}
          </div>
        </div>

        {/* Campo: Cidade com integração IBGE */}
        <div className={styles.formField}>
          <Select
            label="Cidade"
            id="city"
            name="city"
            value={addressData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            options={[
              { value: '', label: isLoadingCities ? 'Carregando...' : 'Selecione...' },
              ...cities,
            ]}
            disabled={isLoadingCities || cities.length === 0 || !!errorCities}
            error={errors.city || errorCities}
          />
          <div className={styles.errorContainer}>
            {errors.city && <p className={styles.errorText}>{errors.city}</p>}
            {errorCities && <p className={styles.errorText}>{errorCities}</p>}
          </div>
        </div>

        {/* Campo: Bairro */}
        <div className={styles.formField}>
          <Input
            label="Bairro"
            id="district"
            name="district"
            placeholder="bairro da ONG"
            value={addressData.district}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.district}
          />
          <div className={styles.errorContainer}>
            {errors.district && <p className={styles.errorText}>{errors.district}</p>}
          </div>
        </div>

        {/* Campo: Logradouro */}
        <div className={styles.formField}>
          <Input
            label="Logradouro"
            id="street"
            name="street"
            placeholder="logradouro da ONG"
            value={addressData.street}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.street}
          />
          <div className={styles.errorContainer}>
            {errors.street && <p className={styles.errorText}>{errors.street}</p>}
          </div>
        </div>

        {/* Campo: Número */}
        <div className={styles.formField}>
          <Input
            label="Número"
            id="number"
            name="number"
            placeholder="número da ONG"
            value={addressData.number}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.number}
          />
          <div className={styles.errorContainer}>
            {errors.number && <p className={styles.errorText}>{errors.number}</p>}
          </div>
        </div>

        {/* Campo: Complemento (opcional) */}
        <div className={styles.formField}>
          <Input
            label="Complemento (opcional)"
            id="complement"
            name="complement"
            placeholder="complemento (opcional)"
            value={addressData.complement}
            onChange={handleChange}
            error={errors.complement}
          />
        </div>
      </div>
    </>
  );
}

export default AddressForm;