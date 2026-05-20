import { useState } from "react";

const DEITIES = ["All", "Radha Krishna", "Jagannath", "Nitai Gauranga", "Mahalakshmi", "Jyotiba", "Narsinh Saraswati", "Ganesh", "Kopeshwar", "Tulja Bhavani"];

const DARSHANS = [
  // ISKCON Deities
  { id: 1,  deity: "Radha Krishna",      sringar: "Panchamrita",   time: "morning", date: "20 May 2025", emoji: "🌸" },
  { id: 2,  deity: "Radha Krishna",      sringar: "Raja Bhog",     time: "noon",    date: "20 May 2025", emoji: "👑" },
  { id: 3,  deity: "Jagannath",          sringar: "Sandhya Arati", time: "evening", date: "20 May 2025", emoji: "🪔" },
  { id: 4,  deity: "Nitai Gauranga",     sringar: "Mangala Arati", time: "morning", date: "20 May 2025", emoji: "🌼" },
  { id: 5,  deity: "Radha Krishna",      sringar: "Utthapana",     time: "morning", date: "19 May 2025", emoji: "🌺" },
  { id: 6,  deity: "Jagannath",          sringar: "Bhoga Arati",   time: "noon",    date: "19 May 2025", emoji: "🌻" },
  { id: 7,  deity: "Nitai Gauranga",     sringar: "Sandhya Arati", time: "evening", date: "19 May 2025", emoji: "✨" },
  { id: 8,  deity: "Radha Krishna",      sringar: "Shayana Arati", time: "evening", date: "19 May 2025", emoji: "🌙" },
  // Kolhapur Local Deities
  { id: 9,  deity: "Mahalakshmi",        sringar: "Kakad Arati",   time: "morning", date: "20 May 2025", emoji: "🪷" },
  { id: 10, deity: "Mahalakshmi",        sringar: "Madhyanha Puja",time: "noon",    date: "20 May 2025", emoji: "💛" },
  { id: 11, deity: "Mahalakshmi",        sringar: "Shej Arati",    time: "evening", date: "19 May 2025", emoji: "🌟" },
  { id: 12, deity: "Jyotiba",            sringar: "Rang Utsav",    time: "morning", date: "20 May 2025", emoji: "🔱" },
  { id: 13, deity: "Jyotiba",            sringar: "Sandhya Puja",  time: "evening", date: "19 May 2025", emoji: "🧡" },
  { id: 14, deity: "Narsinh Saraswati",  sringar: "Padukapuja",    time: "morning", date: "20 May 2025", emoji: "🙏" },
  { id: 15, deity: "Narsinh Saraswati",  sringar: "Datta Arati",   time: "evening", date: "19 May 2025", emoji: "🕯️" },
  { id: 16, deity: "Ganesh",             sringar: "Pratah Puja",   time: "morning", date: "20 May 2025", emoji: "🐘" },
  { id: 17, deity: "Ganesh",             sringar: "Sandhya Arati", time: "evening", date: "19 May 2025", emoji: "🍀" },
  { id: 18, deity: "Kopeshwar",          sringar: "Abhishek",      time: "morning", date: "20 May 2025", emoji: "🌊" },
  { id: 19, deity: "Kopeshwar",          sringar: "Pradosh Puja",  time: "evening", date: "19 May 2025", emoji: "🌒" },
  { id: 20, deity: "Tulja Bhavani",      sringar: "Shodashopchar", time: "morning", date: "20 May 2025", emoji: "⚔️" },
  { id: 21, deity: "Tulja Bhavani",      sringar: "Ratri Arati",   time: "evening", date: "19 May 2025", emoji: "🌹" },
];

const badgeStyle = (time) => ({
  morning: { background: "rgba(255,180,50,0.1)", color: "rgba(255,200,80,0.7)", border: "0.5px solid rgba(255,180,50,0.2)" },
  noon:    { background: "rgba(220,80,40,0.1)",  color: "rgba(240,120,80,0.7)", border: "0.5px solid rgba(220,80,40,0.2)" },
  evening: { background: "rgba(120,60,200,0.1)", color: "rgba(180,120,255,0.7)",border: "0.5px solid rgba(120,60,200,0.2)" },
}[time]);

