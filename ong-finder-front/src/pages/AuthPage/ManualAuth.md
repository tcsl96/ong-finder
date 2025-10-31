# ️ Manual de Arquitetura - Sistema de Autenticação

## Sinopse

Este documento detalha a arquitetura de um sistema de autenticação robusto construído em React, implementando uma hierarquia clara de componentes com responsabilidades bem definidas. O sistema segue uma abordagem de **Componente Coordenador (Golden Throne)** onde `AuthPage.jsx` orquestra todo o fluxo de autenticação, enquanto componentes especializados lidam com apresentação, validação e animações.


## Princípios Arquiteturais

1. **Single Source of Truth**: Estado gerenciado centralmente no componente coordenador
2. **Separation of Concerns**: Lógica de validação separada em hook especializado
3. **Reusability**: Componentes atômicos e compartilhados maximamente reutilizáveis
4. **Accessibility**: Acessibilidade integrada desde a concepção
5. **Performance**: Otimizações como cache de API e cleanup de recursos

## Fluxo de Dados
```
AuthPage (Estado Global) → useFormValidation (Validação) → Componentes de Formulário → UI Atoms
```


## ️ Sistema de Validação

O hook `useFormValidation.js (Roboute)` serve como sistema nervoso central de validação, ofereciendo:
- Validação em tempo real com formatação automática
- Mensagens de erro contextualizadas
- Suporte a validações complexas (CPF, CNPJ, datas)
- Integração unificada com todos os formulários


## Arvore da hierarquia dos componentes

```
                                       AuthPage.jsx (Golden Throne)
                                                  │
                                                  │
         validators.JS───────>───────useFormValidation.js ( Roboute )
                                                  │
                                                  │
                            ┌─────────────────────┴─────────────────────────────────────────────┐
                  AuthToggle(High Lords)                        ┌─────────────────RegisterOngForm(Malcador Ordo)
                            │                                   │                               │
                            │                                   │                               │
                  ┌─────────┴──────────┐                        │                               │
LoginForm(Ministorum)    RegisterUserForm( Mechanicus)──────────┤                    ReturnButton(Malleus) 
          |                 |                                   |                               |
          |                 |                                   |                               |
          └────────┬────────┘           ┌──────────────┬────────┤                               |
                   |       SubmitAnimation(Metalica)   |     Select(ForgeWorld)                 |
                   |                                   |                            AddressForm (Grey knights)
                   |                                   |                                        |
                   |                             formatters.js                                  |
                   |                                                                  Stepper(Kaldor Draigo)
                   |                                                                            |
                   └────────────────────────────────┬───────────────────────────────────────────┘
                                                    |                                          
                                                    |
                       ┌────────────────────────────┼───────────────────────────────────────────┐
                       |                            |                                           |
             Input(Forge World)            Button(Forge World)            PasswordInput(Forge World - Graia)  

             
```



---


Este manual documenta cada componente nesta hierarquia, suas responsabilidades, interfaces e integrações.


---



# AuthPage.jsx - Componente Coordenador (Golden Throne)

## Visão Geral
Componente principal que orquestra todo o fluxo de autenticação da aplicação, funcionando como o "cérebro" central que coordena todos os subcomponentes de autenticação.

## Responsabilidades Principais
- Gerenciamento do estado global de autenticação
- Controle de transições entre formulários
- Validação e submissão de dados
- Coordenação dos componentes filhos

## Estados Gerenciados
- `activeView`: Controla qual formulário está visível ('login', 'registerUser', 'registerOng')
- `submissionStatus`: Gerencia o status da submissão ('idle', 'loading', 'success')
- `allFormsData`: Armazena dados de todos os formulários em um único local

## Principais Funções
- `handleFormChange()`: Manipula mudanças em campos de formulário com validação instantânea
- `handleBlur()`: Executa validação quando o campo perde o foco
- `handleSubmit()`: Processa a submissão do formulário com validação completa
- `handleOngNextStep()`: Controla a validação entre etapas do cadastro de ONG

## Características Especiais
- **Validação Adaptativa**: Tempos de submissão variam por tipo de formulário
- **Gerenciamento de Arquivos**: Validação instantânea para upload de logos
- **Transições Animadas**: Sistema de refs para animações suaves entre formulários
- **Scroll Automático**: Reposicionamento da página ao trocar de formulário
- **Renderização Inicial por Parâmetro de URL**: Capacidade de renderizar um formulário específico na montagem inicial, contornando a visão padrão

## Dependências
- `useFormValidation`: Hook personalizado para validação de formulários
- Componentes de formulário: LoginForm, RegisterUserForm, RegisterOngForm
- Componentes de UI: AuthToggle, ReturnButton, Button
- Biblioteca: react-transition-group para animações
- useLocation(de react-router-dom): Utilizado para ler a URL atual e seus query parameters, permitindo a renderização inicial condicional


