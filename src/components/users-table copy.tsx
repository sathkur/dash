'use client'

import { useState, useMemo } from "react";

// ── Lucide-style inline SVG icons ─────────────────────────────────────────────
const Icon = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const ArrowUpDown = () => <Icon d="M12 2l-4 4h8l-4-4zm0 20l-4-4h8l4 4" size={14} />;
const ArrowUp   = () => <Icon d="M12 19V5M5 12l7-7 7 7" size={14} />;
const ArrowDown = () => <Icon d="M12 5v14M5 12l7 7 7-7" size={14} />;
const ChevLeft  = () => <Icon d="M15 18l-6-6 6-6" size={16} />;
const ChevRight = () => <Icon d="M9 18l6-6-6-6" size={16} />;
const ChevsLeft = () => <Icon d="M11 17l-5-5 5-5M17 17l-5-5 5-5" size={16} />;
const ChevsRight= () => <Icon d="M13 17l5-5-5-5M7 17l5-5-5-5" size={16} />;
const Settings2 = () => <Icon d="M20 7H4M20 12H4M20 17H4" size={16} />;
const Search    = () => <Icon d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" size={16} />;
const MoreHoriz = () => <Icon d="M5 12h.01M12 12h.01M19 12h.01" size={16} />;
const UserIcon  = () => <Icon d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" size={14} />;

// ── Sample data ───────────────────────────────────────────────────────────────
const USERS = [
  { id: 1, name: "Aria Chen",       email: "aria.chen@company.io",     role: "Admin",     status: "active",   joined: "2022-03-14", avatar: "AC" },
  { id: 2, name: "Blake Morrison",  email: "b.morrison@company.io",    role: "Developer", status: "active",   joined: "2023-01-07", avatar: "BM" },
  { id: 3, name: "Celine Dupont",   email: "celine.d@company.io",      role: "Designer",  status: "inactive", joined: "2021-11-22", avatar: "CD" },
  { id: 4, name: "Darius Okafor",   email: "d.okafor@company.io",      role: "Developer", status: "active",   joined: "2023-06-18", avatar: "DO" },
  { id: 5, name: "Elise Nakamura",  email: "e.nakamura@company.io",    role: "Manager",   status: "active",   joined: "2020-08-05", avatar: "EN" },
  { id: 6, name: "Felix Strauss",   email: "f.strauss@company.io",     role: "Developer", status: "pending",  joined: "2024-02-01", avatar: "FS" },
  { id: 7, name: "Greta Johansson", email: "greta.j@company.io",       role: "Designer",  status: "active",   joined: "2022-09-30", avatar: "GJ" },
  { id: 8, name: "Hugo Martinez",   email: "h.martinez@company.io",    role: "Admin",     status: "inactive", joined: "2021-04-17", avatar: "HM" },
  { id: 9, name: "Iris Patel",      email: "iris.p@company.io",        role: "Developer", status: "active",   joined: "2023-11-11", avatar: "IP" },
  { id: 10,"name":"James Woo",      email: "j.woo@company.io",         role: "Manager",   status: "active",   joined: "2019-07-23", avatar: "JW" },
  { id: 11,"name":"Kira Andersen",  email: "k.andersen@company.io",    role: "Designer",  status: "pending",  joined: "2024-01-15", avatar: "KA" },
  { id: 12,"name":"Luca Ferretti",  email: "l.ferretti@company.io",    role: "Developer", status: "active",   joined: "2022-05-09", avatar: "LF" },
  { id: 13,"name":"Mia Osei",       email: "mia.osei@company.io",      role: "Admin",     status: "active",   joined: "2020-12-03", avatar: "MO" },
  { id: 14,"name":"Noel Varga",     email: "n.varga@company.io",       role: "Developer", status: "inactive", joined: "2021-08-28", avatar: "NV" },
  { id: 15,"name":"Olivia Grant",   email: "o.grant@company.io",       role: "Manager",   status: "active",   joined: "2023-04-02", avatar: "OG" },
];

