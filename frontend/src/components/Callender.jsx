import React, { useState, useMemo, useEffect } from "react";
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

const INITIAL_EVENTS = [
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

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 1));
  const [events, setEvents] = useState(INITIAL_EVENTS);

  // Real backend variables replacing the hardcoded data array
  const [backendUsers, setBackendUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [showAllUsers, setShowAllUsers] = useState(false);

  const isAdmin = localStorage.getItem("userRole") === "admin";

  // Fetch logged-in users from backend route if the role matches "admin"
  useEffect(() => {
    if (!isAdmin) return;

    const fetchLoggedInUsers = async () => {
      setIsLoadingUsers(true);
      try {
        // Replace this URL string with your actual backend route (e.g., "/api/admin/active-users")
        const response = await fetch("http://localhost:5000/api/auth/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Include auth header if your endpoint is protected
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`
          }
        });

        if (!response.ok) throw new Error("Failed to capture user logs");
        const data = await response.json();

        // Expecting an array layout matching: [{ id, name, email, phone }]
        setBackendUsers(data);
      } catch (err) {
        console.error("Database Connection Error: ", err);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchLoggedInUsers();
  }, [isAdmin]);

  const handleAddEvent = () => {
    const name = prompt("Enter Event Name:");
    if (!name) return;
    const date = prompt("Enter Date (YYYY-MM-DD):", format(selectedDate, "yyyy-MM-dd"));
    if (!date) return;
    const type = prompt("Enter Type (ekadasi or festival):", "festival");
    const desc = prompt("Enter Description:");
    const parana = type === "ekadasi" ? prompt("Enter Parana Time (Optional):") : "";

    const newEvent = { date, name, type, desc, parana };
    setEvents(prev => [...prev, newEvent]);
    alert("Event added locally!");
  };

  // Filter backend users based on active query
  const filteredUsers = useMemo(() => {
    return backendUsers.filter(u =>
      (u.name?.toLowerCase() || "").includes(userSearch.toLowerCase()) ||
      (u.email?.toLowerCase() || "").includes(userSearch.toLowerCase())
    );
  }, [userSearch, backendUsers]);

  // Dynamic pagination slice 
  const displayedUsers = useMemo(() => {
    if (showAllUsers) return filteredUsers;
    return filteredUsers.slice(0, 5);
  }, [filteredUsers, showAllUsers]);

  const activeEvents = useMemo(() => {
    return events.filter(e => isSameDay(new Date(e.date), selectedDate));
  }, [selectedDate, events]);

  // Calendar rendering builders
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day;
      const dayEvents = events.filter(e => isSameDay(new Date(e.date), cloneDay));
      const hasEkadasi = dayEvents.some(e => e.type === "ekadasi");
      const hasFest = dayEvents.some(e => e.type === "festival");

      let dayStyle = { ...styles.dayBox };
      if (!isSameMonth(cloneDay, currentMonth)) dayStyle.color = "rgba(245,233,208,0.25)";
      if (isSameDay(cloneDay, selectedDate)) dayStyle.backgroundColor = "rgba(201,146,42,0.2)";

      days.push(
        <div key={cloneDay} style={dayStyle} onClick={() => setSelectedDate(cloneDay)}>
          <div>{format(cloneDay, "d")}</div>
          <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
            {hasEkadasi && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8B84B" }} />}
            {hasFest && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#dc5028" }} />}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(<div key={day} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>{days}</div>);
    days = [];
  }

  return (
    <div style={styles.page}>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600&family=Inter:wght@400;600&display=swap" rel="stylesheet" />
      <div style={styles.container}>

        {/* Left Side: Calendar Box */}
        <div style={styles.calWrapper}>
          <div style={styles.calHeader}>
            <button style={styles.navBtn} onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>◀</button>
            <h2 style={{ fontFamily: "'Cinzel', serif", color: "#E8B84B", margin: 0 }}>{format(currentMonth, "MMMM yyyy")}</h2>
            <button style={styles.navBtn} onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>▶</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", fontWeight: 600, fontSize: 12, color: "rgba(201,146,42,0.6)", paddingBottom: 8 }}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div key={d}>{d}</div>)}
          </div>
          <div>{rows}</div>
        </div>

        {/* Right Side: Detailed Focus */}
        <div style={styles.detailsPanel}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h3 style={{ fontFamily: "'Cinzel', serif", color: "#E8B84B", margin: 0 }}>{format(selectedDate, "do MMMM yyyy")}</h3>
            {isAdmin && (
              <button style={styles.addEventBtn} onClick={handleAddEvent}>+ Add Event</button>
            )}
          </div>

          <div style={{ marginBottom: 20 }}>
            {activeEvents.length === 0 ? (
              <p style={{ color: "rgba(245,233,208,0.5)", fontSize: 13 }}>No major events listed for today.</p>
            ) : (
              activeEvents.map((e, idx) => (
                <div key={idx} style={{ background: "rgba(255,255,255,0.02)", borderLeft: `3px solid ${e.type === "ekadasi" ? "#E8B84B" : "#dc5028"}`, padding: 10, borderRadius: 4, marginBottom: 8 }}>
                  <div style={{ fontWeight: 600, color: "#f5e9d0" }}>{e.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(245,233,208,0.6)", marginTop: 2 }}>{e.desc}</div>
                  {e.parana && <div style={{ fontSize: 11, color: "#E8B84B", marginTop: 4, fontWeight: "500" }}>⏰ Parana Break Fast: {e.parana}</div>}
                </div>
              ))
            )}
          </div>

          {/* User Directory Sub-section: Restricted to Admin Access Only */}
          {isAdmin && (
            <div style={{ borderTop: "1px solid rgba(201,146,42,0.12)", paddingTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: "#E8B84B", letterSpacing: "0.5px" }}>Logged In Users</span>
                <span style={{ fontSize: "11px", color: "rgba(245,233,208,0.4)" }}>Total: {filteredUsers.length}</span>
              </div>

              <input placeholder="Search active profiles..." value={userSearch} onChange={(e) => setUserSearch(e.target.value)} style={styles.search} />

              <div style={styles.usersWrap}>
                {isLoadingUsers ? (
                  <div style={{ fontSize: 12, color: "rgba(245,233,208,0.4)", textAlign: "center", padding: "15px 0" }}>Syncing live database updates...</div>
                ) : displayedUsers.length === 0 ? (
                  <div style={{ fontSize: 12, color: "rgba(245,233,208,0.4)", textAlign: "center", padding: "10px 0" }}>No matching profiles found</div>
                ) : (
                  displayedUsers.map(u => (
                    <div key={u._id} style={styles.userRow}> {/* Changed from u.id to u._id */}
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13, color: "#f5e9d0" }}>{u.name || "Unknown User"}</div>
                        <div style={{ fontSize: 11, color: "rgba(245,233,208,0.5)", marginTop: 1 }}>{u.email}</div>
                      </div>
                      {u.phone && <div style={{ fontSize: 11, color: "rgba(201,146,42,0.6)" }}>{u.phone}</div>}
                    </div>
                  ))
                )}
              </div>

              {/* Show toggle button only if total matches exceed the standard 5 rows limit */}
              {!isLoadingUsers && filteredUsers.length > 5 && (
                <button style={styles.seeMoreBtn} onClick={() => setShowAllUsers(!showAllUsers)}>
                  {showAllUsers ? "▲ See Less" : `▼ See More (${filteredUsers.length - 5} hidden)`}
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { background: "#15060a", minHeight: "100vh", padding: 20, color: "#f5e9d0", fontFamily: "'Inter', sans-serif" },
  container: { maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, flexWrap: "wrap" },
  calWrapper: { background: "#1e0c10", border: "1px solid rgba(201,146,42,0.15)", borderRadius: 12, padding: 16 },
  calHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  navBtn: { background: "transparent", border: "1px solid rgba(201,146,42,0.3)", color: "#E8B84B", borderRadius: 6, padding: "4px 10px", cursor: "pointer" },
  addEventBtn: { background: "linear-gradient(135deg, #c9922a, #a47219)", border: "none", color: "#1a0b0f", padding: "6px 12px", borderRadius: "6px", fontWeight: "600", fontSize: "12px", cursor: "pointer" },
  dayBox: { height: 60, border: "1px solid rgba(201,146,42,0.04)", padding: 6, cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: 13 },
  detailsPanel: { background: "#220c11", border: "1px solid rgba(201,146,42,0.15)", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column" },
  search: { width: "100%", background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(201,146,42,0.25)", borderRadius: 6, padding: "8px 10px", fontSize: 12, color: "#f5e9d0", outline: "none", marginBottom: 10, boxSizing: "border-box" },
  usersWrap: { display: "flex", flexDirection: "column", gap: 6, maxHeight: "280px", overflowY: "auto" },
  userRow: { padding: "8px 12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,146,42,0.05)", borderRadius: 6, display: "flex", justifyContent: "space-between", alignItems: "center" },
  seeMoreBtn: { background: "transparent", border: "none", color: "#E8B84B", fontSize: "12px", fontWeight: "500", marginTop: "10px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", padding: "4px 0", width: "fit-content", outline: "none" }
};