export default function DarshanGallery() {
  const [activeDeity, setActiveDeity] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = activeDeity === "All" ? DARSHANS : DARSHANS.filter(d => d.deity === activeDeity);

  const byDate = filtered.reduce((acc, d) => {
    (acc[d.date] = acc[d.date] || []).push(d);
    return acc;
  }, {});

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
      <div style={s.page}>
        <div style={s.header}>
          <div>
            <h1 style={s.title}>Deity Darshan & Sringar</h1>
            <p style={s.subtitle}>DAILY GALLERY</p>
          </div>
          <button style={s.uploadBtn}>+ Upload Darshan</button>
        </div>

        {/* Scrollable Tabs */}
        <div style={s.tabsWrap}>
          {DEITIES.map(d => (
            <button key={d} onClick={() => setActiveDeity(d)}
              style={{ ...s.tab, ...(activeDeity === d ? s.tabActive : {}) }}>
              {d}
            </button>
          ))}
        </div>

        {Object.entries(byDate).map(([date, items]) => (
          <div key={date} style={{ marginBottom: "2rem" }}>
            <div style={s.dateDivider}><span style={s.dateLabel}>{date}</span></div>
            <div style={s.grid}>
              {items.map(d => (
                <div key={d.id} style={s.card} onClick={() => setSelected(d)}>
                  <div style={s.cardImg}>{d.emoji}</div>
                  <div style={s.cardBody}>
                    <div style={s.cardDeity}>{d.deity}</div>
                    <div style={s.cardSringar}>{d.sringar}</div>
                    <span style={{ ...s.badge, ...badgeStyle(d.time) }}>{d.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <p style={s.count}>{filtered.length} darshan{filtered.length !== 1 ? "s" : ""} shown</p>

        {selected && (
          <div style={s.overlay} onClick={() => setSelected(null)}>
            <div style={s.modal} onClick={e => e.stopPropagation()}>
              <button style={s.close} onClick={() => setSelected(null)}>✕</button>
              <div style={{ fontSize: "80px", marginBottom: "1rem" }}>{selected.emoji}</div>
              <div style={{ ...s.title, fontSize: "18px", marginBottom: "4px" }}>{selected.deity}</div>
              <div style={s.modalDetail}>{selected.sringar}</div>
              <div style={s.modalDetail}>{selected.date}</div>
              <span style={{ ...s.badge, ...badgeStyle(selected.time), fontSize: "11px", padding: "4px 10px" }}>
                {selected.time} darshan
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#1c0c10", fontFamily: "'Inter', sans-serif", padding: "2rem 1.5rem", color: "#f5e9d0" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" },
  title: { fontFamily: "'Cinzel', serif", fontSize: "20px", color: "#E8B84B", margin: "0 0 2px", letterSpacing: "1px" },
  subtitle: { fontSize: "10px", color: "rgba(201,146,42,0.5)", letterSpacing: "3px", margin: 0 },
  uploadBtn: { background: "linear-gradient(135deg,#7B2D10,#C9922A)", border: "none", borderRadius: "8px", padding: "9px 16px", fontFamily: "'Cinzel',serif", fontSize: "12px", color: "#FDF6E3", cursor: "pointer", letterSpacing: "1px" },
  tabsWrap: { display: "flex", gap: "8px", marginBottom: "1.5rem", flexWrap: "wrap" },
  tab: { background: "none", border: "0.5px solid rgba(201,146,42,0.25)", borderRadius: "20px", padding: "6px 14px", fontSize: "12px", color: "rgba(201,146,42,0.55)", cursor: "pointer", fontFamily: "'Inter',sans-serif", whiteSpace: "nowrap" },
  tabActive: { background: "rgba(201,146,42,0.12)", borderColor: "rgba(201,146,42,0.5)", color: "#E8B84B" },
  dateDivider: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" },
  dateLabel: { fontFamily: "'Cinzel',serif", fontSize: "13px", color: "rgba(201,146,42,0.7)", letterSpacing: "1px", whiteSpace: "nowrap" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: "12px" },
  card: { background: "#2a1018", border: "1px solid rgba(201,146,42,0.15)", borderRadius: "10px", overflow: "hidden", cursor: "pointer" },
  cardImg: { width: "100%", aspectRatio: "3/4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px", background: "rgba(201,146,42,0.06)" },
  cardBody: { padding: "10px 12px" },
  cardDeity: { fontFamily: "'Cinzel',serif", fontSize: "12px", color: "#E8B84B", letterSpacing: ".5px", marginBottom: "3px" },
  cardSringar: { fontSize: "11px", color: "rgba(245,233,208,0.45)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "5px" },
  badge: { display: "inline-block", fontSize: "9px", padding: "2px 7px", borderRadius: "10px", letterSpacing: "1px", textTransform: "uppercase" },
  overlay: { position: "fixed", inset: 0, background: "rgba(10,4,6,0.85)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" },
  modal: { background: "#2a1018", border: "1px solid rgba(201,146,42,0.3)", borderRadius: "14px", maxWidth: "380px", width: "100%", padding: "1.5rem", position: "relative", textAlign: "center" },
  close: { position: "absolute", top: "12px", right: "14px", background: "none", border: "none", color: "rgba(201,146,42,0.5)", fontSize: "18px", cursor: "pointer" },
  modalDetail: { fontSize: "13px", color: "rgba(245,233,208,0.5)", marginBottom: "6px" },
  count: { fontSize: "12px", color: "rgba(245,233,208,0.25)", textAlign: "right", marginTop: "1rem" },
};