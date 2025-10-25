# 🔐 Guia de Configuração - Integração Stripe

Este guia explica como configurar e usar a integração do Stripe Checkout na landing page.

## 📦 Instalação Concluída

✅ A biblioteca `@stripe/stripe-js` já foi instalada via npm

## 🔑 Configuração da Chave Pública do Stripe

### Passo 1: Obter sua Chave Pública

1. Acesse o [Dashboard do Stripe](https://dashboard.stripe.com/)
2. Vá para **Developers** → **API Keys**
3. Copie sua **Publishable key** (começa com `pk_test_` ou `pk_live_`)

### Passo 2: Configurar Variável de Ambiente

Abra o arquivo `.env` na raiz do projeto e substitua o placeholder:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_SUA_CHAVE_AQUI
```

⚠️ **IMPORTANTE**: 
- Use `pk_test_` durante desenvolvimento/testes
- Use `pk_live_` apenas em produção
- Nunca commite o arquivo `.env` para o Git (já está no .gitignore)

## 🗺️ Mapeamento de Planos e Price IDs

Todos os 6 botões já estão configurados com seus respectivos Price IDs:

### 🇺🇸 Planos em Inglês (Rota `/en`)

| Plano | Preço | Price ID | URL Sucesso | URL Cancelamento |
|-------|-------|----------|-------------|------------------|
| **Essential** | $497 | `price_1SJiVV2L5tedmwK4BmCJ7xpE` | http://forms.futuree.org/essential | http://forms.futuree.org/error |
| **Pro** | $997 | `price_1SJyWv2L5tedmwK4p73RZr5R` | http://forms.futuree.org/pro | http://forms.futuree.org/error |
| **Premium** | $1,497 | `price_1SJyXt2L5tedmwK4ZFZK83If` | http://forms.futuree.org/premium | http://forms.futuree.org/error |

### 🇧🇷 Planos em Português (Rota `/pt`)

| Plano | Preço | Price ID | URL Sucesso | URL Cancelamento |
|-------|-------|----------|-------------|------------------|
| **Essencial** | R$ 1.497 | `price_1SJyYV2L5tedmwK4cIqYpuqE` | http://forms.futuree.org/plano-essencial | http://forms.futuree.org/erro |
| **Pro** | R$ 2.997 | `price_1SJyZA2L5tedmwK43UOnRsjI` | http://forms.futuree.org/plano-pro | http://forms.futuree.org/erro |
| **Premium** | R$ 4.497 | `price_1SJyZi2L5tedmwK4Yg7gVpDg` | http://forms.futuree.org/plano-premium | http://forms.futuree.org/erro |

## 🎯 Como Funciona

### Arquitetura da Integração

```
src/
  utils/
    stripe.ts          → Configuração e lógica do Stripe
  components/
    Pricing.tsx        → Componente com os 6 botões de compra
```

### Fluxo de Checkout

1. **Usuário clica em um botão** no componente `Pricing.tsx`
2. **Sistema identifica o plano** baseado no idioma + índice do botão
3. **Função `handleCheckout`** busca as configurações corretas:
   - Price ID
   - Locale (idioma)
   - URLs de sucesso/cancelamento
4. **Stripe.js redireciona** para a página de checkout hospedada
5. **Após pagamento**, usuário é redirecionado para URL de sucesso ou cancelamento

### Código dos Botões

Os botões na seção de Pricing estão configurados assim:

```tsx
<button 
  onClick={() => handleCheckout(getPlanKey(i18n.language, i))}
  className={`btn w-full ${plan.highlight ? 'btn-cta' : 'btn-secondary'}`}
>
  {plan.cta}
</button>
```

A função `getPlanKey(language, index)` gera automaticamente as chaves:
- PT + índice 0 → `pt-essential`
- PT + índice 1 → `pt-pro`
- PT + índice 2 → `pt-premium`
- EN + índice 0 → `en-essential`
- EN + índice 1 → `en-pro`
- EN + índice 2 → `en-premium`

## 🧪 Como Testar

### Modo de Teste (Development)

1. Configure a chave `pk_test_` no arquivo `.env`
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Navegue para `http://localhost:5173/pt` ou `/en`
4. Clique em qualquer botão de plano
5. Use os [cartões de teste do Stripe](https://stripe.com/docs/testing):
   - **Sucesso**: `4242 4242 4242 4242`
   - **Requer autenticação**: `4000 0025 0000 3155`
   - **Falha**: `4000 0000 0000 9995`

### Modo de Produção

1. Configure a chave `pk_live_` no arquivo `.env` de produção
2. Faça o build:
   ```bash
   npm run build
   ```
3. Os pagamentos serão processados em modo real

## 🔧 Customizações Possíveis

### Alterar Price IDs

Edite o arquivo `src/utils/stripe.ts`:

```typescript
export const checkoutConfigs: Record<string, CheckoutConfig> = {
  'pt-essential': {
    priceId: 'price_NOVO_ID_AQUI',
    // ...
  },
  // ...
}
```

### Alterar URLs de Redirecionamento

Também em `src/utils/stripe.ts`:

```typescript
'pt-essential': {
  // ...
  successUrl: 'https://seusite.com/obrigado',
  cancelUrl: 'https://seusite.com/cancelado',
}
```

### Adicionar Novos Planos

1. Adicione nova entrada em `checkoutConfigs`
2. Atualize o array `planTypes` na função `getPlanKey`
3. Adicione as traduções nos arquivos JSON

## 🐛 Troubleshooting

### "Stripe não foi carregado corretamente"

**Causa**: Chave pública não configurada ou inválida

**Solução**:
1. Verifique se o arquivo `.env` existe
2. Confirme que a chave está correta
3. Reinicie o servidor de desenvolvimento

### "Configuração não encontrada para o plano"

**Causa**: Chave do plano não existe em `checkoutConfigs`

**Solução**: Verifique se o Price ID está cadastrado corretamente

### Botão não redireciona

**Causa**: Erro no console do navegador

**Solução**:
1. Abra DevTools (F12)
2. Veja erros no console
3. Verifique se a chave pública está correta

## 📚 Recursos Adicionais

- [Documentação Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Stripe.js Reference](https://stripe.com/docs/js)
- [Cartões de Teste](https://stripe.com/docs/testing)
- [Webhooks do Stripe](https://stripe.com/docs/webhooks) (para notificações)

## ✅ Checklist de Deploy

Antes de colocar em produção:

- [ ] Substituir `pk_test_` por `pk_live_` no `.env` de produção
- [ ] Testar todos os 6 botões (3 PT + 3 EN)
- [ ] Verificar URLs de sucesso/cancelamento
- [ ] Confirmar que os Price IDs são de produção
- [ ] Testar em mobile e desktop
- [ ] Configurar webhooks do Stripe (opcional, mas recomendado)

---

## 🎉 Tudo Pronto!

Sua integração Stripe está configurada e funcionando. Basta adicionar sua chave pública no arquivo `.env` e você estará pronto para processar pagamentos!
