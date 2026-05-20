import React, { useState, useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";

// ---------- USERS (from your original code) ----------
const USERS = [
  { id: 1, name: "Ratnadeep Abitkar", email: "ratnadeep@gmail.com", phone: "9876543210" },
  { id: 2, name: "Aryan Deshmukh", email: "aryan@email.com", phone: "723456789" },
  { id: 3, name:"rytu", email:"er", phone:"7489"}
];

// ---------- EVENTS (use your provided 2026 ISKCON EVENTS array) ----------
const EVENTS = [
  { date: "2026-01-14", name: "Saphala Ekadashi", type: "ekadasi", parana: "06:39 – 10:28 AM", desc: "Krishna paksha – grants success and liberation" },
  { date: "2026-01-29", name: "Putrada Ekadashi", type: "ekadasi", parana: "06:40 – 10:30 AM", desc: "Shukla paksha – grants boons and sons" },
  { date: "2026-01-31", name: "Nityananda Trayodashi", type: "festival", desc: "Appearance of Lord Nityananda Prabhu" },
  { date: "2026-02-13", name: "Sat-tila Ekadashi", type: "ekadasi", parana: "06:36 – 10:30 AM", desc: "Krishna paksha – destroys sins, sesame fast" },
  { date: "2026-02-27", name: "Bhaimi Ekadashi", type: "ekadasi", parana: "06:29 – 10:26 AM", desc: "Shukla paksha – Jaya Ekadashi, removes sins" },
  { date: "2026-03-03", name: "Gaura Purnima", type: "festival", desc: "Appearance of Sri Chaitanya Mahaprabhu – full fast, break after moonrise" },
  { date: "2026-03-15", name: "Vijaya Ekadashi", type: "ekadasi", parana: "06:19 – 09:40 AM", desc: "Krishna paksha – bestows victory over all enemies" },
  { date: "2026-03-29", name: "Amalaki Ekadashi", type: "ekadasi", parana: "06:10 – 07:09 AM", desc: "Shukla paksha – worship of Amalaki tree" },
  { date: "2026-04-13", name: "Papamochani Ekadashi", type: "ekadasi", parana: "05:54 – 10:08 AM", desc: "Krishna paksha – destroys all accumulated sins" },
  { date: "2026-04-27", name: "Kamada Ekadashi", type: "ekadasi", parana: "05:52 – 10:04 AM", desc: "Shukla paksha – fulfils all desires" },
  { date: "2026-04-30", name: "Nrsimha Chaturdashi", type: "festival", desc: "Appearance of Lord Narasimhadeva – fast till dusk" },
  { date: "2026-05-13", name: "Varuthini Ekadashi", type: "ekadasi", parana: "05:46 – 10:01 AM", desc: "Krishna paksha – removes sins, grants liberation" },
  { date: "2026-05-27", name: "Padmini Ekadashi", type: "ekadasi", parana: "05:42 – 10:01 AM", desc: "Adhika Masa (extra month) – rare and very auspicious" },
  { date: "2026-06-11", name: "Parama Ekadashi", type: "ekadasi", parana: "05:45 – 10:03 AM", desc: "Adhika Masa Krishna paksha – extra meritorious" },
  { date: "2026-06-25", name: "Mohini Ekadashi", type: "ekadasi", parana: "05:44 – 10:02 AM", desc: "Shukla paksha – removes illusion and sins" },
  { date: "2026-07-11", name: "Apara Ekadashi", type: "ekadasi", parana: "05:47 – 10:07 AM", desc: "Krishna paksha – destroys great sins" },
  { date: "2026-07-16", name: "Ratha Yatra", type: "festival", desc: "Lord Jagannath's grand chariot festival" },
  { date: "2026-07-25", name: "Nirjala Ekadashi", type: "ekadasi", parana: "05:51 – 10:10 AM", desc: "Most austere – no food or water. Equal to all 24 Ekadashis" },
  { date: "2026-07-29", name: "Devshayani Ekadashi", type: "ekadasi", parana: "05:53 – 10:12 AM", desc: "Lord Vishnu begins cosmic rest – Chaturmasya begins" },
  { date: "2026-08-09", name: "Kamika Ekadashi", type: "ekadasi", parana: "05:57 – 10:15 AM", desc: "Krishna paksha – pleases Lord Vishnu greatly" },
  { date: "2026-08-24", name: "Putrada Ekadashi", type: "ekadasi", parana: "06:02 – 10:19 AM", desc: "Shravana Shukla – grants boons and progeny" },
  { date: "2026-08-27", name: "Balarama Purnima", type: "festival", desc: "Appearance of Lord Balarama" },
  { date: "2026-08-29", name: "Janmashtami", type: "festival", desc: "Appearance of Lord Sri Krishna – fast till midnight" },
  { date: "2026-09-05", name: "Srila Prabhupada Appearance", type: "festival", desc: "Appearance of Srila A.C. Bhaktivedanta Swami Prabhupada" },
  { date: "2026-09-07", name: "Annada Ekadashi", type: "ekadasi", parana: "06:09 – 10:25 AM", desc: "Krishna paksha – grants food, prosperity, liberation" },
  { date: "2026-09-17", name: "Radhashtami", type: "festival", desc: "Appearance of Srimati Radharani – fast till noon" },
  { date: "2026-09-22", name: "Parshva Ekadashi", type: "ekadasi", parana: "06:14 – 10:28 AM", desc: "Shukla paksha – Lord Vishnu changes resting side" },
  { date: "2026-10-07", name: "Indira Ekadashi", type: "ekadasi", parana: "06:19 – 10:32 AM", desc: "Krishna paksha – liberates deceased ancestors" },
  { date: "2026-10-21", name: "Pasankusha Ekadashi", type: "ekadasi", parana: "06:25 – 10:37 AM", desc: "Shukla paksha – grants all desires, destroys sins" },
  { date: "2026-11-05", name: "Rama Ekadashi", type: "ekadasi", parana: "06:31 – 10:44 AM", desc: "Krishna paksha – destroys the greatest sins" },
  { date: "2026-11-10", name: "Govardhan Puja", type: "festival", desc: "Worship of Govardhan Hill – Annakuta festival" },
  { date: "2026-11-21", name: "Utthana Ekadashi", type: "ekadasi", parana: "06:38 – 10:52 AM", desc: "Lord Vishnu wakes up – end of Chaturmasya" },
  { date: "2026-11-24", name: "Tulasi Vivaha", type: "festival", desc: "Sacred marriage of Tulasi Devi and Shaligrama" },
  { date: "2026-12-05", name: "Utpanna Ekadashi", type: "ekadasi", parana: "06:43 – 10:58 AM", desc: "Krishna paksha – origin of Ekadashi Devi" },
  { date: "2026-12-20", name: "Mokshada Ekadashi", type: "ekadasi", parana: "06:49 – 08:30 AM", desc: "Vaikuntha Ekadashi – gates of Vaikuntha open. Most sacred." },
  { date: "2026-12-31", name: "Saphala Ekadashi", type: "ekadasi", parana: "06:52 – 10:59 AM", desc: "Krishna paksha – auspicious end of the year fast" },
];

// ---------- STYLES (based on your styles, extended) ----------
const styles = {
  monthArrowBtn: {
  background: "none",
  border: "0.5px solid rgba(201,146,42,0.2)",
  color: "#E8B84B",
  borderRadius: "8px",
  width: "28px",
  height: "28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "18px",
  lineHeight: 1,
},
  page: {
    minHeight: "100vh",
    background: "#1c0c10",
    fontFamily: "'Inter', sans-serif",
    padding: "1.5rem",
    color: "#f5e9d0",
    boxSizing: "border-box"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem"
  },
  title: {
    fontFamily: "'Cinzel', serif",
    fontSize: "22px",
    color: "#E8B84B",
    margin: 0,
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 420px",
    gap: "1rem",
    alignItems: "start"
  },
  leftPanel: {
    background: "#2a1018",
    border: "1px solid rgba(201,146,42,0.15)",
    borderRadius: "12px",
    padding: "1rem"
  },
  rightPanel: {
    background: "#2a1018",
    border: "1px solid rgba(201,146,42,0.15)",
    borderRadius: "12px",
    padding: "1rem",
    minHeight: "420px"
  },
  calendarHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px"
  },
  navBtn: {
    background: "none",
    border: "0.5px solid rgba(201,146,42,0.2)",
    padding: "6px 10px",
    color: "#E8B84B",
    borderRadius: "8px",
    cursor: "pointer"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "6px"
  },
  dayCell: {
    minHeight: "84px",
    padding: "8px",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.02)",
    color: "#f5e9d0",
    cursor: "pointer",
    position: "relative",
    boxSizing: "border-box"
  },
  muted: { color: "rgba(245,233,208,0.25)" },
  badge: {
    position: "absolute",
    right: "8px",
    top: "8px",
    background: "#C9922A",
    color: "#1c0c10",
    fontSize: "11px",
    padding: "2px 6px",
    borderRadius: "12px",
    fontFamily: "'Cinzel', serif"
  },
  eventDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: "6px"
  },
  search: {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(201,146,42,0.25)",
    borderRadius: "8px",
    padding: "8px 10px",
    fontSize: "14px",
    color: "#f5e9d0",
    marginBottom: "10px"
  },
  usersWrap: {
    marginTop: "12px",
    background: "rgba(0,0,0,0.05)",
    padding: "8px",
    borderRadius: "8px"
  },
  userRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px",
    borderBottom: "1px dashed rgba(255,255,255,0.03)"
  }
};

