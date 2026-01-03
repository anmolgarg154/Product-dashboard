import { useEffect, useState } from "react";

const initialProducts = [
  {
    id: 1,
    name: "Smartphone",
    price: 14999,
    category: "Electronics",
    stock: 15,
    description: "High performance smartphone with OLED display.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 3500,
    category: "Apparel",
    stock: 40,
    description: "Comfortable running shoes for daily workouts.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 1999,
    category: "Electronics",
    stock: 18,
    description: "Portable speaker with powerful bass.",
    image: "https://m.media-amazon.com/images/I/81-YRA6tQqL.jpg",
  },
  {
    id: 4,
    name: "Office Chair",
    price: 2999,
    category: "Furniture",
    stock: 10,
    description: "Ergonomic office chair with lumbar support.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
  },
  {
    id: 5,
    name: "Laptop",
    price: 40999,
    category: "Electronics",
    stock: 8,
    description: "Lightweight laptop for work and study.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  },
  {
    id: 6,
    name: "Wrist Watch",
    price: 999,
    category: "Accessories",
    stock: 25,
    description: "Stylish wrist watch with leather strap.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: 7,
    name: "Backpack",
    price: 799,
    category: "Accessories",
    stock: 30,
    description: "Durable backpack for travel and college.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    id: 8,
    name: "Headphones",
    price: 1499,
    category: "Electronics",
    stock: 22,
    description: "Noise cancelling over-ear headphones.",
    image: "https://dockuniverse.com/wp-content/uploads/2025/05/wireless_noise_cancelling_headphones-157.jpg",
  },
  {
    id: 9,
    name: "Coffee Mug",
    price: 150,
    category: "Kitchen",
    stock: 50,
    description: "Ceramic coffee mug for daily use.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
  },
  {
    id: 10,
    name: "Desk Lamp",
    price: 350,
    category: "Furniture",
    stock: 14,
    description: "LED desk lamp with adjustable brightness.",
    image: "https://images.unsplash.com/photo-1507477338202-487281e6c27e",
  },
  {
    id: 11,
    name: "Gaming Mouse",
    price: 450,
    category: "Electronics",
    stock: 20,
    description: "High precision gaming mouse.",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
  },
  {
    id: 12,
    name: "Keyboard",
    price: 499,
    category: "Electronics",
    stock: 18,
    description: "Mechanical keyboard with RGB lights.",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
  },
  {
    id: 13,
    name: "Sunglasses",
    price: 599,
    category: "Accessories",
    stock: 35,
    description: "UV protected sunglasses.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
  },
  {
    id: 14,
    name: "Water Bottle",
    price: 399,
    category: "Fitness",
    stock: 60,
    description: "Reusable stainless steel water bottle.",
    image: "https://naturalbabymama.com/wp-content/uploads/2021/05/The-best-eco-friendly-reusable-water-bottles-feature-image-1-1-1536x1024.png",
  },
];

const PAGE_SIZE = 6;

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [view, setView] = useState("card");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="container my-3">
      <h4 className="mb-3 text-center text-md-start">Product Dashboard</h4>

      {/* Controls */}
      <div className="row g-2 mb-3">
        <div className="col-12 col-md-4">
          <input
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-8 text-md-end">
          <div className="btn-group w-100 w-md-auto">
            <button
              className={`btn btn-outline-success ${view === "list" && "active"}`}
              onClick={() => setView("list")}
            >
              List
            </button>
            <button
              className={`btn btn-outline-primary ${view === "card" && "active"}`}
              onClick={() => setView("card")}
            >
              Card
            </button>
            
          </div>
          
        </div>
      </div>

      {/* List View */}
      {view === "list" && (
        <div className="table-responsive d-flex justify-content-center align-items-center text-center">
          <table className="table  table-bordered   table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th className="d-none d-md-table-cell">Description</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="img-thumbnail"
                      style={{ width: 60, height: 60, objectFit: "cover" }}
                    />
                  </td>
                  <td>{p.name}</td>
                  <td className="d-none d-md-table-cell">{p.description}</td>
                  <td>{p.price}</td>
                  <td>{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Card View */}
      {view === "card" && (
        <div className="row">
          {paginatedProducts.map((p) => (
            <div className="col-12 col-sm-6 col-lg-4 mb-3" key={p.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={p.image}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: 160, objectFit: "cover" }}
                />
                <div className="card-body">
                  <h6>{p.name}</h6>
                  <p className="small text-muted">{p.description}</p>
                  <p className="mb-1">${p.price}</p>
                  <span className="badge bg-secondary">{p.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i} className={`page-item ${page === i + 1 && "active"}`}>
              <button className="page-link" onClick={() => setPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