# AuthPage.jsx - Componente Coordenador (Golden Throne) - Parte 2

## Estrutura de Renderização

### Sistema de Transição de Formulários
Implementa um sistema sofisticado de transição entre os diferentes formulários usando `SwitchTransition` e `CSSTransition` do react-transition-group.

**Características:**
- Animações de fade in/out com duração de 300ms
- Modo "out-in" (elemento atual sai antes do novo entrar)
- Refs específicas para cada formulário (Rito dos Elos de Alma)

### Fluxo Condicional de Renderização
1. **Estado de Sucesso**: Exibe mensagem de confirmação após submissão bem-sucedida
2. **Estado Normal**: Renderiza os formulários de autenticação com transições

### Componentes Renderizados Condicionalmente
- **ReturnButton**: Exibido apenas no fluxo de cadastro de ONG
- **AuthToggle**: Exibido nos fluxos de login e cadastro de usuário
- **Formulários Específicos**: Renderizados conforme a visualização ativa

### Navegação Secundária
- Link "Cadastrar ONG" disponível em todos os formulários exceto no próprio formulário de ONG
- Desabilitado durante submissões para prevenir conflitos de estado

## Comportamento de Transição
Cada formulário possui uma ref única que é passada para o sistema de transição, garantindo que as animações sejam aplicadas ao elemento correto durante as mudanças de visualização.

## Integração com Componentes Filhos
Todos os formulários recebem consistentemente:
- Dados do formulário correspondente
- Funções de manipulação de eventos
- Estado de erros de validação
- Status de carregamento

Este padrão garante coesão e consistência em toda a experiência de autenticação.


---

# useFormValidation.js - Hook Personalizado (Roboute)

## Visão Geral
Hook personalizado que centraliza toda a lógica de validação de formulários da aplicação, funcionando como o "sistema de validação" unificado para todos os formulários.

## Responsabilidades Principais
- Validação de campos individuais com regras específicas
- Validação de arquivos (tamanho máximo e tipos permitidos)
- Validação de formulários completos
- Gestão centralizada de mensagens de erro

## Validações Implementadas

### Campos de Texto
- **Nome**: Obrigatório, mínimo 3 caracteres
- **Email**: Formato válido e obrigatório
- **Telefone**: Formato brasileiro com DDD (11 dígitos)

### Documentos
- **CPF**: Formato válido e obrigatório
- **CNPJ**: Formato válido e obrigatório

### Datas
- **Data de Nascimento**: 
 - Formato DD/MM/AAAA
 - Validação de ano bissexto
 - Idade entre 18 e 120 anos
 - Não pode ser data futura

### Senhas
- **Senha**: Mínimo 8 caracteres
- **Confirmação de Senha**: Deve coincidir com a senha principal

### Arquivos
- **Logo**: 
 - Tipos permitidos: JPEG, PNG, SVG
 - Tamanho máximo: 2MB

### Endereço
- **CEP, Estado, Cidade, Bairro, Logradouro, Número**: Campos obrigatórios
- **Complemento**: Campo opcional

## Características Técnicas

### Otimização de Performance
- Uso de `useCallback` para evitar recriação desnecessária da função de validação
- Dependência controlada (apenas `formData.password`) para validação de confirmação de senha

### Validação de Data Robustecida
- Implementa validação manual de ano bissexto
- Usa UTC para evitar problemas de fuso horário
- Verifica componentes individuais (dia, mês, ano) separadamente

### Sistema de Validação Modular
- Cada tipo de campo tem sua própria lógica de validação
- Fácil adição de novas regras de validação
- Mensagens de erro claras e específicas

## Integração
O hook é consumido pelo componente `AuthPage` (Golden Throne) e fornece:
- Estado de erros atualizado em tempo real
- Funções para validação individual e em lote
- Interface consistente para todos os tipos de validação

## Padrão de Uso
```javascript
// No componente
const { errors, validateForm, validateField } = useFormValidation(formData);

// Validação individual
const error = validateField('email', 'test@example.com');

// Validação em lote
const isValid = validateForm(['email', 'password']);
```


---


# AuthToggle.jsx - Componente Auxiliar (High Lords)

## Visão Geral
Componente de navegação que permite alternar entre as visualizações principais de autenticação (login e cadastro de usuário).

## Responsabilidades
- Renderizar botões de alternância entre telas de autenticação
- Indicar visualmente a tela ativa atual
- Desabilitar interação durante submissões de formulário
- Manter acessibilidade com atributos ARIA apropriados

## Funcionalidades

### Botões Implementados
1. **Login**: Alterna para a tela de autenticação de usuários existentes
2. **Cadastro**: Alterna para a tela de registro de novos usuários voluntários

