import React, { useEffect, useState } from "react";

const API_BASE = "http://127.0.0.1:50000";

export default function Company() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    projectId: "",
    proposalType: "Mentorship",
    content: "",
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch projects for browse + dropdown
  useEffect(() => {
    fetch(`${API_BASE}/api/projects`)
      .then(res => res.json())
      .then(data => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
  e.preventDefault();
  setLoading(true);
  setMsg("");

  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}/api/proposals`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({
        projectId: form.projectId,
        message: form.content
      })
    });

    const data = await res.json();

    if (res.ok) {
      setMsg("✅ Proposal sent successfully!");
      setForm({
        projectId: "",
        proposalType: "Mentorship",
        content: ""
      });
    } else {
      setMsg(data.message || "❌ Failed to send proposal");
    }
  } catch {
    setMsg("❌ Network error");
  }

  setLoading(false);
};

  return (
    <div className="section">
      <h2>Company Dashboard</h2>

      <div className="grid">
        {/* 🔹 Browse Projects */}
        <div className="card">
          <h3>Browse Projects</h3>
          <p>Find innovative ideas.</p>

          <div style={{ maxHeight: 220, overflowY: "auto", marginTop: 10 }}>
            {projects.length === 0 ? (
              <p style={{ fontSize: 14 }}>No projects available.</p>
            ) : (
              projects.map(p => (
                <div
                  key={p._id}
                  style={{
                    padding: 10,
                    marginBottom: 8,
                    borderRadius: 6,
                    background: "#f8f9fa",
                    boxShadow: "0 1px 3px #0001",
                  }}
                >
                  <strong>{p.title}</strong>
                  <div style={{ fontSize: 13 }}>
                    <b>Domain:</b> {p.domain}
                  </div>
                  <div style={{ fontSize: 13 }}>
                    <b>Skills:</b> {p.skills}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 🔹 Send Proposals */}
        <div className="card">
          <h3>Send Proposals</h3>
          <p>Offer mentorship or funding.</p>

          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: 12,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <select
              name="projectId"
              value={form.projectId}
              onChange={handleChange}
              required
            >
              <option value="">Select Project</option>
              {projects.map(p => (
                <option key={p._id} value={p._id}>
                  {p.title}
                </option>
              ))}
            </select>

            <select
              name="proposalType"
              value={form.proposalType}
              onChange={handleChange}
            >
              <option value="Mentorship">Mentorship</option>
              <option value="Funding">Funding</option>
            </select>

            <textarea
              name="content"
              placeholder="Write proposal message..."
              value={form.content}
              onChange={handleChange}
              rows={3}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Proposal"}
            </button>

            {msg && (
              <span
                style={{
                  fontSize: 14,
                  color: msg.includes("success") ? "green" : "red",
                }}
              >
                {msg}
              </span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
