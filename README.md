# Arca Studios

Monorepo Angular 19+ com SSR, hidratação e design system para o site institucional da Arca Studios.

## Stack e ferramentas

- Angular 19 (standalone, SSR com `@angular/ssr`)
- Angular Material + theming customizado
- Tailwind CSS e Sass globais
- i18n pt-PT, SEO avançado e acessibilidade
- Jest para unit tests e Playwright para E2E
- ESLint (flat config) + Prettier + Husky + lint-staged

## Scripts principais

```bash
npm install              # instala dependências
npm run dev:ssr          # serve SSR em modo desenvolvimento
npm run build:ssr        # build SSR (browser + server)
npm run serve:ssr        # executa bundle SSR gerado
npm run lint             # ESLint
npm run test             # Jest
npm run e2e              # Playwright
npm run format           # Prettier write
```

## Estrutura em destaque

- `src/app/core`: layout, serviços (SEO, Analytics), interceptors, theming e utilitários
- `src/app/shared`: componentes reutilizáveis, diretivas e pipes
- `src/app/features`: páginas (home, about, services, cases, case-detail, contact, errors)
- `src/assets/mock`: dados estruturados para serviços, cases, métricas e contactos
- `styles/`: Tailwind e estilos globais

## Fluxo de desenvolvimento

1. Instale as dependências (`npm install`)
2. Execute `npm run dev:ssr` e aceda a `http://localhost:4200`
3. Antes de commitar, Husky executa lint/format via lint-staged
4. Use `npm run test` e `npm run e2e` para validar regressões

> Requer Node.js >= 18.19 (ver `package.json` engines). Para produção, configure `environment.apiBaseUrl` e substitua os mocks por integrações com CMS/headless API.
