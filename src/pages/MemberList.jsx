import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function MemberList() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    const { data } = await supabase
      .from("memberships")
      .select("*")
      .order("created_at", { ascending: false });

    setMembers(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const filtered = members.filter(
    (m) =>
      m.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="arch-container">
      <div className="arch-heading-group">
        <span className="arch-tag">REGISTRY</span>
        <h2>ACTIVE ENROLLMENT DATABASE</h2>
      </div>

      <div className="registry-toolbar">
        <input
          type="text"
          className="search-field"
          placeholder="Filter records by name or email address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={loadData} className="btn-clean ghost">
          ↻ Refresh
        </button>
      </div>

      <div className="registry-table-wrap">
        <table className="registry-table">
          <thead>
            <tr>
              <th>Member Name</th>
              <th>Contact Details</th>
              <th>Package</th>
              <th>Term</th>
              <th>Total Paid</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="table-state-msg">
                  Retrieving database records...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="table-state-msg">
                  No records match your criteria.
                </td>
              </tr>
            ) : (
              filtered.map((m) => (
                <tr key={m.id}>
                  <td data-label="Member Name"><strong>{m.full_name}</strong></td>
                  <td data-label="Contact">{m.email}</td>
                  <td data-label="Package"><span className="tier-badge">{m.plan}</span></td>
                  <td data-label="Term">{m.duration_months} mo</td>
                  <td data-label="Total Paid"><strong>${m.total_paid || 0}</strong></td>
                  <td data-label="Joined">{new Date(m.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default MemberList;