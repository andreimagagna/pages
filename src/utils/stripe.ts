// Configuração dos planos - mantida para referência e documentação
export interface CheckoutConfig {
  priceId: string
  locale: 'en' | 'pt-BR'
  successUrl: string
  cancelUrl: string
}

// Mapeamento dos planos (apenas para documentação - a lógica está na API)
export const checkoutConfigs: Record<string, CheckoutConfig> = {
  // Planos em Inglês
  'en-essential': {
    priceId: 'price_1SJiVV2L5tedmwK4BmCJ7xpE',
    locale: 'en',
    successUrl: 'http://forms.futuree.org/essential',
    cancelUrl: 'https://page-kqdzajlc4-andreimagagnaaas-projects.vercel.app/en#planos',
  },
  'en-pro': {
    priceId: 'price_1SJyWv2L5tedmwK4p73RZr5R',
    locale: 'en',
    successUrl: 'http://forms.futuree.org/pro',
    cancelUrl: 'https://page-kqdzajlc4-andreimagagnaaas-projects.vercel.app/en#planos',
  },
  'en-premium': {
    priceId: 'price_1SJyXt2L5tedmwK4ZFZK83If',
    locale: 'en',
    successUrl: 'http://forms.futuree.org/premium',
    cancelUrl: 'https://page-kqdzajlc4-andreimagagnaaas-projects.vercel.app/en#planos',
  },
  
  // Planos em Português
  'pt-essential': {
    priceId: 'price_1SJyYV2L5tedmwK4cIqYpuqE',
    locale: 'pt-BR',
    successUrl: 'http://forms.futuree.org/plano-essencial',
    cancelUrl: 'https://page-kqdzajlc4-andreimagagnaaas-projects.vercel.app/pt#planos',
  },
  'pt-pro': {
    priceId: 'price_1SJyZA2L5tedmwK43UOnRsjI',
    locale: 'pt-BR',
    successUrl: 'http://forms.futuree.org/plano-pro',
    cancelUrl: 'https://page-kqdzajlc4-andreimagagnaaas-projects.vercel.app/pt#planos',
  },
  'pt-premium': {
    priceId: 'price_1SJyZi2L5tedmwK4Yg7gVpDg',
    locale: 'pt-BR',
    successUrl: 'http://forms.futuree.org/plano-premium',
    cancelUrl: 'https://page-kqdzajlc4-andreimagagnaaas-projects.vercel.app/pt#planos',
  },
}

/**
 * Redireciona o usuário para o checkout do Stripe
 * Agora usa uma API serverless para criar a sessão de forma segura
 * 
 * @param planKey - Chave do plano no formato 'idioma-tipo' (ex: 'pt-essential', 'en-pro')
 * @returns Promise que resolve quando o redirecionamento é iniciado
 */
export const handleCheckout = async (planKey: string): Promise<void> => {
  try {
    // Valida se o plano existe
    if (!checkoutConfigs[planKey]) {
      console.error(`Configuração não encontrada para o plano: ${planKey}`)
      alert('Erro ao processar o pagamento. Por favor, tente novamente.')
      return
    }

    // Chama a API serverless para criar a sessão de checkout
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ planKey }),
    })

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
      console.error('Erro da API:', errorData)
      throw new Error(errorData.error || 'Falha ao criar sessão de checkout')
    }

    // Extrai a URL da sessão
    const { url } = await response.json()

    if (!url) {
      throw new Error('URL de checkout não retornada pela API')
    }

    // Redireciona para o checkout do Stripe
    window.location.href = url

  } catch (error) {
    console.error('Erro ao iniciar checkout:', error)
    
    // Mensagem de erro amigável para o usuário
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Erro ao processar o pagamento. Por favor, tente novamente.'
    
    alert(errorMessage)
  }
}

/**
 * Helper para gerar a chave do plano baseado no idioma e índice
 * @param language - Idioma atual ('pt' ou 'en')
 * @param planIndex - Índice do plano (0 = Essential, 1 = Pro, 2 = Premium)
 * @returns Chave do plano no formato correto
 */
export const getPlanKey = (language: string, planIndex: number): string => {
  const planTypes = ['essential', 'pro', 'premium']
  const lang = language === 'pt' ? 'pt' : 'en'
  return `${lang}-${planTypes[planIndex]}`
}
