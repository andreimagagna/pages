import { motion } from 'framer-motion'
import { CheckCircle, Mail, ArrowLeft } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const Success = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Detecta o idioma pela URL (/pt/sucesso ou /en/success)
  const lang = location.pathname.includes('/en/') ? 'en' : 'pt'

  const content = {
    pt: {
      title: 'Pagamento Confirmado!',
      subtitle: 'Obrigado pela sua compra',
      message: 'Vamos enviar o formulário para o email cadastrado na compra em alguns instantes.',
      checkEmail: 'Verifique sua caixa de entrada e spam',
      support: 'Precisa de ajuda? Entre em contato:',
      backButton: 'Voltar para a página inicial'
    },
    en: {
      title: 'Payment Confirmed!',
      subtitle: 'Thank you for your purchase',
      message: 'We will send the form to the email registered in the purchase in a few moments.',
      checkEmail: 'Check your inbox and spam folder',
      support: 'Need help? Contact us:',
      backButton: 'Back to home page'
    }
  }

  const text = content[lang as 'pt' | 'en'] || content.pt

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-earth-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-elegant p-8 md:p-12 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <CheckCircle className="w-24 h-24 text-green-500" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-primary-900 mb-4"
          >
            {text.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-earth-700 mb-8"
          >
            {text.subtitle}
          </motion.p>

          {/* Message Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-earth-50 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start gap-4 mb-4">
              <Mail className="w-6 h-6 text-earth-700 flex-shrink-0 mt-1" />
              <div className="text-left">
                <p className="text-primary-700 text-lg mb-2">
                  {text.message}
                </p>
                <p className="text-primary-600 text-sm">
                  {text.checkEmail}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8 p-4 bg-primary-50 rounded-lg"
          >
            <p className="text-primary-600 text-sm mb-2">{text.support}</p>
            <a 
              href="mailto:andrei@futuree.org"
              className="text-earth-700 font-semibold hover:text-earth-800 transition-colors inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              andrei@futuree.org
            </a>
          </motion.div>

          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            onClick={() => navigate(`/${lang}`)}
            className="btn btn-secondary inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            {text.backButton}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default Success
