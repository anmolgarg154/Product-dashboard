import { useEffect, useState } from "react";

const initialProducts = [
  {
    id: 1,
    name: "Smartphone",
    price: 699,
    category: "Electronics",
    stock: 15,
    description: "High performance smartphone with OLED display.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 120,
    category: "Apparel",
    stock: 40,
    description: "Comfortable running shoes for daily workouts.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 50,
    category: "Electronics",
    stock: 18,
    description: "Portable speaker with powerful bass.",
    image: "https://tse2.mm.bing.net/th/id/OIP.eCs9cN4sXHeD7skeAAbJ3wHaHa?pid=Api&P=0&h=180",
  },
  {
    id: 4,
    name: "Office Chair",
    price: 89,
    category: "Furniture",
    stock: 10,
    description: "Ergonomic office chair with lumbar support.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
  },
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
    image: "",
  });

  const [errors, setErrors] = useState({});

  /* 🔹 Debounce Search */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  /* 🔹 Filter + Pagination */
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  /* 🔹 Validation */
  const validate = () => {
    const err = {};
    if (!form.name) err.name = "Name is required";
    if (!form.price) err.price = "Price is required";
    if (!form.category) err.category = "Category is required";
    if (!form.image) err.image = "Image URL is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* 🔹 Save */
  const handleSave = () => {
    if (!validate()) return;

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...form, id: p.id } : p
        )
      );
    } else {
      setProducts((prev) => [...prev, { ...form, id: Date.now() }]);
    }

    setShowForm(false);
    setEditingProduct(null);
    setForm({
      name: "",
      price: "",
      category: "",
      stock: "",
      description: "",
      image: "",
    });
    setErrors({});
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="container my-4 ">
      <h3 className="mb-4">Product Dashboard</h3>

      {/* 🔹 Controls */}
      <div className="row g-2 mb-3 align-items-center">
        <div className="col-12 col-md-4">
          <input
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-8 text-md-end">
          <div className="btn-group me-2">
            <button
              className={`btn btn-outline-primary ${
                view === "list" && "active"
              }`}
              onClick={() => setView("list")}
            >
              List
            </button>
            <button
              className={`btn btn-outline-primary ${
                view === "card" && "active"
              }`}
              onClick={() => setView("card")}
            >
              Card
            </button>
          </div>
          <button className="btn btn-success" onClick={() => setShowForm(true)}>
            Add Product
          </button>
        </div>
      </div>

      {/* 🔹 LIST VIEW */}
      {view === "list" && (
        <div className="table-responsive d-flex justify-content-center text-center">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th width="160">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img
                      src={p.image}
                      alt={p.name}
                      className=" rounded"
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>{p.category}</td>
                  <td>${p.price}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔹 CARD VIEW */}
      {view === "card" && (
        <div className="row">
          {paginatedProducts.map((p) => (
            <div className="col-12 col-sm-6 col-lg-3 mb-4" key={p.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={p.image}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "160px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="text-muted mb-1">{p.category}</p>
                  <p className="small">{p.description}</p>
                  <p className="mb-1">${p.price}</p>
                  <p>Stock: {p.stock}</p>
                </div>
                <div className="card-footer bg-white border-0">
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`page-item ${page === i + 1 && "active"}`}
            >
              <button
                className="page-link"
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* 🔹 MODAL */}
      {showForm && (
        <div className="modal show d-block bg-dark bg-opacity-50">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5>{editingProduct ? "Edit" : "Add"} Product</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                />
              </div>

              <div className="modal-body">
                {["name", "price", "category", "stock", "image"].map((field) => (
                  <div className="mb-2" key={field}>
                    <input
                      type={
                        field === "price" || field === "stock"
                          ? "number"
                          : "text"
                      }
                      className="form-control"
                      placeholder={field}
                      value={form[field]}
                      onChange={(e) =>
                        setForm({ ...form, [field]: e.target.value })
                      }
                    />
                    {errors[field] && (
                      <small className="text-danger">
                        {errors[field]}
                      </small>
                    )}
                  </div>
                ))}

                {form.image && (
                  <img
                    src={form.image}
                    alt="preview"
                    className="img-fluid rounded mb-2"
                    style={{ maxHeight: "150px", objectFit: "cover" }}
                  />
                )}

                <textarea
                  className="form-control"
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
