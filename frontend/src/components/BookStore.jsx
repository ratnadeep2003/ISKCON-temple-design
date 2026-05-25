import { useMemo, useState, useEffect } from "react";

const INITIAL_PRODUCTS = [
  { id: 1, name: "Bhagavad Gita As It Is", category: "Books", price: 299, rating: 4.9, image: "https://krishnastore.com/images/cache/BGC-450x676.webp", description: "Classic spiritual wisdom with verse-by-verse explanations." },
  { id: 2, name: "Srimad Bhagavatam", category: "Books", price: 799, rating: 5.0, image: "https://www.touchstonemedia.com/cdn/shop/products/original-srimad-bhagavatam-set-pre-1978-10-volumes-philosophy-238_1024x.jpg?v=1647437429", description: "Deep devotional literature for daily reading and study." },
  { id: 3, name: "Tulsi Japa Beads", category: "Japa Beads", price: 149, rating: 4.8, image: "https://tulsimalastore.in/cdn/shop/files/2AD50169-56A6-4598-9B4E-0D1EEF41128A.jpg?v=1744465663&width=1946", description: "Sacred beads for chanting and meditation." },
  { id: 4, name: "Herbal Incense Pack", category: "Herbal Products", price: 99, rating: 4.7, image: "https://rkmswanirvar.org/wp-content/uploads/2023/03/Pallimangal-Mockup.jpg", description: "Pure devotional fragrance for daily puja." },
  { id: 5, name: "Deity Krishna Dress Set", category: "Devotional Items", price: 499, rating: 4.9, image: "https://images.jdmagicbox.com/quickquotes/images_main/velvet-god-radha-krishna-statue-dress-2229191169-bsingktc.jpg", description: "Beautiful attire for temple worship and festivals." },
  { id: 6, name: "Organic Herbal Tea", category: "Herbal Products", price: 179, rating: 4.6, image: "https://media.istockphoto.com/id/597657478/photo/like-tea.jpg?s=612x612&w=0&k=20&c=PgfvY_uI6B1K3FYV_wNen0hC32JVk6Mhm0yKIrFn6tI=", description: "A peaceful blend for a sattvic lifestyle." },
];

const CATEGORIES = ["All", "Books", "Japa Beads", "Herbal Products", "Devotional Items"];

