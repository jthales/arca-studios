# Guia de Edição de Conteúdo - Arca Studios

Este guia explica como editar os textos e conteúdos do site Arca Studios.

## 📁 Estrutura de Arquivos

Todos os textos do site estão localizados em arquivos JSON dentro da pasta `src/app/translations/`. A estrutura é organizada por idioma:

```
src/app/translations/
├── pt/          # Português
│   ├── header.json
│   ├── home.json
│   ├── about.json
│   ├── portfolio.json
│   ├── projects.json
│   ├── contact.json
│   └── footer.json
├── en/          # Inglês
│   └── (mesma estrutura)
└── es/          # Espanhol
    └── (mesma estrutura)
```

## 🔧 Como Editar

### 1. Editar Textos das Páginas

Cada página tem seu próprio arquivo JSON. Por exemplo, para editar a página "Sobre Nós":

1. Abra o arquivo `src/app/translations/pt/about.json`
2. Edite os valores JSON (mantenha as chaves iguais)
3. Salve o arquivo
4. Repita para os outros idiomas (`en/about.json`, `es/about.json`)

**Exemplo:**

```json
{
  "title": "Sobre Nós",
  "heading": "Transformando marcas em histórias",
  "description": "Somos uma agência especializada..."
}
```

### 2. Editar Projetos do Portfólio

Os projetos estão em `src/app/translations/*/projects.json`. Cada projeto tem:

- `id`: Número único do projeto (não altere)
- `name`: Nome do projeto
- `description`: Descrição curta (aparece no grid)
- `image`: Caminho da imagem (`/images/projects/project1.png`)
- `category`: Categoria (ex: "Branding", "Marketing")
- `client`: Nome do cliente
- `year`: Ano do projeto
- `overview`: Visão geral completa
- `challenge`: Desafio enfrentado
- `solution`: Solução implementada
- `results`: Array de resultados (lista)
- `services`: Array de serviços oferecidos

**Exemplo de edição:**

```json
{
  "id": 1,
  "name": "Meu Projeto",
  "description": "Branding completo",
  "image": "/images/projects/project1.png",
  "category": "Branding",
  "client": "Cliente XYZ",
  "year": "2024",
  "overview": "Este projeto foi desenvolvido...",
  "challenge": "O desafio principal foi...",
  "solution": "Desenvolvemos uma estratégia...",
  "results": [
    "Resultado 1",
    "Resultado 2",
    "Resultado 3"
  ],
  "services": ["Branding", "Design", "Estratégia"]
}
```

### 3. Adicionar Novo Projeto

Para adicionar um novo projeto:

1. Abra `src/app/translations/pt/projects.json`
2. Adicione um novo objeto no array `projects`
3. Use um `id` único (sequencial, ex: 7, 8, 9...)
4. Preencha todos os campos
5. Repita para os outros idiomas

**Importante:** O `id` deve ser o mesmo em todos os idiomas!

### 4. Editar Labels da Interface

Alguns textos da interface estão em `portfolio.json` na seção `detail`:

```json
{
  "detail": {
    "backToPortfolio": "Voltar ao portfólio",
    "client": "Cliente",
    "services": "Serviços",
    "overview": "Visão Geral",
    "challenge": "Desafio",
    "solution": "Solução",
    "results": "Resultados",
    "ctaTitle": "Tem um projeto em mente?",
    "ctaText": "Vamos conversar...",
    "ctaButton": "Entre em contato",
    "loading": "Carregando..."
  }
}
```

## ⚠️ Regras Importantes

1. **Mantenha a estrutura JSON válida**: Sempre feche chaves `{}` e colchetes `[]`
2. **Use aspas duplas**: `"texto"` e não `'texto'`
3. **Vírgulas**: Use vírgulas entre itens, mas não após o último
4. **IDs consistentes**: O mesmo projeto deve ter o mesmo `id` em todos os idiomas
5. **Edite todos os idiomas**: Para manter o site multilíngue, edite PT, EN e ES

## 📝 Exemplos de Edição

### Editar Nome de um Projeto

**Antes:**
```json
{
  "id": 1,
  "name": "Projeto Exemplo 1"
}
```

**Depois:**
```json
{
  "id": 1,
  "name": "Rebranding Completo - Cliente XYZ"
}
```

### Adicionar Resultado a um Projeto

**Antes:**
```json
{
  "results": [
    "Aumento de 150% no reconhecimento",
    "Crescimento de 80% nas redes sociais"
  ]
}
```

**Depois:**
```json
{
  "results": [
    "Aumento de 150% no reconhecimento",
    "Crescimento de 80% nas redes sociais",
    "Novo resultado adicionado"
  ]
}
```

### Editar Texto do CTA

**Antes:**
```json
{
  "detail": {
    "ctaTitle": "Tem um projeto em mente?"
  }
}
```

**Depois:**
```json
{
  "detail": {
    "ctaTitle": "Vamos trabalhar juntos?"
  }
}
```

## 🖼️ Adicionar Imagens de Projetos

1. Coloque a imagem na pasta `public/images/projects/`
2. Nomeie o arquivo (ex: `meu-projeto.png`)
3. Atualize o campo `image` no JSON:
   ```json
   {
     "image": "/images/projects/meu-projeto.png"
   }
   ```

## 🔄 Após Editar

Após fazer as edições:

1. Salve todos os arquivos
2. O servidor de desenvolvimento recarrega automaticamente
3. Verifique o site no navegador
4. Teste em todos os idiomas (PT, EN, ES)

## 📚 Arquivos por Página

- **Header/Navegação**: `header.json`
- **Página Inicial**: `home.json`
- **Sobre Nós**: `about.json`
- **Portfólio (grid)**: `portfolio.json`
- **Projetos (detalhes)**: `projects.json`
- **Contato**: `contact.json`
- **Rodapé**: `footer.json`

## ❓ Dúvidas Frequentes

**P: Posso adicionar novos campos?**
R: Sim, mas você precisará atualizar os componentes TypeScript para usar esses campos.

**P: E se eu esquecer de editar um idioma?**
R: O site mostrará o texto do último idioma editado. Sempre edite os 3 idiomas.

**P: Como remover um projeto?**
R: Remova o objeto do array `projects` em todos os arquivos de idioma.

**P: Posso usar HTML nos textos?**
R: Não, os textos são renderizados como texto puro. Use quebras de linha normais.

## 🆘 Problemas Comuns

**Erro de JSON inválido:**
- Verifique vírgulas extras ou faltando
- Verifique se todas as chaves estão fechadas
- Use um validador JSON online

**Texto não aparece:**
- Verifique se editou o arquivo correto
- Verifique se a chave está correta
- Limpe o cache do navegador

**Projeto não aparece:**
- Verifique se o `id` está correto
- Verifique se adicionou em todos os idiomas
- Verifique se a imagem existe no caminho especificado

---

**Última atualização:** 2024