### Estado Visual
- Botão ativo recebe destaque visual através da classe `activeButton`
- Botões são desabilitados durante submissões (`isSubmitting`)

### Acessibilidade
- Atributos `aria-pressed` indicam qual botão está ativo
- Atributos `aria-label` fornecem descrições para leitores de tela
- Navegação por teclado e foco visível garantidos

## Características de Design

### Ícones e Texto
- Utiliza ícones da biblioteca `react-feather` para melhor reconhecimento visual
- Combina ícones com texto para clareza de intenção
- Layout responsivo que se adapta a diferentes tamanhos de tela

### Fluxo Alternativo (AUTH-005-COMP-ALT)
O componente inclui um botão comentado para cadastro de ONG que pode ser reativado se necessário no futuro. Este botão foi desativado porque:

1. **Complexidade do Fluxo**: O cadastro de ONG é multi-etapas e mais complexo
2. **Hierarquia de Informação**: Mantém o foco nos fluxos principais de autenticação
3. **Acesso Alternativo**: O cadastro de ONG está disponível via link dedicado na parte inferior da página

## Integração
- Consumido pelo componente `AuthPage` (Golden Throne)
- Recebe o estado atual e função de callback do componente pai
- Interface consistente com o restante do sistema de autenticação

## Padrão de Uso
```jsx
<AuthToggle
 currentView={activeView}
 onViewChange={setActiveView}
 isSubmitting={isSubmitting}
/>
```

---


# LoginForm/index.jsx - Componente de Formulário (Ministorum)

## Visão Geral
Formulário de login responsável pela autenticação de usuários existentes no sistema. Implementa validação de campos, feedback de erros e integração com autenticação social.

## Responsabilidades
- Capturar credenciais de usuários (email e senha)
- Validar campos localmente antes da submissão
- Exibir mensagens de erro específicas para cada campo
- Fornecer alternativas de autenticação social
- Manter acessibilidade com atributos ARIA apropriados

## Funcionalidades

### Campos do Formulário
1. **E-mail**: 
 - Validação de formato de e-mail
 - Mensagem de erro específica para e-mail inválido
 - Atributos ARIA para acessibilidade

2. **Senha**:
 - Campo com toggle de visibilidade (via PasswordInput)
 - Validação de força da senha
 - Mensagem de erro para senha inválida

### Validação e Feedback
- Validação em tempo real nos eventos `onBlur`
- Exibição de mensagens de erro abaixo de cada campo
- Estados de erro propagados para componentes de input

### Autenticação Social (AUTH-002-COMP-SOCIAL)
- Botões para autenticação via Facebook e Google
- Implementação visual completa (placeholders)
- Botões type="button" para evitar submissão acidental

### Recuperação de Senha (AUTH-002-COMP-FP)
- Link para fluxo de recuperação de senha
- Atualmente implementado como placeholder
- Requer implementação de rota/funcionalidade

## Características Técnicas

### ForwardRef
O componente utiliza `React.forwardRef` para:
- Permitir animações de transição controladas pelo componente pai
- Facilitar a integração com bibliotecas de animação
- Manter compatibilidade com o sistema de transição da AuthPage

### Acessibilidade
- Atributos `aria-describedby` vinculando erros aos campos
- Rótulos claros e instruções para leitores de tela
- Navegação por teclado e indicadores de foco visíveis

### Estado de Carregamento
- Botão principal exibe spinner durante o carregamento
- Todos os campos são desabilitados durante a submissão
- Feedback visual claro para o usuário

## Integração
- Consumido pelo componente `AuthPage` (Golden Throne)
- Recebe todas as funções de manipulação do componente pai
- Interface consistente com o sistema de validação (Roboute)

## Padrão de Uso
```jsx
<LoginForm
 formData={loginData}
 errors={errors}
 handleChange={handleLoginChange}
 handleSubmit={handleLoginSubmit}
 handleBlur={handleBlur}
 isLoading={isLoading}
/>
```


---


# RegisterUserForm/index.jsx - Componente de Formulário (Mechanicus)

## Visão Geral
Formulário completo de cadastro de usuários voluntários com validação em tempo real e formatação automática de campos. Implementa um sistema intermediário de formatação que aplica máscaras visuais antes de enviar dados para o componente pai.

## Responsabilidades
- Capturar dados de cadastro de usuários voluntários
- Aplicar formatação automática em campos específicos (CPF, telefone, data)
- Validar campos localmente antes da submissão
- Exibir mensagens de erro específicas para cada campo
- Manter acessibilidade com atributos ARIA apropriados

## Campos do Formulário

