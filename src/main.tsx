import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import './index.css'
import './i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-primary-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-earth-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-primary-600 font-semibold">Carregando...</p>
          </div>
        </div>
      }>
        <Routes>
          {/* Redirect root to PT (default language) */}
          <Route path="/" element={<Navigate to="/pt" replace />} />
          
          {/* Language routes */}
          <Route path="/:lang/*" element={<App />} />
          
          {/* Catch all - redirect to PT */}
          <Route path="*" element={<Navigate to="/pt" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
)

