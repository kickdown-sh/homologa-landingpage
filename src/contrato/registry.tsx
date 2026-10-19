import React, { type CSSProperties } from 'react';
import type { SectionDefinition } from './types';
import Demonstracao from '../sections/01-demonstracao';
import Vsl from '../sections/02-vsl';
import PecaDensa from '../sections/03-peca-densa';
import Mecanismo from '../sections/04-mecanismo';
import Virada from '../sections/05-virada';
import Prova from '../sections/06-prova';
import Acao from '../sections/07-acao';

// A ordem aqui define o número da seção (data-section) e os índices de
// window.__fable.scrollTo usados na navegação e nos botões.
export const SECTION_REGISTRY: SectionDefinition[] = [
  { id: '01', label: 'Início', duration: 1.1, overlap: 0, component: Demonstracao },
  { id: '02', label: 'Apresentação', duration: 1.1, overlap: 0.08, component: Vsl },
  { id: '03', label: 'Documentos gerados', duration: 1.35, overlap: 0.12, component: PecaDensa },
  { id: '04', label: 'Como funciona', duration: 1.25, overlap: 0.1, component: Mecanismo },
  { id: '05', label: 'Diferencial', duration: 1.15, overlap: 0.08, component: Virada, inverted: true },
  { id: '06', label: 'Planos', duration: 1.5, overlap: 0.1, component: Prova },
  { id: '07', label: 'Demonstração', duration: 1.2, overlap: 0.08, component: Acao },
];

export function FableRegistry() {
  return (
    <main>
      {SECTION_REGISTRY.map((section, index) => {
        const Component = section.component;
        return (
          <section
            key={section.id}
            data-section={section.id}
            aria-label={section.label}
            className={`fable-section-shell ${section.inverted ? 'fable-invert' : ''}`}
            style={{
              '--section-duration': section.duration,
              '--section-overlap': section.overlap,
            } as CSSProperties}
          >
            <Component id={section.id} index={index} label={section.label} />
          </section>
        );
      })}
    </main>
  );
}
