import { useState } from "react";

const USERS = [
  { id: 1, name: "Arjun Sharma", email: "arjun@email.com", phone: "9876543210", role: "Devotee" },
  { id: 2, name: "Priya Kulkarni", email: "priya@email.com", phone: "723456789", role: "Volunteer" },
  { id: 3, name: "Ratnadeep Abitkar", email: "ratnadeepabitkar@gmail.com", phone: "7898654585", role: "Admin" },
];

const roleColor = {
  Admin: "#E8B84B",
  Volunteer: "#7ecb7e",
  Devotee: "#c4a0e8",
};

const fields = [
  { label: "Email", type: "email", key: "email", ph: "your@email.com" },
  { label: "Phone number", type: "number", key: "phone", ph: "Your number" },
  { label: "Password", type: "password", key: "password", ph: "••••••••" },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ activePage, setActivePage }) {
  const navItems = [
    { key: "login", label: "Login" },
    { key: "users", label: "Users" },
  ];

  return (
    <div style={sidebar.wrap}>
      <div style={sidebar.brand}>
        <div style={sidebar.brandIcon}>ॐ</div>
        <div>
          <div style={sidebar.brandTitle}>ISKCON</div>
          <div style={sidebar.brandSub}>Kolhapur</div>
        </div>
      </div>

      <div style={sidebar.divider} />

      <nav>
        {navItems.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActivePage(key)}
            style={{
              ...sidebar.navItem,
              ...(activePage === key ? sidebar.navItemActive : {}),
            }}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}

const sidebar = {
  wrap: {
    width: "200px",
    minHeight: "100vh",
    background: "#1a0b0f",
    borderRight: "1px solid rgba(201,146,42,0.15)",
    padding: "1.5rem 1rem",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "1.5rem",
  },
  brandIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "rgba(201,146,42,0.15)",
    color: "#E8B84B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontFamily: "'Cinzel', serif",
    flexShrink: 0,
  },
  brandTitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: "13px",
    color: "#E8B84B",
    letterSpacing: "1px",
  },
  brandSub: {
    fontSize: "10px",
    color: "rgba(201,146,42,0.45)",
    letterSpacing: "1.5px",
  },
  divider: {
    height: "0.5px",
    background: "rgba(201,146,42,0.15)",
    marginBottom: "1rem",
  },
  navItem: {
    display: "block",
    width: "100%",
    textAlign: "left",
    background: "none",
    border: "none",
    color: "rgba(245,233,208,0.45)",
    fontSize: "13px",
    padding: "9px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "4px",
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "0.3px",
  },
  navItemActive: {
    background: "rgba(201,146,42,0.12)",
    color: "#E8B84B",
  },
};

// ─── Login Page ───────────────────────────────────────────────────────────────

