import { useEffect, useState } from 'react';

export type MockTelemetry = {
  projectId: string;
  progress: number;
  documents: number;
  checks: number;
  activeStep: number;
};

const frames: MockTelemetry[] = [
  { projectId: 'HP-0427', progress: 18, documents: 2, checks: 11, activeStep: 0 },
  { projectId: 'HP-0427', progress: 41, documents: 5, checks: 28, activeStep: 1 },
  { projectId: 'HP-0427', progress: 68, documents: 7, checks: 44, activeStep: 2 },
  { projectId: 'HP-0427', progress: 92, documents: 9, checks: 61, activeStep: 3 },
  { projectId: 'HP-0427', progress: 100, documents: 9, checks: 68, activeStep: 4 },
];

/** Dados simulados para dar vida à demonstração visual. Não representam telemetria real de cliente. */
export function useMockTelemetry(): MockTelemetry {
  const [frame, setFrame] = useState(0);

  // Só anima com a seção 03 (documentos) na tela: fora dela o intervalo re-renderizava a
  // seção inteira a cada 400ms durante toda a visita.
  useEffect(() => {
    const section = document.querySelector<HTMLElement>('[data-section="03"]');
    let timer = 0;
    const start = () => {
      if (!timer) timer = window.setInterval(() => setFrame((value) => (value + 1) % frames.length), 400);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };
    if (!section || typeof IntersectionObserver === 'undefined') {
      start();
      return stop;
    }
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(section);
    return () => {
      io.disconnect();
      stop();
    };
  }, []);

  return frames[frame];
}

export const generatedDocuments = [
  'Memorial descritivo',
  'Diagrama unifilar',
  'Diagrama de blocos',
  'Planta de localização',
  'Formulários da distribuidora',
] as const;
