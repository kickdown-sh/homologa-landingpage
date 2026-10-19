import type { CSSProperties } from 'react';
import { LineReveal, useSectionPresence } from '../contrato/reveal';
import type { SectionProps } from '../contrato/types';

const steps = [
  {
    code: '01',
    title: 'Cadastro do projeto',
    detail: 'UC, distribuidora e equipamentos, digitados uma única vez.',
  },
  {
    code: '02',
    title: 'Dimensionamento elétrico',
    detail: 'Condutores, disjuntores, DPS e proteções, para string ou microinversor.',
  },
  {
    code: '03',
    title: 'Geração dos documentos',
    detail: 'Diagramas, memorial, planta e anexos da distribuidora, editáveis.',
  },
  {
    code: '04',
    title: 'Validação de conformidade',
    detail: 'Cada item sai como impeditivo, atenção ou conforme, com a norma citada.',
  },
  {
    code: '05',
    title: 'Protocolo e acompanhamento',
    detail: 'Prazos, pendências e parecer de acesso no mesmo painel.',
  },
] as const;

const STEP_STAGGER = 0.12;
// Cada etapa entra um pouco depois da anterior e todas chegam a 1 juntas no fim.
function presenceForStep(presence: number, index: number) {
  const start = index * STEP_STAGGER;
  return Math.max(0, Math.min(1, (presence - start) / (1 - (steps.length - 1) * STEP_STAGGER)));
}

