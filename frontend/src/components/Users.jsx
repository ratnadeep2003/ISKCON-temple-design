import { useState } from "react";

const USERS = [
  { id: 1, name: "Arjun Sharma", email: "arjun@email.com", phone: "9876543210", role: "Devotee" },
  { id: 2, name: "Priya Kulkarni", email: "priya@email.com", phone: "723456789", role: "Volunteer" },
  {id: 3, name: "Ratnadeep Abitkar", email: "ratnadeepabitkar@gmail.com", phone: "7898654585", role: "Admin"}
];

export default function ISKCONUsers() {
  const [search, setSearch] = useState("");

  const filtered = USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const roleColor = {
    Admin: {  color: "#E8B84B" },
    Volunteer: {  color: "#7ecb7e" },
    Devotee: { color: "#c4a0e8" },
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500&family=Inter:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <div style={styles.page}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>ISKCON Kolhapur</h1>
            <p style={styles.subtitle}>USER MANAGEMENT</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={styles.addBtn}>Add User</button>
            <button style={styles.addBtn}>Delete User</button>
          </div>
        </div>

        {/* Search */}
        <input type="text" placeholder="Search by name or email..." value={search} 
        onChange={(e) => setSearch(e.target.value)} style={styles.search} />

        {/* Table */}
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Name", "Email", "Phone", "Role", "Actions"].map((h) => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} style={styles.tr}>
                  <td style={styles.td}>
                    <div style={styles.avatar}>
                      {user.name.charAt(0)}
                    </div>
                    <span style={styles.name}>{user.name}</span>
                  </td>
                  <td style={{ ...styles.td, color: "rgba(245,233,208,0.6)", fontSize: "13px" }}>{user.email}</td>
                  <td style={{ ...styles.td, color: "rgba(245,233,208,0.6)", fontSize: "13px" }}>{user.phone}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, ...roleColor[user.role] }}>{user.role}</span>
                  </td>
                  <td style={styles.td}>
                    <button style={styles.editBtn}>Edit</button>
                    <button style={styles.deleteBtn}>Delete</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ ...styles.td, textAlign: "center", color: "rgba(245,233,208,0.3)", padding: "2rem" }}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p style={styles.count}>{filtered.length} user{filtered.length !== 1 ? "s" : ""} found</p>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#1c0c10",
    fontFamily: "'Inter', sans-serif",
    padding: "2rem 1.5rem",
    color: "#f5e9d0",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  title: {
    fontFamily: "'Cinzel', serif",
    fontSize: "20px",
    color: "#E8B84B",
    margin: "0 0 2px",
    letterSpacing: "1px",
  },
  subtitle: {
    fontSize: "10px",
    color: "rgba(201,146,42,0.5)",
    letterSpacing: "3px",
    margin: 0,
  },
  addBtn: {
    background: "linear-gradient(135deg, #7B2D10, #C9922A)",
    border: "none",
    borderRadius: "8px",
    padding: "9px 16px",
    fontFamily: "'Cinzel', serif",
    fontSize: "12px",
    color: "#FDF6E3",
    cursor: "pointer",
    letterSpacing: "1px",
  },
  search: {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(201,146,42,0.25)",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "14px",
    color: "#f5e9d0",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    boxSizing: "border-box",
    marginBottom: "1.25rem",
  },
  tableWrap: {
    background: "#2a1018",
    border: "1px solid rgba(201,146,42,0.2)",
    borderRadius: "12px",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "12px 16px",
    textAlign: "left",
    fontSize: "10px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "rgba(201,146,42,0.6)",
    borderBottom: "0.5px solid rgba(201,146,42,0.15)",
  },
  tr: {
    borderBottom: "0.5px solid rgba(201,146,42,0.08)",
  },
  td: {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#f5e9d0",
    verticalAlign: "middle",
    display: "table-cell",
  },
  avatar: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "rgba(201,146,42,0.15)",
    color: "#E8B84B",
    fontSize: "13px",
    fontWeight: 500,
    marginRight: "10px",
    verticalAlign: "middle",
  },
  name: {
    verticalAlign: "middle",
  },
  badge: {
    fontSize: "11px",
    padding: "3px 10px",
    borderRadius: "20px",
    fontWeight: 500,
    letterSpacing: "0.5px",
  },
  editBtn: {
    background: "none",
    border: "0.5px solid rgba(201,146,42,0.3)",
    borderRadius: "6px",
    padding: "4px 12px",
    fontSize: "12px",
    color: "rgba(201,146,42,0.7)",
    cursor: "pointer",
    marginRight: "6px",
  },
  deleteBtn: {
    background: "none",
    border: "0.5px solid rgba(200,60,60,0.3)",
    borderRadius: "6px",
    padding: "4px 12px",
    fontSize: "12px",
    color: "rgba(220,80,80,0.7)",
    cursor: "pointer",
  },
  count: {
    fontSize: "12px",
    color: "rgba(245,233,208,0.25)",
    marginTop: "1rem",
    textAlign: "right",
  },
};