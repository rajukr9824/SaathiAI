import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user)); // ✅ ADD THIS

    navigate("/chat");
  } catch (err) {
    setError("Invalid email or password");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-slate-900 to-emerald-950">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-slate-900 p-6 rounded-2xl shadow-xl"
      >
        <h2 className="text-xl font-semibold text-center text-green-400 mb-4">
          Login to SaathiAI
        </h2>

        {error && (
          <p className="text-sm text-red-400 mb-3 text-center">{error}</p>
        )}

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
          Login
        </button>

        <p className="text-xs text-slate-400 mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
