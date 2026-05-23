import { useMemo, useState } from "react";

const DEITIES = ["All", "Radha Krishna", "Jagannath", "Nitai Gauranga", "Mahalakshmi", "Jyotiba", "Narsinh Saraswati", "Ganesh", "Kopeshwar", "Tulja Bhavani"];

const INITIAL_DARSHANS = [
  { id: 1, deity: "Radha Krishna", sringar: "Panchamrita", time: "morning", date: "2026-01-14", emoji: "🌸" },
  { id: 2, deity: "Radha Krishna", sringar: "Raja Bhog", time: "noon", date: "2026-01-14", emoji: "👑" },
  { id: 3, deity: "Jagannath", sringar: "Sandhya Arati", time: "evening", date: "2026-01-14", emoji: "🪔" },
  { id: 4, deity: "Nitai Gauranga", sringar: "Mangala Arati", time: "morning", date: "2026-01-14", emoji: "🌼" },
  { id: 5, deity: "Radha Krishna", sringar: "Utthapana", time: "morning", date: "2026-05-13", emoji: "🌺" },
  { id: 6, deity: "Jagannath", sringar: "Bhoga Arati", time: "noon", date: "2026-05-13", emoji: "🌻" },
  { id: 7, deity: "Nitai Gauranga", sringar: "Sandhya Arati", time: "evening", date: "2026-05-13", emoji: "✨" },
  { id: 8, deity: "Radha Krishna", sringar: "Shayana Arati", time: "evening", date: "2026-05-13", emoji: "🌙" },
  { id: 9, deity: "Mahalakshmi", sringar: "Kakad Arati", time: "morning", date: "2026-08-29", emoji: "🪷" },
  { id: 10, deity: "Mahalakshmi", sringar: "Madhyanha Puja", time: "noon", date: "2026-08-29", emoji: "💛" },
  { id: 11, deity: "Mahalakshmi", sringar: "Shej Arati", time: "evening", date: "2026-08-29", emoji: "🌟" },
  { id: 12, deity: "Jyotiba", sringar: "Rang Utsav", time: "morning", date: "2026-11-10", emoji: "🔱" },
  { id: 13, deity: "Jyotiba", sringar: "Sandhya Puja", time: "evening", date: "2026-11-10", emoji: "🧡" },
  { id: 14, deity: "Narsinh Saraswati", sringar: "Padukapuja", time: "morning", date: "2026-09-05", emoji: "🙏" },
  { id: 15, deity: "Narsinh Saraswati", sringar: "Datta Arati", time: "evening", date: "2026-09-05", emoji: "🕯️" },
  { id: 16, deity: "Ganesh", sringar: "Pratah Puja", time: "morning", date: "2026-11-10", emoji: "🐘" },
  { id: 17, deity: "Ganesh", sringar: "Sandhya Arati", time: "evening", date: "2026-11-10", emoji: "🍀" },
  { id: 18, deity: "Kopeshwar", sringar: "Abhishek", time: "morning", date: "2026-04-30", emoji: "🌊" },
  { id: 19, deity: "Kopeshwar", sringar: "Pradosh Puja", time: "evening", date: "2026-04-30", emoji: "🌒" },
  { id: 20, deity: "Tulja Bhavani", sringar: "Shodashopchar", time: "morning", date: "2026-10-21", emoji: "⚔️" },
  { id: 21, deity: "Tulja Bhavani", sringar: "Ratri Arati", time: "evening", date: "2026-10-21", emoji: "🌹" },
];

const timeStyle = (time) => ({
  morning: { bg: "rgba(255,180,50,0.12)", fg: "rgba(255,214,120,0.9)", border: "rgba(255,180,50,0.25)" },
  noon: { bg: "rgba(220,80,40,0.12)", fg: "rgba(255,160,120,0.9)", border: "rgba(220,80,40,0.25)" },
  evening: { bg: "rgba(120,60,200,0.12)", fg: "rgba(200,160,255,0.9)", border: "rgba(120,60,200,0.25)" }
}[time] || { bg: "rgba(255,255,255,0.05)", fg: "#fff", border: "rgba(255,255,255,0.1)" });

