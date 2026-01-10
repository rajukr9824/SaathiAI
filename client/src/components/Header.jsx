import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    console.error("Invalid user");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-4 sm:px-6 bg-slate-950 border-b border-slate-800 z-50">
      <h1 className="text-base sm:text-lg font-semibold text-green-400">
        Saathi
      </h1>

      <div className="flex items-center gap-3 sm:gap-4">
        {user?.name && (
          <span className="text-xs sm:text-sm text-slate-300">
            Hi, <span className="text-white font-medium">{user.name}</span>
          </span>
        )}
        <button
          onClick={handleLogout}
          className="text-[10px] sm:text-xs px-3 py-1 rounded-md bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;