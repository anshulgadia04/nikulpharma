import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5174";

function resolveProductImageUrl(imagePath) {
  if (!imagePath) return "";
  if (/^(https?:)?\/\//i.test(imagePath) || imagePath.startsWith("data:")) return imagePath;

  const normalized = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  if (normalized.startsWith("/uploads")) return `${API_BASE_URL}${normalized}`;
  if (normalized.startsWith("/images")) return normalized;
  return `${API_BASE_URL}/uploads/products/${normalized.replace(/^\//, "")}`;
}

export default function AdminProducts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imagesUploading, setImagesUploading] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    slug: "",
    category: "",
    subcategory: "",
    description: "",
    features: [""],
    applications: [""],
    specs: {},
    image: "",
    images: [],
    pdf: "",
    accuracy: "",
    price: "Contact for pricing",
    availability: "In stock",
    certifications: [""],
    featured: false,
    tags: [""],
    meta: { title: "", description: "", keywords: [""] },
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products`, {
        withCredentials: true,
      });
      setProducts(res.data.products || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load products!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setEditingProductId(null);
    setProduct({
      name: "",
      slug: "",
      category: "",
      subcategory: "",
      description: "",
      features: [""],
      applications: [""],
      specs: {},
      image: "",
      images: [],
      pdf: "",
      accuracy: "",
      price: "Contact for pricing",
      availability: "In stock",
      certifications: [""],
      featured: false,
      tags: [""],
      meta: { title: "", description: "", keywords: [""] },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (key, index, value) => {
    const updated = [...product[key]];
    updated[index] = value;
    setProduct((prev) => ({ ...prev, [key]: updated }));
  };

  const addArrayItem = (key) => {
    setProduct((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
  };

  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/upload/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setProduct((prev) => ({ ...prev, image: res.data.imageUrl }));
    } catch (err) {
      alert("Image upload failed!");
      console.error(err);
    } finally {
      setImageUploading(false);
    }
  };

  const handleMultipleImagesUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    setImagesUploading(true);
    const formData = new FormData();
    for (const file of files) formData.append("images", file);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/upload/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...res.data.imageUrls],
      }));
    } catch (err) {
      alert("Multiple images upload failed!");
      console.error(err);
    } finally {
      setImagesUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingProductId) {
        await axios.put(`${API_BASE_URL}/api/admin/products/${editingProductId}`, product, {
          withCredentials: true,
        });
        alert("✅ Product updated successfully!");
      } else {
        await axios.post(`${API_BASE_URL}/api/admin/products`, product, {
          withCredentials: true,
        });
        alert("✅ Product added successfully!");
      }
      setIsModalOpen(false);
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to save product!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/products/${id}`, {
        withCredentials: true,
      });
      alert("🗑️ Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product!");
    }
  };

  const handleEdit = (prod) => {
    setEditingProductId(prod._id);
    setProduct(prod);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-colors"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">No products found</p>
          <p className="text-gray-500 text-sm mt-1">Click "Add Product" to create your first product</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={resolveProductImageUrl(p.image)}
                alt={p.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{p.name}</h3>
                <p className="text-sm text-blue-600 font-medium mb-2">{p.category}</p>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {p.description}
                </p>
                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="flex items-center justify-center gap-1 flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded transition-colors"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex items-center justify-center gap-1 flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto py-10">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl shadow-lg mx-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {editingProductId ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" value={product.name} onChange={handleChange} placeholder="Product Name" className="border p-2 rounded w-full" required />
                <input name="slug" value={product.slug} onChange={handleChange} placeholder="Slug" className="border p-2 rounded w-full" required />
                <input name="category" value={product.category} onChange={handleChange} placeholder="Category" className="border p-2 rounded w-full" required />
                <input name="subcategory" value={product.subcategory} onChange={handleChange} placeholder="Subcategory" className="border p-2 rounded w-full" />
              </div>

              <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded w-full" rows={3} required />

              {/* Features */}
              <div>
                <label className="font-semibold text-gray-700">Features:</label>
                {product.features.map((f, i) => (
                  <input key={i} value={f} onChange={(e) => handleArrayChange("features", i, e.target.value)} placeholder={`Feature ${i + 1}`} className="border p-2 rounded w-full mt-1" />
                ))}
                <button type="button" onClick={() => addArrayItem("features")} className="text-blue-600 text-sm mt-1 hover:underline">+ Add Feature</button>
              </div>

              {/* Applications */}
              <div>
                <label className="font-semibold text-gray-700">Applications:</label>
                {product.applications.map((a, i) => (
                  <input key={i} value={a} onChange={(e) => handleArrayChange("applications", i, e.target.value)} placeholder={`Application ${i + 1}`} className="border p-2 rounded w-full mt-1" />
                ))}
                <button type="button" onClick={() => addArrayItem("applications")} className="text-blue-600 text-sm mt-1 hover:underline">+ Add Application</button>
              </div>

              {/* Uploads */}
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Main Image:</label>
                <input type="file" accept="image/*" onChange={handleMainImageUpload} />
                {imageUploading && <p className="text-sm text-gray-500">Uploading...</p>}
                {product.image && <img src={resolveProductImageUrl(product.image)} alt="Preview" className="mt-2 h-24 object-cover rounded" />}
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Additional Images:</label>
                <input type="file" accept="image/*" multiple onChange={handleMultipleImagesUpload} />
                {imagesUploading && <p className="text-sm text-gray-500">Uploading...</p>}
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.images.map((img, i) => (
                    <img key={i} src={resolveProductImageUrl(img)} alt={`Additional ${i}`} className="h-16 w-16 object-cover rounded" />
                  ))}
                </div>
              </div>

              {/* Price & Availability */}
              <div className="grid grid-cols-2 gap-4">
                <input name="price" value={product.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded" />
                <input name="availability" value={product.availability} onChange={handleChange} placeholder="Availability" className="border p-2 rounded" />
              </div>

              {/* Featured */}
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={product.featured} onChange={(e) => setProduct((prev) => ({ ...prev, featured: e.target.checked }))} />
                <label>Featured Product</label>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
                <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white">
                  {loading ? (editingProductId ? "Updating..." : "Saving...") : editingProductId ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
