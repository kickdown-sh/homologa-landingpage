import type { CSSProperties } from 'react';
import type { SectionProps } from '../contrato/types';
import { LineReveal } from '../contrato/reveal';

export default function Virada({ id }: SectionProps) {
  const ruleStyle: CSSProperties = {
    borderColor: 'color-mix(in srgb, var(--fable-void) 32%, transparent)',
  };

  return (
    <div className="fable-container" style={{ display: 'grid', gap: 'clamp(2rem, 4vh, 4rem)' }}>
      <LineReveal
        as="h2"
        section={id}
        className="fable-display"
        lines={[
          'Organizar o processo',
          'não evita a reprovação.',
        ]}
      />

      <div className="fable-grid-2" style={{ alignItems: 'end' }}>
        <div style={{ display: 'grid', gap: '1.25rem', maxWidth: '38rem' }}>
          <LineReveal
            as="p"
            section={id}
            className="fable-copy"
            lines={[
              'Planilha e painel de gestão mostram onde cada projeto está. Não impedem que ele volte da distribuidora.',
              'O retrabalho nasce antes do envio: um cálculo fora da norma, um anexo no modelo errado, um campo esquecido.',
              'O Homologa Plus atua nesse ponto. Dimensiona, gera o pacote e confere a conformidade antes do protocolo.',
            ]}
          />
          <p className="fable-copy">
            E a gestão vem junto: projetos, prazos, financeiro, território e integradoras no mesmo painel.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gap: '1.25rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid',
            ...ruleStyle,
          }}
        >
          <div style={{ display: 'grid', gap: '0.35rem' }}>
            <span className="fable-label" style={{ margin: 0 }}>Gestão de processo</span>
            <p className="fable-title" style={{ maxWidth: '13ch' }}>Acompanhar o processo inteiro.</p>
          </div>
          <div
            style={{
              display: 'grid',
              gap: '0.35rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid',
              ...ruleStyle,
            }}
          >
            <span className="fable-label" style={{ margin: 0 }}>Motor de engenharia</span>
            <p className="fable-title" style={{ maxWidth: '15ch' }}>Eliminar a origem do retrabalho.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
