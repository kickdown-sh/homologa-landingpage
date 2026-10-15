import React from 'react';
import type { SectionProps } from '../contrato/types';
import { LineReveal } from '../contrato/reveal';
import { buildWhatsAppLink } from '../utils/whatsapp';
import EsteiraConcessionarias from './esteira-concessionarias';
import JanelaDemo from './janela-demo/JanelaDemo';

const demoLink = buildWhatsAppLink('Olá! Quero agendar uma demonstração do Homologa Plus.');

export default function Demonstracao({ id }: SectionProps) {
  return (
    <div
      className="fable-container demonstracao__layout"
      style={{
        display: 'grid',
        alignItems: 'center',
        gap: 'clamp(2rem, 5vw, 6.5rem)',
      }}
    >
      <style>{`
        .demonstracao__layout { grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); }
        @media (max-width: 75rem) { .demonstracao__layout { grid-template-columns: minmax(0, 1fr); } }
      `}</style>
      <div className="fable-display-fit" style={{ position: 'relative', zIndex: 14, minWidth: 0, paddingBlock: 'clamp(1rem, 4vh, 4rem)' }}>
        <LineReveal
          as="h1"
          section={id}
          className="fable-display"
          lines={[
            <>Automação de</>,
            <>documentos para</>,
            <>homologação</>,
            <span className="fable-accent">fotovoltaica.</span>,
          ]}
        />
        <LineReveal
          as="p"
          section={id}
          className="fable-copy"
          lines={[
            <>Cadastre a usina uma vez: diagrama unifilar, memorial descritivo, planta de localização e os formulários da sua distribuidora saem prontos.</>,
            <>Antes do protocolo, o sistema confere a conformidade e aponta o que impediria a aprovação, com a norma citada.</>,
          ]}
        />
        <div className="fable-actions" style={{ marginTop: 'clamp(1.75rem, 4vh, 3rem)' }}>
          <a
            className="fable-button"
            href={demoLink}
            onClick={() => window.fbq?.('track', 'Contact')}
          >
            Agendar demonstração
          </a>
          <button
            className="fable-button fable-button--ghost"
            type="button"
            onClick={() => window.__fable?.scrollTo(2)}
          >
            Ver os documentos gerados
          </button>
        </div>
      </div>

      <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2.5vh, 1.75rem)' }}>
      <JanelaDemo />
      {/* Logo abaixo da demonstração, ainda na primeira tela: mostra para
          quais distribuidoras o pacote é gerado. */}
      <EsteiraConcessionarias />
      </div>
    </div>
  );
}