### Informações Pessoais
1. **Nome Completo**: Campo de texto simples (obrigatório, mínimo 3 caracteres)
2. **CPF**: Campo com formatação automática no padrão XXX.XXX.XXX-XX
3. **Data de Nascimento**: Campo com formatação automática no padrão DD/MM/AAAA
4. **Gênero**: Select com opções pré-definidas (Masculino, Feminino, Outro, Prefiro não informar)
5. **Telefone**: Campo com formatação automática no padrão (XX) XXXXX-XXXX

### Credenciais de Acesso
6. **E-mail**: Campo de e-mail com validação de formato
7. **Senha**: Campo de senha com toggle de visibilidade (mínimo 8 caracteres)
8. **Confirmação de Senha**: Campo que deve coincidir com a senha principal

## Características Técnicas

### Sistema de Formatação Intermediária
O componente implementa um manipulador intermediário (`handleLocalChange`) que:

1. **Aplica máscaras específicas** antes de repassar os dados:
 - CPF: Formata no padrão XXX.XXX.XXX-XX
 - Telefone: Formata no padrão (XX) XXXXX-XXXX
 - Data: Formata no padrão DD/MM/AAAA

2. **Preserva a integridade dos dados**: 
 - Mantém os dados limpos no estado principal
 - Apenas a representação visual é formatada

3. **Cria eventos sintéticos**: 
 - Constrói um novo evento com o valor formatado
 - Repassa para o manipulador do componente pai

### Validação e Feedback
- Validação em tempo real nos eventos `onBlur`
- Exibição de mensagens de erro abaixo de cada campo
- Estados de erro propagados para componentes de input
- Integração completa com o hook useFormValidation (Roboute)

### Layout Responsivo
- Utiliza CSS Grid para layout adaptativo
- Campos se organizam em diferentes arranjos conforme tamanho da tela
- Design consistente com o restante da aplicação

## Integração
- Consumido pelo componente `AuthPage` (Golden Throne)
- Recebe todas as funções de manipulação do componente pai
- Interface consistente com o sistema de validação (Roboute)
- Compatível com o sistema de transição animada

## Padrão de Uso
```jsx
<RegisterUserForm
 formData={userFormData}
 errors={errors}
 handleChange={handleUserFormChange}
 handleSubmit={handleUserSubmit}
 handleBlur={handleBlur}
 isLoading={isLoading}
/>


```

# RegisterOngForm/index.jsx - Componente de Formulário (Malcador Ordo)

## Visão Geral
Formulário multi-etapas complexo para cadastro de Organizações Não-Governamentais. Implementa um sistema sofisticado com duas etapas distintas, preview de imagens, validação condicional e integração com serviço de endereços.

## Responsabilidades
- Capturar dados completos de cadastro de ONGs em múltiplas etapas
- Gerenciar upload e preview de logos
- Aplicar formatação automática em campos específicos (CNPJ, telefone, CEP)
- Coordenar validação entre etapas antes de permitir avanço
- Integrar com componente de endereço para preenchimento automático

## Funcionalidades Completas

### Sistema Multi-etapas
O formulário é dividido em duas etapas distintas:

#### ETAPA 1: Dados Básicos da ONG
1. **Nome da ONG**: Campo obrigatório, mínimo 3 caracteres
2. **CNPJ**: Com formatação automática e validação de formato
3. **Categoria**: Select com opções pré-definidas
4. **Website**: Campo opcional com validação de URL
5. **Logo**: Sistema completo de upload com preview
6. **Telefone**: Com formatação automática e validação
7. **E-mail**: Com validação de formato
8. **Senha**: Com toggle de visibilidade e validação de força
9. **Confirmação de Senha**: Deve coincidir com a senha

#### ETAPA 2: Endereço da ONG
- Integração com componente `AddressForm` compartilhado
- Busca automática de CEP via API IBGE
- Seleção de estado e cidade interligadas
- Campos de logradouro, número, complemento, etc.

### Upload e Preview de Logo
Sistema completo de manipulação de imagens:
- Preview instantâneo da imagem selecionada
- Validação de tipo e tamanho de arquivo
- Remoção segura com limpeza de URLs temporárias
- Prevenção de vazamento de memória

### Formatação Automática
Aplica máscaras em tempo real para:
- CNPJ: Formata no padrão XX.XXX.XXX/XXXX-XX
- Telefone: Formata no padrão (XX) XXXXX-XXXX
- CEP: Formata no padrão XX.XXX-XXX

## Características Técnicas

### Navegação entre Etapas
- Botão "Próximo" valida a etapa 1 antes de avançar
- Botão "Voltar" permite retornar à etapa anterior
- Stepper visual mostra o progresso atual
- Estado de submissão desabilita interações

### Prevenção de Vazamento de Memória
- Uso de `URL.revokeObjectURL()` para liberar recursos
- Efeito de limpeza no desmonte do componente
- Gestão cuidadosa de URLs temporárias

