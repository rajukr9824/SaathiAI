import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/login");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-emerald-950">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm bg-slate-900 p-6 rounded-2xl shadow-xl"
      >
        <h2 className="text-xl font-semibold text-center text-green-400 mb-4">
          Create Account
        </h2>

        {error && (
          <p className="text-sm text-red-400 mb-3 text-center">{error}</p>
        )}

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-green-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-green-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-green-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full py-2 rounded-lg bg-green-500 text-slate-900 font-medium hover:opacity-90">
          Register
        </button>

        <p className="text-xs text-slate-400 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
