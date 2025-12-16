# Configuração do Formspree

Este projeto está configurado para usar o Formspree para envio de formulários de contato sem necessidade de backend próprio.

## Como configurar:

1. **Criar uma conta no Formspree:**
   - Acesse https://formspree.io/
   - Crie uma conta gratuita (permite até 50 envios por mês no plano gratuito)

2. **Criar um novo formulário:**
   - Após fazer login, clique em "New Form"
   - Escolha um nome para o formulário (ex: "Arca Studios Contact")
   - Copie o Form ID que será gerado (algo como `xvgkqjpn`)

3. **Configurar o endpoint no código:**
   - Abra o arquivo `src/app/pages/contact/contact.component.ts`
   - Localize a linha que contém:
     ```typescript
     private readonly FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
     ```
   - Substitua `YOUR_FORM_ID` pelo ID do seu formulário do Formspree
   - Exemplo: `'https://formspree.io/f/xvgkqjpn'`

4. **Configurar email de destino (opcional):**
   - No painel do Formspree, você pode configurar para qual email as mensagens serão enviadas
   - Vá em Settings > Email Notifications e configure o email de destino

5. **Testar:**
   - Preencha o formulário de contato no site
   - Envie uma mensagem de teste
   - Verifique se recebeu o email no endereço configurado

## Campos do formulário:

O formulário envia os seguintes campos:
- `name` - Nome do remetente
- `email` - Email do remetente
- `message` - Mensagem
- `_subject` - Assunto do email (gerado automaticamente)
- `_format` - Formato do email (plain text)

## Recursos adicionais:

- **Spam Protection:** O Formspree já inclui proteção contra spam
- **Webhooks:** Você pode configurar webhooks para integrações customizadas
- **Auto-responder:** Configure respostas automáticas no painel do Formspree
- **Limites:** O plano gratuito permite 50 envios por mês

## Documentação oficial:

Para mais informações, consulte: https://help.formspree.io/