export default function BookStore() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [successMsg, setSuccessMsg] = useState("");

  const isAdmin = localStorage.getItem("userRole") === "admin";

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddItem = () => {
    const name = prompt("Enter Product Name:");
    if (!name) return;
    const category = prompt(`Enter Category:\nChoose from: ${CATEGORIES.filter(c => c !== 'All').join(', ')}`, "Books");
    const price = parseFloat(prompt("Enter Price (INR):") || "0");
    const image = prompt("Enter Image URL:", "https://krishnastore.com/images/cache/BGC-450x676.webp");
    const description = prompt("Enter Description:");
    setProducts(prev => [...prev, { id: Date.now(), name, category, price, rating: 5.0, image, description }]);
    alert("Product added successfully!");
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = activeCategory === "All" || p.category === activeCategory;
      const q = search.toLowerCase();
      return matchCategory && (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    });
  }, [activeCategory, search, products]);

  const addToCart = (product) => {
    if (isAdmin) return alert("Admins are in management mode and cannot place orders.");
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item)).filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      {successMsg && <div style={styles.successBanner}>{successMsg}</div>}
      <div style={styles.page}>
        <header style={styles.hero}>
          <div>
            <p style={styles.kicker}>ISKCON BOOK TRUST</p>
            <h1 style={styles.title}>Sacred Store</h1>
            <p style={styles.subtitle}>Spiritual books, beads, and devotional essentials.</p>
          </div>
          {!isAdmin && (
            <div style={styles.cartBadge}>
              <div style={{ fontFamily: "'Cinzel', serif", color: "#E8B84B" }}>Cart</div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>{totalItems}</div>
            </div>
          )}
        </header>

        <div style={styles.controls}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." style={styles.search} />
          {isAdmin && <button style={styles.addItemBtn} onClick={handleAddItem}>+ Add Item</button>}
          <div style={styles.chips}>
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{ ...styles.chip, ...(activeCategory === cat ? styles.chipActive : {}) }}>{cat}</button>
            ))}
          </div>
        </div>

        <div style={styles.layoutRoot}>
          <main style={styles.main}>
            <div style={styles.grid}>
              {filteredProducts.map((product) => (
                <article key={product.id} style={styles.card}>
                  <img src={product.image} alt={product.name} style={styles.image} />
                  <div style={styles.cardBody}>
                    <h3 style={styles.cardTitle}>{product.name}</h3>
                    <p style={styles.desc}>{product.description}</p>
                    <div style={styles.rowBottom}>
                      <span style={styles.price}>₹{product.price}</span>
                      <button style={styles.addBtn} onClick={() => addToCart(product)} disabled={isAdmin}>
                        {isAdmin ? "Admin View" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </main>

          {!isAdmin && cart.length > 0 && (
            <aside style={styles.paymentSidebar}>
              <h3 style={{ fontSize: "16px", margin: "0 0 12px", color: "#E8B84B" }}>
                Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "400px", overflowY: "auto" }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px", background: "#33141c", borderRadius: "8px" }}>
                    <img src={item.image} alt={item.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "13px", fontWeight: "500", color: "#f5e9d0" }}>{item.name}</div>
                      <div style={{ fontSize: "12px", color: "rgba(245,233,208,0.5)" }}>₹{item.price}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <button style={{ padding: "4px 8px", background: "rgba(201,146,42,0.2)", border: "1px solid #c9922a", borderRadius: "4px", color: "#E8B84B", cursor: "pointer" }} onClick={() => updateQty(item.id, -1)}>−</button>
                      <span style={{ minWidth: "24px", textAlign: "center" }}>{item.quantity}</span>
                      <button style={{ padding: "4px 8px", background: "rgba(201,146,42,0.2)", border: "1px solid #c9922a", borderRadius: "4px", color: "#E8B84B", cursor: "pointer" }} onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", padding: "10px 0", borderTop: "1px solid rgba(201,146,42,0.2)" }}>
                <div>
                  <div style={{ fontSize: "14px", color: "rgba(245,233,208,0.7)" }}>Subtotal</div>
                  <div style={{ fontSize: "16px", fontWeight: "600", color: "#E8B84B" }}>₹{subtotal}</div>
                </div>
                <button
                  style={{ background: "linear-gradient(135deg, #c9922a, #a47219)", border: "none", padding: "10px 20px", borderRadius: "8px", color: "#1a0b0f", fontWeight: "600", cursor: "pointer" }}
                  onClick={() => {
                    alert(`Proceeding to payment for ₹${subtotal}.`);
                    // After real payment: setCart([]); localStorage.removeItem("cart");
                  }}
                >
                  Proceed to Payment
                </button>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  page: { background: "#15060a", minHeight: "100vh", color: "#f5e9d0", fontFamily: "'Inter', sans-serif", padding: "24px 16px" },
  hero: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
  kicker: { fontSize: "11px", color: "#E8B84B", letterSpacing: "2px", margin: 0 },
  title: { fontFamily: "'Cinzel', serif", fontSize: "28px", margin: "4px 0" },
  subtitle: { color: "rgba(245,233,208,0.5)", fontSize: "13px", margin: 0 },
  cartBadge: { textAlign: "center", background: "#220c11", padding: "10px 16px", borderRadius: "10px", border: "1px solid rgba(201,146,42,0.2)" },
  controls: { display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" },
  search: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "8px", padding: "10px 14px", color: "#f5e9d0", outline: "none" },
  addItemBtn: { background: "linear-gradient(135deg, #c9922a, #a47219)", border: "none", padding: "10px 16px", borderRadius: "8px", color: "#1a0b0f", fontWeight: "600", cursor: "pointer", alignSelf: "flex-start" },
  chips: { display: "flex", gap: "8px", overflowX: "auto" },
  chip: { background: "transparent", border: "1px solid rgba(201,146,42,0.2)", color: "rgba(245,233,208,0.6)", padding: "6px 14px", borderRadius: "20px", cursor: "pointer" },
  chipActive: { background: "rgba(201,146,42,0.15)", color: "#E8B84B", borderColor: "#c9922a" },
  layoutRoot: { display: "flex", gap: "16px", marginTop: "8px", alignItems: "flex-start" },
  main: { flex: "1", background: "#220c11", border: "1px solid rgba(201,146,42,0.1)", borderRadius: "12px", padding: "16px" },
  paymentSidebar: { flex: "0 0 300px", background: "#220c11", border: "1px solid rgba(201,146,42,0.1)", borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" },
  card: { background: "transparent", border: "1px solid rgba(201,146,42,0.1)", borderRadius: "12px", overflow: "hidden" },
  image: { width: "100%", height: "140px", objectFit: "cover" },
  cardBody: { padding: "10px" },
  cardTitle: { fontSize: "14px", fontWeight: "600", margin: "4px 0" },
  desc: { fontSize: "11px", color: "rgba(245,233,208,0.5)", height: "32px", overflow: "hidden" },
  rowBottom: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" },
  price: { color: "#E8B84B", fontWeight: "600" },
  addBtn: { background: "rgba(201,146,42,0.1)", border: "1px solid #c9922a", color: "#E8B84B", padding: "4px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" },
};