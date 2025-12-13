export interface MetricHighlight {
  id: string;
  label: string;
  value: string;
  description: string;
}

export interface MetricsSummary {
  highlights: MetricHighlight[];
  impact: MetricHighlight[];
}

