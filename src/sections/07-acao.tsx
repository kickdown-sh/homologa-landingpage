import React from 'react';
import { Link } from 'react-router-dom';
import { LineReveal } from '../contrato/reveal';
import type { SectionProps } from '../contrato/types';
import { buildWhatsAppLink } from '../utils/whatsapp';

const demoLink = buildWhatsAppLink('Olá! Quero agendar uma demonstração do Homologa Plus.');
const currentYear = new Date().getFullYear();

const guideLinks = [
  { to: '/homologacao-energia-solar', label: 'Homologação solar' },
  { to: '/documentos-homologacao-fotovoltaica', label: 'Documentos para homologação' },
  { to: '/como-homologar-energia-solar', label: 'Como homologar' },
];

export default function Acao({ id }: SectionProps) {
  return (
    <div
      className="fable-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 'clamp(2.5rem, 8vh, 6rem)',
        minHeight: 'calc(100vh - 11rem)',
        paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
      }}
    >
      <div
        className="fable-panel acao__panel"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.45fr) minmax(15rem, 0.55fr)',
          gap: 'clamp(2rem, 6vw, 7rem)',
          alignItems: 'end',
          padding: 'clamp(1.5rem, 5vw, 4.5rem)',
          background: 'var(--fable-accent)',
          color: 'var(--fable-void)',
          borderColor: 'var(--fable-accent)',
          boxShadow: '0 2.5rem 8rem color-mix(in srgb, var(--fable-accent) 22%, transparent)',
        }}
      >
        <div style={{ minWidth: 0 }}>
          <LineReveal
            as="h2"
            className="fable-heading acao__ink"
            section={id}
            lines={[
              <>Agende uma</>,
              <>demonstração.</>,
            ]}
          />
          <LineReveal
            as="p"
            className="fable-copy acao__ink"
            section={id}
            lines={[
              <>Nossa equipe mostra a Automação no fluxo real: do cadastro do projeto ao pacote pronto para protocolo.</>,
              <>Demonstração sem compromisso. Depois, a equipe libera o seu acesso.</>,
            ]}
          />
          <div className="fable-actions" style={{ marginTop: 'clamp(1.75rem, 4vh, 3rem)' }}>
            <a
              className="fable-button acao__primary"
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.fbq?.('track', 'Contact')}
            >
              Agendar demonstração
            </a>
            <a
              className="fable-button acao__secondary"
              href="https://app.homologaplus.com.br/login"
              target="_blank"
              rel="noopener noreferrer"
            >
              Acessar plataforma
            </a>
          </div>
        </div>

        <aside
          aria-label="Como começar"
          style={{
            display: 'grid',
            gap: '1rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid color-mix(in srgb, var(--fable-void) 24%, transparent)',
          }}
        >
          <p className="acao__eyebrow">Como começar</p>
          <p className="acao__note"><span>01</span> Escolha um horário</p>
          <p className="acao__note"><span>02</span> Veja a automação no seu fluxo</p>
          <p className="acao__note"><span>03</span> Receba o acesso com a equipe</p>
        </aside>
      </div>

      <footer
        data-scroll-anchor
        aria-label="Informações institucionais"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) repeat(3, minmax(0, 1fr))',
          gap: 'clamp(1.5rem, 3vw, 4rem)',
          paddingTop: '1.25rem',
          borderTop: '1px solid color-mix(in srgb, var(--fable-paper) 15%, transparent)',
        }}
      >
        <div>
          <p className="fable-label" style={{ marginBottom: '0.75rem' }}>Homologa Plus</p>
          <p className="fable-copy" style={{ fontSize: 'var(--fable-label)' }}>
            Automação documental e gestão para homologação solar.
          </p>
        </div>

        <div>
          <p className="acao__footer-title">Contato</p>
          <a className="acao__footer-link" href="mailto:contato@homologaplus.com.br">contato@homologaplus.com.br</a>
          <p className="acao__footer-copy">Bauru, SP</p>
        </div>

        <nav aria-label="Guias essenciais">
          <p className="acao__footer-title">Guias essenciais</p>
          {guideLinks.map((guide) => <Link className="acao__footer-link" key={guide.to} to={guide.to}>{guide.label}</Link>)}
        </nav>

        <nav aria-label="Informações legais">
          <p className="acao__footer-title">Institucional</p>
          <a className="acao__footer-link" href="https://app.homologaplus.com.br/login" target="_blank" rel="noopener noreferrer">Acessar plataforma</a>
          <Link className="acao__footer-link" to="/termos">Termos de uso</Link>
          <Link className="acao__footer-link" to="/privacidade">Privacidade</Link>
          <button
            className="acao__footer-link acao__cookie-button"
            type="button"
            onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))}
          >
            Preferências de cookies
          </button>
        </nav>

        <p className="acao__copyright">© {currentYear} Homologa Plus. Todos os direitos reservados.</p>
      </footer>

      <style>{`
        .acao__ink { color: var(--fable-void); }
        .acao__ink.fable-copy { color: color-mix(in srgb, var(--fable-void) 70%, transparent); }
        .acao__ink.fable-label { color: color-mix(in srgb, var(--fable-void) 64%, transparent); }
        .acao__primary { background: var(--fable-void); color: var(--fable-paper); }
        .acao__primary:hover { background: color-mix(in srgb, var(--fable-void) 88%, var(--fable-paper)); }
        .acao__secondary { border-color: color-mix(in srgb, var(--fable-void) 30%, transparent); color: var(--fable-void); background: color-mix(in srgb, var(--fable-paper) 42%, transparent); }
        .acao__secondary:hover { background: color-mix(in srgb, var(--fable-paper) 64%, transparent); }
        .acao__eyebrow, .acao__footer-title { margin: 0; color: var(--fable-paper); font-family: "JetBrains Mono", ui-monospace, monospace, "JetBrains Mono", ui-monospace, monospace; font-size: var(--fable-label); font-weight: 620; letter-spacing: 0.13em; line-height: 1.3; text-transform: uppercase; }
        .acao__eyebrow { color: color-mix(in srgb, var(--fable-void) 66%, transparent); }
        .acao__note { display: grid; grid-template-columns: 2rem minmax(0, 1fr); gap: 0.5rem; margin: 0; color: var(--fable-void); font-size: var(--fable-body); font-weight: 560; line-height: 1.35; }
        .acao__note span { font-family: "JetBrains Mono", ui-monospace, monospace, "JetBrains Mono", ui-monospace, monospace; font-size: var(--fable-label); font-variant-numeric: tabular-nums; }
        .acao__footer-title { margin-bottom: 0.75rem; }
        .acao__footer-link, .acao__footer-copy { display: block; width: fit-content; margin: 0 0 0.4rem; color: var(--fable-muted); font-size: var(--fable-label); line-height: 1.45; text-decoration: none; }
        .acao__footer-link:hover { color: var(--fable-accent); text-decoration: underline; text-underline-offset: 0.25em; }
        .acao__footer-link:focus-visible, .acao__primary:focus-visible, .acao__secondary:focus-visible { outline: 2px solid var(--fable-accent); outline-offset: 0.25rem; }
        .acao__cookie-button { border: 0; padding: 0; background: transparent; font: inherit; text-align: left; cursor: pointer; }
        .acao__copyright { grid-column: 1 / -1; margin: 0; color: var(--fable-muted); font-size: var(--fable-label); line-height: 1.4; }
        @media (max-width: 56rem) {
          .acao__panel { grid-template-columns: minmax(0, 1fr) !important; width: 100%; min-width: 0; }
          .acao__panel > * { min-width: 0; }
          .acao__panel .fable-heading { max-width: 100%; overflow-wrap: normal; word-break: normal; hyphens: none; }
          .acao__panel .fable-actions { flex-direction: column; align-items: stretch; }
          .acao__panel .fable-button { width: 100%; min-width: 0; }
          footer[aria-label="Informações institucionais"] { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 32rem) {
          footer[aria-label="Informações institucionais"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