const ROLE_COLORS = {
  Admin:     { bg: "#e0e7ff", text: "#4338ca" },
  Developer: { bg: "#dcfce7", text: "#15803d" },
  Designer:  { bg: "#fce7f3", text: "#be185d" },
  Manager:   { bg: "#fef9c3", text: "#854d0e" },
};

const STATUS_CONFIG = {
  active:   { dot: "#22c55e", label: "Active"   },
  inactive: { dot: "#94a3b8", label: "Inactive" },
  pending:  { dot: "#f59e0b", label: "Pending"  },
};

const AVATAR_COLORS = [
  ["#dbeafe","#1d4ed8"], ["#ede9fe","#6d28d9"], ["#fce7f3","#be185d"],
  ["#dcfce7","#15803d"], ["#fef9c3","#92400e"], ["#ffedd5","#c2410c"],
];
const avatarColor = (id) => AVATAR_COLORS[id % AVATAR_COLORS.length];

// ── Column definitions ────────────────────────────────────────────────────────
const COLUMNS = [
  { id: "select",  label: "",        sortable: false, hideable: false },
  { id: "name",    label: "Name",    sortable: true,  hideable: true  },
  { id: "email",   label: "Email",   sortable: true,  hideable: true  },
  { id: "role",    label: "Role",    sortable: true,  hideable: true  },
  { id: "status",  label: "Status",  sortable: true,  hideable: true  },
  { id: "joined",  label: "Joined",  sortable: true,  hideable: true  },
  { id: "actions", label: "",        sortable: false, hideable: false },
];

// ── Tiny components ───────────────────────────────────────────────────────────
function Avatar({ initials, userId }) {
  const [bg, fg] = avatarColor(userId);
  return (
    <div style={{
      width: 32, height: 32, borderRadius: "50%", background: bg, color: fg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", flexShrink: 0,
    }}>{initials}</div>
  );
}

function Badge({ role }) {
  const { bg, text } = ROLE_COLORS[role] || { bg: "#f1f5f9", text: "#475569" };
  return (
    <span style={{
      background: bg, color: text, padding: "2px 8px", borderRadius: 999,
      fontSize: 11, fontWeight: 600, letterSpacing: "0.03em",
    }}>{role}</span>
  );
}

function StatusDot({ status }) {
  const { dot, label } = STATUS_CONFIG[status] || { dot: "#94a3b8", label: status };
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#374151" }}>
      <span style={{
        width: 7, height: 7, borderRadius: "50%", background: dot,
        boxShadow: `0 0 0 2px ${dot}33`, display: "inline-block", flexShrink: 0,
      }} />
      {label}
    </span>
  );
}

function SortIcon({ col, sorting }) {
  if (!col.sortable) return null;
  if (sorting.key !== col.id) return <span style={{ opacity: 0.3, marginLeft: 4 }}><ArrowUpDown /></span>;
  return <span style={{ marginLeft: 4, color: "#6366f1" }}>
    {sorting.dir === "asc" ? <ArrowUp /> : <ArrowDown />}
  </span>;
}

function Checkbox({ checked, indeterminate, onChange }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      ref={el => el && (el.indeterminate = !!indeterminate)}
      onChange={onChange}
      style={{ width: 15, height: 15, accentColor: "#6366f1", cursor: "pointer" }}
    />
  );
}