export default function Mecanismo({ id }: SectionProps) {
  const presence = useSectionPresence(id);
  const sectionStyle = {
    '--mechanism-presence': presence,
  } as CSSProperties;

  return (
    <section className="mechanism" style={sectionStyle} aria-label="Mecanismo de automação">
      <style>{`
        .mechanism {
          position: relative;
          width: 100%;
          padding: clamp(1rem, 3vh, 3rem) 0;
        }

        .mechanism__top {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(16rem, 0.8fr);
          gap: clamp(2rem, 8vw, 10rem);
          align-items: end;
          margin-bottom: clamp(3rem, 8vh, 7rem);
        }

        .mechanism__heading {
          max-width: 8.8ch;
          font-size: clamp(3rem, 6vw, 6.6rem);
          line-height: 0.9;
        }

        .mechanism__intro {
          display: grid;
          gap: 1.25rem;
          max-width: 27rem;
          padding-bottom: 0.35rem;
        }

        .mechanism__intro .fable-copy {
          max-width: 27rem;
        }

        .mechanism__spec {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1rem;
          padding-top: 1rem;
          border-top: 1px solid color-mix(in srgb, var(--fable-paper) 18%, transparent);
          color: var(--fable-paper);
          font-family: "Cascadia Code", "JetBrains Mono", ui-monospace, monospace;
          font-size: var(--fable-label);
          font-weight: 620;
          letter-spacing: 0.11em;
          text-transform: uppercase;
        }

        .mechanism__diagram {
          --dot: 0.75rem;
          --mechanism-gap: clamp(0.6rem, 2.3vw, 2.75rem);
          position: relative;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: var(--mechanism-gap);
          padding: clamp(1.5rem, 3vw, 2.5rem) 0 clamp(2rem, 5vw, 4rem);
          border-bottom: 1px solid color-mix(in srgb, var(--fable-paper) 15%, transparent);
        }

        .mechanism__step {
          position: relative;
          display: grid;
          grid-template-rows: var(--dot) auto auto 1fr;
          row-gap: 0.9rem;
          min-width: 0;
          opacity: calc(0.28 + var(--step-presence) * 0.72);
          transform: translateY(calc((1 - var(--step-presence)) * 1rem));
          transition: opacity 500ms var(--fable-ease), transform 700ms var(--fable-ease);
        }

        /* Trilho: liga o centro de um ponto ao centro do próximo, só na linha
           dos pontos (o número fica abaixo, sem ser riscado). */
        .mechanism__step:not(:last-child)::before,
        .mechanism__step:not(:last-child)::after {
          content: "";
          position: absolute;
          top: calc(var(--dot) / 2 - 0.5px);
          left: calc(var(--dot) / 2);
          width: calc(100% + var(--mechanism-gap));
          height: 1px;
          transform-origin: left;
        }

        .mechanism__step:not(:last-child)::before {
          background: color-mix(in srgb, var(--fable-paper) 19%, transparent);
        }

        .mechanism__step:not(:last-child)::after {
          transform: scaleX(var(--step-presence));
          background: var(--fable-accent);
          transition: transform 220ms linear;
        }

        .mechanism__node {
          position: relative;
          z-index: 1;
          box-sizing: border-box;
          width: var(--dot);
          height: var(--dot);
          border: 1px solid color-mix(in srgb, var(--fable-paper) 55%, transparent);
          border-radius: 50%;
          background: var(--fable-void);
          transition: background 450ms var(--fable-ease), border-color 450ms var(--fable-ease), box-shadow 450ms var(--fable-ease);
        }

        .mechanism__step[data-done='true'] .mechanism__node {
          border-color: var(--fable-accent);
          background: var(--fable-accent);
        }

        /* Etapa atual: anel nítido (sem brilho difuso). */
        .mechanism__step[data-current='true'] .mechanism__node {
          box-shadow: 0 0 0 0.3rem color-mix(in srgb, var(--fable-accent) 22%, transparent);
        }

        .mechanism__num {
          color: var(--fable-muted);
          font-family: "Cascadia Code", "JetBrains Mono Variable", "JetBrains Mono", ui-monospace, monospace;
          font-size: var(--fable-label);
          font-variant-numeric: tabular-nums;
          font-weight: 650;
          letter-spacing: 0.14em;
          line-height: 1;
          transition: color 450ms var(--fable-ease);
        }

        .mechanism__step[data-current='true'] .mechanism__num {
          color: var(--fable-accent);
        }

        .mechanism__title {
          min-height: 2.15em;
          margin: 0;
          color: var(--fable-paper);
          font-family: "Segoe UI Variable Display", "Segoe UI Variable", ui-sans-serif, system-ui, sans-serif;
          font-size: clamp(1.12rem, 1.65vw, 1.55rem);
          font-weight: 500;
          letter-spacing: -0.045em;
          line-height: 0.98;
          transition: color 450ms var(--fable-ease);
        }

        .mechanism__detail {
          max-width: 17ch;
          margin: 0;
          color: var(--fable-muted);
          font-size: clamp(0.75rem, 0.92vw, 0.875rem);
          line-height: 1.42;
        }

        .mechanism__footer {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(15rem, 0.9fr);
          gap: clamp(1.5rem, 8vw, 9rem);
          padding-top: clamp(2rem, 5vw, 4rem);
        }

        .mechanism__outputs,
        .mechanism__standards {
          display: grid;
          gap: 0.85rem;
          align-content: start;
        }

        .mechanism__caption {
          margin: 0;
          color: var(--fable-muted);
          font-family: "Cascadia Code", "JetBrains Mono", ui-monospace, monospace;
          font-size: var(--fable-label);
          font-weight: 630;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .mechanism__formats {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .mechanism__format {
          display: inline-block;
          border: 1px solid color-mix(in srgb, var(--fable-paper) 20%, transparent);
          color: var(--fable-paper);
          font-family: "Cascadia Code", "JetBrains Mono", ui-monospace, monospace;
          font-size: clamp(0.75rem, 1vw, 0.875rem);
          font-weight: 650;
          letter-spacing: 0.08em;
        }

        .mechanism__format > span { padding: 0.45rem 0.62rem; }

        .mechanism__standards p {
          max-width: 34rem;
          margin: 0;
          color: var(--fable-paper);
          font-size: clamp(0.9rem, 1.25vw, 1.05rem);
          line-height: 1.36;
        }

        @media (max-width: 56rem) {
          .mechanism__top,
          .mechanism__footer { grid-template-columns: 1fr; gap: 2rem; }
          .mechanism__diagram { --mechanism-gap: 0.85rem; }
          .mechanism__title { min-height: 2.8em; }
        }

        @media (max-width: 42rem) {
          .mechanism { padding-top: 0; }
          .mechanism__heading { max-width: 10ch; font-size: clamp(2.7rem, 12vw, 4rem); line-height: .92; }
          .mechanism__top { gap: 1.5rem; margin-bottom: 2rem; }
          .mechanism__diagram {
            grid-template-columns: 1fr;
            gap: 0;
            padding: 0;
            border-bottom: 0;
          }
          .mechanism__step {
            grid-template-columns: var(--dot) minmax(0, 1fr);
            grid-template-rows: auto auto auto;
            column-gap: 1rem;
            row-gap: 0.4rem;
            padding: 0 0 1.75rem;
            transform: translateX(calc((1 - var(--step-presence)) * -0.75rem));
          }
          .mechanism__node { grid-column: 1; grid-row: 1; margin-top: 0.05rem; }
          .mechanism__num, .mechanism__title, .mechanism__detail { grid-column: 2; }
          .mechanism__num { grid-row: 1; align-self: center; }
          .mechanism__step:not(:last-child)::before,
          .mechanism__step:not(:last-child)::after {
            top: calc(var(--dot) / 2 + 0.05rem);
            left: calc(var(--dot) / 2 - 0.5px);
            width: 1px;
            height: 100%;
            transform-origin: top;
          }
          .mechanism__step:not(:last-child)::after {
            transform: scaleY(var(--step-presence));
          }
          .mechanism__title { min-height: 0; }
          .mechanism__detail { max-width: 29ch; }
          .mechanism__footer { padding-top: 1.5rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mechanism__step:not(:last-child)::after { transition: none; transform: scaleX(1); }
          .mechanism__step { opacity: 1; transform: none; transition: none; }
          .mechanism__node, .mechanism__num { transition: none; }
          @media (max-width: 42rem) { .mechanism__step:not(:last-child)::after { transform: scaleY(1); } }
        }
      `}</style>

      <div className="fable-container">
        <div className="mechanism__top">
          <div>
            <LineReveal
              as="h2"
              className="fable-heading mechanism__heading"
              section={id}
              lines={['Cadastre uma vez.', <>O resto <span className="fable-accent">sai pronto.</span></>]}
            />
          </div>

          <div className="mechanism__intro">
            <LineReveal
              as="p"
              className="fable-copy"
              section={id}
              lines={['Os dados do projeto entram uma única vez. Dimensionamento, documentos, conferência normativa e acompanhamento do protocolo partem deles.']}
            />
            <LineReveal
              as="p"
              className="mechanism__spec"
              section={id}
              lines={['Inversor string  |  Microinversor']}
            />
          </div>
        </div>

        <div className="mechanism__diagram" data-scroll-anchor aria-label="Fluxo da automação de engenharia">
          {steps.map((step, index) => {
            const stepPresence = presenceForStep(presence, index);
            const stepStyle = { '--step-presence': stepPresence } as CSSProperties;
            const isDone = stepPresence >= 0.99;
            const isCurrent = stepPresence > 0.5 && (index === steps.length - 1 || presenceForStep(presence, index + 1) <= 0.5);
            return (
              <article className="mechanism__step" data-done={isDone} data-current={isCurrent} key={step.code} style={stepStyle}>
                <span className="mechanism__node" aria-hidden="true" />
                <span className="mechanism__num">{step.code}</span>
                <LineReveal as="h3" className="mechanism__title" section={id} lines={[step.title]} />
                <LineReveal as="p" className="mechanism__detail" section={id} lines={[step.detail]} />
              </article>
            );
          })}
        </div>

        <div className="mechanism__footer" data-scroll-anchor>
          <div className="mechanism__outputs">
            <LineReveal as="p" className="mechanism__caption" section={id} lines={['Arquivos de saída']} />
            <div className="mechanism__formats" aria-label="Formatos de arquivo editáveis">
              {['PDF', 'SVG', 'DXF'].map((format) => (
                <LineReveal as="span" className="mechanism__format" section={id} lines={[format]} key={format} />
              ))}
            </div>
            <LineReveal
              as="p"
              className="fable-copy"
              section={id}
              lines={['Editáveis, para o RT revisar e assinar sem redesenhar nada.']}
            />
          </div>

          <div className="mechanism__standards">
            <LineReveal as="p" className="mechanism__caption" section={id} lines={['Normas conferidas']} />
            <LineReveal
              as="p"
              section={id}
              lines={['NBR 5410, NBR 16690, PRODIST Módulo 3 e Lei 14.300.']}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
