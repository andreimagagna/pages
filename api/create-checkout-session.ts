import type { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'

// Configuração dos planos com Price IDs e URLs
const checkoutConfigs: Record<string, {
  priceId: string
  locale: 'pt-BR' | 'en'
  successUrl: string
  cancelUrl: string
}> = {
  // Planos em Inglês
  'en-essential': {
    priceId: 'price_1SJiVV2L5tedmwK4BmCJ7xpE',
    locale: 'en',
    successUrl: 'http://forms.futuree.org/essential',
    cancelUrl: 'https://pages.futuree.org/en#planos',
  },
  'en-pro': {
    priceId: 'price_1SJyWv2L5tedmwK4p73RZr5R',
    locale: 'en',
    successUrl: 'http://forms.futuree.org/pro',
    cancelUrl: 'https://pages.futuree.org/en#planos',
  },
  'en-premium': {
    priceId: 'price_1SJyXt2L5tedmwK4ZFZK83If',
    locale: 'en',
    successUrl: 'http://forms.futuree.org/premium',
    cancelUrl: 'https://pages.futuree.org/en#planos',
  },
  
  // Planos em Português
  'pt-essential': {
    priceId: 'price_1SJyYV2L5tedmwK4cIqYpuqE',
    locale: 'pt-BR',
    successUrl: 'http://forms.futuree.org/plano-essencial',
    cancelUrl: 'https://pages.futuree.org/pt#planos',
  },
  'pt-pro': {
    priceId: 'price_1SJyZA2L5tedmwK43UOnRsjI',
    locale: 'pt-BR',
    successUrl: 'http://forms.futuree.org/plano-pro',
    cancelUrl: 'https://pages.futuree.org/pt#planos',
  },
  'pt-premium': {
    priceId: 'price_1SJyZi2L5tedmwK4Yg7gVpDg',
    locale: 'pt-BR',
    successUrl: 'http://forms.futuree.org/plano-premium',
    cancelUrl: 'https://pages.futuree.org/pt#planos',
  },
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Aceita apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { planKey } = req.body

    // Valida se planKey foi enviado
    if (!planKey || typeof planKey !== 'string') {
      return res.status(400).json({ 
        error: 'planKey is required and must be a string' 
      })
    }

    // Busca a configuração do plano
    const config = checkoutConfigs[planKey]
    
    if (!config) {
      return res.status(400).json({ 
        error: `Invalid planKey: ${planKey}` 
      })
    }

    // Valida se a chave secreta está configurada
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    
    // Debug log (remove em produção)
    console.log('Stripe key prefix:', stripeSecretKey?.substring(0, 7))
    console.log('All env keys:', Object.keys(process.env).filter(k => k.includes('STRIPE')))
    
    if (!stripeSecretKey) {
      console.error('STRIPE_SECRET_KEY not configured')
      return res.status(500).json({ 
        error: 'Stripe not configured. Please contact support.' 
      })
    }
    
    if (!stripeSecretKey.startsWith('sk_')) {
      console.error('Invalid STRIPE_SECRET_KEY - must start with sk_')
      return res.status(500).json({ 
        error: 'Stripe configuration error. Please contact support.' 
      })
    }

    // Inicializa o Stripe com a chave secreta
    const stripe = new Stripe(stripeSecretKey)

    // Cria a sessão de checkout
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: config.priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: config.successUrl,
      cancel_url: config.cancelUrl,
      locale: config.locale,
    })

    // Retorna a URL da sessão
    return res.status(200).json({ 
      url: session.url 
    })

  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    
    return res.status(500).json({ 
      error: error.message || 'Failed to create checkout session' 
    })
  }
}
