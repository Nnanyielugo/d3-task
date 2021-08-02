import type { RefObject } from 'react';

export interface ChartData {
  date: Date;
  value: number;
}

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export type Ref = RefObject<HTMLDivElement>;
