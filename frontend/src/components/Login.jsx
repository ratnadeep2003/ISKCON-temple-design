import { useState } from "react";

export default function ISKCONLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setters = { email: setEmail, password: setPassword };
  const values = { email, password };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500&family=Inter:wght@300;400&display=swap"
        rel="stylesheet"
      />
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.diya}> कृष्ण सदा सहायते </div>
          <h1 style={styles.title}>ISKCON Kolhapur</h1>
          <p style={styles.subtitle}>DEVOTEE PORTAL</p>

          {fields.map(({ label, type, key, ph }) => (
            <div key={key} style={styles.fieldWrap}>
              <label style={styles.label}>{label}</label>
              <input
                type={type}
                placeholder={ph}
                value={values[key]}
                onChange={(e) => setters[key](e.target.value)}
                style={styles.input}
              />
            </div>
          ))}

          <div style={styles.forgotWrap}>
            <button style={styles.forgotBtn}>Forgot password?</button>
          </div>

          <button style={styles.signInBtn} onClick={() => alert("Hare Krishna!")}>
            Sign In
          </button>

          <p style={styles.registerText}>
            New here?{" "}
            <button style={styles.registerBtn}>Register</button>
          </p>
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#1c0c10",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
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
    fontSize: "36px",
    marginBottom: "6px",
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
  fieldWrap: {
    textAlign: "left",
    marginBottom: "1rem",
  },
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
  forgotWrap: {
    textAlign: "right",
    marginBottom: "1.5rem",
  },
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
  registerText: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.3)",
    margin: 0,
  },
  registerBtn: {
    background: "none",
    border: "none",
    color: "rgba(201,146,42,0.65)",
    cursor: "pointer",
    fontSize: "13px",
  },
};

const fields = [
  { label: "Email", type: "email", key: "email", ph: "your@email.com" },
  {label: "Phone number", type: "number", key: "phone", ph:"Your number"},
  { label: "Password", type: "password", key: "password", ph: "••••••••" },
];