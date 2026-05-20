import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
      <div style={styles.wrap}>
        <div style={styles.brand}>
          <div style={styles.brandIcon}>ॐ</div>
          <div>
            <div style={styles.brandTitle}>ISKCON</div>
            <div style={styles.brandSub}>Kolhapur</div>
          </div>
        </div>
        <div style={styles.divider} />
        <nav>
          <NavLink to="/" style={({ isActive }) => ({ ...styles.navItem, ...(isActive ? styles.navItemActive : {}) })}>Login</NavLink>
          <NavLink to="/users" style={({ isActive }) => ({ ...styles.navItem, ...(isActive ? styles.navItemActive : {}) })}>Users</NavLink>
          <NavLink to="/darshan" style={({ isActive }) => ({ ...styles.navItem, ...(isActive ? styles.navItemActive : {}) })}>Darshan Gallery</NavLink>
          <NavLink to="/calendar" style={({ isActive }) => ({ ...styles.navItem, ...(isActive ? styles.navItemActive : {}) })}>Calandar</NavLink>
          <NavLink to="/bookstore" style={({ isActive }) => ({ ...styles.navItem, ...(isActive ? styles.navItemActive : {}) })}>BookStore</NavLink>
        </nav>
      </div>
    </>
  );
}

const styles = {
  wrap: { width: "200px", minHeight: "100vh", alignSelf: "stretch", background: "#1a0b0f", borderRight: "1px solid rgba(201,146,42,0.15)", padding: "1.5rem 1rem", display: "flex", flexDirection: "column" },
  brand: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" },
  brandIcon: { width: "36px", height: "36px", borderRadius: "50%", background: "rgba(201,146,42,0.15)", color: "#E8B84B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontFamily: "'Cinzel', serif" },
  brandTitle: { fontFamily: "'Cinzel', serif", fontSize: "13px", color: "#E8B84B", letterSpacing: "1px" },
  brandSub: { fontSize: "10px", color: "rgba(201,146,42,0.45)", letterSpacing: "1.5px" },
  divider: { height: "0.5px", background: "rgba(201,146,42,0.15)", marginBottom: "1rem" },
  navItem: { display: "block", width: "100%", textAlign: "left", background: "none", border: "none", color: "rgba(245,233,208,0.45)", fontSize: "13px", padding: "9px 12px", borderRadius: "8px", cursor: "pointer", marginBottom: "4px", fontFamily: "'Inter', sans-serif", textDecoration: "none" },
  navItemActive: { background: "rgba(201,146,42,0.12)", color: "#E8B84B" },
};