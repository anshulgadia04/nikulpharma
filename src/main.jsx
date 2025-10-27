import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Layout from "@/components/Layout";
import HomePage from "./app/page.jsx";
import AboutUsPage from "./components/AboutUsPage.jsx";
import ProductsPage from "./app/products/page.jsx";
import ProductDetailPage from "./app/product/[slug].jsx";
import ContactPage from "./app/contact/page.jsx";
import BlogPage from "./app/resources/blog.jsx";
import VideosPage from "./app/resources/videos.jsx";

// Admin pages
import AdminRoute from "./app/admin/AdminRoute.jsx";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";

// ---------------- Main App ---------------- //
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public Website Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resources/blog" element={<BlogPage />} />
          <Route path="/resources/videos" element={<VideosPage />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Protected Admin Area */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