### Integração com AddressForm
- Reutilização do componente compartilhado de endereço
- Consistência na validação e formatação de campos de endereço
- Busca automática de CEP e preenchimento de campos

## Integração
- Consumido pelo componente `AuthPage` (Golden Throne)
- Recebe todas as funções de manipulação do componente pai
- Interface consistente com o sistema de validação (Roboute)
- Compatível com o sistema de transição animada

## Padrão de Uso
```jsx
<RegisterOngForm
 formData={ongFormData}
 errors={errors}
 handleChange={handleOngFormChange}
 handleSubmit={handleOngSubmit}
 onNextStep={validateOngStep1}
 handleBlur={handleBlur}
 isLoading={isLoading}
 isSubmitting={isSubmitting}
/>
```


---


# ReturnButton/index.jsx - Componente Auxiliar (Malleus)

## Visão Geral
Componente simples de botão de retorno utilizado para navegação entre telas de autenticação.

## Responsabilidades
- Prover navegação de retorno para a tela de login
- Manter consistência visual em todos os pontos de uso
- Prevenir interações durante submissões de formulário

## Funcionalidades

### Navegação
- Executa callback personalizado fornecido via prop `onReturnClick`
- Mantém o contexto de navegação controlado pelo componente pai

### Estado de Submissão
- Fica desabilitado durante operações de submissão (`isSubmitting`)
- Previne navegações conflitantes durante processamento de formulários

### Acessibilidade
- Inclui atributo `aria-label` para leitores de tela
- Mantém foco visível para navegação por teclado

## Características Técnicas

### Simplicidade Intencional
- Componente minimalista com apenas 2 props
- Não gerencia estado interno
- Focado em uma única responsabilidade

### Integração
- Consumido principalmente pelo componente `AuthPage` (Golden Throne)
- Utilizado especificamente no fluxo de cadastro de ONG
- Interface consistente com o sistema de autenticação

## Padrão de Uso
```jsx
<ReturnButton
 onReturnClick={() => setActiveView('login')}
 isSubmitting={isSubmitting}
/>
```


---


# AddressForm/index.jsx - Componente Compartilhado (Grey Knights)

## Visão Geral
Componente reutilizável para captura de dados de endereço com integração com a API do IBGE. Implementa sistema sofisticado de cache e gestão de estado para otimizar performance.

## Responsabilidades
- Capturar dados completos de endereço
- Integrar com API do IBGE para busca de estados e municípios
- Gerenciar cache de dados para otimizar performance
- Fornecer feedback de carregamento e erro
- Manter consistência em múltiplos pontos de uso

## Campos do Formulário

### Informações de Localização
1. **CEP**: Campo de texto para código postal brasileiro
2. **Estado**: Select com opções carregadas da API do IBGE
3. **Cidade**: Select com opções carregadas dinamicamente baseado no estado
4. **Bairro**: Campo de texto para nome do bairro
5. **Logradouro**: Campo de texto para nome da rua/avenida
6. **Número**: Campo de texto para número do endereço
7. **Complemento**: Campo opcional para informações adicionais

## Características Técnicas

### Integração com IBGE
- **Estados**: Busca automática ao montar o componente
- **Municípios**: Busca condicional baseada no estado selecionado
- **Ordenação**: Dados ordenados por nome para melhor UX

### Sistema de Cache
- **Estados**: Cache global (uma única carga por sessão)
- **Municípios**: Cache por estado (evita requisições repetidas)
- **Persistência**: Mantém dados entre re-renderizações

### Gestão de Estado
- **Carregamento**: Estados visuais para loading de estados e cidades
- **Erro**: Tratamento e exibição de erros de API
- **Dados**: Armazenamento das listas de estados e municípios

### Otimização de Performance
- **AbortController**: Cancela requisições pendentes ao desmontar
- **Cache em Memória**: Reduce chamadas à API
- **Verificação de Montagem**: Previne updates em componente desmontado

## Experiência do Usuário

### Estados de Interface
- **Carregando**: Exibe "Carregando..." durante requisições
- **Desabilitado**: Campos ficam desabilitados durante carregamento
- **Erro**: Exibe mensagens específicas de erro de API ou validação

### Fluxo de Preenchimento
1. Usuário preenche o CEP (poderia ser integrado com API de CEP no futuro)
2. Seleciona o estado (carregado automaticamente do IBGE)
3. Seleciona a cidade (carregada automaticamente baseado no estado)
4. Preenche os demais campos manualmente

## Integração
- Consumido por componentes de formulário que necessitam de dados de endereço
- Interface consistente com o sistema de validação (Roboute)
- Props padronizadas para fácil integração

