# 🧪 Testes da API Stripe

Este arquivo contém exemplos de como testar a API de checkout manualmente.

---

## 📍 Endpoint da API

**Local (Vercel Dev)**: `http://localhost:3000/api/create-checkout-session`
**Produção**: `https://seu-dominio.vercel.app/api/create-checkout-session`

---

## 🔧 Testar com cURL

### Teste - Plano Essential PT
```bash
curl -X POST http://localhost:3000/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"planKey":"pt-essential"}'
```

**Resposta esperada:**
```json
{
  "url": "https://checkout.stripe.com/c/pay/cs_test_xxxxxxxxxxxxx"
}
```

### Teste - Plano Pro EN
```bash
curl -X POST http://localhost:3000/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"planKey":"en-pro"}'
```

### Teste - Plano Inválido (deve retornar erro)
```bash
curl -X POST http://localhost:3000/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"planKey":"invalid-plan"}'
```

**Resposta esperada:**
```json
{
  "error": "Invalid planKey: invalid-plan"
}
```

---

## 🔧 Testar com PowerShell (Windows)

### Teste - Plano Pro PT
```powershell
$body = @{
    planKey = "pt-pro"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/create-checkout-session" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

### Teste - Plano Premium EN
```powershell
$body = @{
    planKey = "en-premium"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/create-checkout-session" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

---

## 🔧 Testar com Postman

### Configuração

1. **Method**: POST
2. **URL**: `http://localhost:3000/api/create-checkout-session`
3. **Headers**:
   - `Content-Type`: `application/json`
4. **Body** (raw JSON):
   ```json
   {
     "planKey": "pt-essential"
   }
   ```

### Casos de Teste

#### ✅ Caso 1: Plano válido PT
**Request:**
```json
{
  "planKey": "pt-essential"
}
```

**Expected Response** (200 OK):
```json
{
  "url": "https://checkout.stripe.com/c/pay/cs_test_xxxxx"
}
```

#### ✅ Caso 2: Plano válido EN
**Request:**
```json
{
  "planKey": "en-pro"
}
```

**Expected Response** (200 OK):
```json
{
  "url": "https://checkout.stripe.com/c/pay/cs_test_xxxxx"
}
```

#### ❌ Caso 3: Plano inválido
**Request:**
```json
{
  "planKey": "invalid-key"
}
```

**Expected Response** (400 Bad Request):
```json
{
  "error": "Invalid planKey: invalid-key"
}
```

#### ❌ Caso 4: Sem planKey
**Request:**
```json
{}
```

**Expected Response** (400 Bad Request):
```json
{
  "error": "planKey is required and must be a string"
}
```

#### ❌ Caso 5: GET request (método errado)
**Method**: GET

**Expected Response** (405 Method Not Allowed):
```json
{
  "error": "Method not allowed"
}
```

---

## 🔧 Testar com Código JavaScript

### Exemplo - Frontend
```javascript
async function testarCheckout(planKey) {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ planKey }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Erro:', error)
      return
    }

    const { url } = await response.json()
    console.log('URL do checkout:', url)
    
    // Em produção, você faria:
    // window.location.href = url
  } catch (error) {
    console.error('Erro na requisição:', error)
  }
}

// Testar
testarCheckout('pt-essential')
```

### Exemplo - Node.js
```javascript
const fetch = require('node-fetch')

async function testarAPI() {
  const plansToTest = [
    'pt-essential',
    'pt-pro',
    'pt-premium',
    'en-essential',
    'en-pro',
    'en-premium',
  ]

  for (const planKey of plansToTest) {
    console.log(`\nTestando: ${planKey}`)
    
    try {
      const response = await fetch('http://localhost:3000/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planKey }),
      })

      const data = await response.json()
      
      if (response.ok) {
        console.log('✅ Sucesso:', data.url.substring(0, 50) + '...')
      } else {
        console.log('❌ Erro:', data.error)
      }
    } catch (error) {
      console.log('❌ Exceção:', error.message)
    }
  }
}

testarAPI()
```

---

## 📊 Todos os PlanKeys Válidos

Use estes valores no campo `planKey`:

| PlanKey | Descrição | Price ID |
|---------|-----------|----------|
| `pt-essential` | Plano Essencial (PT) | price_1SJyYV2L5tedmwK4cIqYpuqE |
| `pt-pro` | Plano Pro (PT) | price_1SJyZA2L5tedmwK43UOnRsjI |
| `pt-premium` | Plano Premium (PT) | price_1SJyZi2L5tedmwK4Yg7gVpDg |
| `en-essential` | Essential Plan (EN) | price_1SJiVV2L5tedmwK4BmCJ7xpE |
| `en-pro` | Pro Plan (EN) | price_1SJyWv2L5tedmwK4p73RZr5R |
| `en-premium` | Premium Plan (EN) | price_1SJyXt2L5tedmwK4ZFZK83If |

---

## 🐛 Troubleshooting

### API retorna "STRIPE_SECRET_KEY not configured"

**Causa**: Variável de ambiente não configurada

**Solução**:
```bash
# Local: Adicione no arquivo .env
STRIPE_SECRET_KEY=sk_test_...

# Vercel: Adicione no painel
# Settings → Environment Variables
```

### API retorna 404

**Causa**: Rota não encontrada

**Solução**:
1. Certifique-se de que está usando `vercel dev` (não `npm run dev`)
2. Verifique se o arquivo está em `api/create-checkout-session.ts`

### "Failed to fetch"

**Causa**: Servidor não está rodando ou URL incorreta

**Solução**:
```bash
# Inicie o servidor
vercel dev

# Verifique a URL
# Local: http://localhost:3000/api/...
# Não: http://localhost:5173/api/...
```

---

## ✅ Checklist de Testes

Antes de fazer deploy para produção, teste:

- [ ] Todos os 6 planKeys válidos retornam URL
- [ ] PlanKey inválido retorna erro 400
- [ ] Requisição sem planKey retorna erro 400
- [ ] Método GET retorna erro 405
- [ ] URL retornada começa com `https://checkout.stripe.com/`
- [ ] Acessar a URL abre o checkout do Stripe
- [ ] Checkout está no idioma correto (pt-BR ou en)

---

**Última atualização**: 19 de outubro de 2025
