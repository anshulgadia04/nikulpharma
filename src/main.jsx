import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import "./index.css";

import Layout from "@/components/Layout";
import HomePage from "./app/page.jsx";
import AboutUsPage from "./components/AboutUsPage.jsx";
import ProductsPage from "./app/products/page.jsx";
import ProductDetailPage from "./app/product/[slug].jsx";
import ContactPage from "./app/contact/page.jsx";
import BlogPage from "./app/resources/blog.jsx";
import BlogDetailPage from "./app/resources/blog/[slug].jsx";
import VideosPage from "./app/resources/videos.jsx";

// Admin pages
import AdminRoute from "./app/admin/AdminRoute.jsx";
import AdminLogin from "./components/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminAnalytics from "./components/admin/AdminAnalytics";
import AdminProducts from "./components/admin/AdminProducts";
import AdminInquiries from "./components/admin/AdminInquiries";
import AdminLeads from "./components/admin/AdminLeads";
import AdminLeadsPipeline from "./components/admin/AdminLeadsPipeline";
import AdminStaff from "./components/admin/AdminStaff";
import AdminBlogs from "./components/admin/AdminBlogs";
import ISO from "./pages/ISO.jsx"
import GMP from "./pages/GMP.jsx"
// ---------------- Main App ---------------- //
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
      <Routes>
        {/* Public Website Routes */}
        <Route element={<Layout />}>
        <Route path="/ISO" element={<ISO />} />
        <Route path="/GMP" element={<GMP />} />
      
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resources/blog" element={<BlogPage />} />
          <Route path="/resources/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/resources/videos" element={<VideosPage />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Protected Admin Area */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/leads-pipeline" element={<AdminLeadsPipeline />} />
            <Route path="/admin/dashboard" element={<AdminAnalytics />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/inquiries" element={<AdminInquiries />} />
            <Route path="/admin/blogs" element={<AdminBlogs />} />
            <Route path="/admin/leads" element={<AdminLeads />} />
            <Route path="/admin/staff" element={<AdminStaff />} />
          </Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
