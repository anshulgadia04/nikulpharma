import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import './index.css'

// Import pages
import HomePage from './app/page.jsx'
import AboutPage from './app/about/page.jsx'
import ProductsPage from './app/products/page.jsx'
import ContactPage from './app/contact/page.jsx'
import MachineInfoPage from './app/machine-info/page.jsx'
import ProductDetailPage from './app/product/[slug].jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/machine-info" element={<MachineInfoPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