function LoginPage() {
  const [values, setValues] = useState({ email: "", phone: "", password: "" });

  const handleChange = (key) => (e) =>
    setValues((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div style={login.wrap}>
      <div style={login.card}>
        <div style={login.diya}>कृष्ण सदा सहायते</div>
        <h1 style={login.title}>ISKCON Kolhapur</h1>
        <p style={login.subtitle}>DEVOTEE PORTAL</p>

        {fields.map(({ label, type, key, ph }) => (
          <div key={key} style={login.fieldWrap}>
            <label style={login.label}>{label}</label>
            <input
              type={type}
              placeholder={ph}
              value={values[key]}
              onChange={handleChange(key)}
              style={login.input}
            />
          </div>
        ))}

        <div style={login.forgotWrap}>
          <button style={login.forgotBtn}>Forgot password?</button>
        </div>

        <button style={login.signInBtn} onClick={() => alert("Hare Krishna!")}>
          Sign In
        </button>

        <p style={login.registerText}>
          New here?{" "}
          <button style={login.registerBtn}>Register</button>
        </p>
      </div>
    </div>
  );
}

const login = {
  wrap: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  card: {
    background: "#2a1018",
    border: "1px solid rgba(201,146,42,0.3)",
    borderRadius: "12px",
    padding: "2.5rem 2rem",
    width: "100%",
    maxWidth: "360px",
    textAlign: "center",
  },
  diya: {
    fontSize: "14px",
    color: "rgba(201,146,42,0.5)",
    letterSpacing: "2px",
    marginBottom: "10px",
  },
  title: {
    fontFamily: "'Cinzel', serif",
    fontSize: "18px",
    color: "#E8B84B",
    margin: "0 0 4px",
    letterSpacing: "1px",
  },
  subtitle: {
    fontSize: "12px",
    color: "rgba(201,146,42,0.5)",
    letterSpacing: "2px",
    margin: "0 0 2rem",
  },
  fieldWrap: { textAlign: "left", marginBottom: "1rem" },
  label: {
    fontSize: "11px",
    color: "rgba(201,146,42,0.6)",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(201,146,42,0.25)",
    borderRadius: "8px",
    padding: "10px 12px",
    fontSize: "14px",
    color: "#f5e9d0",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    boxSizing: "border-box",
  },
  forgotWrap: { textAlign: "right", marginBottom: "1.5rem" },
  forgotBtn: {
    background: "none",
    border: "none",
    fontSize: "12px",
    color: "rgba(201,146,42,0.5)",
    cursor: "pointer",
  },
  signInBtn: {
    width: "100%",
    background: "linear-gradient(135deg, #7B2D10, #C9922A)",
    border: "none",
    borderRadius: "8px",
    padding: "11px",
    fontFamily: "'Cinzel', serif",
    fontSize: "13px",
    color: "#FDF6E3",
    letterSpacing: "1.5px",
    cursor: "pointer",
    marginBottom: "1.25rem",
  },
  registerText: { fontSize: "13px", color: "rgba(255,255,255,0.3)", margin: 0 },
  registerBtn: {
    background: "none",
    border: "none",
    color: "rgba(201,146,42,0.65)",
    cursor: "pointer",
    fontSize: "13px",
  },
};

// ─── Users Page ───────────────────────────────────────────────────────────────

function UsersPage() {
  const [search, setSearch] = useState("");

  const filtered = USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={users.page}>
      <div style={users.header}>
        <div>
          <h1 style={users.title}>User Management</h1>
          <p style={users.subtitle}>ISKCON KOLHAPUR</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={users.addBtn}>Add User</button>
          <button style={users.deleteBtn}>Delete User</button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={users.search}
      />

      <div style={users.tableWrap}>
        <table style={users.table}>
          <thead>
            <tr>
              {["Name", "Email", "Phone", "Role", "Actions"].map((h) => (
                <th key={h} style={users.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} style={users.tr}>
                <td style={users.td}>
                  <div style={users.avatar}>{user.name.charAt(0)}</div>
                  <span>{user.name}</span>
                </td>
                <td style={{ ...users.td, color: "rgba(245,233,208,0.6)", fontSize: "13px" }}>{user.email}</td>
                <td style={{ ...users.td, color: "rgba(245,233,208,0.6)", fontSize: "13px" }}>{user.phone}</td>
                <td style={users.td}>
                  <span style={{ fontSize: "12px", fontWeight: 500, color: roleColor[user.role] }}>
                    {user.role}
                  </span>
                </td>
                <td style={users.td}>
                  <button style={users.editBtn}>Edit</button>
                  <button style={users.delBtn}>Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} style={{ ...users.td, textAlign: "center", color: "rgba(245,233,208,0.3)", padding: "2rem" }}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p style={users.count}>{filtered.length} user{filtered.length !== 1 ? "s" : ""} found</p>
    </div>
  );
}

const users = {
  page: { flex: 1, padding: "2rem 1.5rem", color: "#f5e9d0", fontFamily: "'Inter', sans-serif" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" },
  title: { fontFamily: "'Cinzel', serif", fontSize: "20px", color: "#E8B84B", margin: "0 0 2px", letterSpacing: "1px" },
  subtitle: { fontSize: "10px", color: "rgba(201,146,42,0.5)", letterSpacing: "3px", margin: 0 },
  addBtn: {
    background: "linear-gradient(135deg, #7B2D10, #C9922A)",
    border: "none", borderRadius: "8px", padding: "9px 16px",
    fontFamily: "'Cinzel', serif", fontSize: "12px", color: "#FDF6E3", cursor: "pointer", letterSpacing: "1px",
  },
  deleteBtn: {
    background: "none", border: "0.5px solid rgba(200,60,60,0.35)", borderRadius: "8px",
    padding: "9px 16px", fontSize: "12px", color: "rgba(220,80,80,0.7)", cursor: "pointer",
  },
  search: {
    width: "100%", background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(201,146,42,0.25)",
    borderRadius: "8px", padding: "10px 14px", fontSize: "14px", color: "#f5e9d0",
    fontFamily: "'Inter', sans-serif", outline: "none", boxSizing: "border-box", marginBottom: "1.25rem",
  },
  tableWrap: { background: "#2a1018", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "12px", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "12px 16px", textAlign: "left", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(201,146,42,0.6)", borderBottom: "0.5px solid rgba(201,146,42,0.15)" },
  tr: { borderBottom: "0.5px solid rgba(201,146,42,0.08)" },
  td: { padding: "12px 16px", fontSize: "14px", color: "#f5e9d0", verticalAlign: "middle" },
  avatar: {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: "30px", height: "30px", borderRadius: "50%", background: "rgba(201,146,42,0.15)",
    color: "#E8B84B", fontSize: "13px", fontWeight: 500, marginRight: "10px", verticalAlign: "middle",
  },
  editBtn: { background: "none", border: "0.5px solid rgba(201,146,42,0.3)", borderRadius: "6px", padding: "4px 12px", fontSize: "12px", color: "rgba(201,146,42,0.7)", cursor: "pointer", marginRight: "6px" },
  delBtn: { background: "none", border: "0.5px solid rgba(200,60,60,0.3)", borderRadius: "6px", padding: "4px 12px", fontSize: "12px", color: "rgba(220,80,80,0.7)", cursor: "pointer" },
  count: { fontSize: "12px", color: "rgba(245,233,208,0.25)", marginTop: "1rem", textAlign: "right" },
};

// ─── App Shell ────────────────────────────────────────────────────────────────

export default function App() {
  const [activePage, setActivePage] = useState("login");

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
      <div style={{ display: "flex", minHeight: "100vh", background: "#1c0c10" }}>
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        {activePage === "login" ? <LoginPage /> : <UsersPage />}
      </div>
    </>
  );
}