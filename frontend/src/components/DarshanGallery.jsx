import { useMemo, useState } from "react";

const DEITIES = [
  "All",
  "Radha Krishna",
  "Jagannath",
  "Nitai Gauranga",
  "Mahalakshmi",
  "Jyotiba",
  "Narsinh Saraswati",
  "Ganesh",
  "Kopeshwar",
  "Tulja Bhavani",
];

const DARSHANS = [
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
const timeStyle = (time) =>
  ({
    morning: {
      bg: "rgba(255,180,50,0.12)",
      fg: "rgba(255,214,120,0.9)",
      border: "rgba(255,180,50,0.25)",
    },
    noon: {
      bg: "rgba(220,80,40,0.12)",
      fg: "rgba(255,160,120,0.9)",
      border: "rgba(220,80,40,0.25)",
    },
    evening: {
      bg: "rgba(120,60,200,0.12)",
      fg: "rgba(200,160,255,0.9)",
      border: "rgba(120,60,200,0.25)",
    },
  }[time]);

export default function DarshanGallery() {
  const [activeDeity, setActiveDeity] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return DARSHANS.filter((d) => {
      const deityOk = activeDeity === "All" || d.deity === activeDeity;
      const searchOk =
        `${d.deity} ${d.sringar} ${d.date} ${d.time}`
          .toLowerCase()
          .includes(query.toLowerCase());
      return deityOk && searchOk;
    });
  }, [activeDeity, query]);

  const byDate = useMemo(() => {
    return filtered.reduce((acc, item) => {
      (acc[item.date] = acc[item.date] || []).push(item);
      return acc;
    }, {});
  }, [filtered]);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div style={styles.page}>
        <div style={styles.shell}>
          <div style={styles.header}>
            <div>
              <h1 style={styles.title}>Deity Darshan Gallery</h1>
              <div style={styles.subtitle}>DAILY SRIKRISHNA • KOLHAPUR • SINGAR & DARSHAN</div>
            </div>

            <button style={styles.uploadBtn}>+ Upload Darshan</button>
          </div>

          <div style={styles.toolbar}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search deity, sringar, date..."
              style={styles.search}
            />
            <div style={styles.count}>{filtered.length} item{filtered.length !== 1 ? "s" : ""}</div>
          </div>

          <div style={styles.tabsWrap}>
            {DEITIES.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDeity(d)}
                style={{
                  ...styles.tab,
                  ...(activeDeity === d ? styles.tabActive : {}),
                }}
              >
                {d}
              </button>
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
                      <button
                        key={d.id}
                        onClick={() => setSelected(d)}
                        style={styles.card}
                      >
                        <div style={styles.imageWrap}>
                          <div style={styles.glow} />
                          <div style={styles.emoji}>{d.emoji}</div>
                          <div style={{ ...styles.timeTag, background: t.bg, color: t.fg, borderColor: t.border }}>
                            {d.time}
                          </div>
                        </div>

                        <div style={styles.cardBody}>
                          <div style={styles.cardTitle}>{d.deity}</div>
                          <div style={styles.cardMeta}>{d.sringar}</div>
                          <div style={styles.cardFooter}>
                            <span style={styles.cardHint}>Tap to view</span>
                            <span style={styles.cardArrow}>→</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))
          )}
        </div>

        {selected && (
          <div style={styles.overlay} onClick={() => setSelected(null)}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <button style={styles.close} onClick={() => setSelected(null)}>
                ✕
              </button>

              <div style={styles.modalEmoji}>{selected.emoji}</div>
              <div style={styles.modalTitle}>{selected.deity}</div>
              <div style={styles.modalSringar}>{selected.sringar}</div>
              <div style={styles.modalDate}>{selected.date}</div>
              <span
                style={{
                  ...styles.modalTag,
                  ...timeStyle(selected.time),
                }}
              >
                {selected.time} darshan
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #2a1018 0%, #1c0c10 55%, #12080b 100%)",
    fontFamily: "'Inter', sans-serif",
    color: "#f5e9d0",
    padding: "24px",
    boxSizing: "border-box",
  },
  shell: {
    maxWidth: "1280px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "18px",
  },
  title: {
    margin: 0,
    fontFamily: "'Cinzel', serif",
    fontSize: "26px",
    color: "#E8B84B",
    letterSpacing: "0.5px",
  },
  subtitle: {
    marginTop: "4px",
    fontSize: "11px",
    letterSpacing: "3px",
    color: "rgba(201,146,42,0.55)",
  },
  uploadBtn: {
    border: "none",
    borderRadius: "10px",
    padding: "10px 16px",
    cursor: "pointer",
    color: "#fff4d6",
    background: "linear-gradient(135deg, #7B2D10, #C9922A)",
    fontFamily: "'Cinzel', serif",
    letterSpacing: "1px",
  },
  toolbar: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "16px",
  },
  search: {
    flex: "1 1 320px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(201,146,42,0.2)",
    borderRadius: "10px",
    padding: "12px 14px",
    color: "#f5e9d0",
    outline: "none",
  },
  count: {
    fontSize: "13px",
    color: "rgba(245,233,208,0.55)",
  },
  tabsWrap: {
    display: "flex",
    gap: "8px",
    overflowX: "auto",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  tab: {
    flex: "0 0 auto",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(201,146,42,0.18)",
    color: "rgba(245,233,208,0.62)",
    borderRadius: "999px",
    padding: "8px 14px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontSize: "12px",
  },
  tabActive: {
    background: "rgba(201,146,42,0.12)",
    borderColor: "rgba(201,146,42,0.45)",
    color: "#E8B84B",
  },
  section: {
    marginBottom: "28px",
  },
  dateRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginBottom: "14px",
  },
  dateLabel: {
    fontFamily: "'Cinzel', serif",
    color: "rgba(201,146,42,0.8)",
    letterSpacing: "1px",
    fontSize: "13px",
  },
  dateCount: {
    fontSize: "12px",
    color: "rgba(245,233,208,0.42)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
    gap: "14px",
  },
  card: {
    textAlign: "left",
    border: "1px solid rgba(201,146,42,0.15)",
    background: "#2a1018",
    borderRadius: "14px",
    overflow: "hidden",
    cursor: "pointer",
    padding: 0,
    color: "inherit",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
  },
  imageWrap: {
    aspectRatio: "3 / 4",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(180deg, rgba(201,146,42,0.08), rgba(0,0,0,0.08))",
    overflow: "hidden",
  },
  glow: {
    position: "absolute",
    inset: "20% 20%",
    background: "radial-gradient(circle, rgba(232,184,75,0.18), transparent 65%)",
    filter: "blur(10px)",
  },
  emoji: {
    position: "relative",
    zIndex: 1,
    fontSize: "58px",
    transform: "translateY(-4px)",
  },
  timeTag: {
    position: "absolute",
    left: "10px",
    top: "10px",
    padding: "4px 8px",
    borderRadius: "999px",
    fontSize: "10px",
    border: "1px solid",
    textTransform: "uppercase",
    letterSpacing: "1px",
    zIndex: 2,
  },
  cardBody: {
    padding: "12px 12px 13px",
  },
  cardTitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: "13px",
    color: "#E8B84B",
    marginBottom: "4px",
  },
  cardMeta: {
    fontSize: "11px",
    color: "rgba(245,233,208,0.55)",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "10px",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "11px",
  },
  cardHint: {
    color: "rgba(245,233,208,0.35)",
  },
  cardArrow: {
    color: "#E8B84B",
    fontSize: "16px",
  },
  emptyState: {
    border: "1px dashed rgba(201,146,42,0.25)",
    borderRadius: "16px",
    padding: "44px 20px",
    textAlign: "center",
    background: "rgba(255,255,255,0.02)",
  },
  emptyIcon: {
    fontSize: "34px",
    marginBottom: "10px",
  },
  emptyTitle: {
    fontFamily: "'Cinzel', serif",
    color: "#E8B84B",
    marginBottom: "6px",
  },
  emptyText: {
    fontSize: "13px",
    color: "rgba(245,233,208,0.5)",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(10,4,6,0.84)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    zIndex: 100,
  },
  modal: {
    width: "100%",
    maxWidth: "420px",
    background: "#2a1018",
    border: "1px solid rgba(201,146,42,0.3)",
    borderRadius: "18px",
    padding: "28px 22px 24px",
    textAlign: "center",
    position: "relative",
    boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
  },
  close: {
    position: "absolute",
    top: "12px",
    right: "12px",
    border: "none",
    background: "transparent",
    color: "rgba(201,146,42,0.6)",
    cursor: "pointer",
    fontSize: "18px",
  },
  modalEmoji: {
    fontSize: "76px",
    marginBottom: "12px",
  },
  modalTitle: {
    fontFamily: "'Cinzel', serif",
    color: "#E8B84B",
    fontSize: "20px",
    marginBottom: "6px",
  },
  modalSringar: {
    color: "rgba(245,233,208,0.72)",
    marginBottom: "6px",
  },
  modalDate: {
    color: "rgba(245,233,208,0.5)",
    fontSize: "13px",
    marginBottom: "14px",
  },
  modalTag: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    border: "1px solid",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontSize: "11px",
  },
};