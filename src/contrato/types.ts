import type { ComponentType } from 'react';

export type SectionId = '01' | '02' | '03' | '04' | '05' | '06' | '07';

export type SectionProps = {
  id: SectionId;
  index: number;
  label: string;
};

export type SectionDefinition = {
  id: SectionId;
  label: string;
  duration: number;
  overlap: number;
  component: ComponentType<SectionProps>;
  inverted?: boolean;
};

export type ScrollFrame = {
  y: number;
  target: number;
  max: number;
  progress: number;
};

declare global {
  interface Window {
    __fable?: {
      scrollTo: (index: number) => void;
      total: number;
    };
  }
}
