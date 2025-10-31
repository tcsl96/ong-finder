import React, { useState, useEffect, useRef } from "react";
import styles from "./SubmitAnimation.module.css";

/**
 * Componente de Animação (Forge World - Metalica) - Animação de submissão síncrona
 * 
 * @componente
 * 
 * @descrição
 * Animação complexa e altamente customizável para feedback visual de submissão de formulários.
 * Implementa uma sequência temporal precisa de transições controlada via JavaScript
 * com sincronização total entre todos os elementos visuais.
 * 
 * @caracteristicas
 * - Controle temporal preciso via JavaScript
 * - Transições CSS dinamicamente aplicadas
 * - Sincronização perfeita entre múltiplos elementos
 * - Altamente customizável através de parâmetros temporais
 * - Sistema de limpeza automática de timeouts
 * 
 * @comportamento
 * Executa uma sequência animada complexa com estágios definidos:
 * 1. Ocultação do texto
 * 2. Morphing do botão
 * 3. Barra de progresso
 * 4. Colapso para círculo
 * 5. Transição para checkmark
 * 6. Desenho do checkmark
 * 7. Estado final
 */


export default function SubmitAnimation() {
  // --- CONFIGURAÇÃO DE TEMPOS (em milissegundos) ---
  const tHideText = 50;           // Tempo para ocultar o texto inicial
  const tMorphStart = 100;        // Delay antes de iniciar o morphing
  const tMorphDuration = 400;     // Duração do morphing do botão
  const tProgressDuration = 600;  // Duração da barra de progresso (AJUSTE PRINCIPAL)
  const tAfterProgressDelay = 1;  // Delay mínimo após progresso
  const tToCircleDuration = 700;  // Duração da transição para círculo
  const tDrawDuration = 200;      // Duração do desenho do checkmark
  const preDrawOffset = 120;      // Início antecipado do desenho do checkmark

  // --- Estados e referências ---
  const [stage, setStage] = useState("idle"); // Estágio atual da animação
  const pathRef = useRef(null);               // Referência para o SVG path do checkmark
  const progressRef = useRef(null);           // Referência para a barra de progresso
  const buttonRef = useRef(null);             // Referência para o botão
  const timeoutsRef = useRef([]);             // Armazenamento de timeouts para cleanup

  /**
   * Efeito para controle da sequência animada
   * 
   * @descrição
   * Configura e executa a sequência completa de animação ao montar o componente.
   * Aplica transições CSS dinamicamente com base nos tempos configurados.
   * Implementa sistema de cleanup para evitar memory leaks.
   */
  useEffect(() => {
    const path = pathRef.current;
    const progress = progressRef.current;
    const button = buttonRef.current;
    
    // Retorna early se elementos não estiverem disponíveis
    if (!path || !progress || !button) return;

    // Configuração inicial do SVG path
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    path.style.opacity = "0";
    path.style.transition = "opacity 120ms linear, stroke-dashoffset 200ms ease-in-out";

    // Aplica transições dinâmicas baseadas nos tempos configurados
    progress.style.transition = `width ${tProgressDuration}ms linear, height ${tToCircleDuration}ms ease, border-radius ${tToCircleDuration}ms ease, background-color 200ms`;
    button.style.transition = `width ${tMorphDuration}ms cubic-bezier(.22,.94,.32,1), height ${tMorphDuration}ms cubic-bezier(.22,.94,.32,1), border-radius ${tMorphDuration}ms cubic-bezier(.22,.94,.32,1), opacity 200ms ease`;

    // Cálculo de timestamps absolutos para a sequência
    const t1 = tHideText;
    const t2 = tMorphStart;
    const t3 = t2 + tMorphDuration;            // morph end -> progress start
    const t4 = t3 + tProgressDuration;         // progress end -> collapse
    const t5 = t4 + tAfterProgressDelay;       // toCircle start
    const t6 = t5 + tToCircleDuration;         // toCircle end
    const t7 = t6 + tDrawDuration;             // final done

    // Início antecipado do desenho do checkmark
    const drawStart = Math.max(t6 - preDrawOffset, t5 + 20);

    // Limpeza de timeouts anteriores
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // Sequência de transição de estágios
    timeoutsRef.current.push(setTimeout(() => setStage("textHidden"), t1));
    timeoutsRef.current.push(setTimeout(() => setStage("morph"), t2));
    timeoutsRef.current.push(setTimeout(() => setStage("progress"), t3));
    timeoutsRef.current.push(setTimeout(() => setStage("collapse"), t4));
    timeoutsRef.current.push(setTimeout(() => setStage("toCircle"), t5));

    // Configuração do desenho do checkmark
    timeoutsRef.current.push(setTimeout(() => {
      setStage("draw");
      path.style.opacity = "1";
      
      // Pequeno delay para garantir renderização antes da animação
      setTimeout(() => {
        path.style.strokeDashoffset = "0";
      }, 20);
    }, drawStart));

    // Estágio final
    timeoutsRef.current.push(setTimeout(() => {
      setStage("done");
    }, t7));

    // Cleanup function
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Executa apenas na montagem

  // Derivação de classes baseadas no estágio atual
  const isTextHidden = stage !== "idle";
  const isMorphed = ["morph", "progress", "collapse", "toCircle", "draw", "done"].includes(stage);
  const isCollapsed = stage === "collapse";
  const isProgressing = stage === "progress";
  const isToCircle = ["toCircle", "draw", "done"].includes(stage);
  const isHidden = ["toCircle", "draw", "done"].includes(stage);



    return (
    <div className={styles.wrapper}>
      {/* Container principal do botão animado */}
      <div
        ref={buttonRef}
        className={`${styles.button} 
                   ${isMorphed ? styles.buttonMorphed : ""} 
                   ${isCollapsed ? styles.buttonCollapsed : ""} 
                   ${isHidden ? styles.buttonHidden : ""}`}
      >
        {/* Texto do botão - visível apenas no estado inicial */}
        <div className={`${styles.text} ${isTextHidden ? styles.textHidden : ""}`}>
          {stage === "idle" ? "Cadastrar" : ""}
        </div>
      </div>

      {/* Barra de progresso que se transforma em círculo */}
      <div
        ref={progressRef}
        className={`${styles.progressBar} 
                   ${isProgressing ? styles.progressGrowing : ""} 
                   ${isToCircle ? styles.progressCircle : ""}`}
      />

      {/* SVG do checkmark que é desenhado progressivamente */}
      <svg className={styles.checkSvg} viewBox="0 0 25 30" aria-hidden="true">
        <path 
          ref={pathRef} 
          className={styles.check} 
          d="M2,19.2C5.9,23.6,9.4,28,9.4,28L23,2" 
        />
      </svg>
    </div>
  );
}