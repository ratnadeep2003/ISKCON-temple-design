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
    // Basic Client Validation
    if (!email || !password) {
      return alert("Please enter your email/phone and password.");
    }
    if (isRegistering && (!name || !phone)) {
      return alert("Please fill out all fields to register.");
    }

    try {
      if (isRegistering) {
        // REGISTRATION FLOW
        const res = await axios.post("http://localhost:5000/api/auth/register", {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password: password.trim(),
        });
        alert(res.data.message);
        clearForm();
        setIsRegistering(false); // Move to login screen upon success
      } else {
        // LOGIN FLOW
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: email.trim(), // 'email' state is used as the single identifier box on login
          password: password.trim(),
        });
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500&family=Inter:wght@300;400&display=swap"
        rel="stylesheet"
      />
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.diya}>🪔</div>
          <p style={{ color: "#E8B84B", margin: "0 0 10px 0", fontSize: "14px" }}>कृष्ण सदा सहायते</p>
          <h1 style={styles.title}>ISKCON Kolhapur</h1>
          <p style={styles.subtitle}>{isRegistering ? "REGISTRATION PORTAL" : "DEVOTEE PORTAL"}</p>

          {/* 1. Name Field (Only visible during signup) */}
          {isRegistering && (
            <div style={styles.fieldWrap}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                placeholder="John Snow"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
              />
            </div>
          )}

          {/* 2. Primary Identifier Field */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>{isRegistering ? "Email Address" : "Email or Phone"}</label>
            <input
              type="text"
              placeholder={isRegistering ? "jhon@gmail.com" : "Email or Phone number"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* 3. Phone Field (Only visible during signup) */}
          {isRegistering && (
            <div style={styles.fieldWrap}>
              <label style={styles.label}>Phone Number</label>
              <input
                type="text"
                placeholder="8695754598"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={styles.input}
              />
            </div>
          )}

          {/* 4. Password Field */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          {!isRegistering && (
            <div style={styles.forgotWrap}>
              <button style={styles.forgotBtn}>Forgot password?</button>
            </div>
          )}

          <button style={styles.signInBtn} onClick={handleAuth}>
            {isRegistering ? "Register Now" : "Sign In"}
          </button>

          <p style={styles.registerText}>
            {isRegistering ? "Already have an account? " : "New here? "}
            <button 
              style={styles.registerBtn} 
              onClick={() => { clearForm(); setIsRegistering(!isRegistering); }}
            >
              {isRegistering ? "Sign In" : "Register"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#1c0c10", display: "flex", alignItems: "center", justifyYontent: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" },
  card: { background: "#2a1018", border: "1px solid rgba(201,146,42,0.3)", borderRadius: "12px", padding: "2.5rem 2rem", width: "100%", maxWidth: "360px", textAlign: "center" },
  diya: { fontSize: "32px", marginBottom: "2px" },
  title: { fontFamily: "'Cinzel', serif", fontSize: "18px", color: "#E8B84B", margin: "0 0 4px", letterSpacing: "1px" },
  subtitle: { fontSize: "12px", color: "rgba(201,146,42,0.5)", letterSpacing: "2px", margin: "0 0 2rem" },
  fieldWrap: { textAlign: "left", marginBottom: "1rem" },
  label: { fontSize: "11px", color: "rgba(201,146,42,0.6)", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: "5px" },
  input: { width: "100%", background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(201,146,42,0.25)", borderRadius: "8px", padding: "10px 12px", fontSize: "14px", color: "#f5e9d0", fontFamily: "'Inter', sans-serif", outline: "none", boxSizing: "border-box" },
  forgotWrap: { textAlign: "right", marginBottom: "1.5rem" },
  forgotBtn: { background: "none", border: "none", fontSize: "12px", color: "rgba(201,146,42,0.5)", cursor: "pointer" },
  signInBtn: { width: "100%", background: "linear-gradient(135deg, #7B2D10, #C9922A)", border: "none", borderRadius: "8px", padding: "11px", fontFamily: "'Cinzel', serif", fontSize: "13px", color: "#FDF6E3", letterSpacing: "1.5px", cursor: "pointer", marginBottom: "1.25rem" },
  registerText: { fontSize: "13px", color: "rgba(255,255,255,0.3)", margin: 0 },
  registerBtn: { background: "none", border: "none", color: "rgba(201,146,42,0.65)", cursor: "pointer", fontSize: "13px" },
};