## Padrão de Uso
```jsx
<AddressForm
 addressData={formData.address}
 handleChange={handleAddressChange}
 errors={errors}
 handleBlur={handleBlur}
/>
```


---


# Stepper/index.jsx - Componente de UI (Kaldor Draigo)

## Visão Geral
Componente visual de indicador de progresso para fluxos multi-etapas. Exibe uma representação gráfica do progresso do usuário através de um formulário ou processo com múltiplas etapas.

## Responsabilidades
- Visualizar claramente o progresso em processos multi-etapas
- Indicar quais etapas foram completadas, qual está ativa e quais são pendentes
- Fornecer feedback visual imediato sobre o estado do processo
- Manter consistência visual em diferentes contextos de uso

## Funcionalidades

### Estados das Etapas
1. **Completas**: Marcadas com ícone de check () e estilo diferenciado
2. **Ativas**: Destacadas visualmente com estilos de destaque
3. **Pendentes**: Mostradas com número sequencial e estilo padrão

### Elementos Visuais
- **Círculos numerados**: Para etapas pendentes
- **Ícones de check**: Para etapas completadas
- **Linhas conectivas**: Visualmente ligam as etapas em um fluxo contínuo
- **Nomes das etapas**: Texto descritivo para cada fase do processo

## Características Técnicas

### Renderização Condicional
- Gera dinamicamente os elementos baseado no array de etapas
- Aplica classes CSS condicionais baseadas no estado de cada etapa
- Renderiza conectores apenas entre etapas (não após a última)

### Acessibilidade
- Estrutura semântica clara para leitores de tela
- Ícones decorativos com significado intuitivo
- Hierarquia visual que não depende apenas de cor para transmitir informação

### Design Responsivo
- Layout adaptável a diferentes tamanhos de tela
- Espaçamento consistente entre elementos
- Texto legível em diferentes dispositivos

## Padrão de Uso
```jsx
<Stepper
 steps={['Dados Pessoais', 'Endereço', 'Confirmação']}
 currentStep={2}
/>
```

---


# Select/index.jsx - Componente de UI (Forge World)

## Visão Geral
Componente de select personalizado com label integrado, ícone de dropdown e suporte a validação de erros. Mantém acessibilidade completa enquanto proporciona uma experiência visual consistente com o design system.

## Responsabilidades
- Renderizar selects estilizados com labels associados
- Exibir opções de forma acessível e intuitiva
- Fornecer feedback visual para estados de erro
- Manter consistência com outros componentes de formulário
- Garantir acessibilidade completa

## Funcionalidades

### Estrutura Básica
1. **Label**: Texto descritivo associado ao select
2. **Select Nativo**: Elemento select com todas as funcionalidades nativas
3. **Ícone de Dropdown**: Indicador visual personalizado
4. **Tratamento de Erros**: Exibição de mensagens de validação

### Acessibilidade
- Associação adequada entre label e select via `htmlFor` e `id`
- Atributo `aria-describedby` para vincular mensagens de erro
- Ícone decorativo marcado com `aria-hidden="true"`
- Navegação por teclado totalmente funcional

### Validação Visual
- Estilos específicos para estado de erro
- Exibição de mensagens de erro abaixo do campo
- Manutenção do foco visual durante interação

## Características Técnicas

### Props
- `label`: Texto do label (obrigatório para acessibilidade)
- `id`: ID único (obrigatório para associação label-select)
- `options`: Array de opções no formato `{value: string, label: string}`
- `className`: Classes CSS adicionais para customização
- `error`: Mensagem de erro para exibição e estilização
- `...rest`: Demais props repassadas para o elemento select nativo

### Renderização Condicional
- Ícone de dropdown sempre visível como indicador visual
- Mensagem de erro exibida apenas quando presente
- Aplicação condicional de classes de erro

## Padrão de Uso
```jsx
<Select
 label="Categoria"
 id="ong-category"
 options={[
 { value: 'animal', label: 'Proteção Animal' },
 { value: 'ambiente', label: 'Meio Ambiente' }
 ]}
 value={selectedCategory}
 onChange={handleCategoryChange}
 error={errors.category}
/>
```


---


# PasswordInput/index.jsx - Componente de UI (Forge World-Graia)

## Visão Geral
Componente especializado para campos de senha com funcionalidade de toggle de visibilidade. Combina o componente Input base com um botão para alternar entre senha oculta e visível.

## Responsabilidades
- Renderizar campos de senha com toggle de visibilidade
- Fornecer feedback visual claro do estado de visibilidade
- Manter acessibilidade completa para o toggle
- Preservar todas as funcionalidades de validação e erro do Input base

## Funcionalidades

