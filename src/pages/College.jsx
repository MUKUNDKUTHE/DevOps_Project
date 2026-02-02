import React, { useState, useEffect } from "react";

const API_BASE = "http://127.0.0.1:50000";

export default function College() {
  const [activeSection, setActiveSection] = useState(null);

  const [form, setForm] = useState({
    title: "",
    domain: "",
    skills: "",
    description: "",
  });

  const [formMsg, setFormMsg] = useState("");
  const [projects, setProjects] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projectsLoading, setProjectsLoading] = useState(false);

  /* ---------------- FETCH PROJECTS ---------------- */
  const fetchProjects = async () => {
    setProjectsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/projects`);
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      setProjects([]);
    }
    setProjectsLoading(false);
  };

  /* ---------------- FETCH PROPOSALS ---------------- */
  const fetchProposals = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/proposals`);
      const data = await res.json();
      setProposals(Array.isArray(data) ? data : []);
    } catch {
      setProposals([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (activeSection === "post") fetchProjects();
    if (activeSection === "proposals") fetchProposals();
  }, [activeSection]);

  /* ---------------- FORM HANDLERS ---------------- */
  const handleFormChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    setFormMsg("Posting project...");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setFormMsg("✅ Project posted successfully!");
        setForm({
          title: "",
          domain: "",
          skills: "",
          description: "",
        });
        fetchProjects();
      } else {
        setFormMsg(data.message || "❌ Failed to post project");
      }
    } catch {
      setFormMsg("❌ Network error");
    }

    setLoading(false);
  };

  /* ---------------- UPDATE PROPOSAL STATUS ---------------- */
  const handleProposalStatus = async (proposalId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/api/proposals/${proposalId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        fetchProposals();
      } else {
        alert("Failed to update proposal status");
      }
    } catch {
      alert("Network error");
    }
  };

  /* ---------------- DELETE PROJECT ---------------- */
  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      if (res.ok) {
        fetchProjects();
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to delete project');
      }
    } catch {
      alert('Network error');
    }
  };

  return (
    <div className="section">
      <h2>College Dashboard</h2>

      {/* ---------------- MAIN OPTIONS ---------------- */}
      {!activeSection && (
        <div className="grid">
          <div className="card" onClick={() => setActiveSection("post")}>
            <h3>Post Project</h3>
            <p>Publish student projects.</p>
          </div>
          <div className="card" onClick={() => setActiveSection("proposals")}>
            <h3>View Proposals</h3>
            <p>Review company offers.</p>
          </div>
        </div>
      )}

      {/* ---------------- POST PROJECT ---------------- */}
      {activeSection === "post" && (
        <div style={{ maxWidth: 700, margin: "auto" }}>
          <button onClick={() => setActiveSection(null)}>← Back</button>

          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ marginBottom: 16 }}>Post a New Project</h3>

            <form onSubmit={handleFormSubmit} style={{ display: "grid", gap: 14 }}>
              <input
                name="title"
                placeholder="Project Title"
                value={form.title}
                onChange={handleFormChange}
                required
              />

              <input
                name="domain"
                placeholder="Domain (e.g. AI, Web, IoT)"
                value={form.domain}
                onChange={handleFormChange}
                required
              />

              <input
                name="skills"
                placeholder="Skills (comma separated)"
                value={form.skills}
                onChange={handleFormChange}
                required
              />

              <textarea
                name="description"
                placeholder="Project Description"
                rows={4}
                value={form.description}
                onChange={handleFormChange}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Posting..." : "Post Project"}
              </button>

              {formMsg && <p>{formMsg}</p>}
            </form>
          </div>

          <h3 style={{ marginTop: 32 }}>Your Posted Projects</h3>

          {projectsLoading ? (
            <p>Loading...</p>
          ) : projects.length === 0 ? (
            <p>No projects posted yet.</p>
          ) : (
            projects.map(p => (
              <div key={p._id} className="card" style={{ position: 'relative' }}>
                <strong>{p.title}</strong>
                <p><b>Domain:</b> {p.domain}</p>
                <p><b>Skills:</b> {p.skills}</p>
                <p>{p.description}</p>
                <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => handleDeleteProject(p._id)}
                    style={{
                      padding: '8px 12px',
                      background: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ---------------- VIEW PROPOSALS ---------------- */}
      {activeSection === "proposals" && (
        <div style={{ maxWidth: 800, margin: "auto" }}>
          <button onClick={() => setActiveSection(null)}>← Back</button>

          <h3>Proposals Received</h3>

          {loading ? (
            <p>Loading proposals...</p>
          ) : proposals.length === 0 ? (
            <p>No proposals found.</p>
          ) : (
            proposals.map(p => (
              <div key={p._id} className="card" style={{ padding: "16px", marginBottom: "16px", borderRadius: "8px", boxShadow: "0 2px 8px #0001" }}>
                <strong style={{ fontSize: "16px" }}>Project:</strong> {p.projectId?.title || "N/A"} <br />
                <strong>Domain:</strong> {p.projectId?.domain || "N/A"} <br />
                <strong>Company:</strong> {p.companyId?.email || "Anonymous"} <br />
                <strong>Message:</strong> {p.message} <br />
                <strong>Type:</strong> {p.type || "Partnership"} <br />
                <strong>Status:</strong> <span style={{ color: p.status === "Approved" ? "green" : p.status === "Rejected" ? "red" : "orange" }}>{p.status || "Pending"}</span>
                
                {p.status === "Pending" && (
                  <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => handleProposalStatus(p._id, "Approved")}
                      style={{
                        padding: "8px 16px",
                        background: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => handleProposalStatus(p._id, "Rejected")}
                      style={{
                        padding: "8px 16px",
                        background: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      ✗ Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
