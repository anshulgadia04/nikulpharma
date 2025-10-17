import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, ChevronDown, Settings, Cpu, Wrench, Zap, Layers, ArrowRight, MessageCircle, Star, CheckCircle, Package, Shield, Target, Microscope, Sun, RotateCcw, Grid, List, X, Loader2 } from 'lucide-react';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { resolveProductImageUrl } from '@/utils/api';

// Icon mapping for categories
const iconMap = {
  'Pill': Package,
  'Zap': Zap,
  'Shield': Shield,
  'RotateCcw': RotateCcw,
  'Sun': Sun,
  'Target': Target,
  'Microscope': Microscope,
  'Package': Package,
  'Cpu': Cpu
};

export default function ProductsPage() {
  const { products: allProducts, loading: productsLoading, error: productsError } = useProducts();
  const { categories: productCategories, loading: categoriesLoading, error: categoriesError } = useCategories();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [availability, setAvailability] = useState('all');
  const sectionRefs = useRef({});

  // Filter available products based on categories. If categories not loaded, show all products
  const categoryIds = new Set(productCategories.map(c => c.id));
  const availableProducts = allProducts; // Show all products for now
  
  // Debug logging
  console.log('Products loaded:', allProducts.length);
  console.log('Categories loaded:', productCategories.length);
  console.log('Available products:', availableProducts.length);

  // Get subcategories for the selected category
  const getSubcategories = (categoryId) => {
    if (categoryId === 'all') return ['all'];
    const categoryProducts = availableProducts.filter(p => p.category === categoryId);
    return ['all', ...new Set(categoryProducts.map(p => p.subcategory))];
  };

  const subcategories = getSubcategories(selectedCategory);

  // Filter products based on selected criteria
  const filteredProducts = availableProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === 'all' || product.subcategory === selectedSubcategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.applications.some(app => app.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesAvailability = availability === 'all' || product.availability === availability;
    
    return matchesCategory && matchesSubcategory && matchesSearch && matchesAvailability;
  });

  // Debug logging
  console.log('Filtered products:', filteredProducts.length);
  console.log('Selected category:', selectedCategory);
  console.log('Search term:', searchTerm);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'category':
        return a.category.localeCompare(b.category);
      case 'accuracy':
        return parseFloat(a.accuracy.replace(/[±%]/g, '')) - parseFloat(b.accuracy.replace(/[±%]/g, ''));
      default:
        return 0;
    }
  });

  // Loading state
  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (productsError || categoriesError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="text-red-600 text-lg font-semibold mb-2">Error Loading Products</div>
            <p className="text-red-700 mb-4">
              {productsError || categoriesError}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Map industry names from the homepage to product categories on this page
  const industryToCategory = {
    'Pharmaceuticals': 'quality-control',
    'Biotechnology': 'automation-systems',
    'Chemical Processing': 'mixing-equipment',
    'Food & Beverages': 'packaging-equipment'
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('category');
    if (raw) {
      const decoded = decodeURIComponent(raw);
      const mapped = industryToCategory[decoded] || decoded;
      if (productCategories.find(cat => cat.id === mapped)) {
        setSelectedCategory(mapped);
      }
    }
  }, []);

  const handleSendQuery = (product) => {
    window.location.href = `/contact?product=${encodeURIComponent(product.name)}`;
  };

  const getCategoryIcon = (categoryId) => {
    const category = productCategories.find(cat => cat.id === categoryId);
    if (!category) return Package;
    const IconComponent = iconMap[category.icon] || Package;
    return IconComponent;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <a href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </a>
          <h1 className="text-5xl md:text-6xl font-light mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Pharmaceutical Equipment
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mb-8">
            Discover our comprehensive range of pharmaceutical manufacturing equipment designed for precision, efficiency, and compliance.
          </p>
        </div>
      </section>

      {/* Category Selection */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                selectedCategory === 'all'
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <Layers className="w-6 h-6 mb-2" />
              <div className="font-medium">All Products</div>
              <div className="text-sm opacity-75">{availableProducts.length} items</div>
            </button>
            {productCategories.map((category) => {
              const IconComponent = getCategoryIcon(category.id);
              const categoryProducts = availableProducts.filter(p => p.category === category.id);
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    selectedCategory === category.id
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <IconComponent className="w-6 h-6 mb-2" />
                  <div className="font-medium">{category.name}</div>
                  <div className="text-sm opacity-75">{categoryProducts.length} items</div>
                </button>
              );
            })}
          </div>
          {/* Quick Jump Anchors */}
          {selectedCategory === 'all' && (
            <div className="mt-6 flex flex-wrap gap-2">
              {productCategories.map(cat => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="px-3 py-1 rounded-full border text-sm text-gray-700 hover:bg-gray-50"
                >
                  {cat.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search equipment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 bg-white"
                />
              </div>
              
              <div className="flex gap-4">
                <select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 bg-white"
                >
                  <option value="all">All Types</option>
                  {subcategories.slice(1).map(subcategory => (
                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 bg-white"
                >
                  <option value="name">Sort by Name</option>
                  <option value="category">Sort by Category</option>
                  <option value="accuracy">Sort by Accuracy</option>
                </select>

                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 bg-white"
                >
                  <option value="all">All Availability</option>
                  <option value="In stock">In Stock</option>
                  <option value="Custom build">Custom Build</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center bg-white rounded-xl border border-gray-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-l-xl transition-colors ${
                    viewMode === 'grid' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-r-xl transition-colors ${
                    viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              
              <div className="text-sm text-gray-600">
                {filteredProducts.length} equipment found
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Display */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-500 text-lg mb-4">No products found</div>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          ) : viewMode === 'grid' ? (
            selectedCategory === 'all' ? (
              <div className="space-y-22">
                {productCategories.map(category => {
                  const categoryProducts = sortedProducts.filter(p => p.category === category.id);
                  if (categoryProducts.length === 0) return null;
                  return (
                    <div key={category.id} id={category.id} ref={el => { sectionRefs.current[category.id] = el; }}>
                      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        {category.name}
                      </h2>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {categoryProducts.map((product) => {
                          const categoryData = productCategories.find(cat => cat.id === product.category);
                          const IconComponent = getCategoryIcon(product.category);
                          return (
                            <div key={product._id || product.id || product.slug} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden border border-gray-100 flex flex-col h-full">
                              <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 relative">
                                <Link to={`/product/${product.slug}`}>
                                  <img 
                                    src={resolveProductImageUrl(product.image)} 
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                  />
                                </Link>
                                <div className="absolute top-4 left-4">
                                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${categoryData?.color || 'from-gray-500 to-gray-600'}`}>
                                    <IconComponent className="w-3 h-3 mr-1" />
                                    {categoryData?.name || product.category}
                                  </div>
                                </div>
                                <div className="absolute top-4 right-4">
                                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    product.availability === 'In stock' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {product.availability}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-sm font-medium text-gray-500">
                                    {product.subcategory}
                                  </span>
                                  <div className="flex items-center text-yellow-500">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="text-sm font-medium ml-1">4.8</span>
                                  </div>
                                </div>
                                
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                  <Link to={`/product/${product.slug}`} className="hover:text-gray-600 transition-colors">
                                    {product.name}
                                  </Link>
                                </h3>
                                
                                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                                  {product.description}
                                </p>
                                
                                <div className="mb-4">
                                  <div className="text-sm font-medium text-gray-900 mb-2">Key Features:</div>
                                  <div className="space-y-1">
                                    {product.features.slice(0, 2).map((feature, index) => (
                                      <div key={index} className="text-sm text-gray-600 flex items-center">
                                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                        <span className="line-clamp-1">{feature}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="mb-6">
                                  <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Accuracy:</span>
                                    <span className="font-medium text-gray-900">{product.accuracy}</span>
                                  </div>
                                </div>

                                <div className="flex space-x-3 mt-auto">
                                  <button 
                                    onClick={() => handleSendQuery(product)}
                                      className="flex-1 bg-[#09243c] text-white py-3 px-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center text-sm font-medium group"
                                  >
                                      <MessageCircle className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                                    Get Quote
                                  </button>
                                  <Link 
                                    to={`/product/${product.slug}`}
                                    className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300 text-sm font-medium flex items-center justify-center"
                                  >
                                    <ArrowRight className="w-4 h-4" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => {
                const category = productCategories.find(cat => cat.id === product.category);
                const IconComponent = getCategoryIcon(product.category);
                return (
                  <div key={product._id || product.id || product.slug} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden border border-gray-100 flex flex-col h-full">
                    <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 relative">
                      <Link to={`/product/${product.slug}`}>
                        <img 
                          src={resolveProductImageUrl(product.image)} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </Link>
                      <div className="absolute top-4 left-4">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${category?.color || 'from-gray-500 to-gray-600'}`}>
                          <IconComponent className="w-3 h-3 mr-1" />
                          {category?.name || product.category}
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.availability === 'In stock' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {product.availability}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-500">
                          {product.subcategory}
                        </span>
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-medium ml-1">4.8</span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        <Link to={`/product/${product.slug}`} className="hover:text-gray-600 transition-colors">
                          {product.name}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                      
                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-900 mb-2">Key Features:</div>
                        <div className="space-y-1">
                          {product.features.slice(0, 2).map((feature, index) => (
                            <div key={index} className="text-sm text-gray-600 flex items-center">
                              <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                              <span className="line-clamp-1">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-900 mb-2">Applications:</div>
                        <div className="flex flex-wrap gap-1">
                          {product.applications.slice(0, 2).map((app, index) => (
                            <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Accuracy:</span>
                          <span className="font-medium text-gray-900">{product.accuracy}</span>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleSendQuery(product)}
                                      className="flex-1 bg-[#09243c] text-white py-3 px-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center text-sm font-medium group"
                        >
                                      <MessageCircle className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                          Get Quote
                        </button>
                        <Link 
                          to={`/product/${product.slug}`}
                          className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300 text-sm font-medium flex items-center justify-center"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            )
          ) : (
            <div className="space-y-6">
              {sortedProducts.map((product) => {
                const category = productCategories.find(cat => cat.id === product.category);
                const IconComponent = getCategoryIcon(product.category);
                return (
                  <div key={product._id || product.id || product.slug} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-80 aspect-[4/3] md:aspect-auto overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                        <Link to={`/product/${product.slug}`}>
                          <img 
                            src={resolveProductImageUrl(product.image)} 
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          />
                        </Link>
                      </div>
                      
                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${category?.color || 'from-gray-500 to-gray-600'}`}>
                                <IconComponent className="w-3 h-3 mr-1" />
                                {category?.name || product.category}
                              </div>
                              <span className="text-sm text-gray-500">{product.subcategory}</span>
                              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                product.availability === 'In stock' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {product.availability}
                              </div>
                            </div>
                            
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              <Link to={`/product/${product.slug}`} className="hover:text-gray-600 transition-colors">
                                {product.name}
                              </Link>
                            </h3>
                            
                            <p className="text-gray-600 mb-4 leading-relaxed">
                              {product.description}
                            </p>
                          </div>
                          
                          <div className="flex items-center text-yellow-500 mb-4 md:mb-0">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-medium ml-1">4.8</span>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <div className="text-sm font-medium text-gray-900 mb-2">Key Features:</div>
                            <div className="space-y-1">
                              {product.features.slice(0, 3).map((feature, index) => (
                                <div key={index} className="text-sm text-gray-600 flex items-center">
                                  <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium text-gray-900 mb-2">Applications:</div>
                            <div className="flex flex-wrap gap-1">
                              {product.applications.slice(0, 3).map((app, index) => (
                                <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                                  {app}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6 text-sm">
                            <div>
                              <span className="text-gray-500">Accuracy:</span>
                              <span className="font-medium text-gray-900 ml-1">{product.accuracy}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Price:</span>
                              <span className="font-medium text-gray-900 ml-1">{product.price}</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-3">
                            <button 
                              onClick={() => handleSendQuery(product)}
                               className="bg-[#09243c] text-white py-2 px-6 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center text-sm font-medium group"
                            >
                                      <MessageCircle className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                              Get Quote
                            </button>
                            <Link 
                              to={`/product/${product.slug}`}
                              className="px-6 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300 text-sm font-medium flex items-center"
                            >
                              View Details
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No equipment found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}