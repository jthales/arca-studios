# Estrutura de Traduções

Esta pasta contém todos os arquivos de tradução do projeto, organizados por idioma e por componente/página.

## Estrutura de Pastas

```
translations/
├── pt/          # Português
│   ├── header.json
│   ├── home.json
│   ├── about.json
│   ├── portfolio.json
│   └── contact.json
├── en/          # Inglês
│   ├── header.json
│   ├── home.json
│   ├── about.json
│   ├── portfolio.json
│   └── contact.json
└── es/          # Espanhol
    ├── header.json
    ├── home.json
    ├── about.json
    ├── portfolio.json
    └── contact.json
```

## Como Adicionar ou Modificar Traduções

### 1. Adicionar uma nova tradução

Para adicionar uma nova tradução em um componente existente:

1. Abra o arquivo JSON correspondente ao componente e idioma (ex: `pt/header.json`)
2. Adicione a nova chave e valor:

```json
{
  "home": "Home",
  "about": "Sobre Nós",
  "novaChave": "Novo texto em português"
}
```

3. Adicione a mesma chave nos outros idiomas (en/header.json, es/header.json)

### 2. Criar traduções para um novo componente

1. Crie um novo arquivo JSON em cada pasta de idioma (pt, en, es)
2. Exemplo: se for criar um componente `services`, crie:
   - `pt/services.json`
   - `en/services.json`
   - `es/services.json`

3. No componente TypeScript, use:

```typescript
import { LanguageService } from '../../services/language.service';

export class MeuComponente {
  languageService = inject(LanguageService);
  translations = this.languageService.getTranslationsSignal('services');
}
```

4. No template HTML:

```html
<h1>{{ translations().title }}</h1>
```

### 3. Estrutura dos Arquivos JSON

Cada arquivo JSON deve seguir esta estrutura:

```json
{
  "chave1": "Valor em português",
  "chave2": "Outro valor",
  "chave3": "Mais um valor"
}
```

**Importante:** Mantenha as mesmas chaves em todos os idiomas para garantir consistência.

## Exemplo Completo

### header.json (pt)
```json
{
  "home": "Home",
  "about": "Sobre Nós",
  "portfolio": "Portfólio",
  "contact": "Contato",
  "cta": "Vamos Conversar"
}
```

### header.json (en)
```json
{
  "home": "Home",
  "about": "About Us",
  "portfolio": "Portfolio",
  "contact": "Contact",
  "cta": "Let's Talk"
}
```

### header.json (es)
```json
{
  "home": "Inicio",
  "about": "Sobre Nosotros",
  "portfolio": "Portafolio",
  "contact": "Contacto",
  "cta": "Hablemos"
}
```

## Dicas

- Sempre mantenha as mesmas chaves em todos os arquivos de idioma
- Use nomes descritivos para as chaves (ex: "buttonSubmit" ao invés de "btn1")
- Traduza o contexto, não apenas a palavra literalmente
- Teste todas as traduções ao alterar textos

