# 🔄 Guia de Migração - Stripe Refatorado

## O que mudou?

A integração do Stripe foi **completamente refatorada** para resolver o erro `IntegrationError: stripe.redirectToCheckout is no longer supported`.

### Problema Anterior
```
❌ Frontend chamava stripe.redirectToCheckout diretamente
❌ Price IDs expostos no código do cliente
❌ Método depreciado pelo Stripe
```

### Solução Atual
```
✅ Backend/API cria a sessão de checkout
✅ Chave secreta protegida no servidor
✅ Segue as melhores práticas do Stripe 2025
```

---

## 📦 Nova Arquitetura

### Fluxo Antigo (Depreciado)
```
Usuário clica → Frontend usa stripe.js → redirectToCheckout() → Checkout
                 (com Price IDs diretos)
```

### Fluxo Novo (Correto)
```
Usuário clica → Frontend → API (/api/create-checkout-session)
                              ↓
                         Cria sessão com stripe.checkout.sessions.create()
                              ↓
                         Retorna URL do checkout
                              ↓
                         Frontend redireciona para URL
                              ↓
                         Checkout do Stripe
```

---

## 🗂️ Arquivos Modificados/Criados

### ✅ Novos Arquivos

1. **`api/create-checkout-session.ts`**
   - Serverless function que cria sessões de checkout
   - Usa a chave secreta (`STRIPE_SECRET_KEY`)
   - Recebe `planKey` e retorna URL do checkout

2. **`vercel.json`**
   - Configuração para deploy no Vercel
   - Define limites de memória e timeout para API

### 🔄 Arquivos Refatorados

1. **`src/utils/stripe.ts`**
   - **Removido**: Importação de `@stripe/stripe-js`
   - **Removido**: `loadStripe()` e `redirectToCheckout()`
   - **Adicionado**: `fetch()` para chamar a API
   - **Mantido**: `getPlanKey()` e configurações dos planos

2. **`.env` e `.env.example`**
   - **Adicionado**: `STRIPE_SECRET_KEY`
   - **Mantido**: `VITE_STRIPE_PUBLISHABLE_KEY`

### ❌ Dependências Removidas

- `@stripe/stripe-js` - Não é mais necessário no frontend

### ➕ Dependências Adicionadas

- `stripe` - Biblioteca Node.js para o servidor
- `@vercel/node` (dev) - Tipos TypeScript para Vercel

---

## 🚀 Como Aplicar a Migração

Se você ainda tem a versão antiga rodando:

### Passo 1: Atualizar Dependências
```bash
npm uninstall @stripe/stripe-js
npm install stripe
npm install -D @vercel/node
```

### Passo 2: Obter Chave Secreta do Stripe
1. Acesse https://dashboard.stripe.com/apikeys
2. Copie sua **Secret key** (sk_test_... ou sk_live_...)
3. ⚠️ **NUNCA compartilhe esta chave publicamente!**

### Passo 3: Atualizar .env
Adicione a nova variável:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_... (você já tem)
STRIPE_SECRET_KEY=sk_live_SUA_CHAVE_AQUI  👈 ADICIONE
```

### Passo 4: Copiar Novos Arquivos
- Crie `api/create-checkout-session.ts` com o código fornecido
- Crie `vercel.json` com a configuração fornecida

### Passo 5: Substituir stripe.ts
Substitua o conteúdo de `src/utils/stripe.ts` pelo código refatorado

### Passo 6: Deploy
```bash
# Teste local com Vercel CLI
vercel dev

# Ou faça deploy direto
vercel --prod
```

### Passo 7: Configurar Variáveis no Vercel
No painel do Vercel:
1. Settings → Environment Variables
2. Adicione `STRIPE_SECRET_KEY` = `sk_live_...`
3. Redeploy (ou aguarde o próximo deploy automático)

---

## 🧪 Como Testar a Nova Implementação

### Teste Local
```bash
vercel dev
# Acesse http://localhost:3000/pt
# Clique em um botão de plano
```

### Teste em Produção
1. Deploy no Vercel
2. Configure `STRIPE_SECRET_KEY` no painel
3. Acesse o site e clique nos botões
4. Use cartão de teste: 4242 4242 4242 4242

---

## 🐛 Problemas Comuns Após Migração

### "Failed to create checkout session"
- **Causa**: Chave secreta não configurada
- **Solução**: Adicione `STRIPE_SECRET_KEY` no `.env` e no Vercel

### "API route not found" (404)
- **Causa**: Pasta `api/` não foi criada corretamente
- **Solução**: Certifique-se de que `api/create-checkout-session.ts` existe na raiz

### "CORS error"
- **Causa**: Headers não configurados
- **Solução**: O arquivo da API já tem CORS. Reinicie o servidor.

### Botões não fazem nada
- **Causa**: Frontend ainda aponta para código antigo
- **Solução**: Verifique se `src/utils/stripe.ts` foi atualizado

---

## ✅ Vantagens da Nova Implementação

| Aspecto | Antes | Depois |
|---------|-------|--------|
| **Segurança** | 🟡 Price IDs expostos | 🟢 Tudo no servidor |
| **Manutenção** | 🔴 Método depreciado | 🟢 Recomendado pelo Stripe |
| **Escalabilidade** | 🟡 Frontend faz muito trabalho | 🟢 Serverless auto-escalável |
| **Debugging** | 🔴 Erros ocultos no cliente | 🟢 Logs no servidor |
| **Conformidade** | 🔴 Não segue padrões 2025 | 🟢 Best practices |

---

## 📚 Documentação Relacionada

- [Stripe Checkout Sessions API](https://stripe.com/docs/api/checkout/sessions)
- [Stripe Changelog - redirectToCheckout Deprecation](https://docs.stripe.com/changelog/clover/2025-09-30/remove-redirect-to-checkout)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)

---

## 🎉 Conclusão

A migração está completa! A nova arquitetura:
- ✅ Resolve o erro `IntegrationError`
- ✅ É mais segura
- ✅ Segue as recomendações oficiais do Stripe
- ✅ Está pronta para produção

**Data da migração**: 19 de outubro de 2025
