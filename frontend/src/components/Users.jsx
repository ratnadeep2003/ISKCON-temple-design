import { useState, useEffect } from "react";
import axios from "axios";

export default function Users() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const isAdmin = localStorage.getItem("userRole") === "admin";

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleDeleteUser = async (userId, name) => {
    if (window.confirm(`Are you sure you want to remove ${name}?`)) {
      try {
        const res = await axios.delete(`http://localhost:5000/api/auth/users/${userId}`);
        alert(res.data.message);
        fetchUsers();
      } catch (err) {
        alert(err.response?.data?.message || "Could not delete user");
      }
    }
  };

  const handleAddUserPrompt = async () => {
    const name = prompt("Enter Name:");
    const email = prompt("Enter Email:");
    const phone = prompt("Enter Phone:");
    const password = prompt("Set Password:");

    if (!name || !email || !phone || !password) return alert("All fields are required!");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", { name, email, phone, password });
      alert(res.data.message);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding user");
    }
  };

  if (!isAdmin) {
    return (
      <div style={{ background: "#15060a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#f5e9d0", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ textAlign: "center", padding: 20, background: "#260e14", borderRadius: 12, border: "1px solid rgba(220,80,80,0.3)" }}>
          <h2 style={{ color: "rgba(220,80,80,0.9)", fontFamily: "'Cinzel', serif" }}>Access Denied</h2>
          <p style={{ fontSize: 14, color: "rgba(245,233,208,0.6)" }}>This control panel is restricted to temple administrators.</p>
          <button onClick={() => window.location.href = '/darshan'} style={{ background: "linear-gradient(135deg, #c9922a, #a47219)", border: "none", borderRadius: 6, padding: "8px 16px", cursor: "pointer", fontWeight: "600", marginTop: 10 }}>Go to Darshan</button>
        </div>
      </div>
    );
  }

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
      <div style={styles.page}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>ISKCON Kolhapur</h1>
            <p style={styles.subtitle}>USER MANAGEMENT (ADMIN PANEL)</p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={styles.addBtn} onClick={handleAddUserPrompt}>Add User</button>
          </div>
        </div>

        <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} style={styles.search} />
        
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Name", "Email", "Phone", "Actions"].map((h) => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user._id || user.id} style={styles.tr}>
                  <td style={styles.td}>
                    <span style={styles.name}>{user.name}</span>
                  </td>
                  <td style={{ ...styles.td, color: "rgba(245,233,208,0.6)", fontSize: "13px" }}>{user.email}</td>
                  <td style={{ ...styles.td, color: "rgba(245,233,208,0.6)", fontSize: "13px" }}>{user.phone}</td>
                  <td style={styles.td}>
                    <button onClick={() => handleDeleteUser(user._id || user.id, user.name)} style={{ background: "none", border: "none", color: "rgba(220,80,80,0.85)", cursor: "pointer", fontSize: "13px", fontWeight: "500" }}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const styles = {
  page: { background: "#15060a", minHeight: "100vh", padding: "2rem 2.5rem", color: "#f5e9d0", fontFamily: "'Inter', sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" },
  title: { fontFamily: "'Cinzel', serif", fontSize: "22px", color: "#E8B84B", margin: 0, letterSpacing: "1px" },
  subtitle: { fontSize: "11px", color: "rgba(201,146,42,0.5)", letterSpacing: "2px", margin: "4px 0 0" },
  addBtn: { background: "linear-gradient(135deg, #c9922a 0%, #a47219 100%)", border: "none", borderRadius: "6px", padding: "8px 16px", fontSize: "13px", fontWeight: "600", color: "#1a0b0f", cursor: "pointer", letterSpacing: "0.5px" },
  search: { width: "100%", background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(201,146,42,0.25)", borderRadius: "8px", padding: "10px 14px", fontSize: "14px", color: "#f5e9d0", outline: "none", boxSizing: "border-box", marginBottom: "1.25rem" },
  tableWrap: { background: "#2a1018", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "12px", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "12px 16px", textAlign: "left", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(201,146,42,0.6)", borderBottom: "0.5px solid rgba(201,146,42,0.15)" },
  tr: { borderBottom: "0.5px solid rgba(201,146,42,0.08)" },
  td: { padding: "12px 16px", fontSize: "14px", color: "#f5e9d0" },
  name: { fontWeight: "500" }
};