import { useMemo, useState } from "react";

const PRODUCTS = [
  {
    id: 1,
    name: "Bhagavad Gita As It Is",
    category: "Books",
    price: 299,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    description: "Classic spiritual wisdom with verse-by-verse explanations.",
  },
  {
    id: 2,
    name: "Srimad Bhagavatam",
    category: "Books",
    price: 799,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80",
    description: "Deep devotional literature for daily reading and study.",
  },
  {
    id: 3,
    name: "Tulsi Japa Beads",
    category: "Japa Beads",
    price: 149,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1584284858801-9d52c877f7bc?auto=format&fit=crop&w=800&q=80",
    description: "Sacred beads for chanting and meditation.",
  },
  {
    id: 4,
    name: "Herbal Incense Pack",
    category: "Herbal Products",
    price: 99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=80",
    description: "Pure devotional fragrance for daily puja.",
  },
  {
    id: 5,
    name: "Deity Dress Set",
    category: "Devotional Items",
    price: 499,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80",
    description: "Beautiful attire for temple worship and festivals.",
  },
  {
    id: 6,
    name: "Organic Herbal Tea",
    category: "Herbal Products",
    price: 179,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1515823662972-da6a2e7a9d3d?auto=format&fit=crop&w=800&q=80",
    description: "A peaceful blend for a sattvic lifestyle.",
  },
];

const CATEGORIES = ["All", "Books", "Japa Beads", "Herbal Products", "Devotional Items"];

