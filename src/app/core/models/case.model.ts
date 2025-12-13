export interface CaseMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  summary: string;
  cover: string;
  tags: string[];
  categories: string[];
  challenge: string;
  strategy: string[];
  results: string[];
  metrics: CaseMetric[];
  gallery: string[];
}

