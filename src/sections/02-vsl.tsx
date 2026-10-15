import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react';
import { Play } from 'lucide-react';
import { LineReveal } from '../contrato/reveal';
import type { SectionProps } from '../contrato/types';

// Apresentação do produto (VSL) em public/vsl.mp4: 2 min 47 s, 1080p, com som.
// Nada é baixado antes do clique (preload none); na carga da página só entra o pôster.
const DURACAO = '2:47';
const DURACAO_POR_EXTENSO = '2 minutos e 47 segundos';
// Teclas do player nativo que a rolagem guiada da landing também captura na janela.
const TECLAS_DO_PLAYER = new Set([' ', 'Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Home', 'End']);

export default function Vsl({ id }: SectionProps) {
  const figureRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [iniciado, setIniciado] = useState(false);

  // A rolagem guiada troca de seção num passo e as seções se sobrepõem um pouco: com menos
  // da metade do player na tela, o vídeo pausa e não retoma sozinho.
  useEffect(() => {
    const figure = figureRef.current;
    const video = videoRef.current;
    if (!figure || !video || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio < 0.5 && !video.paused) video.pause();
    }, { threshold: [0, 0.5] });
    io.observe(figure);
    return () => io.disconnect();
  }, []);

  const iniciar = () => {
    const video = videoRef.current;
    if (!video) return;
    setIniciado(true);
    void video.play().catch(() => undefined);
  };

  const protegerTecla = (event: KeyboardEvent<HTMLElement>) => {
    if (TECLAS_DO_PLAYER.has(event.key)) event.stopPropagation();
  };

  // Com o player ativo, arrastar na barra de tempo não pode virar um passo da rolagem.
  const protegerToque = (event: TouchEvent<HTMLDivElement>) => {
    if (iniciado) event.stopPropagation();
  };

  return (
    <div className="fable-container vsl">
      <style>{`
        .vsl { display: grid; gap: clamp(1.5rem, 3.5vh, 2.75rem); }
        .vsl__top { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(17rem, .9fr); gap: clamp(1.5rem, 5vw, 6rem); align-items: end; }
        .vsl__heading { max-width: 17ch; font-size: clamp(2.5rem, 4.8vw, 5.1rem); line-height: .92; }
        .vsl__lede { max-width: 34rem; padding-bottom: .35rem; }

        /* Moldura no mesmo desenho da janela do hero. A largura segue a altura da
           tela para a seção inteira caber num passo da rolagem. */
        .vsl__player {
          --vsl-radius: .875rem;
          position: relative;
          z-index: 8;
          width: min(100%, 72rem, max(40rem, calc((100vh - 27rem) * 16 / 9)));
          margin: 0 auto;
          border: 1px solid color-mix(in srgb, var(--fable-paper) 14%, transparent);
          border-radius: var(--vsl-radius);
          background: color-mix(in srgb, var(--fable-paper) 5%, var(--fable-void));
          box-shadow:
            inset 0 1px 0 color-mix(in srgb, var(--fable-paper) 8%, transparent),
            0 0 0 1px color-mix(in srgb, var(--fable-void) 60%, transparent),
            0 2.5rem 5.625rem -1.875rem color-mix(in srgb, var(--fable-void) 90%, transparent);
          overflow: clip;
        }
        .vsl__stage { position: relative; aspect-ratio: 16 / 9; background: #000; }
        .vsl__video { display: block; width: 100%; max-width: none; height: 100%; object-fit: contain; background: #000; }

        .vsl__play { position: absolute; inset: 0; display: grid; place-items: center; width: 100%; height: 100%; margin: 0; padding: 0; border: 0; background: transparent; color: inherit; font: inherit; cursor: pointer; }
        .vsl__play:focus-visible { outline: none; }
        .vsl__play:focus-visible .vsl__chip { outline: 2px solid var(--fable-accent); outline-offset: .3rem; }
        .vsl__play .vsl__chip { width: auto; gap: .75rem; padding: 0 1.4rem 0 .4rem; box-shadow: 0 1rem 3rem color-mix(in srgb, var(--fable-void) 70%, transparent); pointer-events: none; }
        .vsl__play:hover .vsl__chip { transform: translateY(-.18rem); background: var(--fable-accent); }
        .vsl__chip-icon { display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: var(--fable-void); color: var(--fable-paper); }
        .vsl__chip-icon svg { margin-left: .1rem; }
        .vsl__chip-time { color: color-mix(in srgb, var(--fable-void) 62%, transparent); font-family: "Cascadia Code", "JetBrains Mono", ui-monospace, monospace; font-size: var(--fable-label); font-weight: 600; letter-spacing: .08em; }

        .vsl__caption { display: flex; justify-content: space-between; align-items: baseline; gap: .5rem 1rem; margin: 0; padding: .85rem 1.1rem; border-top: 1px solid color-mix(in srgb, var(--fable-paper) 10%, transparent); }
        .vsl__caption-title { min-width: 0; color: var(--fable-paper); font-size: .9375rem; font-weight: 450; line-height: 1.35; }
        .vsl__caption-meta { flex: 0 0 auto; color: var(--fable-muted); font-family: "Cascadia Code", "JetBrains Mono", ui-monospace, monospace; font-size: var(--fable-label); letter-spacing: .08em; text-transform: uppercase; }
        .vsl__sr { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }

        @media (max-width: 56rem) {
          .vsl__top { grid-template-columns: 1fr; gap: 1rem; }
          .vsl__player { width: 100%; }
        }
        @media (max-width: 42rem) {
          .vsl__heading { max-width: 11ch; font-size: clamp(2.2rem, 11vw, 3.1rem); }
          .vsl__player { --vsl-radius: .75rem; }
          .vsl__caption { padding: .75rem .9rem; }
          .vsl__caption-title { font-size: .875rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vsl__chip { transition: none; }
          .vsl__play:hover .vsl__chip { transform: none; }
        }
      `}</style>

      <div className="vsl__top">
        <LineReveal
          as="h2"
          section={id}
          className="fable-heading vsl__heading"
          lines={['Veja a Automação', <>em <span className="fable-accent">3 minutos.</span></>]}
        />
        <LineReveal
          as="p"
          section={id}
          className="fable-copy vsl__lede"
          lines={[
            'Do orçamento em PDF ao pacote pronto para protocolo: cadastro com IA, dimensionamento, documentos editáveis e os formulários da distribuidora.',
            'Com as telas reais do painel.',
          ]}
        />
      </div>

      <figure ref={figureRef} className="vsl__player" data-scroll-anchor>
        <div className="vsl__stage" onTouchMove={protegerToque}>
          <video
            ref={videoRef}
            className="vsl__video"
            controls={iniciado}
            playsInline
            preload="none"
            width={1920}
            height={1080}
            poster="/vsl-poster.jpg"
            onKeyDown={protegerTecla}
          >
            <source src="/vsl.mp4" type="video/mp4" />
          </video>
          {!iniciado && (
            <button type="button" className="vsl__play" onClick={iniciar} onKeyDown={protegerTecla}>
              <span className="fable-button vsl__chip" aria-hidden="true">
                <span className="vsl__chip-icon"><Play size={14} strokeWidth={2} /></span>
                Assistir
                <span className="vsl__chip-time">{DURACAO}</span>
              </span>
              <span className="vsl__sr">Assistir à apresentação do Homologa Plus, {DURACAO_POR_EXTENSO}, com som</span>
            </button>
          )}
        </div>
        <figcaption className="vsl__caption">
          <span className="vsl__caption-title">Apresentação do Homologa Plus</span>
          <span className="vsl__caption-meta">{DURACAO} · com som</span>
        </figcaption>
      </figure>
    </div>
  );
}