### Toggle de Visibilidade
- **Estado Oculto**: Exibe a senha como pontos (type="password")
- **Estado Visível**: Exibe a senha como texto claro (type="text")
- **Ícones Indicativos**: Eye (visível) e EyeOff (oculto) da react-feather
- **Toggle Interativo**: Botão com feedback visual de estado

### Acessibilidade
- **ARIA Labels**: Descritores claros para leitores de tela
- **ARIA Pressed**: Indicação de estado pressionado/toggle ativo
- **Navegação por Teclado**: Totalmente navegável e operável via teclado
- **Foco Visual**: Indicador de foco claro no botão toggle

### Integração com Input Base
- Herda todas as propriedades do componente Input
- Mantém funcionalidade de validação e exibição de erros
- Preserva estilos e comportamentos consistentes

## Características Técnicas

### Estado Interno
- `isPasswordVisible`: Controla o estado de visibilidade localmente
- `toggleVisibility`: Função para alternar o estado de visibilidade

### Props
Herda todas as props do componente Input:
- `label`, `id`, `name`, `value`, `onChange`, `onBlur`, `error`, `placeholder`

### Estrutura de Renderização
- **Wrapper Div**: Container para posicionamento relativo
- **Input Base**: Componente Input com tipo dinâmico
- **Toggle Button**: Botão absoluto para controle de visibilidade

## Padrão de Uso
```jsx
<PasswordInput
 label="Senha"
 id="user-password"
 name="password"
 value={formData.password}
 onChange={handleChange}
 onBlur={handleBlur}
 error={errors.password}
 placeholder="Digite sua senha"
/>
```


---


# SubmitAnimation.jsx - Componente de Animação (Forge World - Metalica)

## Visão Geral
Animação complexa e altamente customizável para feedback visual de submissão de formulários. Implementa uma sequência temporal precisa controlada via JavaScript com sincronização total entre elementos visuais.

## Responsabilidades
- Fornecer feedback visual sofisticado durante submissões de formulário
- Sincronizar múltiplos elementos animados com precisão temporal
- Garantir transições suaves entre estágios da animação
- Permitir customização através de parâmetros temporais ajustáveis

## Funcionalidades Completas

### Sistema de Temporização
Configuração completa de tempos para cada estágio da animação:
- `tHideText`: Ocultação do texto inicial (50ms)
- `tMorphStart`: Delay antes do morphing (100ms)
- `tMorphDuration`: Duração do morphing do botão (400ms)
- `tProgressDuration`: Duração da barra de progresso (600ms - principal ajuste)
- `tAfterProgressDelay`: Delay após progresso (1ms)
- `tToCircleDuration`: Transição para círculo (700ms)
- `tDrawDuration`: Desenho do checkmark (200ms)
- `preDrawOffset`: Início antecipado do desenho (120ms)

### Elementos Visuais
1. **Botão Principal**: 
 - Texto "Cadastrar" no estado inicial
 - Morphing para forma de barra de progresso
 - Colapso para círculo e eventual desaparecimento

2. **Barra de Progresso**:
 - Crescimento horizontal durante o estágio de progresso
 - Transformação em círculo perfeito
 - Mudança de cor e formato sincronizada

3. **Checkmark SVG**:
 - Desenho progressivo usando técnica stroke-dasharray
 - Opacidade controlada temporalmente
 - Sincronizado com os demais elementos

### Controle de Estágios
Sistema de estados que controla a animação:
- `idle`: Estado inicial com texto visível
- `textHidden`: Texto oculto, preparação para morphing
- `morph`: Transformação do botão em barra de progresso
- `progress`: Preenchimento animado da barra de progresso
- `collapse`: Redução do elemento para formato circular
- `toCircle`: Transição completa para círculo
- `draw`: Animação de desenho do checkmark
- `done`: Estado final da animação

## Características Técnicas

### Precisão Temporal
- Timestamps absolutos calculados com base na configuração
- Sincronização perfeita entre múltiplos elementos
- Transições CSS aplicadas dinamicamente com durações configuráveis

### Técnicas de Animação
- **CSS Transitions**: Para transformações suaves de forma e tamanho
- **SVG Stroke Animation**: Para desenho progressivo do checkmark
- **Opacity Fading**: Para transições de aparecimento/desaparecimento
- **Dynamic Timing**: Controle preciso via JavaScript

### Performance
- Cleanup automático de timeouts ao desmontar
- Transições CSS hardware-aceleradas quando possível
- Cálculos de layout minimizados através de refs
- Uso eficiente de repaint e reflow

## Fluxo da Animação

### Sequência Completa
1. **Texto Oculto** (50ms): Remove o texto "Cadastrar"
2. **Morphing do Botão** (100-500ms): Transforma em barra horizontal
3. **Progresso** (500-1100ms): Preenchimento gradual da barra
4. **Colapso** (1100ms): Redução para formato compacto
5. **Transição para Círculo** (1101-1801ms): Transformação circular
6. **Desenho do Check** (1681-1881ms): Animação do ícone de sucesso
7. **Finalização** (1881ms): Estado completo

