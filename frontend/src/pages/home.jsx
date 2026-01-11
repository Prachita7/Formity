import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="main-body">
      <section className="hero">
        <h1>Welcome to Formity</h1>
        <button
          className="create-form-btn"
          onClick={() => navigate("/create")}
        >
          Create a Form
        </button>
      </section>

      <section className="about">
        <h2>About Formity</h2>
        <p>
          Formity helps you create customizable forms with ease, giving full
          control over design, questions, and structure.
        </p>
      </section>

      <section className="faq">
        <h2>FAQs</h2>

        <div className="faq-box">
        <h3>What is Formity?</h3>
        <p>
            Formity is a user-friendly platform to build and manage custom forms
            quickly and efficiently.
        </p>
        </div>

        <div className="faq-box">
        <h3>Do I need technical skills to use Formity?</h3>
        <p>
            No. Formity is designed for everyone, even if you have no coding
            experience.
        </p>
        </div>

        <div className="faq-box">
        <h3>Can I customize my forms?</h3>
        <p>
            Yes, Formity allows you to customize layouts, colors, and styles easily.
        </p>
        </div>
      </section>
    </main>
  );
}
