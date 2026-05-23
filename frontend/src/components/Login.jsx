import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const clearForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
  };

  const handleAuth = async () => {
    if (!email || !password) {
      return alert("Please enter your email/phone and password.");
    }
    if (isRegistering && (!name || !phone)) {
      return alert("Please fill out all fields to register.");
    }

    // Static Admin Login Intersection Check
    if (!isRegistering && email.trim() === "admin@gmail.com" && password.trim() === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "admin");
      alert("Welcome Admin! Loading Workspace.");
      window.location.href = "/darshan"; 
      return;
    }

    try {
      if (isRegistering) {
        const res = await axios.post("http://localhost:5000/api/auth/register", {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password: password.trim(),
        });
        alert(res.data.message);
        clearForm();
        setIsRegistering(false);
      } else {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: email.trim(),
          password: password.trim(),
        });
        alert(res.data.message);
        
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "user");
        window.location.href = "/darshan";
      }
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully.");
    window.location.href = "/";
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <div>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500&family=Inter:wght@300;400&display=swap" rel="stylesheet" />
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.diya}>🪔</div>
          <p style={{ color: "#E8B84B", margin: "0 0 10px 0", fontSize: "14px" }}>कृष्ण सदा सहायते</p>
          <h1 style={styles.title}>ISKCON Kolhapur</h1>
          
          {isLoggedIn ? (
            <div>
              <p style={styles.subtitle}>LOGGED IN AS {localStorage.getItem("userRole")?.toUpperCase()}</p>
              <button style={styles.submitBtn} onClick={handleLogout}>LOGOUT</button>
            </div>
          ) : (
            <>
              <p style={styles.subtitle}>{isRegistering ? "REGISTRATION PORTAL" : "DEVOTEE PORTAL"}</p>

              {isRegistering && (
                <div style={styles.fieldWrap}>
                  <label style={styles.label}>Full Name</label>
                  <input type="text" placeholder="John Snow" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
                </div>
              )}

              <div style={styles.fieldWrap}>
                <label style={styles.label}>{isRegistering ? "Email Address" : "Email or Phone"}</label>
                <input type="text" placeholder={isRegistering ? "john@gmail.com" : "Email or Phone number"} value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
              </div>

              {isRegistering && (
                <div style={styles.fieldWrap}>
                  <label style={styles.label}>Phone Number</label>
                  <input type="text" placeholder="8695754422" value={phone} onChange={(e) => setPhone(e.target.value)} style={styles.input} />
                </div>
              )}

              <div style={styles.fieldWrap}>
                <label style={styles.label}>Password</label>
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
              </div>

              {!isRegistering && (
                <div style={styles.forgotWrap}>
                  <button style={styles.forgotBtn}>Forgot Password?</button>
                </div>
              )}

              <button style={styles.submitBtn} onClick={handleAuth}>
                {isRegistering ? "SIGN UP NOW" : "SIGN IN"}
              </button>

              <div style={styles.switchWrap}>
                <span style={{ color: "rgba(245,233,208,0.4)" }}>
                  {isRegistering ? "Already have an account? " : "New to the community? "}
                </span>
                <button style={styles.switchBtn} onClick={() => { setIsRegistering(!isRegistering); clearForm(); }}>
                  {isRegistering ? "Sign In" : "Create Account"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { background: "#15060a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", boxSizing: "border-box" },
  card: { background: "#260e14", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "16px", padding: "2.5rem 2rem", width: "100%", maxWidth: "360px", textAlign: "center" },
  diya: { fontSize: "32px", marginBottom: "2px" },
  title: { fontFamily: "'Cinzel', serif", fontSize: "18px", color: "#E8B84B", margin: "0 0 4px", letterSpacing: "1px" },
  subtitle: { fontSize: "12px", color: "rgba(201,146,42,0.5)", letterSpacing: "2px", margin: "0 0 2rem" },
  fieldWrap: { textAlign: "left", marginBottom: "1rem" },
  label: { fontSize: "11px", color: "rgba(201,146,42,0.6)", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: "5px" },
  input: { width: "100%", background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(201,146,42,0.25)", borderRadius: "8px", padding: "10px 12px", fontSize: "14px", color: "#f5e9d0", outline: "none", boxSizing: "border-box" },
  forgotWrap: { textAlign: "right", marginBottom: "1.5rem" },
  forgotBtn: { background: "none", border: "none", fontSize: "12px", color: "rgba(201,146,42,0.65)", cursor: "pointer" },
  submitBtn: { width: "100%", background: "linear-gradient(135deg, #c9922a 0%, #a47219 100%)", border: "none", borderRadius: "8px", padding: "12px", fontSize: "13px", fontWeight: "600", color: "#1a0b0f", cursor: "pointer", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1.5rem", boxShadow: "0 4px 15px rgba(0,0,0,0.2)" },
  switchWrap: { fontSize: "13px" },
  switchBtn: { background: "none", border: "none", color: "#E8B84B", fontWeight: "500", cursor: "pointer", paddingLeft: "4px" }
};