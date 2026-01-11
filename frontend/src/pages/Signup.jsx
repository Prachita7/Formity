import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });

      const text = await res.text(); // ✅ read as text first

      if (!res.ok) {
        // try to parse backend JSON error
        try {
          const err = JSON.parse(text);
          throw new Error(err.message);
        } catch {
          throw new Error("Signup failed. Backend error.");
        }
      }

      // only parse JSON if response is OK
      JSON.parse(text);

      alert("Signup successful! Please login.");
      navigate("/login");

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };


  return (
    <div className="auth-page">
      <h2>Sign Up</h2>

      <form onSubmit={handleSignup} className="auth-form">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
