import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FablePreloader } from '../contrato/preloader';
import { FableRegistry, SECTION_REGISTRY } from '../contrato/registry';
import { useVirtualScroll } from '../contrato/scroll';
import { buildWhatsAppLink } from '../utils/whatsapp';
import '../contrato/tokens.css';

const DEMO_LINK = buildWhatsAppLink('Olá! Quero agendar uma demonstração do Homologa Plus.');
const FableScene = lazy(() => import('../contrato/scene').then((module) => ({ default: module.FableScene })));

export default function LandingPage() {
  const { rootRef } = useVirtualScroll(SECTION_REGISTRY.length);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(media.matches);
    media.addEventListener?.('change', onChange);
    return () => media.removeEventListener?.('change', onChange);
  }, []);

  const goTo = (index: number) => window.__fable?.scrollTo(index);

  return (
    <div className="fable-page">
      <Helmet>
        <title>Automação de Documentos para Homologação Fotovoltaica | Homologa Plus</title>
        <meta name="description" content="Automação de documentos para homologação de usinas fotovoltaicas: diagrama unifilar, memorial, planta e os formulários da sua distribuidora prontos e conferidos antes do protocolo." />
        <link rel="canonical" href="https://homologaplus.com.br/" />
        <meta property="og:url" content="https://homologaplus.com.br/" />
      </Helmet>

      <FablePreloader />
      <header className="fable-nav">
        <button className="fable-brand" type="button" onClick={() => goTo(0)} aria-label="Voltar ao início">
          <img src="/logo-h-white.png" width="32" height="32" alt="" />
          <span>Homologa <span>Plus</span></span>
        </button>
        <nav className="fable-nav-links" aria-label="Navegação principal">
          <button className="fable-nav-button" type="button" onClick={() => goTo(2)}>Automação</button>
          <button className="fable-nav-button" type="button" onClick={() => goTo(3)}>Como funciona</button>
          <button className="fable-nav-button" type="button" onClick={() => goTo(5)}>Planos</button>
          <a
            className="fable-nav-button fable-nav-button--cta"
            href={DEMO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => window.fbq?.('track', 'Contact')}
          >
            Agendar demonstração
          </a>
        </nav>
      </header>

      <div className="fable-viewport">
        <div className="fable-grid-overlay" aria-hidden="true" />
        <div ref={rootRef} data-scroll-root className="fable-scroll-root">
          <FableRegistry />
        </div>
      </div>
      {!reducedMotion && (
        <Suspense fallback={<div className="fable-scene-fallback" aria-hidden="true"><img src="/logo-h-white.png" alt="" /></div>}>
          <FableScene />
        </Suspense>
      )}
      <div className="fable-noise" aria-hidden="true" />
      <div className="fable-scrollbar" aria-hidden="true"><span /></div>
    </div>
  );
}
