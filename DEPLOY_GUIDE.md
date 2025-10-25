# 🚀 Guia de Deploy Rápido - Vercel

## Pré-requisitos

- Conta no [Vercel](https://vercel.com) (gratuita)
- Chave secreta do Stripe (`sk_test_...` ou `sk_live_...`)
- Código atualizado com a nova arquitetura

---

## 🎯 Deploy em 3 Passos

### Passo 1: Instalar Vercel CLI
```bash
npm install -g vercel
```

### Passo 2: Fazer Login no Vercel
```bash
vercel login
```

### Passo 3: Deploy
```bash
# Deploy de preview (teste)
vercel

# Deploy para produção
vercel --prod
```

---

## 🔐 Configurar Variáveis de Ambiente

### Opção A: Via Painel do Vercel (Recomendado)

1. Acesse seu projeto no [dashboard do Vercel](https://vercel.com/dashboard)
2. Vá para **Settings** → **Environment Variables**
3. Adicione as variáveis:

| Name | Value | Environments |
|------|-------|--------------|
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` | Production, Preview, Development |
| `STRIPE_SECRET_KEY` | `sk_live_...` ⚠️ | Production, Preview, Development |

4. Clique em **Save**
5. Faça um novo deploy ou aguarde o próximo

### Opção B: Via CLI (Mais rápido)
```bash
# Adicionar variável de ambiente
vercel env add STRIPE_SECRET_KEY

# Escolha os ambientes quando solicitado:
# [x] Production
# [x] Preview  
# [x] Development

# Cole sua chave secreta quando solicitado
# Exemplo: sk_live_xxxxxxxxxxxxx
```

---

## 🧪 Testar Antes do Deploy

### Teste Local com Vercel Dev
```bash
# Inicia servidor local que simula o ambiente Vercel
vercel dev
```

Acesse `http://localhost:3000/pt` e teste os botões de plano.

**Vantagens do `vercel dev`:**
- ✅ Testa as serverless functions localmente
- ✅ Usa as variáveis de ambiente do Vercel
- ✅ Simula o ambiente de produção

---

## 📋 Checklist de Deploy

Antes de fazer o deploy para produção:

- [ ] **Chaves do Stripe configuradas**
  - [ ] `sk_live_...` para produção (ou `sk_test_...` para testes)
  - [ ] `pk_live_...` para produção (opcional agora)

- [ ] **Código atualizado**
  - [ ] Pasta `api/` com `create-checkout-session.ts`
  - [ ] `src/utils/stripe.ts` refatorado
  - [ ] `vercel.json` criado

- [ ] **Teste local**
  - [ ] `vercel dev` funcionando
  - [ ] Botões redirecionam para checkout
  - [ ] Checkout abre corretamente

- [ ] **Variáveis de ambiente no Vercel**
  - [ ] `STRIPE_SECRET_KEY` adicionada
  - [ ] Variável configurada para Production

- [ ] **URLs de redirecionamento**
  - [ ] URLs de sucesso funcionando
  - [ ] URLs de cancelamento funcionando

- [ ] **Teste em produção**
  - [ ] Testar com cartão de teste: 4242 4242 4242 4242
  - [ ] Verificar todos os 6 botões (3 PT + 3 EN)

---

## 🔄 Deploy Contínuo (CI/CD)

### Conectar Repositório Git

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Importe seu repositório (GitHub, GitLab, Bitbucket)
3. Configure as variáveis de ambiente
4. Deploy automático!

**Vantagens:**
- ✅ Cada push = novo deploy automático
- ✅ Preview para cada pull request
- ✅ Rollback com um clique

---

## 🐛 Troubleshooting de Deploy

### "STRIPE_SECRET_KEY is not defined"

**Solução**: Adicione a variável no painel do Vercel e faça redeploy

### "API route returns 404"

**Solução**: Certifique-se de que:
1. A pasta `api/` está na raiz do projeto
2. O arquivo se chama exatamente `create-checkout-session.ts`
3. O `vercel.json` está na raiz

### "Build failed"

**Solução**: Verifique os logs do build e:
1. Confirme que todas as dependências estão no `package.json`
2. Execute `npm install` localmente para verificar erros
3. Certifique-se de que o TypeScript está configurado corretamente

### "Function exceeded maximum duration"

**Solução**: O `vercel.json` já define `maxDuration: 10`. Se persistir:
1. Verifique se a chave do Stripe está correta
2. Teste a conexão com o Stripe

---

## 📊 Monitoramento

### Ver Logs em Tempo Real
```bash
vercel logs [deployment-url] --follow
```

### Ver Métricas
Acesse o painel do Vercel:
- Requests por segundo
- Tempo de resposta
- Taxa de erro

---

## 💰 Custos

### Plano Hobby (Gratuito)
- ✅ 100GB bandwidth/mês
- ✅ Serverless functions ilimitadas
- ✅ Deploy automático
- **Perfeito para este projeto!**

### Plano Pro ($20/mês)
- Apenas se você precisar de mais recursos
- Analytics avançado
- Mais colaboradores

---

## 🎉 Pronto!

Após o deploy:
1. ✅ Seu site estará no ar com HTTPS automático
2. ✅ As APIs serverless estarão funcionando
3. ✅ Os 6 botões de checkout conectados ao Stripe
4. ✅ URLs customizadas para cada plano

**URL do seu site**: `https://seu-projeto.vercel.app`

---

## 📚 Recursos Úteis

- [Documentação do Vercel](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Environment Variables](https://vercel.com/docs/projects/environment-variables)

---

**Última atualização**: 19 de outubro de 2025