export default function BookStore() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCategory = activeCategory === "All" || p.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [activeCategory, search]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <div style={styles.page}>
        <header style={styles.hero}>
          <div>
            <p style={styles.kicker}>ISKCON BOOK TRUST</p>
            <h1 style={styles.title}>Sacred Store</h1>
            <p style={styles.subtitle}>
              Spiritual books, japa beads, herbal products, and devotional essentials.
            </p>
          </div>
          <div style={styles.cartBadge}>
            <div style={{ fontFamily: "'Cinzel', serif", color: "#E8B84B" }}>
              Cart
            </div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{totalItems}</div>
          </div>
        </header>

        <div style={styles.controls}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            style={styles.search}
          />
          <div style={styles.chips}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  ...styles.chip,
                  ...(activeCategory === cat ? styles.chipActive : {}),
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.layout}>
          <section style={styles.productsPanel}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Products</h2>
              <span style={styles.sectionMeta}>{filteredProducts.length} items</span>
            </div>

            <div style={styles.grid}>
              {filteredProducts.map((product) => (
                <article key={product.id} style={styles.card}>
                  <img src={product.image} alt={product.name} style={styles.image} />
                  <div style={styles.cardBody}>
                    <div style={styles.row}>
                      <span style={styles.category}>{product.category}</span>
                      <span style={styles.rating}>★ {product.rating}</span>
                    </div>
                    <h3 style={styles.cardTitle}>{product.name}</h3>
                    <p style={styles.desc}>{product.description}</p>
                    <div style={styles.rowBottom}>
                      <span style={styles.price}>₹{product.price}</span>
                      <button style={styles.addBtn} onClick={() => addToCart(product)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside style={styles.cartPanel}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Your Cart</h2>
              <span style={styles.sectionMeta}>{cart.length} products</span>
            </div>

            {cart.length === 0 ? (
              <div style={styles.emptyCart}>
                <p style={{ margin: 0, color: "rgba(245,233,208,0.6)" }}>
                  Your cart is empty.
                </p>
                <p style={{ margin: "8px 0 0", color: "rgba(245,233,208,0.35)", fontSize: 13 }}>
                  Add books or devotional items to begin.
                </p>
              </div>
            ) : (
              <>
                <div style={styles.cartList}>
                  {cart.map((item) => (
                    <div key={item.id} style={styles.cartItem}>
                      <img src={item.image} alt={item.name} style={styles.cartImg} />
                      <div style={{ flex: 1 }}>
                        <div style={styles.cartName}>{item.name}</div>
                        <div style={styles.cartMeta}>₹{item.price} each</div>
                        <div style={styles.qtyRow}>
                          <button style={styles.qtyBtn} onClick={() => updateQty(item.id, -1)}>
                            -
                          </button>
                          <span style={styles.qty}>{item.quantity}</span>
                          <button style={styles.qtyBtn} onClick={() => updateQty(item.id, 1)}>
                            +
                          </button>
                          <button style={styles.removeBtn} onClick={() => removeItem(item.id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={styles.summary}>
                  <div style={styles.summaryRow}>
                    <span>Subtotal</span>
                    <strong>₹{subtotal}</strong>
                  </div>
                  <div style={styles.summaryRow}>
                    <span>Delivery</span>
                    <strong>₹0</strong>
                  </div>
                  <div style={{ ...styles.summaryRow, borderTop: "1px solid rgba(201,146,42,0.15)", paddingTop: 10 }}>
                    <span>Total</span>
                    <strong>₹{subtotal}</strong>
                  </div>
                  <button style={styles.checkoutBtn}>Proceed to Checkout</button>
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#1c0c10",
    color: "#f5e9d0",
    padding: "24px",
    fontFamily: "'Inter', sans-serif",
    boxSizing: "border-box",
  },
  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "20px",
  },
  kicker: {
    margin: 0,
    fontSize: 12,
    letterSpacing: "3px",
    color: "rgba(201,146,42,0.7)",
  },
  title: {
    margin: "6px 0 8px",
    fontFamily: "'Cinzel', serif",
    color: "#E8B84B",
    fontSize: "34px",
  },
  subtitle: {
    margin: 0,
    maxWidth: "620px",
    color: "rgba(245,233,208,0.7)",
    lineHeight: 1.5,
  },
  cartBadge: {
    minWidth: 120,
    textAlign: "center",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(201,146,42,0.18)",
    borderRadius: 14,
    padding: "14px 16px",
  },
  controls: {
    background: "#2a1018",
    border: "1px solid rgba(201,146,42,0.15)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  search: {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(201,146,42,0.22)",
    borderRadius: 10,
    padding: "12px 14px",
    color: "#f5e9d0",
    outline: "none",
    boxSizing: "border-box",
    marginBottom: 14,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    border: "1px solid rgba(201,146,42,0.2)",
    background: "transparent",
    color: "rgba(245,233,208,0.75)",
    borderRadius: 999,
    padding: "8px 14px",
    cursor: "pointer",
  },
  chipActive: {
    background: "linear-gradient(135deg, #7B2D10, #C9922A)",
    color: "#fff",
    borderColor: "transparent",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 360px",
    gap: 20,
    alignItems: "start",
  },
  productsPanel: {
    background: "#2a1018",
    border: "1px solid rgba(201,146,42,0.15)",
    borderRadius: 14,
    padding: 16,
  },
  cartPanel: {
    background: "#2a1018",
    border: "1px solid rgba(201,146,42,0.15)",
    borderRadius: 14,
    padding: 16,
    position: "sticky",
    top: 16,
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    margin: 0,
    fontFamily: "'Cinzel', serif",
    color: "#E8B84B",
    fontSize: 18,
  },
  sectionMeta: {
    fontSize: 12,
    color: "rgba(245,233,208,0.45)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
  },
  card: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(201,146,42,0.12)",
    borderRadius: 14,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
    objectFit: "cover",
    display: "block",
  },
  cardBody: {
    padding: 14,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },
  category: {
    fontSize: 12,
    color: "#C9922A",
  },
  rating: {
    fontSize: 12,
    color: "rgba(245,233,208,0.65)",
  },
  cardTitle: {
    margin: "0 0 8px",
    fontSize: 18,
    color: "#f5e9d0",
  },
  desc: {
    margin: "0 0 14px",
    fontSize: 13,
    lineHeight: 1.5,
    color: "rgba(245,233,208,0.68)",
    minHeight: 40,
  },
  rowBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 700,
    color: "#E8B84B",
  },
  addBtn: {
    border: "none",
    borderRadius: 8,
    padding: "10px 12px",
    cursor: "pointer",
    color: "#fff",
    background: "linear-gradient(135deg, #7B2D10, #C9922A)",
    fontFamily: "'Cinzel', serif",
    fontSize: 12,
    letterSpacing: 1,
  },
  emptyCart: {
    padding: 18,
    border: "1px dashed rgba(201,146,42,0.18)",
    borderRadius: 12,
    textAlign: "center",
  },
  cartList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  cartItem: {
    display: "flex",
    gap: 12,
    padding: 10,
    borderRadius: 12,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(201,146,42,0.1)",
  },
  cartImg: {
    width: 62,
    height: 62,
    borderRadius: 10,
    objectFit: "cover",
  },
  cartName: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 4,
  },
  cartMeta: {
    fontSize: 12,
    color: "rgba(245,233,208,0.55)",
    marginBottom: 8,
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    border: "1px solid rgba(201,146,42,0.2)",
    background: "transparent",
    color: "#f5e9d0",
    cursor: "pointer",
  },
  qty: {
    minWidth: 20,
    textAlign: "center",
  },
  removeBtn: {
    marginLeft: "auto",
    border: "none",
    background: "transparent",
    color: "rgba(220,80,80,0.85)",
    cursor: "pointer",
    fontSize: 12,
  },
  summary: {
    marginTop: 16,
    paddingTop: 14,
    borderTop: "1px solid rgba(201,146,42,0.12)",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
    color: "rgba(245,233,208,0.8)",
  },
  checkoutBtn: {
    width: "100%",
    border: "none",
    borderRadius: 10,
    padding: "12px 14px",
    marginTop: 10,
    cursor: "pointer",
    background: "linear-gradient(135deg, #7B2D10, #C9922A)",
    color: "#fff",
    fontFamily: "'Cinzel', serif",
    letterSpacing: 1,
  },
};