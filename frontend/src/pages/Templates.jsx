import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/forms/templates");

        if (!res.ok) {
          throw new Error("Failed to fetch templates");
        }

        const data = await res.json();
        setTemplates(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load templates");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading templates...</p>;
  }

  if (error) {
    return (
      <p style={{ padding: "2rem", color: "red" }}>
        {error}
      </p>
    );
  }

  return (
    <main className="templates-page">
      <h2 style={{ textAlign: "center" }}>Templates</h2>

      {templates.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          No templates available yet
        </p>
      ) : (
        <div className="templates-grid">
          {templates.map((t) => (
            <div key={t.id} className="template-card">
              <h3>{t.title}</h3>
              <button
                onClick={() => navigate(`/create?template=${t.id}`)}
              >
                Use Template
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