### Customização
- Fácil ajuste de tempos através de constantes modificáveis
- Ponto central de ajuste (tProgressDuration) para controle geral
- Curvas de easing customizáveis para diferentes estágios

## Integração
- Consumido por formulários de cadastro durante submissão
- Integrado com o sistema de estado de loading dos formulários
- Interface consistente com o design system da aplicação

## Exemplo de Uso
```jsx
{isSubmitting && <SubmitAnimation />}
```


---


# Button/index.jsx - Componente de UI (Forge World)

## Visão Geral
Componente de botão genérico com suporte a múltiplos tipos de animações de loading. Oferece substituição visual contextual durante operações assíncronas, melhorando significativamente a experiência do usuário durante estados de carregamento.

## Responsabilidades
- Renderizar botões com estilos consistentes em toda a aplicação
- Fornecer feedback visual apropriado durante operações de carregamento
- Suportar múltiplos tipos de animações para diferentes contextos
- Manter acessibilidade e estados de desabilitação adequados

## Tipos de Animação de Loading

### Spinner (Padrão)
- Animação circular de loading tradicional
- Renderizada dentro de um container que mantém a estética do botão
- Indicador visual genérico para operações de curta duração

### Progress
- Barra de progresso animada (ProgressBarAnimation)
- Ideal para operações com progresso mensurável
- Fornece feedback de andamento da operação

### Submit
- Animação complexa de submissão (SubmitAnimation)
- Sequência completa com morphing, progresso e checkmark
- Designada para confirmações de formulários importantes

## Características Técnicas

### Props
- `children`: Conteúdo visual do botão (obrigatório)
- `className`: Classes adicionais para customização de estilo
- `isLoading`: Controla o estado de carregamento do botão
- `loadingType`: Determina o tipo de animação durante loading
- `...rest`: Demais props repassadas para o elemento button nativo

### Renderização Condicional
- **Estado Normal**: Renderiza o botão com conteúdo children
- **Estado Loading**: Substitui por animação baseada no loadingType
- **Acessibilidade**: Mantém estado disabled durante loading

### Integração com Animações
- Importação condicional de componentes de animação
- Substituição completa do botão durante loading
- Preservação de contexto visual durante transições

## Padrão de Uso
```jsx
// Botão normal
<Button onClick={handleClick}>Enviar</Button>

// Botão com loading do tipo spinner
<Button isLoading={true}>Enviar</Button>

// Botão com loading do tipo progress
<Button isLoading={true} loadingType="progress">Processando</Button>

// Botão com loading do tipo submit
<Button isLoading={true} loadingType="submit">Cadastrar</Button>
```


---


# Input/index.jsx - Componente de UI (Forge World)

## Visão Geral
Componente de input de texto com label integrado e tratamento completo de erros. Fornece acessibilidade robusta e consistência visual em todos os formulários da aplicação.

## Responsabilidades
- Renderizar inputs de texto com labels associados
- Fornecer feedback visual para estados de erro
- Garantir acessibilidade completa com atributos ARIA
- Manter consistência com o design system
- Preservar todas as funcionalidades nativas de input

## Funcionalidades

### Estrutura Básica
1. **Label**: Texto descritivo associado ao input via `htmlFor` e `id`
2. **Input Nativo**: Elemento input com todas as funcionalidades nativas
3. **Tratamento de Erros**: Exibição de mensagens de validação

### Acessibilidade
- Associação adequada entre label e input
- Atributo `aria-invalid` para indicar estado inválido
- Atributo `aria-describedby` para vincular mensagens de erro
- Navegação por teclado e foco visual adequados

### Validação Visual
- Estilos específicos para estado de erro
- Exibição de mensagens de erro abaixo do campo
- Manutenção do foco visual durante interação

## Características Técnicas

### Props
- `label`: Texto do label (obrigatório para acessibilidade)
- `id`: ID único (obrigatório para associação label-input)
- `className`: Classes CSS adicionais para customização do wrapper
- `error`: Mensagem de erro para exibição e estilização
- `...rest`: Demais props repassadas para o elemento input nativo

### Renderização Condicional
- Mensagem de erro exibida apenas quando a prop `error` está presente
- Classes de erro aplicadas condicionalmente ao input
- Atributos ARIA ajustados dinamicamente baseados no estado

## Padrão de Uso
```jsx
<Input
 label="E-mail"
 id="user-email"
 type="email"
 placeholder="seu@email.com"
 value={email}
 onChange={handleEmailChange}
 error={errors.email}
/>
```