function ActionMenu({ user, onAction }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(p => !p)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        style={{
          background: "none", border: "1px solid transparent", borderRadius: 6,
          padding: "4px 6px", cursor: "pointer", color: "#94a3b8",
          transition: "all .15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#374151"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.color = "#94a3b8"; }}
      >
        <MoreHoriz />
      </button>
      {open && (
        <div style={{
          position: "absolute", right: 0, top: "calc(100% + 4px)", background: "#fff",
          border: "1px solid #e2e8f0", borderRadius: 10, boxShadow: "0 4px 20px rgba(0,0,0,.1)",
          zIndex: 100, minWidth: 140, overflow: "hidden",
        }}>
          {["View Profile", "Edit User", "Reset Password", "—", "Delete User"].map((item, i) =>
            item === "—"
              ? <div key={i} style={{ borderTop: "1px solid #f1f5f9", margin: "2px 0" }} />
              : (
                <button key={item} onClick={() => { onAction(item, user); setOpen(false); }}
                  style={{
                    display: "block", width: "100%", textAlign: "left", background: "none",
                    border: "none", padding: "8px 14px", cursor: "pointer", fontSize: 13,
                    color: item === "Delete User" ? "#ef4444" : "#374151",
                    transition: "background .1s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = item === "Delete User" ? "#fef2f2" : "#f8fafc"}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}
                >{item}</button>
              )
          )}
        </div>
      )}
    </div>
  );
}

// ── Main table component ──────────────────────────────────────────────────────
export default function UserTable() {
  const [search,     setSearch]     = useState("");
  const [sorting,    setSorting]    = useState({ key: "name", dir: "asc" });
  const [rowSel,     setRowSel]     = useState({});
  const [colVis,     setColVis]     = useState({ name:true,email:true,role:true,status:true,joined:true });
  const [showColMenu,setShowColMenu]= useState(false);
  const [pageIndex,  setPageIndex]  = useState(0);
  const [pageSize,   setPageSize]   = useState(5);
  const [toast,      setToast]      = useState(null);

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  // Filter
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return USERS.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q) ||
      u.status.toLowerCase().includes(q)
    );
  }, [search]);

  // Sort
  const sorted = useMemo(() => {
    const { key, dir } = sorting;
    return [...filtered].sort((a, b) => {
      const av = a[key] ?? "", bv = b[key] ?? "";
      return dir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
  }, [filtered, sorting]);

  // Paginate
  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safeIdx   = Math.min(pageIndex, pageCount - 1);
  const pageRows  = sorted.slice(safeIdx * pageSize, safeIdx * pageSize + pageSize);

  const handleSort = (col) => {
    if (!col.sortable) return;
    setSorting(s => s.key === col.id ? { key: col.id, dir: s.dir === "asc" ? "desc" : "asc" } : { key: col.id, dir: "asc" });
    setPageIndex(0);
  };

  // Selection helpers
  const pageIds       = pageRows.map(r => r.id);
  const allPageSel    = pageIds.length > 0 && pageIds.every(id => rowSel[id]);
  const someSel       = pageIds.some(id => rowSel[id]);
  const totalSelected = Object.values(rowSel).filter(Boolean).length;

  const toggleAll = () => {
    if (allPageSel) setRowSel(s => { const n={...s}; pageIds.forEach(id => delete n[id]); return n; });
    else            setRowSel(s => { const n={...s}; pageIds.forEach(id => n[id]=true); return n; });
  };
  const toggleRow = (id) => setRowSel(s => { const n={...s}; if(n[id]) delete n[id]; else n[id]=true; return n; });

  // Visible columns (for header rendering)
  const visibleCols = COLUMNS.filter(c => c.id === "select" || c.id === "actions" || colVis[c.id]);

  return (
    <div style={{
      minHeight: "100vh", background: "#f8fafc",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      padding: "32px 24px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: #e0e7ff; }
        button:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }
        tr.row-hover:hover td { background: #f8fafc; }
        tr.row-sel td { background: #eef2ff; }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: "#6366f1",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
            }}>
              <UserIcon />
            </div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em" }}>
              Users
            </h1>
            <span style={{
              background: "#e0e7ff", color: "#4338ca", fontSize: 12, fontWeight: 600,
              padding: "2px 8px", borderRadius: 999, marginLeft: 4,
            }}>{USERS.length}</span>
          </div>
          <p style={{ margin: 0, fontSize: 14, color: "#64748b" }}>
            Manage your team members, roles, and access levels.
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0",
          boxShadow: "0 1px 8px rgba(0,0,0,.04)",
          overflow: "hidden",
        }}>

          {/* Toolbar */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "16px 20px", borderBottom: "1px solid #f1f5f9",
          }}>
            {/* Search */}
            <div style={{ position: "relative", flex: 1, maxWidth: 300 }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
                <Search />
              </span>
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPageIndex(0); }}
                placeholder="Search users…"
                style={{
                  width: "100%", padding: "7px 12px 7px 34px",
                  border: "1px solid #e2e8f0", borderRadius: 8,
                  fontSize: 13, color: "#374151", background: "#f8fafc",
                  outline: "none", transition: "border .15s",
                }}
                onFocus={e => e.target.style.borderColor = "#6366f1"}
                onBlur={e  => e.target.style.borderColor = "#e2e8f0"}
              />
            </div>

            <div style={{ marginLeft: "auto", display: "flex", gap: 8, position: "relative" }}>
              {/* Column visibility */}
              <button
                onClick={() => setShowColMenu(p => !p)}
                onBlur={() => setTimeout(() => setShowColMenu(false), 150)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "7px 12px", border: "1px solid #e2e8f0", borderRadius: 8,
                  background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
                  cursor: "pointer", transition: "all .15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}
              >
                <Settings2 /> Columns
              </button>
              {showColMenu && (
                <div style={{
                  position: "absolute", right: 0, top: "calc(100% + 4px)",
                  background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10,
                  boxShadow: "0 4px 20px rgba(0,0,0,.1)", zIndex: 50, minWidth: 160,
                  padding: "8px 0",
                }}>
                  <div style={{ padding: "4px 14px 8px", fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Toggle Columns
                  </div>
                  {COLUMNS.filter(c => c.hideable).map(col => (
                    <label key={col.id} style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "6px 14px", cursor: "pointer", fontSize: 13, color: "#374151",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                      onMouseLeave={e => e.currentTarget.style.background = "none"}
                    >
                      <input type="checkbox" checked={!!colVis[col.id]}
                        onChange={() => setColVis(v => ({ ...v, [col.id]: !v[col.id] }))}
                        style={{ accentColor: "#6366f1" }} />
                      {col.label}
                    </label>
                  ))}
                </div>
              )}

              <button
                onClick={() => notify("New user flow would open here")}
                style={{
                  padding: "7px 14px", background: "#6366f1", color: "#fff",
                  border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600,
                  cursor: "pointer", transition: "background .15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#4f46e5"}
                onMouseLeave={e => e.currentTarget.style.background = "#6366f1"}
              >
                + Add User
              </button>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {visibleCols.map(col => (
                    <th key={col.id}
                      onClick={() => handleSort(col)}
                      style={{
                        padding: col.id === "select" ? "12px 8px 12px 20px" : col.id === "actions" ? "12px 20px 12px 8px" : "12px 16px",
                        textAlign: "left", fontSize: 11, fontWeight: 700,
                        color: "#64748b", letterSpacing: "0.06em", textTransform: "uppercase",
                        cursor: col.sortable ? "pointer" : "default",
                        whiteSpace: "nowrap", userSelect: "none",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      {col.id === "select"
                        ? <Checkbox checked={allPageSel} indeterminate={!allPageSel && someSel} onChange={toggleAll} />
                        : <span style={{ display: "flex", alignItems: "center" }}>
                            {col.label}
                            <SortIcon col={col} sorting={sorting} />
                          </span>
                      }
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageRows.length === 0
                  ? (
                    <tr>
                      <td colSpan={visibleCols.length} style={{ textAlign: "center", padding: "48px 20px", color: "#94a3b8", fontSize: 14 }}>
                        No users found matching your search.
                      </td>
                    </tr>
                  )
                  : pageRows.map(user => {
                    const sel = !!rowSel[user.id];
                    return (
                      <tr key={user.id} className={sel ? "row-sel" : "row-hover"}
                        style={{ transition: "background .1s", borderBottom: "1px solid #f1f5f9" }}
                      >
                        {visibleCols.map(col => (
                          <td key={col.id} style={{
                            padding: col.id === "select" ? "12px 8px 12px 20px" : col.id === "actions" ? "12px 20px 12px 8px" : "12px 16px",
                            fontSize: 13, color: "#374151", verticalAlign: "middle",
                          }}>
                            {col.id === "select" && (
                              <Checkbox checked={sel} onChange={() => toggleRow(user.id)} />
                            )}
                            {col.id === "name" && (
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <Avatar initials={user.avatar} userId={user.id} />
                                <span style={{ fontWeight: 600, color: "#0f172a" }}>{user.name}</span>
                              </div>
                            )}
                            {col.id === "email" && (
                              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#475569" }}>{user.email}</span>
                            )}
                            {col.id === "role"   && <Badge role={user.role} />}
                            {col.id === "status" && <StatusDot status={user.status} />}
                            {col.id === "joined" && (
                              <span style={{ color: "#64748b" }}>
                                {new Date(user.joined).toLocaleDateString("en-US", { year:"numeric", month:"short", day:"numeric" })}
                              </span>
                            )}
                            {col.id === "actions" && (
                              <ActionMenu user={user} onAction={(action, u) => notify(`"${action}" on ${u.name}`)} />
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 20px", borderTop: "1px solid #f1f5f9", gap: 12, flexWrap: "wrap",
          }}>
            <span style={{ fontSize: 13, color: "#64748b" }}>
              {totalSelected > 0
                ? <><strong style={{ color: "#6366f1" }}>{totalSelected}</strong> of {sorted.length} selected</>
                : <>{sorted.length} user{sorted.length !== 1 ? "s" : ""}</>
              }
            </span>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Page size */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#64748b" }}>
                Rows per page:
                <select value={pageSize}
                  onChange={e => { setPageSize(Number(e.target.value)); setPageIndex(0); }}
                  style={{
                    padding: "4px 8px", border: "1px solid #e2e8f0", borderRadius: 6,
                    fontSize: 13, color: "#374151", background: "#fff", cursor: "pointer",
                  }}>
                  {[5, 10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              <span style={{ fontSize: 13, color: "#64748b", whiteSpace: "nowrap" }}>
                Page {safeIdx + 1} of {pageCount}
              </span>

              {/* Pagination buttons */}
              {[
                { Icon: ChevsLeft,  action: () => setPageIndex(0),             disabled: safeIdx === 0,            label: "First" },
                { Icon: ChevLeft,   action: () => setPageIndex(p => p - 1),    disabled: safeIdx === 0,            label: "Prev"  },
                { Icon: ChevRight,  action: () => setPageIndex(p => p + 1),    disabled: safeIdx >= pageCount - 1, label: "Next"  },
                { Icon: ChevsRight, action: () => setPageIndex(pageCount - 1), disabled: safeIdx >= pageCount - 1, label: "Last"  },
              ].map(({ Icon: Ic, action, disabled, label }) => (
                <button key={label} onClick={action} disabled={disabled} aria-label={label}
                  style={{
                    width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid #e2e8f0", borderRadius: 7, background: "#fff",
                    cursor: disabled ? "not-allowed" : "pointer",
                    color: disabled ? "#cbd5e1" : "#374151",
                    opacity: disabled ? 0.5 : 1,
                    transition: "all .15s",
                  }}
                  onMouseEnter={e => !disabled && (e.currentTarget.style.background = "#f8fafc")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
                >
                  <Ic />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          background: "#1e293b", color: "#fff", padding: "10px 20px", borderRadius: 10,
          fontSize: 13, fontWeight: 500, boxShadow: "0 4px 20px rgba(0,0,0,.2)",
          zIndex: 999, animation: "fadein .2s ease",
        }}>
          {toast}
        </div>
      )}
      <style>{`@keyframes fadein { from { opacity:0; transform:translateX(-50%) translateY(8px) } to { opacity:1; transform:translateX(-50%) translateY(0) } }`}</style>
    </div>
  );
}