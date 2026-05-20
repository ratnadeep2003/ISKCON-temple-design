import { useState, useEffect } from "react";
import axios from "axios";

export default function Users() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // NEW FUNCTION: Handles deleting users dynamically
  const handleDeleteUser = async (userId, name) => {
    if (window.confirm(`Are you sure you want to remove ${name}?`)) {
      try {
        const res = await axios.delete(`http://localhost:5000/api/auth/users/${userId}`);
        alert(res.data.message);
        fetchUsers(); // Refresh the list dynamically after removal
      } catch (err) {
        alert(err.response?.data?.message || "Could not delete user");
      }
    }
  };

  // NEW FUNCTION: Direct manual addition shortcut
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

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

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
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={styles.addBtn} onClick={handleAddUserPrompt}>Add User</button>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

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
                <tr key={user._id} style={styles.tr}>
                  <td style={styles.td}>
                    <div style={styles.avatar}>{user.name ? user.name.charAt(0).toUpperCase() : "?"}</div>
                    <span style={styles.name}>{user.name}</span>
                  </td>
                  <td style={{ ...styles.td, color: "rgba(245,233,208,0.6)", fontSize: "13px" }}>{user.email}</td>
                  <td style={{ ...styles.td, color: "rgba(245,233,208,0.6)", fontSize: "13px" }}>{user.phone}</td>
                  <td style={styles.td}>
                    <button 
                      style={styles.deleteBtn} 
                      onClick={() => handleDeleteUser(user._id, user.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ ...styles.td, textAlign: "center", color: "rgba(245,233,208,0.3)", padding: "2rem" }}>
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

// Keep your exact user styling objects below unchanged...
const styles = {
  page: { minHeight: "100vh", background: "#1c0c10", fontFamily: "'Inter', sans-serif", padding: "2rem 1.5rem", color: "#f5e9d0" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" },
  title: { fontFamily: "'Cinzel', serif", fontSize: "20px", color: "#E8B84B", margin: "0 0 2px", letterSpacing: "1px" },
  subtitle: { fontSize: "10px", color: "rgba(201,146,42,0.5)", letterSpacing: "3px", margin: 0 },
  addBtn: { background: "linear-gradient(135deg, #7B2D10, #C9922A)", border: "none", borderRadius: "8px", padding: "9px 16px", fontFamily: "'Cinzel', serif", fontSize: "12px", color: "#FDF6E3", cursor: "pointer", letterSpacing: "1px" },
  search: { width: "100%", background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(201,146,42,0.25)", borderRadius: "8px", padding: "10px 14px", fontSize: "14px", color: "#f5e9d0", fontFamily: "'Inter', sans-serif", outline: "none", boxSizing: "border-box", marginBottom: "1.25rem" },
  tableWrap: { background: "#2a1018", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "12px", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "12px 16px", textAlign: "left", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(201,146,42,0.6)", borderBottom: "0.5px solid rgba(201,146,42,0.15)" },
  tr: { borderBottom: "0.5px solid rgba(201,146,42,0.08)" },
  td: { padding: "12px 16px", fontSize: "14px", color: "#f5e9d0", verticalAlign: "middle" },
  avatar: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "50%", background: "rgba(201,146,42,0.15)", color: "#E8B84B", fontSize: "13px", fontWeight: 500, marginRight: "10px", verticalAlign: "middle" },
  name: { verticalAlign: "middle" },
  deleteBtn: { background: "none", border: "0.5px solid rgba(200,60,60,0.3)", borderRadius: "6px", padding: "4px 12px", fontSize: "12px", color: "rgba(220,80,80,0.7)", cursor: "pointer" },
  count: { fontSize: "12px", color: "rgba(245,233,208,0.25)", marginTop: "1rem", textAlign: "right" }
};