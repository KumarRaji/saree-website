// FeatureCollectionAdmin.jsx
import React, { useEffect, useState } from "react";

export default function FeatureCollectionAdmin() {
  const API = import.meta.env?.VITE_API_URL || ""; // "" if using Vite proxy
  const base = API ? `${API}/featurecollection` : `/featurecollection`;

  const empty = { title: "", category: "", amount: "" };
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const load = async () => {
    setErr("");
    try {
      const r = await fetch(base);
      const data = await r.json();
      if (!r.ok) throw new Error(data?.message || "Failed to load");
      setRows(data);
    } catch (e) { setErr(e.message); }
  };

  useEffect(() => { load(); }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setErr("");
    try {
      const url = editingId ? `${base}/${editingId}` : base;
      const method = editingId ? "PUT" : "POST";
      const r = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: form.title, category: form.category, amount: form.amount }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.error || data?.message || `${method} failed`);
      setForm(empty);
      setEditingId(null);
      await load();
    } catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  };

  const onEdit = (row) => {
    setEditingId(row.id);
    setForm({ title: row.title, category: row.category, amount: row.amount });
  };

  const onCancel = () => {
    setEditingId(null);
    setForm(empty);
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this item?")) return;
    setErr("");
    try {
      const r = await fetch(`${base}/${id}`, { method: "DELETE" });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.message || "Delete failed");
      await load();
    } catch (e) { setErr(e.message); }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-3">Feature Collection (Admin)</h2>

      <form onSubmit={onSubmit} className="bg-white p-4 rounded-lg shadow grid grid-cols-1 md:grid-cols-4 gap-3">
        <input name="title" value={form.title} onChange={onChange} placeholder="Title" className="border px-3 py-2 rounded" required />
        <input name="category" value={form.category} onChange={onChange} placeholder="Category" className="border px-3 py-2 rounded" required />
        <input name="amount" value={form.amount} onChange={onChange} placeholder="Amount" className="border px-3 py-2 rounded" required />
        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-70">
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button type="button" onClick={onCancel} className="flex-1 bg-gray-200 text-gray-800 rounded px-4 py-2 hover:bg-gray-300">
              Cancel
            </button>
          )}
        </div>
      </form>

      {err && <p className="text-red-600 text-sm mt-3">Error: {err}</p>}

      <div className="bg-white rounded-lg shadow mt-6 overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left border-b">ID</th>
              <th className="px-4 py-2 text-left border-b">Title</th>
              <th className="px-4 py-2 text-left border-b">Category</th>
              <th className="px-4 py-2 text-left border-b">Amount</th>
              <th className="px-4 py-2 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{r.id}</td>
                <td className="px-4 py-2 border-b">{r.title}</td>
                <td className="px-4 py-2 border-b">{r.category}</td>
                <td className="px-4 py-2 border-b">₹ {r.amount}</td>
                <td className="px-4 py-2 border-b">
                  <div className="flex gap-2">
                    <button onClick={() => onEdit(r)} className="px-3 py-1 rounded bg-amber-500 text-white hover:bg-amber-600">Edit</button>
                    <button onClick={() => onDelete(r.id)} className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan="5" className="px-4 py-6 text-center text-gray-500">No items</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