// ---------- Helper: group events by ISO date ----------
const eventsByDate = EVENTS.reduce((acc, ev) => {
  acc[ev.date] = acc[ev.date] || [];
  acc[ev.date].push(ev);
  return acc;
}, {});

// ---------- Component ----------
export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userSearch, setUserSearch] = useState("");
  const [search, setSearch] = useState("");

  const filteredUsers = USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const monthDays = useMemo(() => {
    const days = [];
    let day = startDate;
    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  }, [startDate, endDate]);

  function nextMonth() {
    setCurrentMonth(addMonths(currentMonth, 1));
  }
  function prevMonth() {
    setCurrentMonth(subMonths(currentMonth, 1));
  }
    function goToday() {
    const now = new Date();
    if (now.getFullYear() === 2026) {
      setCurrentMonth(now);
      setSelectedDate(now);
    } else {
      setCurrentMonth(new Date("2026-01-01"));
      setSelectedDate(new Date("2026-01-14"));
    }
  }
  const selectedIso = format(selectedDate, "yyyy-MM-dd");
  const dayEvents = eventsByDate[selectedIso] || [];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
      <div style={styles.page}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>ISKCON Kolhapur</h1>
            <div style={{ fontSize: 12, color: "rgba(201,146,42,0.6)", letterSpacing: 2 }}>CALENDAR — 2026 EVENTS</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={styles.navBtn} onClick={goToday}>Today</button>
            <button style={styles.navBtn} onClick={prevMonth}>Prev</button>
            <button style={styles.navBtn} onClick={nextMonth}>Next</button>
          </div>
        </div>

        <div style={styles.container}>
          <div style={styles.leftPanel}>
            <div style={styles.calendarHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button style={styles.monthArrowBtn} onClick={prevMonth}>‹</button>
                <div style={{ fontSize: 16, color: "#E8B84B", fontFamily: "'Cinzel', serif" }}>
                  {format(currentMonth, "MMMM yyyy")}
                </div>
                <button style={styles.monthArrowBtn} onClick={nextMonth}>›</button>
          </div>

          <div style={{ color: "rgba(245,233,208,0.5)", fontSize: 13 }}>
            {format(selectedDate, "eeee, do MMMM")}
          </div>
        </div>

            <div style={{ ...styles.grid, marginBottom: 8 }}>
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
                <div key={d} style={{ textAlign: "center", fontSize: 12, color: "rgba(245,233,208,0.5)" }}>{d}</div>
              ))}
            </div>

            <div style={styles.grid}>
              {monthDays.map((d, idx) => {
                const iso = format(d, "yyyy-MM-dd");
                const isCurrentMonth = isSameMonth(d, monthStart);
                const isToday = isSameDay(d, new Date());
                const evs = eventsByDate[iso] || [];
                return (
                  <div
                    key={idx}
                    style={{
                      ...styles.dayCell,
                      opacity: isCurrentMonth ? 1 : 0.38,
                      border: isSameDay(d, selectedDate) ? "1px solid rgba(201,146,42,0.5)" : "none"
                    }}
                    onClick={() => setSelectedDate(d)}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: 13, fontWeight: isToday ? 700 : 500 }}>{format(d, "d")}</div>
                      {evs.length > 0 && <div style={styles.badge}>{evs.length}</div>}
                    </div>

                    <div style={{ marginTop: 8 }}>
                      {evs.slice(0,2).map((e,i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                          <span style={{ ...styles.eventDot, background: e.type === "ekadasi" ? "#C9922A" : "#7B2D10" }} />
                          <span style={{ fontSize: 12, color: "rgba(245,233,208,0.9)" }}>{e.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={styles.rightPanel}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 15, color: "#E8B84B", fontFamily: "'Cinzel', serif" }}>Events — {format(selectedDate, "do MMMM yyyy")}</div>
              <div style={{ fontSize: 12, color: "rgba(245,233,208,0.5)" }}>{dayEvents.length} event{dayEvents.length !== 1 ? "s" : ""}</div>
            </div>

            <div style={{ marginBottom: 12 }}>
              {dayEvents.length === 0 && <div style={{ color: "rgba(245,233,208,0.45)" }}>No events for this day.</div>}
              {dayEvents.map((ev, i) => (
                <div key={i} style={{ padding: "8px", borderRadius: 8, marginBottom: 8, background: "rgba(0,0,0,0.06)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontWeight: 600 }}>{ev.name}</div>
                    <div style={{ fontSize: 12, color: "rgba(245,233,208,0.6)" }}>{ev.parana || ev.type}</div>
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(245,233,208,0.8)", marginTop: 6 }}>{ev.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid rgba(201,146,42,0.08)", paddingTop: 10 }}>
              <input placeholder="Search users by name or email..." value={userSearch} onChange={(e) => setUserSearch(e.target.value)} style={styles.search} />
              <div style={styles.usersWrap}>
                {filteredUsers.map(u => (
                  <div key={u.id} style={styles.userRow}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{u.name}</div>
                      <div style={{ fontSize: 12, color: "rgba(245,233,208,0.6)" }}>{u.email}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, color: "rgba(245,233,208,0.6)" }}>{u.phone}</div>
                      <div style={{ marginTop: 6 }}>
                        <button style={{ ...styles.navBtn, padding: "4px 8px", fontSize: 12, marginRight: 6 }}>Edit</button>
                        <button style={{ ...styles.navBtn, padding: "4px 8px", fontSize: 12, borderColor: "rgba(220,80,80,0.4)", color: "rgba(220,80,80,0.9)" }}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredUsers.length === 0 && <div style={{ color: "rgba(245,233,208,0.35)", padding: 8 }}>No users found.</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

