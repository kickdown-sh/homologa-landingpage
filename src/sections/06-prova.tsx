import React from 'react';
import { LineReveal } from '../contrato/reveal';
import type { SectionProps } from '../contrato/types';
import { buildWhatsAppLink } from '../utils/whatsapp';

type Plan = {
  name: 'Starter' | 'Full';
  price: string;
  description: string;
  volume: string;
  volumeDetail: string;
  features: string[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: 'Starter',
    price: '397',
    description: 'Para quem homologa alguns projetos por mês e quer parar de montar documento à mão.',
    volume: '7 projetos',
    volumeDetail: 'automatizados por mês',
    features: ['3 usuários técnicos', 'Até 50 integradoras'],
  },
  {
    name: 'Full',
    price: '597',
    description: 'Para operação com volume constante, sem teto de automação.',
    volume: 'Ilimitados',
    volumeDetail: 'projetos automatizados por mês',
    features: ['10 usuários técnicos', 'Integradoras ilimitadas', 'Suporte dedicado'],
    featured: true,
  },
];

const trackPlan = (plan: Plan) => {
  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', { content_name: plan.name });
    window.fbq('track', 'Contact');
  }
};

export default function Prova({ id }: SectionProps) {
  return (
    <section className="proof" aria-label="Planos Homologa Plus">
      <style>{`
        .proof { width: min(100%, 90rem); margin-inline: auto; }
        .proof__intro { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(17rem, .68fr); gap: clamp(1.5rem, 5vw, 6rem); align-items: end; margin-bottom: clamp(2rem, 4vw, 3.5rem); }
        .proof__heading { max-width: 10ch; font-size: clamp(3rem, 5.8vw, 6.2rem); line-height: .92; }
        .proof__lede { padding-bottom: .3rem; }

        /* Planos lado a lado; subgrid alinha preço, volume, lista e botão na mesma
           altura nos dois cards, mesmo com descrições de tamanhos diferentes. */
        .proof__plans { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(1rem, 2vw, 1.5rem); }
        .proof__plan { display: grid; grid-template-rows: subgrid; grid-row: span 5; row-gap: 1.5rem; border: 1px solid color-mix(in srgb, var(--fable-paper) 15%, transparent); padding: clamp(1.5rem, 3vw, 2.5rem); background: color-mix(in srgb, var(--fable-paper) 4%, var(--fable-void)); }
        .proof__plan--full { border-color: var(--fable-accent); background: var(--fable-accent); color: var(--fable-void); }
        .proof__plan-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; }
        .proof__plan-name { margin: 0; color: var(--fable-paper); font-size: clamp(2rem, 3vw, 2.75rem); font-weight: 450; letter-spacing: -.05em; line-height: .95; }
        .proof__plan--full .proof__plan-name { color: var(--fable-void); }
        .proof__plan-tag { flex: 0 0 auto; display: inline-flex; align-items: center; min-height: 1.75rem; padding: 0 .65rem; color: var(--fable-paper); background: var(--fable-void); font-family: "Cascadia Code", "JetBrains Mono Variable", "JetBrains Mono", ui-monospace, monospace; font-size: .75rem; font-weight: 650; letter-spacing: .08em; text-transform: uppercase; }
        .proof__plan-description { margin: .75rem 0 0; max-width: 34ch; color: var(--fable-muted); font-size: var(--fable-body); line-height: 1.45; }
        .proof__plan--full .proof__plan-description { color: color-mix(in srgb, var(--fable-void) 78%, transparent); }

        .proof__price { display: flex; align-items: baseline; gap: .3rem; color: var(--fable-paper); font-variant-numeric: tabular-nums; white-space: nowrap; }
        .proof__plan--full .proof__price { color: var(--fable-void); }
        .proof__currency { align-self: flex-start; margin-top: .45rem; font-size: 1rem; font-weight: 600; }
        .proof__price strong { font-size: clamp(3rem, 4.6vw, 4.5rem); font-weight: 360; letter-spacing: -.06em; line-height: .85; }
        .proof__period { color: var(--fable-muted); font-size: .9375rem; font-weight: 500; }
        .proof__plan--full .proof__period { color: color-mix(in srgb, var(--fable-void) 72%, transparent); }

        /* O que muda entre os planos, em destaque e na mesma altura nos dois cards. */
        .proof__volume { display: grid; gap: .2rem; margin: 0; padding: 1rem 0; border-block: 1px solid color-mix(in srgb, var(--fable-paper) 14%, transparent); }
        .proof__plan--full .proof__volume { border-color: color-mix(in srgb, var(--fable-void) 22%, transparent); }
        .proof__volume strong { color: var(--fable-paper); font-size: clamp(1.35rem, 2vw, 1.65rem); font-weight: 560; letter-spacing: -.03em; line-height: 1.1; }
        .proof__volume span { color: var(--fable-muted); font-size: var(--fable-body); line-height: 1.35; }
        .proof__plan--full .proof__volume strong { color: var(--fable-void); }
        .proof__plan--full .proof__volume span { color: color-mix(in srgb, var(--fable-void) 72%, transparent); }

        .proof__features { display: grid; gap: .6rem; margin: 0; padding: 0; list-style: none; }
        .proof__features li { display: grid; grid-template-columns: .3125rem minmax(0, 1fr); gap: .7rem; color: var(--fable-paper); font-size: var(--fable-body); line-height: 1.4; }
        .proof__features li::before { content: ""; width: .3125rem; height: .3125rem; margin-top: calc(.7em - .15625rem); border-radius: 50%; background: currentColor; opacity: .55; }
        .proof__plan--full .proof__features li { color: var(--fable-void); }

        .proof__cta { display: grid; gap: .75rem; align-self: end; }
        .proof__action { display: inline-flex; align-items: center; justify-content: center; width: 100%; min-height: 3.25rem; border: 1px solid color-mix(in srgb, var(--fable-paper) 28%, transparent); border-radius: 999px; padding: .8rem 1.25rem; color: var(--fable-paper); background: transparent; font: 640 .9375rem/1.15 "Segoe UI Variable", "Inter Variable", "Inter", ui-sans-serif, system-ui, sans-serif; text-align: center; text-decoration: none; transition: transform 260ms var(--fable-ease), background 260ms var(--fable-ease), color 260ms var(--fable-ease); }
        .proof__action:hover { color: var(--fable-void); background: var(--fable-paper); transform: translateY(-.12rem); }
        .proof__action:focus-visible { outline: 2px solid var(--fable-accent); outline-offset: 3px; }
        .proof__plan--full .proof__action { border-color: var(--fable-void); color: var(--fable-paper); background: var(--fable-void); }
        .proof__plan--full .proof__action:hover { background: color-mix(in srgb, var(--fable-void) 86%, var(--fable-paper)); }
        .proof__plan--full .proof__action:focus-visible { outline-color: var(--fable-void); }
        .proof__assurance { margin: 0; color: var(--fable-muted); font-size: .875rem; line-height: 1.4; text-align: center; }
        .proof__plan--full .proof__assurance { color: color-mix(in srgb, var(--fable-void) 72%, transparent); }

        .proof__faq { margin-top: clamp(2.5rem, 5vw, 4.5rem); padding-top: 1.25rem; border-top: 1px solid color-mix(in srgb, var(--fable-paper) 14%, transparent); }
        .proof__faq-heading { margin: 0 0 1rem; color: var(--fable-paper); font-size: clamp(1.25rem, 1.8vw, 1.5rem); font-weight: 520; letter-spacing: -.02em; line-height: 1.2; }
        .proof__faq-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 2rem; }
        .proof__faq-item { border-bottom: 1px solid color-mix(in srgb, var(--fable-paper) 12%, transparent); }
        .proof__faq-item summary { display: flex; align-items: center; justify-content: space-between; gap: 1rem; min-height: 3.5rem; padding: .85rem 0; color: var(--fable-paper); cursor: pointer; font-size: var(--fable-body); font-weight: 600; line-height: 1.35; list-style: none; }
        .proof__faq-item summary::-webkit-details-marker { display: none; }
        .proof__faq-item summary::after { content: ""; flex: 0 0 auto; width: .75rem; height: .75rem; background: linear-gradient(var(--fable-accent), var(--fable-accent)) center / 100% 1.5px no-repeat, linear-gradient(var(--fable-accent), var(--fable-accent)) center / 1.5px 100% no-repeat; transition: transform 240ms var(--fable-ease); }
        .proof__faq-item[open] summary::after { transform: rotate(45deg); }
        .proof__faq-item summary:focus-visible { outline: 2px solid var(--fable-accent); outline-offset: .25rem; }
        .proof__faq-item p { max-width: 40rem; margin: 0 0 1.1rem; color: var(--fable-muted); font-size: var(--fable-body); line-height: 1.55; }

        @media (max-width: 48rem) {
          .proof__intro { grid-template-columns: minmax(0, 1fr); gap: 1rem; }
          .proof__heading { max-width: 11ch; font-size: clamp(2.6rem, 12vw, 3.8rem); line-height: .94; }
          .proof__plans, .proof__faq-grid { grid-template-columns: minmax(0, 1fr); }
        }
      `}</style>

      <div className="proof__intro">
        <div>
          <LineReveal
            as="h2"
            className="fable-heading proof__heading"
            section={id}
            lines={['Planos pelo', 'volume de projetos.']}
          />
        </div>
        <LineReveal
          as="p"
          className="fable-copy proof__lede"
          section={id}
          lines={[
            'Os dois planos têm a plataforma completa e a Automação.',
            'O que muda é quantos projetos você automatiza por mês.',
          ]}
        />
      </div>

      <div className="proof__plans" data-scroll-anchor aria-label="Planos Homologa Plus">
        {plans.map((plan) => (
          <article className={`proof__plan ${plan.featured ? 'proof__plan--full' : ''}`} key={plan.name} aria-label={`Plano ${plan.name}`}>
            <div>
              <div className="proof__plan-head">
                <h3 className="proof__plan-name">{plan.name}</h3>
                {plan.featured && <span className="proof__plan-tag">Mais escolhido</span>}
              </div>
              <p className="proof__plan-description">{plan.description}</p>
            </div>
            <div className="proof__price" aria-label={`R$ ${plan.price} por mês`}>
              <span className="proof__currency">R$</span><strong>{plan.price}</strong><span className="proof__period">/mês</span>
            </div>
            <p className="proof__volume"><strong>{plan.volume}</strong><span>{plan.volumeDetail}</span></p>
            <ul className="proof__features">
              {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
            <div className="proof__cta">
              <a
                className="proof__action"
                href={buildWhatsAppLink(`Olá! Quero contratar o plano Homologa Plus ${plan.name}.`)}
                onClick={() => trackPlan(plan)}
              >
                Falar sobre o plano {plan.name}
              </a>
              <p className="proof__assurance">Sem fidelidade. Cancele pelo próprio sistema. Pagamento via Stripe.</p>
            </div>
          </article>
        ))}
      </div>

      <div className="proof__faq" data-scroll-anchor aria-labelledby="proof-faq-title">
        <p className="proof__faq-heading" id="proof-faq-title">Dúvidas rápidas antes de começar</p>
        <div className="proof__faq-grid">
          <details className="proof__faq-item">
            <summary>Funciona com a minha distribuidora?</summary>
            <p>Sim. Documentos, etapas e prazos seguem o padrão de cada distribuidora. Os anexos específicos da CPFL, da Energisa e da Equatorial, por exemplo, já saem preenchidos.</p>
          </details>
          <details className="proof__faq-item">
            <summary>Os arquivos ficam editáveis?</summary>
            <p>Sim. A Automação entrega PDF e, quando aplicável, SVG e DXF para revisão e assinatura do responsável técnico.</p>
          </details>
          <details className="proof__faq-item">
            <summary>A Automação está nos dois planos?</summary>
            <p>Sim. O Starter automatiza 7 projetos por mês; o Full não tem teto. Ambos incluem a plataforma completa.</p>
          </details>
          <details className="proof__faq-item">
            <summary>Como funciona a demonstração?</summary>
            <p>Você agenda pelo WhatsApp e nossa equipe mostra o fluxo real, do cadastro do projeto à documentação validada, sem compromisso.</p>
          </details>
          <details className="proof__faq-item">
            <summary>Posso cancelar quando quiser?</summary>
            <p>Sim. Não há fidelidade e o cancelamento pode ser feito diretamente pelo sistema.</p>
          </details>
        </div>
      </div>
    </section>
  );
}
