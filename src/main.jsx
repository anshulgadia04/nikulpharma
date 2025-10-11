import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import './index.css'

// Import pages
import HomePage from './app/page.jsx'
import AboutUsPage from './components/AboutUsPage.jsx';
import ProductsPage from './app/products/page.jsx'
import ContactPage from './app/contact/page.jsx'
import BlogPage from './app/resources/blog.jsx'
import VideosPage from './app/resources/videos.jsx'
import ProductDetailPage from './app/product/[slug].jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resources/blog" element={<BlogPage />} />
          <Route path="/resources/videos" element={<VideosPage />} />
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
