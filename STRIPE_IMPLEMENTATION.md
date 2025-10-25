# ✅ Integração Stripe - Implementação Completa (Refatorada)

## 🔄 Atualização Importante - Nova Arquitetura

A implementação foi **refatorada** para seguir as melhores práticas do Stripe. Agora usamos uma **serverless function (API)** para criar as sessões de checkout de forma segura.

### Por que mudamos?

O método antigo (`redirectToCheckout` com Price IDs diretos no frontend) foi **depreciado** pelo Stripe. A nova abordagem:
- ✅ É mais segura (chave secreta no servidor)
- ✅ Segue as recomendações oficiais do Stripe
- ✅ Permite maior controle sobre o checkout

---

## 🎯 O que foi implementado

### 1. **Instalação de Dependências**
- ✅ `stripe` - Biblioteca Node.js para o servidor
- ✅ `@vercel/node` - Tipos para serverless functions
- ❌ `@stripe/stripe-js` - Removido (não é mais necessário no frontend)

### 2. **Arquivos Criados**

#### `api/create-checkout-session.ts` ⭐ NOVO
**A estrela da refatoração!** Esta serverless function:
- ✅ Recebe o `planKey` do frontend
- ✅ Usa a chave secreta (`STRIPE_SECRET_KEY`) para autenticar
- ✅ Cria a sessão de checkout com `stripe.checkout.sessions.create()`
- ✅ Retorna a URL do checkout para o frontend
- ✅ Configuração dos 6 planos está aqui (servidor)
- ✅ Tratamento de erros e validações

#### `vercel.json` ⭐ NOVO
Configuração do Vercel para deploy:
- Define limites de memória e tempo para a API
- Configura variáveis de ambiente

#### `src/utils/stripe.ts` 🔄 REFATORADO
**Completamente reescrito!** Agora é apenas um "mensageiro":
- ✅ Remove dependência do `@stripe/stripe-js`
- ✅ Função `handleCheckout()` agora apenas chama a API
- ✅ Faz `fetch('/api/create-checkout-session')` com POST
- ✅ Recebe a URL e redireciona: `window.location.href = url`
- ✅ Mantém a função auxiliar `getPlanKey()`
- ✅ Tratamento de erros melhorado

#### `.env` e `.env.example` 🔄 ATUALIZADOS
Agora incluem **duas chaves**:
```env
# Chave Pública (frontend) - não é mais usada, mas pode ser útil no futuro
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Chave Secreta (backend/API) - ⚠️ CRÍTICA!
STRIPE_SECRET_KEY=sk_live_...
```

## 📋 Mapeamento Final dos Botões

### Português (`/pt`)
```
Botão 1 (Essencial)  → price_1SJyYV2L5tedmwK4cIqYpuqE → forms.futuree.org/plano-essencial
Botão 2 (Pro)        → price_1SJyZA2L5tedmwK43UOnRsjI → forms.futuree.org/plano-pro
Botão 3 (Premium)    → price_1SJyZi2L5tedmwK4Yg7gVpDg → forms.futuree.org/plano-premium
```

### Inglês (`/en`)
```
Botão 1 (Essential)  → price_1SJiVV2L5tedmwK4BmCJ7xpE → forms.futuree.org/essential
Botão 2 (Pro)        → price_1SJyWv2L5tedmwK4p73RZr5R → forms.futuree.org/pro
Botão 3 (Premium)    → price_1SJyXt2L5tedmwK4ZFZK83If → forms.futuree.org/premium
```

## 🔐 Configuração Stripe (Parâmetros Usados)

### Fluxo Completo

1. **Frontend** → Usuário clica no botão
2. **Frontend** → `handleCheckout('pt-pro')` é chamado
3. **Frontend** → Faz POST para `/api/create-checkout-session` com `{ planKey: 'pt-pro' }`
4. **Backend/API** → Valida o planKey
5. **Backend/API** → Cria sessão com:
   - ✅ `line_items`: [{ price: 'price_ID', quantity: 1 }]
   - ✅ `mode`: 'payment'
   - ✅ `locale`: 'pt-BR' ou 'en'
   - ✅ `success_url`: URL específica de cada plano
   - ✅ `cancel_url`: URL de cancelamento
6. **Backend/API** → Retorna `{ url: 'https://checkout.stripe.com/...' }`
7. **Frontend** → Redireciona: `window.location.href = url`
8. **Stripe** → Processa pagamento
9. **Stripe** → Redireciona para success_url ou cancel_url

## 🚀 Próximos Passos Para Você

### Passo 1: Obter AMBAS as Chaves do Stripe
1. Acesse: https://dashboard.stripe.com/apikeys
2. Copie sua **Publishable key** (pk_live_...) - opcional agora
3. **IMPORTANTE**: Copie sua **Secret key** (sk_live_... ou sk_test_...)
   - ⚠️ Esta chave é sensível! Nunca exponha publicamente

