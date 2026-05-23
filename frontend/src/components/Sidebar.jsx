import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole"); // 'admin' or 'user'

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

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
        
        <nav style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
          {/* View before logging in */}
          {!isLoggedIn && (
            <NavLink to="/" style={({ isActive }) => ({ ...styles.navItem, ...(isActive ? styles.navItemActive : {}) })}>Login</NavLink>
          )}

          {/* Admin Links: Shows Everything */}
          {isLoggedIn && userRole === "admin" && (
            <>
              <NavLink to="/users" style={({ isActive }) => ({ ...styles.navItem, ...(isActive ? styles.navItemActive : {}) })}>Users</NavLink>
              <NavLink to="/darshan" style={({ isActive }) => ({ ...styles.navItem, ...(isActive ? styles.navItemActive : {}) })}>Darshan Gallery</NavLink>
              <NavLink to="/calendar" style={({ isActive }) => ({ ...styles.navItem, ...(isActive ? styles.navItemActive : {}) })}>Calendar</NavLink>
              <NavLink to="/bookstore" style={({ isActive }) => ({ ...styles.navItem, ...(isActive ? styles.navItemActive : {}) })}>BookStore</NavLink>
            </>
          )}

          {/* Regular User Links: Excludes Users view */}
          {isLoggedIn && userRole === "user" && (
            <>
              <NavLink to="/darshan" style={({ isActive }) => ({ ...styles.navItem, ...(isActive ? styles.navItemActive : {}) })}>Darshan Gallery</NavLink>
              <NavLink to="/calendar" style={({ isActive }) => ({ ...styles.navItem, ...(isActive ? styles.navItemActive : {}) })}>Calendar</NavLink>
              <NavLink to="/bookstore" style={({ isActive }) => ({ ...styles.navItem, ...(isActive ? styles.navItemActive : {}) })}>BookStore</NavLink>
            </>
          )}
        </nav>

        {isLoggedIn && (
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Sign Out
          </button>
        )}
      </div>
    </>
  );
}

const styles = {
  wrap: { width: "200px", minHeight: "100vh", alignSelf: "stretch", background: "#1a0b0f", borderRight: "1px solid rgba(201,146,42,0.15)", padding: "1.5rem 1rem", display: "flex", flexDirection: "column" },
  brand: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" },
  brandIcon: { width: "36px", height: "36px", borderRadius: "50%", background: "rgba(201,146,42,0.15)", color: "#E8B84B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontFamily: "'Cinzel', serif" },
  brandTitle: { fontFamily: "'Cinzel', serif", fontSize: "13px", color: "#E8B84B", letterSpacing: "1px" },
  brandSub: { fontSize: "10px", color: "rgba(201,146,42,0.45)", letterSpacing: "1.5px", textTransform: "uppercase" },
  divider: { height: "1px", background: "rgba(201,146,42,0.1)", margin: "0 0 1.5rem 0" },
  navItem: { display: "block", padding: "10px 14px", borderRadius: "8px", color: "rgba(245,233,208,0.7)", textDecoration: "none", fontSize: "13px", fontWeight: "500", transition: "all 0.2s" },
  navItemActive: { background: "rgba(201,146,42,0.12)", color: "#E8B84B", fontWeight: "600", borderLeft: "3px solid #E8B84B" },
  logoutBtn: { padding: "10px 14px", border: "1px solid rgba(220,80,80,0.3)", color: "rgba(220,80,80,0.85)", background: "transparent", cursor: "pointer", borderRadius: "8px", fontSize: "12px", textAlign: "left", marginTop: "auto" }
};