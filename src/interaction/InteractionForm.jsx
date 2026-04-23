import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { submitInteraction } from "../services/interactionApi";

const initialState = {
  hcpName: "",
  interactionType: "Meeting",
  date: "",
  time: "",
  attendees: "",
  topics: "",
  product: "",
  summary: "",
};

export default function InteractionForm() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [aiInput, setAiInput] = useState("");

  // AI auto-fill
  useEffect(() => {
    const handler = (e) => {
      setFormData((prev) => ({ ...prev, ...e.detail }));
    };
    window.addEventListener("ai-fill-form", handler);
    return () => window.removeEventListener("ai-fill-form", handler);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitInteraction(formData);
      toast.success("Interaction saved successfully");
      setFormData(initialState);
    } catch (err) {
      toast.error("Failed to save interaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* LEFT SIDE: LOG HCP INTERACTION FORM */}
      <div style={{ flex: 2, backgroundColor: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#1a1a1a' }}>Log HCP Interaction</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Interaction Details</p>

        <form onSubmit={handleSubmit}>
          {/* ROW 1: HCP Name and Interaction Type */}
          <div style={{ display: 'flex', gap: '24px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>HCP Name</label>
              <input 
                name="hcpName" 
                placeholder="Search or select HCP..." 
                value={formData.hcpName} 
                onChange={handleChange} 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fcfcfc' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Interaction Type</label>
              <select 
                name="interactionType" 
                value={formData.interactionType} 
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fcfcfc' }}
              >
                <option>Meeting</option>
                <option>Call</option>
                <option>Email</option>
              </select>
            </div>
          </div>

          {/* ROW 2: Date and Time */}
          <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Date</label>
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fcfcfc' }} 
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Time</label>
              <input 
                type="time" 
                name="time" 
                value={formData.time} 
                onChange={handleChange} 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fcfcfc' }} 
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Attendees</label>
            <input 
              name="attendees" 
              placeholder="Enter names or search..." 
              value={formData.attendees} 
              onChange={handleChange} 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fcfcfc' }} 
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Topics Discussed</label>
            <textarea 
              name="topics" 
              placeholder="Enter key discussion points..." 
              value={formData.topics} 
              onChange={handleChange} 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fcfcfc', minHeight: '100px', resize: 'vertical' }} 
            />
          </div>

          <button 
            type="button"
            style={{ color: '#3b82f6', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px', padding: 0 }}
          >
            🎙️ Summarize from Voice Note (Requires Consent)
          </button>

          <button 
            type="submit" 
            disabled={loading}
            style={{ width: '100%', padding: '14px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '16px', cursor: 'pointer', transition: 'background 0.2s' }}
          >
            {loading ? "Saving..." : "Submit Interaction"}
          </button>
        </form>
      </div>

      
      

    </div>
  );
}