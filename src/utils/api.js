// API Service for communicating with the backend
// - Production: same-origin (empty string) unless a non-localhost absolute URL is explicitly provided
// - Development: use VITE_API_BASE_URL or fallback to localhost:5174
const rawBase = import.meta.env.VITE_API_BASE_URL || ''
const isProd = import.meta.env.MODE === 'production'
let API_BASE_URL = ''
if (isProd) {
  // Ignore localhost-like URLs in production to avoid private network CORS issues
  if (rawBase && /^https?:\/\//i.test(rawBase) && !/localhost|127\.0\.0\.1/i.test(rawBase)) {
    API_BASE_URL = rawBase
  } else {
    API_BASE_URL = ''
  }
} else {
  API_BASE_URL = rawBase || 'http://localhost:5174'
}

// Resolve product image URL coming from DB or static paths
export function resolveProductImageUrl(imagePath) {
  if (!imagePath) return '';
  // Absolute URL (http/https) or data URLs should pass through
  if (/^(https?:)?\/\//i.test(imagePath) || imagePath.startsWith('data:')) {
    return imagePath;
  }
  // Server serves uploads at /uploads; ensure absolute to API host when needed
  // If path already starts with /uploads or /images, return as-is for same-origin setups
  if (imagePath.startsWith('/uploads') || imagePath.startsWith('/images')) {
    return imagePath.startsWith('/uploads') && API_BASE_URL
      ? `${API_BASE_URL}${imagePath}`
      : imagePath;
  }
  // Otherwise assume it's a filename from the uploader and mount under /uploads/products
  const normalized = imagePath.replace(/^\/*/, '');
  const relative = `/uploads/products/${normalized}`;
  return API_BASE_URL ? `${API_BASE_URL}${relative}` : relative;
}

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        ...options.headers,
      },
      cache: 'no-store',
      credentials: 'include', // <--- add this line
      ...options,
    };


    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Products API
  async getProducts(params = {}) {
    const qs = new URLSearchParams(params);
    const endpoint = `/api/products${qs.toString() ? `?${qs.toString()}` : ''}`;
    return this.request(endpoint);
  }

  async getProduct(slug) {
    return this.request(`/api/products/${slug}`);
  }

  async getCategories() {
    return this.request('/api/categories');
  }

  // Admin Products API
  async createProduct(productData) {
    return this.request('/api/admin/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id, productData) {
    return this.request(`/api/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id) {
    return this.request(`/api/admin/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Inquiries API
  async submitInquiry(inquiryData) {
    return this.request('/api/inquiries', {
      method: 'POST',
      body: JSON.stringify(inquiryData),
    });
  }

  // Admin Inquiries API
  async getInquiries(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = `/api/admin/inquiries${queryParams ? `?${queryParams}` : ''}`;
    return this.request(endpoint);
  }

  async getInquiry(id) {
    return this.request(`/api/admin/inquiries/${id}`);
  }

  async updateInquiry(id, updateData) {
    return this.request(`/api/admin/inquiries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  async getInquiryStats() {
    return this.request('/api/admin/inquiries/stats');
  }

  // Image Upload API
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    
    return this.request('/api/upload/image', {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set it with boundary
      body: formData,
    });
  }

  async uploadImages(files) {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images`, file);
    });
    
    return this.request('/api/upload/images', {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set it with boundary
      body: formData,
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  } 

    // --- Admin Auth API ---
  async loginAdmin(username, password) {
    return this.request('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async checkAdminAuth() {
    return this.request('/api/admin/check');
  }

  async logoutAdmin() {
    return this.request('/api/admin/logout', {
      method: 'POST',
    });
  }

  // --- Blog API ---
  async getBlogs(params = {}) {
    const qs = new URLSearchParams(params);
    const endpoint = `/api/blogs${qs.toString() ? `?${qs.toString()}` : ''}`;
    return this.request(endpoint);
  }

  async getBlog(slug) {
    return this.request(`/api/blogs/${slug}`);
  }

  async adminListBlogs() {
    return this.request('/api/admin/blogs');
  }

  async createBlog(data) {
    return this.request('/api/admin/blogs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBlog(id, data) {
    return this.request(`/api/admin/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteBlog(id) {
    return this.request(`/api/admin/blogs/${id}`, {
      method: 'DELETE',
    });
  }


}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Export wrapper functions to preserve `this` binding
export function getProducts(params) { return apiService.getProducts(params); }
export function getProduct(slug) { return apiService.getProduct(slug); }
export function getCategories() { return apiService.getCategories(); }
export function createProduct(data) { return apiService.createProduct(data); }
export function updateProduct(id, data) { return apiService.updateProduct(id, data); }
export function deleteProduct(id) { return apiService.deleteProduct(id); }
export function submitInquiry(data) { return apiService.submitInquiry(data); }
export function getInquiries(params) { return apiService.getInquiries(params); }
export function getInquiry(id) { return apiService.getInquiry(id); }
export function updateInquiry(id, data) { return apiService.updateInquiry(id, data); }
export function getInquiryStats() { return apiService.getInquiryStats(); }
export function uploadImage(file) { return apiService.uploadImage(file); }
export function uploadImages(files) { return apiService.uploadImages(files); }
export function healthCheck() { return apiService.healthCheck(); }
export function loginAdmin(username, password) { return apiService.loginAdmin(username, password); }
export function checkAdminAuth() { return apiService.checkAdminAuth(); }
export function logoutAdmin() { return apiService.logoutAdmin(); }

// Blog API wrappers
export function getBlogs(params) { return apiService.getBlogs(params); }
export function getBlog(slug) { return apiService.getBlog(slug); }
export function adminListBlogs() { return apiService.adminListBlogs(); }
export function createBlog(data) { return apiService.createBlog(data); }
export function updateBlog(id, data) { return apiService.updateBlog(id, data); }
export function deleteBlog(id) { return apiService.deleteBlog(id); }