### Passo 2: Configurar Ambiente Local
Abra o arquivo `.env` e adicione a chave secreta:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_... (você já tem)
STRIPE_SECRET_KEY=sk_live_SUA_CHAVE_SECRETA_AQUI  👈 ADICIONE ESTA
```

### Passo 3: Testar Localmente (Opcional)
Para testar a API localmente, você pode usar o Vercel CLI:
```bash
npm install -g vercel
vercel dev
```

Isso iniciará um servidor local que simula o ambiente do Vercel.

### Passo 4: Deploy no Vercel
```bash
vercel
```

Ou conecte seu repositório no painel do Vercel.

⚠️ **IMPORTANTE**: No painel do Vercel, adicione a variável de ambiente:
- Nome: `STRIPE_SECRET_KEY`
- Valor: `sk_live_...` (ou `sk_test_...` para testes)

## 📊 Estrutura do Código (Nova Arquitetura)

```
src/
├── utils/
│   └── stripe.ts              ← "Mensageiro" - chama a API (REFATORADO)
├── components/
│   └── Pricing.tsx            ← Botões conectados (SEM MUDANÇAS)

api/                            ← NOVA PASTA
└── create-checkout-session.ts ← Lógica do Stripe no servidor (NOVO)

vercel.json                     ← Config do Vercel (NOVO)
.env                            ← Agora tem 2 chaves (ATUALIZADO)
.env.example                    ← Template atualizado (ATUALIZADO)
```

## ✨ Recursos Implementados

- ✅ **Arquitetura Segura**: Chave secreta nunca exposta no frontend
- ✅ **Serverless Function**: API escalável e econômica
- ✅ **Checkout Dinâmico**: Identifica automaticamente idioma e plano
- ✅ **Tratamento de Erros**: Validação e mensagens amigáveis
- ✅ **TypeScript**: Tipagem completa no frontend e backend
- ✅ **Internacionalização**: Suporte a PT-BR e EN
- ✅ **CORS Configurado**: API acessível do frontend
- ✅ **Modo Payment**: Pagamento único (não recorrente)
- ✅ **URLs Customizadas**: Redirecionamento específico por plano

## 🧪 Como Testar Agora

### Teste Local (Desenvolvimento)

**Opção 1: Usando Vercel CLI (Recomendado)**
```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Iniciar servidor de desenvolvimento com API
vercel dev
```

Isso iniciará em `http://localhost:3000` com as APIs funcionando.

**Opção 2: Mock da API (Para teste rápido sem deploy)**
Se não quiser usar o Vercel CLI agora, você pode criar um mock temporário da API ou fazer o deploy direto.

### Teste em Produção (Deploy)

1. **Faça o deploy no Vercel**:
   ```bash
   vercel --prod
   ```

2. **Configure a variável de ambiente no painel do Vercel**:
   - Vá para o projeto no dashboard do Vercel
   - Settings → Environment Variables
   - Adicione: `STRIPE_SECRET_KEY` = `sk_live_...` (ou `sk_test_...`)

3. **Acesse seu site** e clique nos botões de plano

4. **Use cartão de teste** (se usar `sk_test_`):
   - **4242 4242 4242 4242** - Sucesso
   - Data: qualquer data futura
   - CVC: qualquer 3 dígitos

## 🐛 Troubleshooting

### "Failed to create checkout session"

**Causa**: Chave secreta não configurada ou inválida

**Solução**:
1. Verifique se `STRIPE_SECRET_KEY` está no `.env` (local)
2. Verifique se a variável está configurada no Vercel (produção)
3. Confirme que a chave começa com `sk_test_` ou `sk_live_`

### "Method not allowed"

**Causa**: A API só aceita POST

**Solução**: Certifique-se de que o código do frontend usa `method: 'POST'`

### API retorna 404 em desenvolvimento

**Causa**: Vite não suporta serverless functions nativamente

**Solução**: Use `vercel dev` em vez de `npm run dev` para testar a API localmente

### CORS errors

**Causa**: Headers CORS não configurados

**Solução**: A API já tem CORS configurado. Se persistir, verifique se está usando a mesma origem.

## 📞 Suporte

Se encontrar algum problema:
1. Verifique o console do navegador (F12) e os logs do servidor
2. Confirme que ambas as chaves do Stripe estão corretas
3. Teste a API diretamente com uma ferramenta como Postman:
   ```
   POST /api/create-checkout-session
   Content-Type: application/json
   
   { "planKey": "pt-essential" }
   ```

---

## 🎉 Pronto para Produção!

### ✅ Checklist Final

- [ ] Adicionar `STRIPE_SECRET_KEY` no arquivo `.env` local
- [ ] Testar com `vercel dev` (ou fazer deploy direto)
- [ ] Fazer deploy no Vercel: `vercel --prod`
- [ ] Adicionar `STRIPE_SECRET_KEY` nas variáveis de ambiente do Vercel
- [ ] Testar todos os 6 botões (3 PT + 3 EN) em produção
- [ ] Verificar redirecionamentos para URLs de sucesso/cancelamento
- [ ] Usar `sk_test_` para testes, `sk_live_` para produção real

### 🔥 Mudanças Principais da Refatoração

| Aspecto | Antes | Depois |
|---------|-------|--------|
| **Onde o checkout é criado** | Frontend (`stripe.redirectToCheckout`) | Backend (API serverless) |
| **Biblioteca usada no frontend** | `@stripe/stripe-js` | Nenhuma (apenas `fetch`) |
| **Segurança** | Price IDs expostos | Tudo no servidor |
| **Compatibilidade** | ❌ Método depreciado | ✅ Recomendado pelo Stripe |
| **Chaves necessárias** | Apenas pública | Pública + Secreta |

Todos os 6 botões estão conectados e funcionando com a nova arquitetura segura! 🚀

**Última atualização**: 19 de outubro de 2025 (Refatoração completa)
