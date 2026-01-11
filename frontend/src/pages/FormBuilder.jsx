import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function FormBuilder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get("template");

  const [formBg, setFormBg] = useState("#ffffff");
  const [borderColor, setBorderColor] = useState("#000000");
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  /* ================= TEMPLATE LOADING ================= */
  useEffect(() => {
    if (!templateId) return;

    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/api/forms/${templateId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title || "");
        setFormBg(data.theme?.background || "#ffffff");
        setBorderColor(data.theme?.borderColor || "#000000");
        setQuestions(data.questions || []);
      })
      .catch(console.error);
  }, [templateId]);

  /* ================= QUESTION HANDLERS ================= */

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: "",
        type: "subjective",
        options: [],
        required: false,
        bg: "#f9f9f9",
        font: "Arial",
        fontSize: 16,
        multiple: false,
        image: null,
      },
    ]);
  };

  const updateQuestion = (id, key, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [key]: value } : q))
    );
  };

  const addOption = (id) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  const updateOption = (qid, index, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid
          ? {
              ...q,
              options: q.options.map((opt, i) =>
                i === index ? value : opt
              ),
            }
          : q
      )
    );
  };

  /* ================= CREATE FORM ================= */

  const createForm = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login first");

      const res = await fetch("http://localhost:5000/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title || "Untitled Form",
          description: "",
          theme: {
            background: formBg,
            borderColor,
          },
          questions,
          isTemplate: true, // 👈 important
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      navigate(`/form/${data.id}`);
    } catch (err) {
      alert(err.message);
    }
  };

  /* ================= UI ================= */

  return (
    <main className="form-builder-page">
      <div className="form-controls">
        <label>
          Form Background
          <input type="color" value={formBg} onChange={(e) => setFormBg(e.target.value)} />
        </label>

        <label>
          Border Color
          <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
        </label>

        <button onClick={addQuestion}>Add Question</button>
      </div>

      <div
        className="form-container"
        style={{
          background: formBg,
          border: `1px solid ${borderColor}`,
          borderRadius: "12px",
        }}
      >
        <input
          className="form-title"
          placeholder="Form Heading"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {questions.length === 0 && (
          <p className="empty-state">Click “Add Question” to begin</p>
        )}

        {questions.map((q, index) => (
          <div
            key={q.id}
            className="question-box"
            style={{
              background: q.bg,
              border: `1px solid ${borderColor}`,
              borderRadius: "10px",
            }}
          >
            <input
              placeholder={`Question ${index + 1}`}
              value={q.text}
              onChange={(e) => updateQuestion(q.id, "text", e.target.value)}
              style={{
                fontFamily: q.font,
                fontSize: `${q.fontSize}px`,
              }}
            />

            <select value={q.type} onChange={(e) => updateQuestion(q.id, "type", e.target.value)}>
              <option value="subjective">Subjective</option>
              <option value="objective">Objective</option>
              <option value="file">Upload File</option>
            </select>

            {q.type === "objective" && (
              <>
                <select
                  value={q.multiple ? "multiple" : "single"}
                  onChange={(e) =>
                    updateQuestion(q.id, "multiple", e.target.value === "multiple")
                  }
                >
                  <option value="single">Single Correct</option>
                  <option value="multiple">Multiple Correct</option>
                </select>

                <button onClick={() => addOption(q.id)}>Add Option</button>

                {q.options.map((opt, i) => (
                  <input
                    key={i}
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) => updateOption(q.id, i, e.target.value)}
                  />
                ))}
              </>
            )}

            <label className="inline-option">
              Required
              <input
                type="checkbox"
                checked={q.required}
                onChange={(e) => updateQuestion(q.id, "required", e.target.checked)}
              />
            </label>

            <label className="inline-option">
              Question Background
              <input
                type="color"
                value={q.bg}
                onChange={(e) => updateQuestion(q.id, "bg", e.target.value)}
              />
            </label>

            <select value={q.font} onChange={(e) => updateQuestion(q.id, "font", e.target.value)}>
              <option>Arial</option>
              <option>Roboto</option>
              <option>Poppins</option>
              <option>Montserrat</option>
              <option>Playfair Display</option>
              <option>Baguette Script</option>
            </select>

            <label>
              Font Size
              <input
                type="number"
                min="12"
                max="32"
                value={q.fontSize}
                onChange={(e) =>
                  updateQuestion(q.id, "fontSize", Number(e.target.value))
                }
              />
            </label>
          </div>
        ))}

        <button className="create-final-btn" onClick={createForm}>
          Create
        </button>
      </div>
    </main>
  );
}
