import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FormView() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login to view the form");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `http://localhost:5000/api/forms/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch form");
        }

        const data = await res.json();
        setForm(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;
  }

  if (!form) {
    return <p style={{ padding: "2rem" }}>Form not found</p>;
  }

  return (
    <div
      className="form-view"
      style={{
        background: form.theme?.background || "#fff",
        border: `1px solid ${form.theme?.borderColor || "#000"}`,
        borderRadius: "12px",
        padding: "2rem",
        maxWidth: "800px",
        margin: "2rem auto",
      }}
    >
      <h2 style={{ textAlign: "center" }}>{form.title}</h2>

      {form.questions.map((q, index) => (
        <div
          key={index}
          style={{
            background: q.bg,
            padding: "1rem",
            borderRadius: "10px",
            marginBottom: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: q.font,
              fontSize: q.fontSize,
            }}
          >
            {q.text}
            {q.required && " *"}
          </p>

          {q.type === "subjective" && <input type="text" />}

          {q.type === "objective" &&
            q.options.map((opt, i) => (
              <div key={i}>
                <label>
                  <input
                    type={q.multiple ? "checkbox" : "radio"}
                    name={`q-${index}`}
                  />
                  {opt}
                </label>
              </div>
            ))}

          {q.type === "file" && <input type="file" />}
        </div>
      ))}
    </div>
  );
}