export default function DarshanGallery() {
  const [darshans, setDarshans] = useState(INITIAL_DARSHANS);
  const [activeDeity, setActiveDeity] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const isAdmin = localStorage.getItem("userRole") === "admin";

  const handleUploadDarshan = () => {
    const deity = prompt(`Enter Deity Name:\nOptions: ${DEITIES.filter(d => d !== 'All').join(', ')}`);
    if (!deity) return;
    const sringar = prompt("Enter Sringar Details:");
    const time = prompt("Enter Time (morning, noon, evening):");
    const date = prompt("Enter Date (YYYY-MM-DD):", new Date().toISOString().split('T')[0]);
    const emoji = prompt("Enter an emoji icon representing the event:", "🌸");

    if (!sringar || !time) return alert("Missing entry requirements!");

    const newDarshan = {
      id: Date.now(),
      deity: deity.trim(),
      sringar: sringar.trim(),
      time: time.toLowerCase().trim(),
      date: date.trim(),
      emoji: emoji.trim()
    };

    setDarshans(prev => [newDarshan, ...prev]);
  };

  const filtered = useMemo(() => {
    return darshans.filter((d) => {
      const deityOk = activeDeity === "All" || d.deity === activeDeity;
      const searchOk = `${d.deity} ${d.sringar} ${d.date} ${d.time}`.toLowerCase().includes(query.toLowerCase());
      return deityOk && searchOk;
    });
  }, [activeDeity, query, darshans]);

  const byDate = useMemo(() => {
    return filtered.reduce((acc, item) => {
      (acc[item.date] = acc[item.date] || []).push(item);
      return acc;
    }, {});
  }, [filtered]);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      
      {/* Dynamic injection of the custom gold/crimson scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(34, 12, 17, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(201, 146, 42, 0.3);
          border-radius: 10px;
          transition: background 0.2s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(201, 146, 42, 0.6);
        }
        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(201, 146, 42, 0.3) rgba(34, 12, 17, 0.5);
        }
      `}</style>

      <div style={styles.page}>
        <div style={styles.shell}>
          <div style={styles.header}>
            <div>
              <h1 style={styles.title}>Deity Darshan Gallery</h1>
              <div style={styles.subtitle}>DAILY SRIKRISHNA • KOLHAPUR • SINGAR & DARSHAN</div>
            </div>
            {isAdmin && (
              <button style={styles.uploadBtn} onClick={handleUploadDarshan}>+ Upload Darshan</button>
            )}
          </div>

          <div style={styles.toolbar}>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search deity, sringar, date..." style={styles.search} />
            <div style={styles.count}>{filtered.length} item{filtered.length !== 1 ? "s" : ""}</div>
          </div>

          {/* Added the custom-scrollbar class here */}
          <div className="custom-scrollbar" style={styles.tabsWrap}>
            {DEITIES.map((d) => (
              <button key={d} onClick={() => setActiveDeity(d)} style={{ ...styles.tab, ...(activeDeity === d ? styles.tabActive : {}) }}>{d}</button>
            ))}
          </div>

          {Object.keys(byDate).length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🪷</div>
              <div style={styles.emptyTitle}>No darshan found</div>
              <div style={styles.emptyText}>Try a different deity filter or search term.</div>
            </div>
          ) : (
            Object.entries(byDate).map(([date, items]) => (
              <section key={date} style={styles.section}>
                <div style={styles.dateRow}>
                  <span style={styles.dateLabel}>{date}</span>
                  <span style={styles.dateCount}>{items.length} darshan{items.length !== 1 ? "s" : ""}</span>
                </div>
                <div style={styles.grid}>
                  {items.map((d) => {
                    const t = timeStyle(d.time);
                    return (
                      <button key={d.id} onClick={() => setSelected(d)} style={styles.card}>
                        <div style={styles.cardEmoji}>{d.emoji}</div>
                        <div style={styles.cardInfo}>
                          <div style={styles.cardDeity}>{d.deity}</div>
                          <div style={styles.cardSringar}>{d.sringar}</div>
                          <span style={{ ...styles.badge, background: t.bg, color: t.fg, borderColor: t.border }}>{d.time}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))
          )}
        </div>
      </div>

      {selected && (
        <div style={styles.overlay} onClick={() => setSelected(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button style={styles.close} onClick={() => setSelected(null)}>✕</button>
            <div style={styles.modalEmoji}>{selected.emoji}</div>
            <h2 style={styles.modalTitle}>{selected.deity}</h2>
            <p style={styles.modalMeta}>{selected.date} • <span style={{ textTransform: "uppercase" }}>{selected.time}</span></p>
            <div style={styles.modalBody}>
              <div style={styles.modalLabel}>Sringar Costume / offering</div>
              <div style={styles.modalValue}>{selected.sringar}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  page: { background: "#15060a", minHeight: "100vh", color: "#f5e9d0", fontFamily: "'Inter', sans-serif", padding: "24px 16px" },
  shell: { maxWidth: "900px", margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(201,146,42,0.15)", paddingBottom: "16px", marginBottom: "20px", flexWrap: "wrap", gap: 12 },
  title: { fontFamily: "'Cinzel', serif", fontSize: "24px", color: "#E8B84B", margin: 0 },
  subtitle: { fontSize: "10px", color: "rgba(201,146,42,0.5)", letterSpacing: "2.5px", marginTop: "4px" },
  uploadBtn: { background: "linear-gradient(135deg, #c9922a, #a47219)", border: "none", borderRadius: "8px", padding: "8px 16px", color: "#1a0b0f", fontWeight: "600", fontSize: "13px", cursor: "pointer" },
  toolbar: { display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" },
  search: { flex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "8px", padding: "10px 14px", color: "#f5e9d0", outline: "none", fontSize: "14px" },
  count: { fontSize: "12px", color: "rgba(245,233,208,0.5)" },
  tabsWrap: { display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "10px", marginBottom: "24px" },
  tab: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,146,42,0.1)", borderRadius: "20px", padding: "6px 14px", color: "rgba(245,233,208,0.6)", cursor: "pointer", fontSize: "12px", whiteSpace: "nowrap" },
  tabActive: { background: "rgba(201,146,42,0.15)", color: "#E8B84B", borderColor: "#c9922a" },
  section: { marginBottom: "28px" },
  dateRow: { display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(201,146,42,0.08)", paddingBottom: "6px", marginBottom: "14px" },
  dateLabel: { fontFamily: "'Cinzel', serif", color: "#E8B84B", fontSize: "14px", fontWeight: "600" },
  dateCount: { fontSize: "12px", color: "rgba(245,233,208,0.4)" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" },
  card: { background: "#220c11", border: "1px solid rgba(201,146,42,0.12)", borderRadius: "12px", padding: "14px", display: "flex", gap: "12px", textAlign: "left", cursor: "pointer", width: "100%", outline: "none" },
  cardEmoji: { fontSize: "28px", display: "flex", alignItems: "center" },
  cardInfo: { flex: 1, minWidth: 0 },
  cardDeity: { fontWeight: "600", fontSize: "14px", color: "#f5e9d0", marginBottom: "2px" },
  cardSringar: { fontSize: "12px", color: "rgba(245,233,208,0.6)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", marginBottom: "8px" },
  badge: { fontSize: "9px", textTransform: "uppercase", padding: "2px 6px", borderRadius: "4px", fontWeight: "600", border: "1px solid" },
  overlay: { position: "fixed", inset: 0, background: "rgba(10,4,6,0.84)", display: "flex", alignItems: "center", justifyBox: "center", padding: "20px", zIndex: 100, display: "flex", justifyContent: "center" },
  modal: { width: "100%", maxWidth: "420px", background: "#2a1018", border: "1px solid rgba(201,146,42,0.3)", borderRadius: "18px", padding: "28px 22px 24px", textAlign: "center", position: "relative", margin: "auto" },
  close: { position: "absolute", top: "12px", right: "12px", border: "none", background: "transparent", color: "rgba(201,146,42,0.6)", fontSize: "16px", cursor: "pointer" },
  modalEmoji: { fontSize: "48px", marginBottom: "10px" },
  modalTitle: { fontFamily: "'Cinzel', serif", color: "#E8B84B", margin: "0 0 4px" },
  modalMeta: { fontSize: "12px", color: "rgba(245,233,208,0.4)", margin: "0 0 20px" },
  modalBody: { background: "rgba(0,0,0,0.15)", borderRadius: "10px", padding: "14px" },
  modalLabel: { fontSize: "10px", color: "rgba(201,146,42,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" },
  modalValue: { fontSize: "15px", fontWeight: "500" },
  emptyState: { textAlign: "center", padding: "40px 20px" },
  emptyIcon: { fontSize: "36px", color: "rgba(201,146,42,0.3)" },
  emptyTitle: { fontFamily: "'Cinzel', serif", color: "#E8B84B", margin: "12px 0 4px" },
  emptyText: { fontSize: "13px", color: "rgba(245,233,208,0.5)" }
};