import { useEffect, useState } from "react";

const initialProducts = [
  { id: 1, name: "Smartphone", price: 699, category: "Electronics", stock: 15, description: "" },
  { id: 2, name: "Running Shoes", price: 120, category: "Apparel", stock: 40, description: "" },
  { id: 3, name: "Bluetooth Speaker", price: 50, category: "Electronics", stock: 18, description: "" },
  { id: 4, name: "Office Chair", price: 89, category: "Furniture", stock: 10, description: "" },
];

const PAGE_SIZE = 4;

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  /* 🔹 Debounce Search (500ms) */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  /* 🔹 Filter Products */
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  /* 🔹 Pagination */
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  /* 🔹 Form Validation */
  const validate = () => {
    let newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.price) newErrors.price = "Price is required";
    if (!form.category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* 🔹 Save Product */
  const handleSave = () => {
    if (!validate()) return;

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...form, id: p.id } : p
        )
      );
    } else {
      setProducts((prev) => [
        ...prev,
        { ...form, id: Date.now() },
      ]);
    }

    setShowForm(false);
    setEditingProduct(null);
    setForm({ name: "", price: "", category: "", stock: "", description: "" });
    setErrors({});
  };

  /* 🔹 Edit */
  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm(product);
    setShowForm(true);
  };

  /* 🔹 Delete */
  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="container">
      <h2>Product Dashboard</h2>

      {/* 🔹 Controls */}
      <div className="controls">
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div>
          <button onClick={() => setView("list")}>List View</button>
          <button onClick={() => setView("card")}>Card View</button>
          <button className="primary" onClick={() => setShowForm(true)}>
            Add Product
          </button>
        </div>
      </div>

      {/* 🔹 List View */}
      {view === "list" && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>${p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button className="danger" onClick={() => handleDelete(p.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 🔹 Card View */}
      {view === "card" && (
        <div className="grid">
          {paginatedProducts.map((p) => (
            <div className="card" key={p.id}>
              <h4>{p.name}</h4>
              <p>{p.category}</p>
              <p>${p.price}</p>
              <p>Stock: {p.stock}</p>
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button className="danger" onClick={() => handleDelete(p.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* 🔹 Modal */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editingProduct ? "Edit" : "Add"} Product</h3>

            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <span>{errors.name}</span>}

            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            {errors.price && <span>{errors.price}</span>}

            <input
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            {errors.category && <span>{errors.category}</span>}

            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />   

            <div className="modal-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
