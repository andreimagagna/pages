import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Plan {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  currency: string;
  description: string;
  delivery: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
  cta: string;
}

// Placeholder para dados – substitua pelos dados reais do seu projeto
const plans: Plan[] = [
  { 
    id: 'price_1', 
    name: 'Plano Básico', 
    price: 10,
    oldPrice: 20,
    currency: 'BRL',
    description: 'Descrição do plano',
    delivery: 'Entrega imediata',
    features: ['Feature 1', 'Feature 2'],
    highlight: false,
    badge: '',
    cta: 'Comprar Agora'
  },
  // Adicione mais planos conforme necessário
];

const currencySymbol = 'R$';

interface PricingProps {
  // Adicione props se necessário
}

function Pricing({}: PricingProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async (priceId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      
      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Erro ao iniciar checkout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pricing-container">
      {plans.map((plan: Plan) => (
        <div key={plan.id} className={plan.highlight ? 'highlight' : ''}>
          {plan.highlight && plan.badge && (
            <span className="badge">{t(plan.badge)}</span>
          )}
          <h3>{t(plan.name)}</h3>
          <p className="description">{t(plan.description)}</p>
          <p className="delivery">{t(plan.delivery)}</p>
          
          <div className="price">
            {plan.oldPrice && (
              <span className="old-price">{currencySymbol}{plan.oldPrice}</span>
            )}
            <span className="current-price">{currencySymbol}{plan.price}</span>
          </div>

          <ul className="features">
            {plan.features.map((feature: string, idx: number) => (
              <li key={idx}>{t(feature)}</li>
            ))}
          </ul>

          <button
            onClick={() => handleCheckout(plan.id)}
            disabled={isLoading}
            className={`btn ${isLoading ? 'animate-pulse bg-gray-400' : plan.highlight ? 'bg-blue-600' : 'bg-blue-500'}`}
          >
            {isLoading ? t('Processando...') : t(plan.cta)}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Pricing;
